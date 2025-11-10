import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { AuthScreen } from './components/AuthScreen';
import Onboarding from './components/Onboarding';
import ValueFirstOnboarding from './components/ValueFirstOnboarding';
import PaywallScreen from './components/PaywallScreen';
import DiscountOfferScreen from './components/DiscountOfferScreen';
import Dashboard from './components/Dashboard';
import ProgressTracker from './components/ProgressTracker';
import ContentHub from './components/ContentHub';
import ChatBot from './components/ChatBot';
import Settings from './components/Settings';
import LoadingWithQuotes from './components/LoadingWithQuotes';
import { AppView, OnboardingProfile, QuitPlan, ProgressData, Subscription, SubscriptionStatus, Methodology } from './types';
import { Feather, BookOpen, MessageSquare, BarChart2, Settings as SettingsIcon } from 'lucide-react';

// Define onboarding flow states
enum OnboardingFlow {
  ValueFirst = 'value-first',
  Paywall = 'paywall',
  Discount = 'discount',
  Auth = 'auth',
  Profile = 'profile',
  Complete = 'complete'
}

// Main authenticated app component
const AuthenticatedApp: React.FC = () => {
  const { user, profile, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>(AppView.Dashboard);
  const [quitPlan, setQuitPlan] = useState<QuitPlan | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [onboardingFlow, setOnboardingFlow] = useState<OnboardingFlow | null>(null);
  const [collectedProfile, setCollectedProfile] = useState<OnboardingProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription>({
    status: SubscriptionStatus.Trial,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize app state based on user authentication status
  React.useEffect(() => {
    if (!loading && !isInitialized) {
      setIsInitialized(true);
      console.log('App initialized - User:', !!user, 'Profile:', !!profile, 'QuitPlan:', !!quitPlan, 'ProgressData:', !!progressData);
      
      // Set onboarding flow based on authentication status
      if (user && profile) {
        // Existing authenticated users should skip onboarding
        console.log('Existing user detected - skipping onboarding');
        setOnboardingFlow(null);
        
        // For existing users, immediately prepare dashboard data if needed
        if (!quitPlan && !progressData) {
          console.log('Existing user needs data setup');
          // This will trigger the loadUserData effect
        }
      } else {
        // New users start with value-first onboarding
        console.log('New user detected - starting onboarding');
        setOnboardingFlow(OnboardingFlow.ValueFirst);
      }
    }
  }, [loading, user, profile, isInitialized, quitPlan, progressData]);

  // Helper function to create quit plan from onboarding profile
  const createQuitPlan = (onboardingProfile: OnboardingProfile): QuitPlan => {
    return {
      methodology: onboardingProfile.quitMethodology,
      dailyPlans: [
        {
          day: 1,
          goal: 'Stay smoke-free for your first day',
          mindfulnessExercise: 'Take 5 deep breaths when you feel a craving',
          proactiveNudge: {
            time: '09:00',
            message: 'Great job starting your smoke-free journey! Remember why you quit.'
          }
        },
        {
          day: 2,
          goal: 'Continue building your smoke-free habit',
          mindfulnessExercise: 'Practice mindful breathing for 2 minutes',
          proactiveNudge: {
            time: '10:00',
            message: 'Day 2! You\'re already building momentum. Stay strong!'
          }
        },
        {
          day: 3,
          goal: 'Focus on your why - remember your motivation',
          mindfulnessExercise: 'Reflect on your reasons for quitting',
          proactiveNudge: {
            time: '11:00',
            message: 'Day 3! The hardest part is behind you. Keep going!'
          }
        },
        {
          day: 4,
          goal: 'Replace smoking breaks with healthy activities',
          mindfulnessExercise: 'Try a 5-minute walk when you feel triggered',
          proactiveNudge: {
            time: '09:30',
            message: 'Day 4! You\'re doing amazing. Your body is already healing.'
          }
        },
        {
          day: 5,
          goal: 'Celebrate your progress and stay committed',
          mindfulnessExercise: 'Practice gratitude for your smoke-free days',
          proactiveNudge: {
            time: '08:30',
            message: 'Day 5! You\'ve made it through the work week smoke-free!'
          }
        },
        {
          day: 6,
          goal: 'Enjoy social activities without smoking',
          mindfulnessExercise: 'Use deep breathing in social situations',
          proactiveNudge: {
            time: '12:00',
            message: 'Weekend day 1! You can enjoy yourself without smoking.'
          }
        },
        {
          day: 7,
          goal: 'Complete your first smoke-free week!',
          mindfulnessExercise: 'Celebrate your achievement mindfully',
          proactiveNudge: {
            time: '10:00',
            message: 'Day 7! You\'ve completed a full week! You\'re a non-smoker now!'
          }
        }
      ]
    };
  };

  // Function to load user data for existing users
  const loadUserData = React.useCallback(() => {
    if (user && profile && !quitPlan && !progressData && !dataLoading) {
      console.log('Loading data for existing user:', profile.name);
      setDataLoading(true);
      
      // Create a default onboarding profile for existing users
      const defaultOnboardingProfile: OnboardingProfile = {
        name: profile.name || 'User',
        smokingProfile: {
          cigsPerDay: profile.cigarettes_per_day || 10,
          yearsSmoking: profile.years_smoking || 1,
          motivation: profile.motivation || 'Health concerns',
          motivations: [profile.motivation || 'Health concerns']
        },
        biometrics: {
          age: profile.age || 30,
          height: 170,
          weight: 70,
          activityLevel: 'Moderately Active'
        },
        triggers: { contextual: [], emotional: [], location: [], social: [] },
        positiveGoals: { activities: [], content: [] },
        replacementHabits: [],
        quitMethodology: Methodology.ColdTurkey
      };

      // Create full quit plan using the same logic as onboarding
      const fullQuitPlan = createQuitPlan(defaultOnboardingProfile);

      const defaultProgressData: ProgressData = {
        smokeFreeStreak: Math.max(0, Math.floor((Date.now() - new Date(profile.quit_date || Date.now()).getTime()) / (1000 * 60 * 60 * 24))),
        moneySaved: 0,
        cravingsLogged: 0,
        relapses: 0,
        dailyCigarettes: [],
      };

      setQuitPlan(fullQuitPlan);
      setProgressData(defaultProgressData);
      setDataLoading(false);
      console.log('User data loaded successfully');
    }
  }, [user, profile, quitPlan, progressData, dataLoading]);

  // Load user data when authenticated
  React.useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Emergency fallback for old accounts - force data creation after timeout
  React.useEffect(() => {
    if (user && profile && !quitPlan && !progressData && !loading && !dataLoading && isInitialized) {
      console.log('Emergency fallback triggered for old account');
      const timer = setTimeout(() => {
        console.log('Force creating data for old account');
        loadUserData();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, profile, quitPlan, progressData, loading, dataLoading, isInitialized, loadUserData]);

  // Handle Auth to Profile transition automatically
  React.useEffect(() => {
    if (onboardingFlow === OnboardingFlow.Auth && user && !profile && collectedProfile) {
      setOnboardingFlow(OnboardingFlow.Profile);
    }
    
    // If user has profile but no quit plan, create it from collected data
    if (onboardingFlow === OnboardingFlow.Profile && user && profile && collectedProfile && !quitPlan) {
      handleOnboardingComplete(collectedProfile, createQuitPlan(collectedProfile));
    }
  }, [onboardingFlow, user, profile, collectedProfile, quitPlan]);



  // Handle value-first onboarding completion
  const handleValueFirstComplete = (onboardingProfile: OnboardingProfile) => {
    setCollectedProfile(onboardingProfile);
    setOnboardingFlow(OnboardingFlow.Paywall);
  };

  // Handle paywall completion
  const handlePaywallComplete = async (selectedPlan: 'free' | 'premium') => {
    
    // Set subscription based on selected plan
    if (selectedPlan === 'premium') {
      setSubscription({
        status: SubscriptionStatus.Premium,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      });
    } else if (selectedPlan === 'free') {
      setSubscription({
        status: SubscriptionStatus.Trial,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days trial
      });
    }
    
    // If user is already logged in with profile, skip onboarding entirely
    if (user && profile && collectedProfile) {
      const quitPlan = createQuitPlan(collectedProfile);
      handleOnboardingComplete(collectedProfile, quitPlan);
      return;
    }
    
    // If user is logged in but no profile, go to auth screen to create profile
    if (user && !profile && collectedProfile) {
      setOnboardingFlow(OnboardingFlow.Auth);
      return;
    }
    
    // If no user, need to authenticate first
    if (!user) {
      setOnboardingFlow(OnboardingFlow.Auth);
    }
  };

  // Handle showing discount offer
  const handleShowDiscount = () => {
    setOnboardingFlow(OnboardingFlow.Discount);
  };

  // Handle discount acceptance
  const handleDiscountAccept = () => {
    setSubscription({
      status: SubscriptionStatus.Premium,
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
    });
    setOnboardingFlow(OnboardingFlow.Auth);
  };

  // Handle discount decline (go back to welcome)
  const handleDiscountDecline = () => {
    setOnboardingFlow(OnboardingFlow.ValueFirst);
    setCollectedProfile(null);
  };

  // Handle authentication completion
  const handleAuthComplete = () => {
    setOnboardingFlow(OnboardingFlow.Profile);
  };

  // Handle final onboarding completion (create quit plan)
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
    setOnboardingFlow(OnboardingFlow.Complete);
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

  // Show loading state during initial auth check or data loading
  if (loading || dataLoading) {
    return (
      <LoadingWithQuotes 
        message={loading ? 'Loading CleverQuit...' : 'Setting up your dashboard...'} 
      />
    );
  }

  // If user is authenticated and has profile, prioritize dashboard over onboarding
  // This ensures existing users don't get sent to onboarding on page refresh
  if (user && profile) {
    console.log('Authenticated user with profile detected - QuitPlan:', !!quitPlan, 'ProgressData:', !!progressData);
    
    // If we have complete data, show dashboard
    if (quitPlan && progressData) {
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

          <div className="flex flex-col md:flex-row">
            {/* Mobile Navigation */}
            <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-40">
              <div className="flex justify-around py-2">
                {[
                  { view: AppView.Dashboard, icon: BarChart2, label: 'Dashboard' },
                  { view: AppView.Progress, icon: BarChart2, label: 'Progress' },
                  { view: AppView.Content, icon: BookOpen, label: 'Content' },
                  { view: AppView.Chat, icon: MessageSquare, label: 'AI Coach' },
                  { view: AppView.Settings, icon: SettingsIcon, label: 'Settings' },
                ].map(({ view, icon: Icon, label }) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    className={`flex flex-col items-center px-2 py-1 rounded-lg transition-colors ${
                      currentView === view
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Desktop Sidebar Navigation */}
            <nav className="hidden md:block w-64 bg-white shadow-sm h-screen sticky top-0">
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
            <main className="flex-1 md:p-8 pb-16 md:pb-8">
              {renderView()}
            </main>
          </div>
        </div>
      );
    }
    
    // If user + profile but no quit plan, show loading while we create the data
    return <LoadingWithQuotes message="Setting up your dashboard..." />;
  }



  // Debug info for troubleshooting (remove after testing)
  console.log('Render decision - User:', !!user, 'Profile:', !!profile, 'QuitPlan:', !!quitPlan, 'ProgressData:', !!progressData, 'Loading:', loading, 'DataLoading:', dataLoading);

  // For new users without authentication, start onboarding flow
  // This handles the complete onboarding -> auth -> dashboard flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Onboarding flow components will be rendered here */}
      {onboardingFlow === OnboardingFlow.ValueFirst && (
        <ValueFirstOnboarding onComplete={handleValueFirstComplete} />
      )}
      
      {onboardingFlow === OnboardingFlow.Paywall && collectedProfile && (
        <PaywallScreen 
          userProfile={collectedProfile} 
          onComplete={handlePaywallComplete}
          onShowDiscount={handleShowDiscount}
          onCancel={handleDiscountDecline}
        />
      )}
      
      {onboardingFlow === OnboardingFlow.Discount && collectedProfile && (
        <DiscountOfferScreen
          userProfile={collectedProfile}
          onAcceptDiscount={handleDiscountAccept}
          onDecline={handleDiscountDecline}
        />
      )}
      
      {onboardingFlow === OnboardingFlow.Auth && !user && (
        <AuthScreen onComplete={handleAuthComplete} />
      )}
      
      {onboardingFlow === OnboardingFlow.Profile && user && collectedProfile && (
        <Onboarding 
          onComplete={handleOnboardingComplete} 
          initialProfile={collectedProfile} 
        />
      )}
      
      {/* Show message when no component matches */}
      {onboardingFlow && 
       onboardingFlow !== OnboardingFlow.ValueFirst && 
       !(onboardingFlow === OnboardingFlow.Paywall && collectedProfile) &&
       !(onboardingFlow === OnboardingFlow.Discount && collectedProfile) &&
       !(onboardingFlow === OnboardingFlow.Auth && !user) &&
       !(onboardingFlow === OnboardingFlow.Profile && user && collectedProfile) && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Debug Info</h2>
            <p className="text-gray-600">Flow: {onboardingFlow}</p>
            <p className="text-gray-600">User: {user ? 'Logged in' : 'Not logged in'}</p>
            <p className="text-gray-600">Profile: {profile ? 'Has profile' : 'No profile'}</p>
            <p className="text-gray-600">Collected: {collectedProfile ? 'Has collected' : 'No collected'}</p>
          </div>
        </div>
      )}
      
      {/* Default case - show loading or redirect to appropriate step */}
      {!onboardingFlow && (
        <LoadingWithQuotes message="Preparing your experience..." />
      )}
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