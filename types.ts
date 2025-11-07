
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

export interface OnboardingProfile {
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

export interface LegacyChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ContentItem {
  title: string;
  uri: string;
}

// Supabase Database Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  quit_date: string;
  cigarettes_per_day: number;
  price_per_pack: number;
  cigarettes_per_pack: number;
  motivation: string;
  years_smoking?: number;
  age?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProgressEntry {
  id: string;
  user_id: string;
  date: string;
  mood_rating: number; // 1-10 scale
  cravings_intensity: number; // 1-10 scale
  activities_completed: string[];
  notes?: string;
  cigarettes_smoked?: number;
  money_spent?: number;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  is_user: boolean;
  created_at?: string;
}

export interface WeeklyPlan {
  id: string;
  user_id: string;
  week_number: number;
  plan_data: {
    goals: string[];
    activities: string[];
    milestones: string[];
  };
  completed_tasks: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email?: string;
}
