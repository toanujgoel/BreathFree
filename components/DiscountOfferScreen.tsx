import React, { useState, useEffect } from 'react';
import { OnboardingProfile } from '../types';
import { Crown, Star, Check, X, Timer, ArrowRight } from 'lucide-react';

interface DiscountOfferScreenProps {
    userProfile: OnboardingProfile;
    onAcceptDiscount: () => void;
    onDecline: () => void;
}

const DiscountOfferScreen: React.FC<DiscountOfferScreenProps> = ({
    userProfile,
    onAcceptDiscount,
    onDecline
}) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate savings
    const dailyCigaretteCost = 15;
    const dailySavings = (userProfile.smokingProfile?.cigsPerDay || 10) * dailyCigaretteCost;
    const yearlySavings = dailySavings * 365;

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
            <div className="max-w-md mx-auto">
                {/* Header with urgency */}
                <div className="text-center mb-6">
                    <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-flex items-center mb-4">
                        <Timer className="w-4 h-4 mr-2" />
                        <span className="font-bold">Limited Time: {formatTime(timeLeft)}</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🔥 WAIT! Special Offer
                    </h1>
                    <p className="text-lg text-gray-600">
                        Don't miss this exclusive 76% discount
                    </p>
                </div>

                {/* Discount Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border-4 border-gradient-to-r from-red-500 to-orange-500">
                    <div className="text-center mb-6">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full inline-block mb-4">
                            <span className="text-2xl font-bold">76% OFF</span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            CleverQuit Premium - Yearly Plan
                        </h2>

                        {/* Pricing */}
                        <div className="mb-6">
                            <div className="flex items-center justify-center mb-2">
                                <span className="text-2xl text-gray-500 line-through mr-3">₹4,188</span>
                                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">Regular Price</span>
                            </div>
                            <div className="flex items-center justify-center mb-2">
                                <span className="text-5xl font-bold text-gradient bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">₹999</span>
                                <span className="text-xl text-gray-600 ml-2">/year</span>
                            </div>
                            <div className="flex items-center justify-center mb-2">
                                <span className="text-sm bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold">
                                    76% OFF
                                </span>
                            </div>
                            <p className="text-sm text-green-600 font-bold">
                                That's just ₹2.74/day - Less than a single cigarette!
                            </p>
                        </div>

                        {/* Savings Highlight */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl mb-6">
                            <p className="text-sm opacity-90">With your smoking habit, you'll save</p>
                            <p className="text-3xl font-bold">₹{(yearlySavings - 999).toLocaleString()}</p>
                            <p className="text-sm opacity-90">in your first year alone!</p>
                        </div>

                        {/* Features */}
                        <div className="text-left space-y-3 mb-6">
                            <h3 className="font-bold text-gray-900 text-center mb-4">Everything You Get:</h3>
                            {[
                                'AI-powered personalized quit plan',
                                'Advanced progress tracking & analytics',
                                'Daily motivation & support',
                                'Craving management techniques',
                                'Premium educational content',
                                'Achievement system & rewards',
                                'Detailed smoking pattern analysis',
                                'Priority customer support',
                                '12 months of unlimited access'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Success Stats */}
                        <div className="bg-gray-50 p-4 rounded-xl mb-6">
                            <h4 className="font-bold text-gray-900 mb-3 text-center">Proven Results</h4>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">92%</p>
                                    <p className="text-xs text-gray-600">Success Rate</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-green-600">50k+</p>
                                    <p className="text-xs text-gray-600">Lives Changed</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-purple-600">4.9⭐</p>
                                    <p className="text-xs text-gray-600">User Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={onAcceptDiscount}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    >
                        <Crown className="w-5 h-5 mr-2" />
                        Get 76% OFF - Only ₹999/year
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>

                    <button
                        onClick={onDecline}
                        className="w-full text-gray-600 py-3 px-6 rounded-xl font-medium hover:text-gray-800 transition-colors flex items-center justify-center"
                    >
                        <X className="w-4 h-4 mr-2" />
                        No thanks, I'll quit on my own
                    </button>
                </div>

                {/* Trust Indicators */}
                <div className="text-center mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Check className="w-4 h-4 mr-1 text-green-500" />
                            <span>100% Money Back Guarantee</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">
                        Cancel anytime • Secure payment • No hidden fees
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DiscountOfferScreen;