import React, { useState } from 'react';
import { OnboardingProfile, QuitPlan, Methodology } from '../types';
import { generateQuitPlan } from '../services/geminiService';
import { useAuth } from './AuthContext';
import { ArrowLeft, ArrowRight, Loader2, Plus, Check, Star, Shield, Target, Brain, TrendingUp, X } from 'lucide-react';

interface ValueFirstOnboardingProps {
    onComplete: (profile: OnboardingProfile) => void;
}

// New Welcome Screen Component
const WelcomeScreen: React.FC<{ onNext: () => void }> = ({ onNext }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex flex-col justify-center items-center p-6">
        <div className="text-center max-w-md mx-auto">
            {/* Logo/Icon */}
            <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Brain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">CleverQuit</h1>
                <p className="text-lg text-emerald-600 font-medium">AI-Powered Freedom</p>
            </div>

            {/* Value Proposition */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
                    Quit Smoking with Your Personal AI Coach
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                    Get personalized support, track your progress, and break free from cigarettes with our intelligent quit plan.
                </p>
                
                {/* Quick Benefits */}
                <div className="flex justify-center space-x-8 mb-8">
                    <div className="text-center">
                        <Target className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Personalized</p>
                    </div>
                    <div className="text-center">
                        <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">AI-Powered</p>
                    </div>
                    <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Proven</p>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <button
                onClick={onNext}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
                Find Your Perfect Quit Plan
            </button>

            <p className="text-sm text-gray-500 mt-4">Takes just 2 minutes • No signup required</p>
        </div>
    </div>
);

// Progress Bar Component
const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
        <p className="text-sm text-gray-500 mt-2 text-center">Step {currentStep} of {totalSteps}</p>
    </div>
);

// Interactive Profile Collection Screen
const ProfileCollectionScreen: React.FC<{
    formData: Partial<OnboardingProfile>;
    onChange: (field: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}> = ({ formData, onChange, onNext, onBack }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
        <div className="max-w-md mx-auto">
            <ProgressBar currentStep={2} totalSteps={6} />
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Tell us about yourself
                </h2>

                <div className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What should we call you?
                        </label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => onChange('name', e.target.value)}
                            placeholder="Your first name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>

                    {/* Age Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your age
                        </label>
                        <input
                            type="number"
                            value={formData.biometrics?.age || ''}
                            onChange={(e) => onChange('biometrics', { ...formData.biometrics, age: parseInt(e.target.value) })}
                            placeholder="25"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>

                    {/* Cigarettes per day */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            How many cigarettes do you smoke per day?
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 5, 10, 15, 20, 25].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => onChange('smokingProfile', { ...formData.smokingProfile, cigsPerDay: num })}
                                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                                        formData.smokingProfile?.cigsPerDay === num
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                            : 'border-gray-200 hover:border-emerald-300'
                                    }`}
                                >
                                    {num}{num === 25 ? '+' : ''}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={onBack}
                        className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        disabled={!formData.name || !formData.biometrics?.age || !formData.smokingProfile?.cigsPerDay}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// Smoking History Screen
const SmokingHistoryScreen: React.FC<{
    formData: Partial<OnboardingProfile>;
    onChange: (field: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}> = ({ formData, onChange, onNext, onBack }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
        <div className="max-w-md mx-auto">
            <ProgressBar currentStep={3} totalSteps={6} />
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Your smoking journey
                </h2>

                <div className="space-y-6">
                    {/* Years smoking */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            How long have you been smoking?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'].map((period, index) => (
                                <button
                                    key={period}
                                    onClick={() => onChange('smokingProfile', { 
                                        ...formData.smokingProfile, 
                                        yearsSmoking: index === 0 ? 0.5 : index === 1 ? 2 : index === 2 ? 4 : index === 3 ? 7 : 12 
                                    })}
                                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all text-sm ${
                                        formData.smokingProfile?.yearsSmoking === (index === 0 ? 0.5 : index === 1 ? 2 : index === 2 ? 4 : index === 3 ? 7 : 12)
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                            : 'border-gray-200 hover:border-emerald-300'
                                    }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main motivation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            What's your main motivation to quit? (Select all that apply)
                        </label>
                        <div className="space-y-3">
                            {[
                                'Health concerns',
                                'Save money',
                                'Family pressure',
                                'Social reasons',
                                'Personal challenge'
                            ].map((motivation) => {
                                const currentMotivations = formData.smokingProfile?.motivations || [];
                                const isSelected = currentMotivations.includes(motivation);
                                
                                return (
                                    <button
                                        key={motivation}
                                        onClick={() => {
                                            const newMotivations = isSelected
                                                ? currentMotivations.filter(m => m !== motivation)
                                                : [...currentMotivations, motivation];
                                            onChange('smokingProfile', { 
                                                ...formData.smokingProfile, 
                                                motivations: newMotivations 
                                            });
                                        }}
                                        className={`w-full py-3 px-4 rounded-xl border-2 font-medium transition-all text-left flex items-center ${
                                            isSelected
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 hover:border-emerald-300'
                                        }`}
                                    >
                                        <Check className={`w-4 h-4 mr-3 ${isSelected ? 'text-emerald-500' : 'text-transparent'}`} />
                                        {motivation}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Custom motivation input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Add your own motivation:
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter custom motivation..."
                                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                            const customMotivation = e.currentTarget.value.trim();
                                            const currentMotivations = formData.smokingProfile?.motivations || [];
                                            if (!currentMotivations.includes(customMotivation)) {
                                                onChange('smokingProfile', { 
                                                    ...formData.smokingProfile, 
                                                    motivations: [...currentMotivations, customMotivation] 
                                                });
                                            }
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        if (input.value.trim()) {
                                            const customMotivation = input.value.trim();
                                            const currentMotivations = formData.smokingProfile?.motivations || [];
                                            if (!currentMotivations.includes(customMotivation)) {
                                                onChange('smokingProfile', { 
                                                    ...formData.smokingProfile, 
                                                    motivations: [...currentMotivations, customMotivation] 
                                                });
                                            }
                                            input.value = '';
                                        }
                                    }}
                                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Display selected custom motivations */}
                        {formData.smokingProfile?.motivations && 
                         formData.smokingProfile.motivations.filter(m => ![
                             'Health concerns', 'Save money', 'Family pressure', 'Social reasons', 'Personal challenge'
                         ].includes(m)).length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">Your custom motivations:</p>
                                <div className="flex flex-wrap gap-2">
                                    {formData.smokingProfile.motivations
                                        .filter(m => ![
                                            'Health concerns', 'Save money', 'Family pressure', 'Social reasons', 'Personal challenge'
                                        ].includes(m))
                                        .map((motivation, index) => (
                                            <span
                                                key={index}
                                                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center"
                                            >
                                                {motivation}
                                                <button
                                                    onClick={() => {
                                                        const currentMotivations = formData.smokingProfile?.motivations || [];
                                                        onChange('smokingProfile', { 
                                                            ...formData.smokingProfile, 
                                                            motivations: currentMotivations.filter(m => m !== motivation) 
                                                        });
                                                    }}
                                                    className="ml-2 text-emerald-500 hover:text-emerald-700"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={onBack}
                        className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        disabled={!formData.smokingProfile?.yearsSmoking || !formData.smokingProfile?.motivations || formData.smokingProfile.motivations.length === 0}
                        className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// Triggers Selection Screen
const TriggersScreen: React.FC<{
    formData: Partial<OnboardingProfile>;
    onChange: (field: string, value: any) => void;
    onNext: () => void;
    onBack: () => void;
}> = ({ formData, onChange, onNext, onBack }) => {
    const handleTriggerToggle = (category: string, trigger: string) => {
        const currentTriggers = formData.triggers || { contextual: [], emotional: [], location: [], social: [] };
        const categoryTriggers = currentTriggers[category as keyof typeof currentTriggers] || [];
        
        const newTriggers = categoryTriggers.includes(trigger)
            ? categoryTriggers.filter(t => t !== trigger)
            : [...categoryTriggers, trigger];
            
        onChange('triggers', {
            ...currentTriggers,
            [category]: newTriggers
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
            <div className="max-w-md mx-auto">
                <ProgressBar currentStep={4} totalSteps={6} />
                
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        When do you smoke most?
                    </h2>
                    <p className="text-gray-600 mb-6 text-center">Select all that apply</p>

                    <div className="space-y-6">
                        {/* Emotional Triggers */}
                        <div>
                            <h3 className="font-medium text-gray-800 mb-3">Emotional situations</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {['Stress', 'Anxiety', 'Boredom', 'Sadness', 'Anger', 'Celebration'].map((trigger) => (
                                    <button
                                        key={trigger}
                                        onClick={() => handleTriggerToggle('emotional', trigger)}
                                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                            formData.triggers?.emotional?.includes(trigger)
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 hover:border-emerald-300'
                                        }`}
                                    >
                                        {trigger}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Contextual Triggers */}
                        <div>
                            <h3 className="font-medium text-gray-800 mb-3">Daily activities</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {['After meals', 'With coffee', 'Work breaks', 'Driving', 'Phone calls', 'Waiting'].map((trigger) => (
                                    <button
                                        key={trigger}
                                        onClick={() => handleTriggerToggle('contextual', trigger)}
                                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                            formData.triggers?.contextual?.includes(trigger)
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 hover:border-emerald-300'
                                        }`}
                                    >
                                        {trigger}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom trigger inputs */}
                        <div>
                            <h3 className="font-medium text-gray-800 mb-3">Add your own triggers</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Custom emotional trigger:</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="e.g., After arguments..."
                                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                    const customTrigger = e.currentTarget.value.trim();
                                                    if (!formData.triggers?.emotional?.includes(customTrigger)) {
                                                        handleTriggerToggle('emotional', customTrigger);
                                                    }
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                if (input.value.trim()) {
                                                    const customTrigger = input.value.trim();
                                                    if (!formData.triggers?.emotional?.includes(customTrigger)) {
                                                        handleTriggerToggle('emotional', customTrigger);
                                                    }
                                                    input.value = '';
                                                }
                                            }}
                                            className="px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Custom activity trigger:</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="e.g., During video games..."
                                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-sm"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                    const customTrigger = e.currentTarget.value.trim();
                                                    if (!formData.triggers?.contextual?.includes(customTrigger)) {
                                                        handleTriggerToggle('contextual', customTrigger);
                                                    }
                                                    e.currentTarget.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                if (input.value.trim()) {
                                                    const customTrigger = input.value.trim();
                                                    if (!formData.triggers?.contextual?.includes(customTrigger)) {
                                                        handleTriggerToggle('contextual', customTrigger);
                                                    }
                                                    input.value = '';
                                                }
                                            }}
                                            className="px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={onBack}
                            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </button>
                        <button
                            onClick={onNext}
                            className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                        >
                            Continue
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Method Selection Screen
const MethodSelectionScreen: React.FC<{
    onMethodSelect: (methodology: Methodology) => void;
    onBack: () => void;
    isLoading: boolean;
}> = ({ onMethodSelect, onBack, isLoading }) => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
        <div className="max-w-md mx-auto">
            <ProgressBar currentStep={5} totalSteps={6} />
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Choose your quit method
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                    Based on your profile, both methods can work. Choose what feels right for you.
                </p>

                <div className="space-y-4">
                    {/* Cold Turkey */}
                    <button
                        onClick={() => onMethodSelect('Cold Turkey')}
                        disabled={isLoading}
                        className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left disabled:opacity-50"
                    >
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                <Target className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Cold Turkey</h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    Stop completely right now. Quick but challenging.
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Immediate</span>
                                    <span className="ml-2">Best for determined quitters</span>
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Gradual */}
                    <button
                        onClick={() => onMethodSelect('Tapering')}
                        disabled={isLoading}
                        className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left disabled:opacity-50"
                    >
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                                <TrendingUp className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-2">Gradual Reduction</h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    Reduce slowly over time. Easier but takes longer.
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded">7-14 days</span>
                                    <span className="ml-2">Recommended for most</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={onBack}
                        disabled={isLoading}
                        className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </button>
                </div>

                {isLoading && (
                    <div className="text-center mt-6">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" />
                        <p className="text-sm text-gray-600 mt-2">Creating your personalized plan...</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);

// Main Value-First Onboarding Component
const ValueFirstOnboarding: React.FC<ValueFirstOnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<OnboardingProfile>>({
        smokingProfile: {},
        biometrics: {},
        triggers: { contextual: [], emotional: [], location: [], social: [] },
        positiveGoals: { activities: [], content: [] },
        replacementHabits: []
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleMethodSelect = async (methodology: Methodology) => {
        setIsLoading(true);
        
        // Ensure all required fields are present
        const finalProfile: OnboardingProfile = {
            name: formData.name || 'User',
            smokingProfile: {
                cigsPerDay: formData.smokingProfile?.cigsPerDay || 10,
                yearsSmoking: formData.smokingProfile?.yearsSmoking || 1,
                motivation: formData.smokingProfile?.motivations?.[0] || 'Health concerns',
                motivations: formData.smokingProfile?.motivations || ['Health concerns']
            },
            biometrics: {
                age: formData.biometrics?.age || 30,
                height: formData.biometrics?.height || 170,
                weight: formData.biometrics?.weight || 70,
                activityLevel: formData.biometrics?.activityLevel || 'Moderately Active'
            },
            triggers: formData.triggers || { contextual: [], emotional: [], location: [], social: [] },
            positiveGoals: formData.positiveGoals || { activities: [], content: [] },
            replacementHabits: formData.replacementHabits || [],
            quitMethodology: methodology
        };
        

        
        try {
            // Add a small delay to show loading state
            await new Promise(resolve => setTimeout(resolve, 1000));
            onComplete(finalProfile);
        } catch (error) {
            console.error('Error completing onboarding:', error);
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <WelcomeScreen onNext={() => setStep(1)} />;
            case 1:
                return (
                    <ProfileCollectionScreen
                        formData={formData}
                        onChange={handleInputChange}
                        onNext={() => setStep(2)}
                        onBack={() => setStep(0)}
                    />
                );
            case 2:
                return (
                    <SmokingHistoryScreen
                        formData={formData}
                        onChange={handleInputChange}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                    />
                );
            case 3:
                return (
                    <TriggersScreen
                        formData={formData}
                        onChange={handleInputChange}
                        onNext={() => setStep(4)}
                        onBack={() => setStep(2)}
                    />
                );
            case 4:
                return (
                    <MethodSelectionScreen
                        onMethodSelect={handleMethodSelect}
                        onBack={() => setStep(3)}
                        isLoading={isLoading}
                    />
                );
            default:
                return <WelcomeScreen onNext={() => setStep(1)} />;
        }
    };

    return <div>{renderStep()}</div>;
};

export default ValueFirstOnboarding;