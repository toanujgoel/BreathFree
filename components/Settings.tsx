import React, { useState } from 'react';
import { Subscription, SubscriptionStatus } from '../types';
import { Star, RotateCcw, ShieldAlert, FileText, Mail, Shield, RefreshCw, Lock, ChevronRight } from 'lucide-react';

interface SettingsProps {
    subscription: Subscription;
    setSubscription: (sub: Subscription) => void;
    handleReset: () => void;
    onNavigateToPolicy?: (page: 'terms' | 'privacy' | 'refund' | 'contact') => void;
}

const ConfirmationModal: React.FC<{
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
}> = ({ title, message, confirmText, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in-up">
            <h2 className="text-xl font-bold text-text-primary mb-2 text-center">{title}</h2>
            <p className="text-text-secondary text-center mb-6 whitespace-pre-wrap">{message}</p>
            <div className="flex justify-center gap-4">
                <button onClick={onCancel} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold">
                    Cancel
                </button>
                <button onClick={onConfirm} className="bg-accent-red text-white px-6 py-2 rounded-full font-bold">
                    {confirmText}
                </button>
            </div>
        </div>
    </div>
);

const Settings: React.FC<SettingsProps> = ({ subscription, setSubscription, handleReset, onNavigateToPolicy }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalConfig, setConfirmModalConfig] = useState<{
        title: string;
        message: string;
        confirmText: string;
        onConfirm: () => void;
    } | null>(null);

    const handleUpgrade = () => {
        setSubscription({ status: SubscriptionStatus.Premium });
    };

    const handleCancel = () => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 20); // Dummy end date
        setConfirmModalConfig({
            title: "Cancel Premium Subscription?",
            message: `You will retain access to premium features until the end of your current billing period on ${endDate.toLocaleDateString()}.\n\nAre you sure you want to cancel?`,
            confirmText: 'Confirm',
            onConfirm: () => {
                setSubscription({ status: SubscriptionStatus.Free });
                setShowConfirmModal(false);
            }
        });
        setShowConfirmModal(true);
    };
    
    const onReset = () => {
        setConfirmModalConfig({
            title: "Are you sure?",
            message: "This will permanently delete your current progress, including logs and achievements, and take you back to the beginning to select a new quitting method. This action cannot be undone.",
            confirmText: 'Reset Progress',
            onConfirm: () => {
                handleReset();
                setShowConfirmModal(false);
            }
        });
        setShowConfirmModal(true);
    }

    const getSubscriptionPill = () => {
        switch(subscription.status) {
            case SubscriptionStatus.Premium:
                return <span className="bg-accent-yellow text-white px-3 py-1 text-xs font-bold rounded-full">PREMIUM</span>;
            case SubscriptionStatus.Trial:
                const endDate = new Date(subscription.endDate!);
                const now = new Date();
                const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
                return <span className="bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-full">TRIAL ({daysLeft > 0 ? `${daysLeft} days left` : 'Expired'})</span>
            case SubscriptionStatus.Free:
                 return <span className="bg-gray-500 text-white px-3 py-1 text-xs font-bold rounded-full">FREE</span>;
        }
    }

    return (
        <div className="p-4 space-y-8 pb-24">
            {showConfirmModal && confirmModalConfig && (
                <ConfirmationModal 
                    {...confirmModalConfig}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
            <header>
                <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
                <p className="text-text-secondary">Manage your journey and subscription.</p>
            </header>

            <div className="bg-bg-card p-4 rounded-2xl shadow-sm">
                <h2 className="font-bold mb-4 text-lg">Subscription</h2>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-text-secondary">Current Plan</span>
                    {getSubscriptionPill()}
                </div>
                {subscription.status !== SubscriptionStatus.Premium ? (
                     <button onClick={handleUpgrade} className="w-full bg-brand-primary text-white font-bold py-3 rounded-full flex items-center justify-center gap-2">
                        <Star size={18} /> Unlock Premium (₹15/week)
                    </button>
                ) : (
                    <button onClick={handleCancel} className="w-full bg-white text-accent-red border border-accent-red font-bold py-3 rounded-full hover:bg-red-50 transition-colors">
                        Cancel Subscription
                    </button>
                )}
            </div>

            {/* Legal & Support Section */}
            <div className="bg-bg-card p-4 rounded-2xl shadow-sm">
                <h2 className="font-bold mb-4 text-lg">Legal & Support</h2>
                <div className="space-y-2">
                    <button 
                        onClick={() => onNavigateToPolicy?.('contact')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <Mail className="w-5 h-5 text-blue-500 mr-3" />
                            <span className="text-text-primary">Contact Us</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button 
                        onClick={() => onNavigateToPolicy?.('terms')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 text-blue-500 mr-3" />
                            <span className="text-text-primary">Terms & Conditions</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button 
                        onClick={() => onNavigateToPolicy?.('privacy')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <Lock className="w-5 h-5 text-blue-500 mr-3" />
                            <span className="text-text-primary">Privacy Policy</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button 
                        onClick={() => onNavigateToPolicy?.('refund')}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center">
                            <RefreshCw className="w-5 h-5 text-blue-500 mr-3" />
                            <span className="text-text-primary">Refund & Cancellation Policy</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

             <div className="bg-bg-card p-4 rounded-2xl shadow-sm">
                <h2 className="font-bold mb-4 text-lg text-accent-red flex items-center"><ShieldAlert size={20} className="mr-2"/> Danger Zone</h2>
                 <button onClick={onReset} className="w-full bg-accent-red text-white font-bold py-3 rounded-full flex items-center justify-center gap-2">
                    <RotateCcw size={18} /> Reset and Start a New Challenge
                </button>
                <p className="text-xs text-text-secondary mt-2 text-center">This action cannot be undone.</p>
            </div>

            {/* App Version */}
            <div className="text-center text-xs text-gray-500">
                <p>CleverQuit v1.0.0</p>
                <p className="mt-1">© 2025 Anuj Goel. All rights reserved.</p>
            </div>

        </div>
    );
};

export default Settings;