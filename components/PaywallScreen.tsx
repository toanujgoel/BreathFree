import React, { useState } from 'react';
import { OnboardingProfile, QuitPlan } from '../types';
import { useAuth } from './AuthContext';
import { Star, Check, Shield, TrendingUp, Brain, Target, Users, Crown, ArrowRight, X } from 'lucide-react';

interface PaywallScreenProps {
    userProfile: OnboardingProfile;
    onComplete: (selectedPlan: 'free' | 'premium') => void;
    onCancel?: () => void;
    onShowDiscount?: () => void;
}

const PaywallScreen: React.FC<PaywallScreenProps> = ({ 
    userProfile, 
    onComplete,
    onCancel,
    onShowDiscount
}) => {
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');
    
    // Calculate personalized savings
    const dailyCigaretteCost = 15; // ₹15 per cigarette average
    const dailySavings = (userProfile.smokingProfile?.cigsPerDay || 10) * dailyCigaretteCost;
    const monthlySavings = dailySavings * 30;
    const yearlySavings = dailySavings * 365;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Unlock Your Full Potential
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Your personalized quit plan is ready, {userProfile.name}!
                    </p>
                </div>

                {/* Value Preview */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                        🎯 Your Personalized Results
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-emerald-50 rounded-xl">
                            <p className="text-2xl font-bold text-emerald-600">
                                ₹{dailySavings.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">Daily Savings</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-xl">
                            <p className="text-2xl font-bold text-blue-600">
                                14 Days
                            </p>
                            <p className="text-sm text-gray-600">Custom Plan</p>
                        </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl text-white">
                        <p className="text-sm opacity-90">Potential Yearly Savings</p>
                        <p className="text-3xl font-bold">₹{yearlySavings.toLocaleString()}</p>
                    </div>
                </div>

                {/* Plan Selection */}
                <div className="space-y-4 mb-6">
                    {/* Free Trial Plan */}
                    <div 
                        className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                            selectedPlan === 'free' 
                                ? 'border-emerald-500 bg-emerald-50' 
                                : 'border-gray-200 hover:border-emerald-300'
                        }`}
                        onClick={() => setSelectedPlan('free')}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Free Trial</h3>
                                <p className="text-gray-600">Get started risk-free</p>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                                {selectedPlan === 'free' && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-bold text-gray-900">Free</span>
                                <span className="text-gray-600 ml-2">for 7 days</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Then ₹399/month (₹13/day - less than a cigarette!)
                            </p>
                        </div>

                        <div className="space-y-2">
                            {[
                                'AI-powered quit plan generation',
                                'Basic progress tracking',
                                'Daily motivation tips',
                                'Simple craving counter',
                                'Basic educational content'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <Check className="w-4 h-4 text-emerald-500 mr-2" />
                                    <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div 
                        className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer relative ${
                            selectedPlan === 'premium' 
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => setSelectedPlan('premium')}
                    >
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                                ⭐ MOST POPULAR
                            </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <Crown className="w-5 h-5 text-purple-500 mr-2" />
                                    Premium Plan
                                </h3>
                                <p className="text-gray-600">🚀 3x Higher Success Rate</p>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
                                {selectedPlan === 'premium' && <div className="w-3 h-3 bg-purple-500 rounded-full" />}
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-baseline">
                                <span className="text-lg text-gray-500 line-through mr-2">₹399</span>
                                <span className="text-4xl font-bold text-gray-900">₹349</span>
                                <span className="text-gray-600 ml-2">/month</span>
                            </div>
                            <p className="text-sm text-emerald-600 font-medium mt-1">
                                💰 Save ₹600/year • Most Popular Choice
                            </p>
                            <div className="flex items-center mt-2">
                                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-medium">
                                    Best Value
                                </div>
                                <span className="text-xs text-gray-500 ml-2">vs monthly subscription</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {[
                                '✨ Everything in Free Trial',
                                '📈 Advanced progress analytics',
                                '🎯 Personalized goal setting',
                                '💪 Weekly challenges',
                                '� Premium educational content',
                                '🏆 Achievement badges',
                                '📊 Detailed smoking pattern analysis'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <Check className="w-4 h-4 text-purple-500 mr-2" />
                                    <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Success Stats */}
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white mb-6">
                    <h3 className="text-lg font-bold mb-4 text-center">Success Statistics</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold">84%</p>
                            <p className="text-xs opacity-90">Success Rate</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">50k+</p>
                            <p className="text-xs opacity-90">Lives Changed</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">4.9⭐</p>
                            <p className="text-xs opacity-90">User Rating</p>
                        </div>
                    </div>
                </div>

                {/* Single Dynamic CTA Button */}
                <div className="space-y-3">
                    <button
                        onClick={() => onComplete(selectedPlan)}
                        className={`w-full text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center ${
                            selectedPlan === 'free' 
                                ? 'bg-gradient-to-r from-emerald-500 to-blue-500' 
                                : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                    >
                        {selectedPlan === 'free' ? (
                            <>
                                Start My 7-Day Free Trial
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        ) : (
                            <>
                                Purchase Premium Plan
                                <Crown className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </button>

                    {/* Cancel/Close Button */}
                    <button
                        onClick={() => onShowDiscount ? onShowDiscount() : onCancel?.()}
                        className="w-full text-gray-600 py-3 px-6 rounded-xl font-medium hover:text-gray-800 transition-colors flex items-center justify-center"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Maybe later
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="text-center mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center">
                            <Check className="w-4 h-4 mr-1" />
                            <span>Cancel Anytime</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        No hidden fees • Cancel within 7 days for full refund
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaywallScreen;