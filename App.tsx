
import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ProgressTracker from './components/ProgressTracker';
import ContentHub from './components/ContentHub';
import ChatBot from './components/ChatBot';
import Settings from './components/Settings';
import { AppView, UserProfile, QuitPlan, ProgressData, Subscription, SubscriptionStatus } from './types';
import { Feather, BookOpen, MessageSquare, BarChart2, Settings as SettingsIcon } from 'lucide-react';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [quitPlan, setQuitPlan] = useState<QuitPlan | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.Dashboard);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('breathefree_userProfile');
      const storedPlan = localStorage.getItem('breathefree_quitPlan');
      const storedProgress = localStorage.getItem('breathefree_progressData');
      const storedSubscription = localStorage.getItem('breathefree_subscription');
      
      if (storedProfile && storedPlan && storedProgress && storedSubscription) {
        setUserProfile(JSON.parse(storedProfile));
        setQuitPlan(JSON.parse(storedPlan));
        setProgressData(JSON.parse(storedProgress));
        setSubscription(JSON.parse(storedSubscription));
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
      handleReset();
    }
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile, plan: QuitPlan) => {
    const initialProgress: ProgressData = {
      smokeFreeStreak: 0,
      moneySaved: 0,
      cravingsLogged: 0,
      relapses: 0,
      dailyCigarettes: profile.quitMethodology === 'Tapering' ? Array(plan.dailyPlans.length).fill(profile.smokingProfile.cigsPerDay) : [],
    };
    
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);
    const initialSubscription: Subscription = {
        status: SubscriptionStatus.Trial,
        endDate: trialEndDate.toISOString(),
    };

    setUserProfile(profile);
    setQuitPlan(plan);
    setProgressData(initialProgress);
    setSubscription(initialSubscription);

    localStorage.setItem('breathefree_userProfile', JSON.stringify(profile));
    localStorage.setItem('breathefree_quitPlan', JSON.stringify(plan));
    localStorage.setItem('breathefree_progressData', JSON.stringify(initialProgress));
    localStorage.setItem('breathefree_subscription', JSON.stringify(initialSubscription));
  };
  
  const handleReset = () => {
    localStorage.removeItem('breathefree_userProfile');
    localStorage.removeItem('breathefree_quitPlan');
    localStorage.removeItem('breathefree_progressData');
    localStorage.removeItem('breathefree_subscription');
    setUserProfile(null);
    setQuitPlan(null);
    setProgressData(null);
    setSubscription(null);
    setCurrentView(AppView.Dashboard);
  };

  const handleSetSubscription = (sub: Subscription) => {
    setSubscription(sub);
    localStorage.setItem('breathefree_subscription', JSON.stringify(sub));
  }

  const renderView = () => {
    if (!userProfile || !quitPlan || !progressData || !subscription) return null;

    switch (currentView) {
      case AppView.Dashboard:
        return <Dashboard userProfile={userProfile} quitPlan={quitPlan} progressData={progressData} setProgressData={setProgressData} subscription={subscription} />;
      case AppView.Progress:
        return <ProgressTracker userProfile={userProfile} quitPlan={quitPlan} progressData={progressData} />;
      case AppView.Content:
        return <ContentHub userProfile={userProfile} />;
      case AppView.Chat:
        return <ChatBot />;
      case AppView.Settings:
        return <Settings subscription={subscription} setSubscription={handleSetSubscription} handleReset={handleReset} />;
      default:
        return <Dashboard userProfile={userProfile} quitPlan={quitPlan} progressData={progressData} setProgressData={setProgressData} subscription={subscription} />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg-main">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!userProfile) {
    return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
  }

  const navItems = [
    { view: AppView.Dashboard, label: 'Home', icon: Feather },
    { view: AppView.Progress, label: 'Progress', icon: BarChart2 },
    { view: AppView.Content, label: 'Discover', icon: BookOpen },
    { view: AppView.Chat, label: 'Coach', icon: MessageSquare },
    { view: AppView.Settings, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-bg-main font-sans text-text-primary flex flex-col justify-between" style={{ paddingBottom: '80px' }}>
      <main className="flex-grow">
        {renderView()}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <nav className="flex justify-around items-center h-20 max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                  currentView === item.view ? 'text-brand-primary' : 'text-text-secondary hover:text-brand-primary'
                }`}
              >
                <Icon size={24} strokeWidth={currentView === item.view ? 2.5 : 2} />
                <span className={`text-xs mt-1 font-medium ${currentView === item.view ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
};

export default App;
