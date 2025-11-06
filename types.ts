
export enum AppView {
  Onboarding = 'ONBOARDING',
  Dashboard = 'DASHBOARD',
  Progress = 'PROGRESS',
  Content = 'CONTENT',
  Chat = 'CHAT',
  Settings = 'SETTINGS',
}

export enum Methodology {
  Tapering = 'Tapering',
  ColdTurkey = 'Cold Turkey',
}

export enum SubscriptionStatus {
    Free = 'free',
    Trial = 'trial',
    Premium = 'premium',
}

export interface Subscription {
    status: SubscriptionStatus;
    endDate?: string; // For trial period
}

export interface UserProfile {
  name: string;
  smokingProfile: {
    cigsPerDay: number;
    yearsSmoking: number;
    motivation: string;
  };
  biometrics: {
    age: number;
    height: number;
    weight: number;
    activityLevel: string;
  };
  triggers: {
    contextual: string[];
    emotional: string[];
    location: string[];
    social: string[];
  };
  positiveGoals: {
    activities: string[];
    content: string[];
  };
  replacementHabits: string[];
  quitMethodology: Methodology;
}

export interface DailyPlan {
  day: number;
  goal: string;
  mindfulnessExercise: string;
  proactiveNudge: {
    time: string;
    message: string;
  };
}

export interface QuitPlan {
  methodology: Methodology;
  dailyPlans: DailyPlan[];
}

export interface ProgressData {
  smokeFreeStreak: number;
  moneySaved: number;
  cravingsLogged: number;
  relapses: number;
  dailyCigarettes: number[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ContentItem {
  title: string;
  uri: string;
}
