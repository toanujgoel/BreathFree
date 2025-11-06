
import React, { useState } from 'react';
import { UserProfile, QuitPlan, ProgressData, Subscription, SubscriptionStatus } from '../types';
import { getSOSIntervention, getRelapseResponse } from '../services/geminiService';
import WeeklyPlanView from './WeeklyPlanView';
import { Shield, DollarSign, Target, Activity, Flame, CheckCircle, XCircle } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  quitPlan: QuitPlan;
  progressData: ProgressData;
  subscription: Subscription;
  setProgressData: React.Dispatch<React.SetStateAction<ProgressData | null>>;
}

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string }> = ({ icon, value, label, color }) => (
  <div className="bg-bg-card p-4 rounded-2xl shadow-sm flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-secondary">{label}</p>
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
    localStorage.setItem('breathefree_progressData', JSON.stringify(newProgress));
  };
  
  const handleCravingSmoked = async () => {
    setShowCheckInModal(false);
    await handleRelapse(true); // Call main relapse function
  };

  const handleRelapse = async (fromCravingCheckin = false) => {
    if(!fromCravingCheckin) setShowRelapseConfirm(false);
    
    const message = await getRelapseResponse(userProfile.quitMethodology);
    setRelapseMessage(message);

    const newProgress = {
        ...progressData,
        relapses: progressData.relapses + 1,
        smokeFreeStreak: 0,
    };

    setProgressData(newProgress);
    localStorage.setItem('breathefree_progressData', JSON.stringify(newProgress));

    setTimeout(() => setRelapseMessage(''), 8000);
  };

  if (!todayPlan) {
    return (
      <div className="p-4 space-y-6 pb-24">
        <header>
          <h1 className="text-2xl font-bold text-text-primary">Hello, {userProfile.name}</h1>
          <p className="text-text-secondary">You're on the {userProfile.quitMethodology} path. Keep going!</p>
        </header>
        <div className="bg-bg-card p-6 rounded-2xl shadow-sm text-center">
            <p className="text-text-secondary">Unable to load today's plan. Please check back later.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="p-4 space-y-6 pb-24">
      {showSOSModal && <SOSModal onClose={handleSOSClose} />}
      {showCheckInModal && <CheckInModal onResisted={handleCravingResisted} onSmoked={handleCravingSmoked} />}
      
      <header>
        <h1 className="text-2xl font-bold text-text-primary">Hello, {userProfile.name}</h1>
        <p className="text-text-secondary">You're on the {userProfile.quitMethodology} path. Keep going!</p>
      </header>

      {subscription.status === SubscriptionStatus.Trial && (
        <div className="bg-brand-light p-4 rounded-xl text-center">
            <p className="font-bold text-brand-dark mb-2">Unlock Premium</p>
            <p className="text-sm text-brand-dark/80">Upgrade for less than the price of a single cigarette.</p>
        </div>
      )}

      {relapseMessage && (
        <div className="bg-accent-yellow/10 border-l-4 border-accent-yellow text-accent-yellow p-4 rounded-lg" role="alert">
          <p className="font-bold">A Message From Your Coach</p>
          <p>{relapseMessage}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<Flame className="h-6 w-6 text-red-500" />} value={`${progressData.smokeFreeStreak} days`} label="Smoke-Free" color="bg-red-100" />
        <StatCard icon={<DollarSign className="h-6 w-6 text-green-500" />} value={`₹${(progressData.moneySaved).toFixed(2)}`} label="Saved" color="bg-green-100" />
        <StatCard icon={<Target className="h-6 w-6 text-blue-500" />} value={`${progressData.cravingsLogged}`} label="Cravings Beat" color="bg-blue-100" />
        <StatCard icon={<Activity className="h-6 w-6 text-purple-500" />} value={`${progressData.relapses}`} label="Setbacks" color="bg-purple-100" />
      </div>

      <div className="bg-bg-card p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Your Plan</h2>
            <div className="flex bg-gray-100 p-1 rounded-full">
                <button onClick={() => setViewMode('daily')} className={`px-3 py-1 text-sm font-semibold rounded-full ${viewMode === 'daily' ? 'bg-white shadow' : 'text-gray-500'}`}>Today</button>
                <button onClick={() => setViewMode('weekly')} className={`px-3 py-1 text-sm font-semibold rounded-full ${viewMode === 'weekly' ? 'bg-white shadow' : 'text-gray-500'}`}>Weekly</button>
            </div>
        </div>

        {viewMode === 'daily' ? (
            <>
                <div className="bg-brand-light p-4 rounded-lg">
                <p className="font-semibold text-brand-dark">{todayPlan.goal}</p>
                </div>
                <div>
                <h3 className="font-semibold text-text-secondary mb-1">Mindfulness Moment</h3>
                <p className="text-sm">{todayPlan.mindfulnessExercise}</p>
                </div>
                <div>
                <h3 className="font-semibold text-text-secondary mb-1">Coach's Nudge ({todayPlan.proactiveNudge.time})</h3>
                <p className="text-sm italic">"{todayPlan.proactiveNudge.message}"</p>
                </div>
            </>
        ) : (
            <WeeklyPlanView dailyPlans={quitPlan.dailyPlans} />
        )}
      </div>
      
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
          <button onClick={() => setShowSOSModal(true)} className="w-full bg-accent-yellow text-white font-bold py-4 rounded-full shadow-lg text-lg flex items-center justify-center transition-transform transform hover:scale-105">
              <Shield className="mr-2"/> SOS: Craving Help
          </button>
      </div>

      <div className="text-center mt-4">
        {!showRelapseConfirm ? (
            <button onClick={() => setShowRelapseConfirm(true)} className="text-sm text-text-secondary hover:text-accent-red underline">
                I had a setback
            </button>
        ) : (
            <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-700 font-semibold mb-2">Are you sure you want to log a setback?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => handleRelapse()} className="bg-accent-red text-white px-4 py-2 rounded-md font-bold">Yes, log it</button>
                    <button onClick={() => setShowRelapseConfirm(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
