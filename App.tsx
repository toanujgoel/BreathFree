import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ProgressTracker from './components/ProgressTracker';
import ContentHub from './components/ContentHub';
import ChatBot from './components/ChatBot';
import Settings from './components/Settings';
import { AppView, OnboardingProfile, QuitPlan, ProgressData, Subscription, SubscriptionStatus } from './types';
import { Feather, BookOpen, MessageSquare, BarChart2, Settings as SettingsIcon } from 'lucide-react';

// Main authenticated app component
const AuthenticatedApp: React.FC = () => {
  const { user, profile, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>(AppView.Dashboard);
  const [quitPlan, setQuitPlan] = useState<QuitPlan | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [subscription, setSubscription] = useState<Subscription>({
    status: SubscriptionStatus.Trial,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });

  const handleOnboardingComplete = (onboardingProfile: OnboardingProfile, plan: QuitPlan) => {
    const initialProgress: ProgressData = {
      smokeFreeStreak: 0,
      moneySaved: 0,
      cravingsLogged: 0,
      relapses: 0,
      dailyCigarettes: onboardingProfile.quitMethodology === 'Tapering' 
        ? Array(plan.dailyPlans.length).fill(onboardingProfile.smokingProfile.cigsPerDay) 
        : [],
    };

    setQuitPlan(plan);
    setProgressData(initialProgress);
  };

  const handleReset = async () => {
    await signOut();
    setQuitPlan(null);
    setProgressData(null);
    setCurrentView(AppView.Dashboard);
  };

  const handleSetSubscription = (sub: Subscription) => {
    setSubscription(sub);
  };

  const renderView = () => {
    if (!profile || !quitPlan || !progressData) return null;

    switch (currentView) {
      case AppView.Dashboard:
        return <Dashboard userProfile={profile} quitPlan={quitPlan} progressData={progressData} setProgressData={setProgressData} subscription={subscription} />;
      case AppView.Progress:
        return <ProgressTracker userProfile={profile} quitPlan={quitPlan} progressData={progressData} />;
      case AppView.Content:
        return <ContentHub userProfile={profile} />;
      case AppView.Chat:
        return <ChatBot />;
      case AppView.Settings:
        return <Settings subscription={subscription} setSubscription={handleSetSubscription} handleReset={handleReset} />;
      default:
        return <Dashboard userProfile={profile} quitPlan={quitPlan} progressData={progressData} setProgressData={setProgressData} subscription={subscription} />;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your quit smoking journey...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <AuthScreen />;
  }

  // Show onboarding if profile is incomplete or no quit plan
  if (!profile || !quitPlan || !progressData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // Main app with navigation
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Feather className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">CleverQuit</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600 mr-4">Welcome, {profile.name}</span>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-4">
            <ul className="space-y-2">
              {[
                { view: AppView.Dashboard, icon: BarChart2, label: 'Dashboard' },
                { view: AppView.Progress, icon: BarChart2, label: 'Progress' },
                { view: AppView.Content, icon: BookOpen, label: 'Content Hub' },
                { view: AppView.Chat, icon: MessageSquare, label: 'AI Coach' },
                { view: AppView.Settings, icon: SettingsIcon, label: 'Settings' },
              ].map(({ view, icon: Icon, label }) => (
                <li key={view}>
                  <button
                    onClick={() => setCurrentView(view)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      currentView === view
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

// Root App component with AuthProvider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default App;