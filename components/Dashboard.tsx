
import React, { useState } from 'react';
import { UserProfile, QuitPlan, ProgressData, Subscription, SubscriptionStatus } from '../types';
import { getSOSIntervention, getRelapseResponse } from '../services/geminiService';
import WeeklyPlanView from './WeeklyPlanView';
import LoadingWithQuotes from './LoadingWithQuotes';
import { Shield, DollarSign, Target, Activity, Flame, CheckCircle, XCircle } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  quitPlan: QuitPlan;
  progressData: ProgressData;
  subscription: Subscription;
  setProgressData: React.Dispatch<React.SetStateAction<ProgressData | null>>;
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string }> = ({ icon, value, label, color }) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg sm:text-xl font-bold text-gray-900 truncate">{value}</p>
        <p className="text-xs sm:text-sm text-gray-600 truncate">{label}</p>
      </div>
    </div>
  </div>
);

const SOSModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [intervention, setIntervention] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchIntervention = async () => {
      setIsLoading(true);
      const text = await getSOSIntervention();
      setIntervention(text);
      setIsLoading(false);
    };
    fetchIntervention();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in-up">
        <h2 className="text-2xl font-bold text-brand-primary mb-4 text-center">Craving Alert!</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <p className="text-text-primary text-center mb-6">{intervention}</p>
        )}
        <button
          onClick={onClose}
          className="w-full bg-brand-primary text-white font-bold py-3 rounded-full transition-transform transform hover:scale-105"
        >
          I Can Do This
        </button>
      </div>
    </div>
  );
};

const CheckInModal: React.FC<{ onResisted: () => void; onSmoked: () => void; }> = ({ onResisted, onSmoked }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in-up">
                <h2 className="text-xl font-bold text-text-primary mb-2 text-center">Checking In</h2>
                <p className="text-text-secondary text-center mb-6">How did the craving go?</p>
                <div className="flex flex-col space-y-3">
                     <button onClick={onResisted} className="w-full bg-brand-primary text-white font-bold py-3 rounded-full flex items-center justify-center gap-2">
                        <CheckCircle size={20} /> I Resisted
                    </button>
                    <button onClick={onSmoked} className="w-full bg-accent-red text-white font-bold py-3 rounded-full flex items-center justify-center gap-2">
                        <XCircle size={20} /> I Smoked
                    </button>
                </div>
            </div>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ userProfile, quitPlan, progressData, subscription, setProgressData }) => {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showRelapseConfirm, setShowRelapseConfirm] = useState(false);
  const [relapseMessage, setRelapseMessage] = useState('');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [isLoggingRelapse, setIsLoggingRelapse] = useState(false);

  const todayIndex = new Date().getDay() % 7;
  const todayPlan = quitPlan.dailyPlans?.[todayIndex];

  const handleSOSClose = () => {
      setShowSOSModal(false);
      // Simulate a 15 minute delay with 15 seconds for demo purposes
      setTimeout(() => {
          setShowCheckInModal(true);
      }, 15000);
  };
  
  const handleCravingResisted = () => {
    setShowCheckInModal(false);
    const newProgress = { ...progressData, cravingsLogged: progressData.cravingsLogged + 1 };
    setProgressData(newProgress);
    localStorage.setItem('cleverquit_progressData', JSON.stringify(newProgress));
  };
  
  const handleCravingSmoked = async () => {
    setShowCheckInModal(false);
    await handleRelapse(true); // Call main relapse function
  };

  const handleRelapse = async (fromCravingCheckin = false) => {
    if (isLoggingRelapse) return; // Prevent multiple clicks
    
    setIsLoggingRelapse(true);
    if(!fromCravingCheckin) setShowRelapseConfirm(false);
    
    try {
      const message = await getRelapseResponse(userProfile.quitMethodology);
      setRelapseMessage(message);

      const newProgress = {
          ...progressData,
          relapses: progressData.relapses + 1,
          smokeFreeStreak: 0,
      };

      setProgressData(newProgress);
      localStorage.setItem('cleverquit_progressData', JSON.stringify(newProgress));

      // Message will stay until user manually dismisses it
    } finally {
      setIsLoggingRelapse(false);
    }
  };

  if (!todayPlan) {
    return <LoadingWithQuotes message="Loading your personalized plan..." />;
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {showSOSModal && <SOSModal onClose={handleSOSClose} />}
      {showCheckInModal && <CheckInModal onResisted={handleCravingResisted} onSmoked={handleCravingSmoked} />}
      
      <div className="px-3 sm:px-4 py-4 space-y-4 sm:space-y-6 pb-20 sm:pb-24">
        {/* Header */}
        <header>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Hello, {userProfile.name}</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">You're on the {quitPlan.methodology} path. Keep going!</p>
        </header>

        {/* Premium upsell - mobile optimized */}
        {subscription.status === SubscriptionStatus.Trial && (
          <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded-xl text-center">
              <p className="font-bold text-blue-900 text-sm sm:text-base mb-1">Unlock Premium</p>
              <p className="text-xs sm:text-sm text-blue-700">Upgrade for less than the price of a single cigarette.</p>
          </div>
        )}

        {/* Relapse message - mobile optimized */}
        {relapseMessage && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-lg relative" role="alert">
            <button
              onClick={() => setRelapseMessage('')}
              className="absolute top-2 right-2 text-yellow-600 hover:text-yellow-800 p-1"
              aria-label="Dismiss message"
            >
              <XCircle className="h-5 w-5" />
            </button>
            <p className="font-bold text-yellow-800 text-sm sm:text-base pr-8">A Message From Your Coach</p>
            <p className="text-sm sm:text-base text-yellow-700 mt-1 pr-8">{relapseMessage}</p>
            <p className="text-xs text-yellow-600 mt-2 italic">Click the × to dismiss this message</p>
          </div>
        )}
        
        {/* Stats Grid - Mobile First */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <StatCard 
            icon={<Flame className="h-4 w-4 sm:h-6 sm:w-6 text-red-500" />} 
            value={`${progressData.smokeFreeStreak}`} 
            label="Days Smoke-Free" 
            color="bg-red-100" 
          />
          <StatCard 
            icon={<DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />} 
            value={`₹${(progressData.moneySaved).toFixed(0)}`} 
            label="Money Saved" 
            color="bg-green-100" 
          />
          <StatCard 
            icon={<Target className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />} 
            value={`${progressData.cravingsLogged}`} 
            label="Cravings Beat" 
            color="bg-blue-100" 
          />
          <StatCard 
            icon={<Activity className="h-4 w-4 sm:h-6 sm:w-6 text-purple-500" />} 
            value={`${progressData.relapses}`} 
            label="Setbacks" 
            color="bg-purple-100" 
          />
        </div>

        {/* Plan Section - Mobile optimized */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Plan</h2>
              <div className="flex bg-gray-100 p-1 rounded-full self-start sm:self-auto">
                  <button 
                    onClick={() => setViewMode('daily')} 
                    className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
                      viewMode === 'daily' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    Today
                  </button>
                  <button 
                    onClick={() => setViewMode('weekly')} 
                    className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-colors ${
                      viewMode === 'weekly' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    Weekly
                  </button>
              </div>
          </div>

          {viewMode === 'daily' ? (
              <div className="space-y-3 sm:space-y-4">
                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <p className="font-semibold text-blue-900 text-sm sm:text-base">{todayPlan.goal}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">Mindfulness Moment</h3>
                    <p className="text-sm text-gray-600">{todayPlan.mindfulnessExercise}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">Coach's Nudge ({todayPlan.proactiveNudge.time})</h3>
                    <p className="text-sm text-gray-600 italic">"{todayPlan.proactiveNudge.message}"</p>
                  </div>
              </div>
          ) : (
              <WeeklyPlanView dailyPlans={quitPlan.dailyPlans} />
          )}
        </div>

        {/* Setback Button - Mobile optimized */}
        <div className="text-center">
          {!showRelapseConfirm ? (
              <button 
                onClick={() => setShowRelapseConfirm(true)} 
                className="text-sm text-gray-500 hover:text-red-600 underline transition-colors"
              >
                  I had a setback
              </button>
          ) : (
              <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
                  <p className="text-red-700 font-semibold mb-3 text-sm sm:text-base">Are you sure you want to log a setback?</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                      <button 
                        onClick={() => handleRelapse()} 
                        disabled={isLoggingRelapse}
                        className="bg-red-500 text-white px-4 py-2 rounded-md font-bold text-sm sm:text-base hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingRelapse ? 'Logging...' : 'Yes, log it'}
                      </button>
                      <button 
                        onClick={() => setShowRelapseConfirm(false)} 
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm sm:text-base hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                  </div>
              </div>
          )}
        </div>
      </div>
      
      {/* Fixed SOS Button - Mobile optimized */}
      <div className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xs z-50">
          <button 
            onClick={() => setShowSOSModal(true)} 
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 md:py-4 rounded-full shadow-lg text-base md:text-lg flex items-center justify-center transition-all transform hover:scale-105"
          >
              <Shield className="mr-2 h-5 w-5 md:h-6 md:w-6"/> SOS: Craving Help
          </button>
      </div>
    </div>
  );
};

export default Dashboard;
