import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { UserProfile, Methodology, ChatMessage, ContentItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quitPlanSchema = {
    type: Type.OBJECT,
    properties: {
        methodology: {
            type: Type.STRING,
            enum: [Methodology.Tapering, Methodology.ColdTurkey],
            description: "The quitting methodology chosen by the user."
        },
        dailyPlans: {
            type: Type.ARRAY,
            description: "A 7-day plan to help the user quit smoking.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number (1-7)." },
                    goal: { type: Type.STRING, description: "The main goal for the day. For tapering, specify the cigarette limit. For cold turkey, it should be 'Stay smoke-free!'." },
                    mindfulnessExercise: { type: Type.STRING, description: "A short, actionable mindfulness exercise for the day." },
                    proactiveNudge: {
                        type: Type.OBJECT,
                        properties: {
                            time: { type: Type.STRING, description: "A specific time of day to send a nudge (e.g., 'Morning', 'After Lunch')." },
                            message: { type: Type.STRING, description: "A supportive, proactive message based on the user's triggers." },
                        },
                        required: ['time', 'message'],
                    },
                },
                required: ['day', 'goal', 'mindfulnessExercise', 'proactiveNudge'],
            },
        },
    },
    required: ['methodology', 'dailyPlans'],
};

export const generateQuitPlan = async (userProfile: UserProfile) => {
    const model = ai.models.generateContent;
    
    const prompt = `
        You are an empathetic and expert AI smoking cessation coach named 'BreatheFree'.
        Your task is to create a personalized, 7-day 'Quit Plan' for a user based on their profile.
        The tone must be supportive, non-judgmental, and highly encouraging.

        User Profile:
        - Name: ${userProfile.name}
        - Chosen Quit Method: ${userProfile.quitMethodology}
        - Smoking History: ${userProfile.smokingProfile.cigsPerDay} cigarettes/day for ${userProfile.smokingProfile.yearsSmoking} years.
        - Motivation: "${userProfile.smokingProfile.motivation}"
        - Triggers:
            - Contextual: ${userProfile.triggers.contextual.join(', ')}
            - Emotional: ${userProfile.triggers.emotional.join(', ')}
        - Preferred Replacement Habits: ${userProfile.replacementHabits.join(', ')}
        
        Instructions:
        1.  Adhere to the user's chosen quit methodology (${userProfile.quitMethodology}).
        2.  If 'Tapering', create a realistic daily reduction in the cigarette limit. Start slightly below their current daily average.
        3.  If 'Cold Turkey', the goal is always zero cigarettes. Focus on coping mechanisms.
        4.  Tailor the 'proactiveNudge' message to one of their specific triggers. For example, if they smoke with coffee, create a nudge for the morning.
        5.  Keep all text concise, positive, and easy to understand for a mobile app.
        6.  Generate a JSON object that strictly follows the provided schema.
    `;

    try {
        const response: GenerateContentResponse = await model({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: quitPlanSchema
            }
        });
        const planJson = JSON.parse(response.text);
        return planJson;
    } catch (error) {
        console.error("Error generating quit plan:", error);
        throw new Error("Could not generate your personalized quit plan. Please try again.");
    }
};

let chat: Chat | null = null;

export const startChat = () => {
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a friendly, supportive AI coach for someone trying to quit smoking. Keep your answers concise, empathetic, and encouraging. Your name is BreatheFree.',
        },
    });
};

export const sendMessageToBot = async (message: string, history: ChatMessage[]): Promise<string> => {
    if (!chat) {
        startChat();
    }
    
    // The gemini chat object maintains its own history.
    try {
        const response = await chat!.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to bot:", error);
        return "I'm having a little trouble connecting right now. Please try again in a moment.";
    }
}

export const getSOSIntervention = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: "Generate a very short (2-3 sentences) 'urge surfing' mindfulness exercise for someone experiencing an intense cigarette craving right now. The tone should be calming and direct.",
        });
        return response.text;
    } catch (error) {
        console.error("Error getting SOS intervention:", error);
        return "Take a deep breath. Inhale for 4 seconds, hold for 4, and exhale for 6. You've got this.";
    }
}

export const findRelevantContent = async (topic: string): Promise<ContentItem[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Find 3 recent, high-quality articles or resources about "${topic}" for someone quitting smoking.`,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        
        if (groundingChunks && groundingChunks.length > 0) {
            return groundingChunks
                .filter((chunk: any) => chunk.web)
                .map((chunk: any) => ({
                    title: chunk.web.title,
                    uri: chunk.web.uri,
                }))
                .slice(0, 3);
        } else {
             // Fallback if no search results
            const fallbackResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Provide a short, encouraging tip about ${topic} for someone quitting smoking.`
            });
            return [{ title: `A tip on ${topic}`, uri: `data:text/plain,${encodeURIComponent(fallbackResponse.text)}` }];
        }

    } catch (error) {
        console.error("Error finding relevant content:", error);
        return [];
    }
}

export const getRelapseResponse = async (methodology: Methodology): Promise<string> => {
    const prompt = methodology === Methodology.Tapering
        ? "Generate a short, empathetic message for a user who exceeded their daily cigarette limit. The tone is non-judgmental, focusing on getting back on track. Acknowledge it's part of the journey."
        : "Generate a supportive but firm message for a user on a 'Cold Turkey' plan who had a cigarette. Emphasize recommitting and starting the challenge again tomorrow. Acknowledge the setback without dwelling on failure.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting relapse response:", error);
        return "It's okay. Quitting is a process with ups and downs. The most important thing is to not give up. Let's get back on track.";
    }
};