
import React, { useState } from 'react';
import { UserProfile, QuitPlan, Methodology } from '../types';
import { generateQuitPlan } from '../services/geminiService';
import { ArrowLeft, Loader2, Plus } from 'lucide-react';

interface OnboardingProps {
    onOnboardingComplete: (profile: UserProfile, plan: QuitPlan) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onOnboardingComplete }) => {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        name: '',
        smokingProfile: { cigsPerDay: 10, yearsSmoking: 5, motivation: '' },
        biometrics: { age: 30, height: 175, weight: 70, activityLevel: 'Moderately Active' },
        triggers: { contextual: [], emotional: [], location: [], social: [] },
        positiveGoals: { activities: [], content: [] },
        replacementHabits: [],
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');
        if (field) {
            setFormData(prev => ({ ...prev, [section]: { ...(prev[section as keyof UserProfile] as object), [field]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleMultiSelect = (category: keyof UserProfile['triggers'], value: string) => {
        setFormData(prev => {
            const currentTriggers = prev.triggers ?? { contextual: [], emotional: [], location: [], social: [] };
            const currentSelection = currentTriggers[category];
            const newSelection = currentSelection.includes(value)
                ? currentSelection.filter(item => item !== value)
                : [...currentSelection, value];
            return { ...prev, triggers: { ...currentTriggers, [category]: newSelection } };
        });
    };
    
    const handleHabitSelect = (value: string) => {
        setFormData(prev => {
            const currentHabits = prev.replacementHabits || [];
            const newHabits = currentHabits.includes(value)
                ? currentHabits.filter(item => item !== value)
                : [...currentHabits, value];
            return { ...prev, replacementHabits: newHabits };
        });
    };

    const handleMethodologySelect = async (methodology: Methodology) => {
        setIsLoading(true);
        setError(null);
        const finalProfile = { ...formData, quitMethodology: methodology } as UserProfile;
        try {
            const plan = await generateQuitPlan(finalProfile);
            onOnboardingComplete(finalProfile, plan);
        } catch (e: any) {
            setError(e.message || "An unexpected error occurred.");
            setIsLoading(false);
        }
    };
    
    const renderStep = () => {
        switch (step) {
            case 0: return <WelcomeStep onNext={handleNext} />;
            case 1: return <ProfileStep formData={formData} onChange={handleInputChange} onNext={handleNext} onBack={handleBack} />;
            case 2: return <TriggerStep formData={formData} onSelect={handleMultiSelect} onNext={handleNext} onBack={handleBack} />;
            case 3: return <HabitStep formData={formData} onSelect={handleHabitSelect} onNext={handleNext} onBack={handleBack} />;
            case 4: return <MethodologyStep onSelect={handleMethodologySelect} onBack={handleBack} isLoading={isLoading} />;
            default: return null;
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-brand-primary to-brand-secondary p-4 flex flex-col justify-center items-center text-white">
            <div className="w-full max-w-md mx-auto">
                {renderStep()}
                {error && <p className="mt-4 text-center text-red-300 bg-red-900/50 p-3 rounded-lg">{error}</p>}
            </div>
        </div>
    );
};

const OnboardingButton: React.FC<{onClick: () => void; children: React.ReactNode; disabled?: boolean;}> = ({ onClick, children, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="w-full bg-white text-brand-primary font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
        {children}
    </button>
);

const BackButton: React.FC<{onClick: () => void}> = ({onClick}) => (
    <button onClick={onClick} className="absolute top-6 left-6 text-white hover:text-brand-light">
        <ArrowLeft size={24} />
    </button>
);

const WelcomeStep: React.FC<{onNext: () => void}> = ({ onNext }) => (
    <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
        <h2 className="text-5xl font-extrabold mb-6 text-brand-light tracking-tight">BreatheFree</h2>
        <p className="text-lg mb-8 opacity-90">Your personalized, AI-powered journey to a smoke-free life starts now.</p>
        <OnboardingButton onClick={onNext}>Let's Get Started</OnboardingButton>
    </div>
);

const ProfileStep: React.FC<{formData: any; onChange: any; onNext: () => void; onBack: () => void;}> = ({ formData, onChange, onNext, onBack }) => (
    <div className="relative animate-fade-in">
        <BackButton onClick={onBack} />
        <h2 className="text-3xl font-bold text-center mb-6">Tell Us About Yourself</h2>
        <div className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="What's your name?" className="w-full p-3 bg-white/20 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
            <textarea name="smokingProfile.motivation" value={formData.smokingProfile.motivation} onChange={onChange} placeholder="What's your main motivation for quitting?" className="w-full p-3 bg-white/20 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white h-24" />
            <div>
                <label className="block text-sm mb-1 opacity-80">How many cigarettes per day?</label>
                <input type="range" name="smokingProfile.cigsPerDay" value={formData.smokingProfile.cigsPerDay} onChange={onChange} min="1" max="50" className="w-full" />
                <p className="text-center font-bold">{formData.smokingProfile.cigsPerDay} cigarettes</p>
            </div>
            <OnboardingButton onClick={onNext}>Continue</OnboardingButton>
        </div>
    </div>
);

const TriggerStep: React.FC<{formData: any; onSelect: any; onNext: () => void; onBack: () => void;}> = ({ formData, onSelect, onNext, onBack }) => {
    const triggers = {
        contextual: ["Morning Coffee", "After Meals", "Driving", "Work Breaks", "Drinking Alcohol"],
        emotional: ["Stress", "Boredom", "Anxiety", "Celebrating", "Sadness"],
    };

    const [customContextual, setCustomContextual] = useState('');
    const [customEmotional, setCustomEmotional] = useState('');

    const handleAddCustom = (category: keyof UserProfile['triggers'], value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        if (value.trim() !== '') {
            onSelect(category, value.trim());
            setValue('');
        }
    };
    
    const userContextualTriggers = (formData.triggers?.contextual || []).filter((t: string) => !triggers.contextual.includes(t));
    const userEmotionalTriggers = (formData.triggers?.emotional || []).filter((t: string) => !triggers.emotional.includes(t));

    return (
        <div className="relative animate-fade-in">
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold text-center mb-6">What Are Your Triggers?</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">When do you usually smoke?</h3>
                    <div className="flex flex-wrap gap-2">
                        {triggers.contextual.map(t => <Chip key={t} label={t} selected={(formData.triggers.contextual || []).includes(t)} onClick={() => onSelect('contextual', t)} />)}
                        {userContextualTriggers.map((t: string) => <Chip key={t} label={t} selected={true} onClick={() => onSelect('contextual', t)} />)}
                    </div>
                     <div className="flex gap-2 mt-3">
                        <input 
                            type="text" 
                            value={customContextual} 
                            onChange={(e) => setCustomContextual(e.target.value)}
                            placeholder="Add your own..."
                            className="w-full p-2 bg-white/20 rounded-lg placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button onClick={() => handleAddCustom('contextual', customContextual, setCustomContextual)} className="bg-white text-brand-primary font-bold px-4 rounded-lg text-sm flex items-center justify-center"><Plus size={16}/></button>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">How do you feel when you smoke?</h3>
                    <div className="flex flex-wrap gap-2">
                        {triggers.emotional.map(t => <Chip key={t} label={t} selected={(formData.triggers.emotional || []).includes(t)} onClick={() => onSelect('emotional', t)} />)}
                         {userEmotionalTriggers.map((t: string) => <Chip key={t} label={t} selected={true} onClick={() => onSelect('emotional', t)} />)}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <input 
                            type="text" 
                            value={customEmotional} 
                            onChange={(e) => setCustomEmotional(e.target.value)}
                            placeholder="Add your own..."
                            className="w-full p-2 bg-white/20 rounded-lg placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button onClick={() => handleAddCustom('emotional', customEmotional, setCustomEmotional)} className="bg-white text-brand-primary font-bold px-4 rounded-lg text-sm flex items-center justify-center"><Plus size={16}/></button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <OnboardingButton onClick={onNext}>Next</OnboardingButton>
            </div>
        </div>
    );
};

const HabitStep: React.FC<{formData: any; onSelect: any; onNext: () => void; onBack: () => void;}> = ({ formData, onSelect, onNext, onBack }) => {
    const habits = [
        "Go for a 5-minute walk",
        "Do 10 push-ups",
        "Deep breathing exercises",
        "Chew gum or a healthy snack",
        "Drink a glass of cold water",
        "Listen to one song mindfully",
    ];

    const [customHabit, setCustomHabit] = useState('');

    const handleAddCustom = () => {
        if (customHabit.trim() !== '') {
            onSelect(customHabit.trim());
            setCustomHabit('');
        }
    };
    
    const userHabits = (formData.replacementHabits || []).filter((h: string) => !habits.includes(h));

    return (
        <div className="relative animate-fade-in">
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold text-center mb-6">Build Your Arsenal</h2>
            <p className="text-center mb-4 opacity-90">Choose some go-to replacement habits for when a craving hits.</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {habits.map(h => <Chip key={h} label={h} selected={(formData.replacementHabits || []).includes(h)} onClick={() => onSelect(h)} />)}
                {userHabits.map((h: string) => <Chip key={h} label={h} selected={true} onClick={() => onSelect(h)} />)}
            </div>
            <div className="flex gap-2 mt-4 max-w-sm mx-auto">
                 <input 
                    type="text" 
                    value={customHabit} 
                    onChange={(e) => setCustomHabit(e.target.value)}
                    placeholder="Add a custom habit..."
                    className="w-full p-2 bg-white/20 rounded-lg placeholder-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button onClick={handleAddCustom} className="bg-white text-brand-primary font-bold px-4 rounded-lg text-sm flex items-center justify-center"><Plus size={16}/></button>
            </div>
            <div className="mt-8">
                <OnboardingButton onClick={onNext}>Almost Done</OnboardingButton>
            </div>
        </div>
    );
};

const MethodologyStep: React.FC<{onSelect: (m: Methodology) => void; onBack: () => void; isLoading: boolean;}> = ({ onSelect, onBack, isLoading }) => {
    return (
        <div className="relative animate-fade-in">
            <BackButton onClick={onBack} />
            <h2 className="text-3xl font-bold text-center mb-6">Choose Your Path</h2>
            <div className="space-y-4">
                <MethodCard 
                    title="Gradual Tapering"
                    description="Reduce your intake step-by-step, transforming your habits without the shock of stopping all at once."
                    onClick={() => onSelect(Methodology.Tapering)}
                    isLoading={isLoading}
                />
                <MethodCard 
                    title="Cold Turkey Challenge"
                    description="For those who want a clean break. Build a new, smoke-free routine from Day 1."
                    onClick={() => onSelect(Methodology.ColdTurkey)}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

const Chip: React.FC<{label: string; selected: boolean; onClick: () => void}> = ({ label, selected, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selected ? 'bg-white text-brand-primary' : 'bg-white/20 hover:bg-white/30'}`}>
        {label}
    </button>
);

const MethodCard: React.FC<{title: string, description: string; onClick: () => void; isLoading: boolean}> = ({ title, description, onClick, isLoading }) => (
    <button onClick={onClick} disabled={isLoading} className="w-full text-left p-6 bg-white/20 rounded-2xl shadow-lg hover:bg-white/30 transition-colors disabled:opacity-70 disabled:cursor-wait">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="opacity-90 text-sm">{description}</p>
        {isLoading && <Loader2 className="animate-spin h-5 w-5 ml-auto" />}
    </button>
);


export default Onboarding;
