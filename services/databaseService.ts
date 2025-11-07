import { supabase } from './supabaseClient'
import type { UserProfile, ProgressEntry, ChatMessage, WeeklyPlan } from '../types'

export class DatabaseService {
  // Profile operations
  static async createProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        ...profile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    return { data, error }
  }

  static async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  }

  // Progress operations
  static async saveProgressEntry(entry: Omit<ProgressEntry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('progress_entries')
      .insert([{
        ...entry,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    return { data, error }
  }

  static async getProgressEntries(userId: string, limit = 30) {
    const { data, error } = await supabase
      .from('progress_entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit)
    
    return { data, error }
  }

  static async updateProgressEntry(entryId: string, updates: Partial<ProgressEntry>) {
    const { data, error } = await supabase
      .from('progress_entries')
      .update(updates)
      .eq('id', entryId)
      .select()
      .single()
    
    return { data, error }
  }

  // Chat operations
  static async saveChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        ...message,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    return { data, error }
  }

  static async getChatHistory(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit)
    
    return { data, error }
  }

  static async clearChatHistory(userId: string) {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', userId)
    
    return { error }
  }

  // Weekly plan operations
  static async saveWeeklyPlan(plan: Omit<WeeklyPlan, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('weekly_plans')
      .insert([{
        ...plan,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    return { data, error }
  }

  static async getWeeklyPlan(userId: string, weekNumber: number) {
    const { data, error } = await supabase
      .from('weekly_plans')
      .select('*')
      .eq('user_id', userId)
      .eq('week_number', weekNumber)
      .single()
    
    return { data, error }
  }

  static async updateWeeklyPlan(planId: string, updates: Partial<WeeklyPlan>) {
    const { data, error } = await supabase
      .from('weekly_plans')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', planId)
      .select()
      .single()
    
    return { data, error }
  }

  static async getUserWeeklyPlans(userId: string) {
    const { data, error } = await supabase
      .from('weekly_plans')
      .select('*')
      .eq('user_id', userId)
      .order('week_number', { ascending: true })
    
    return { data, error }
  }

  // Statistics and analytics
  static async getUserStats(userId: string) {
    // Get total progress entries
    const { count: totalEntries } = await supabase
      .from('progress_entries')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    // Get recent progress entries for trends
    const { data: recentEntries } = await supabase
      .from('progress_entries')
      .select('mood_rating, cravings_intensity, date')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(7)

    // Get user profile for quit date
    const { data: profile } = await supabase
      .from('profiles')
      .select('quit_date, cigarettes_per_day, price_per_pack, cigarettes_per_pack')
      .eq('id', userId)
      .single()

    return {
      totalEntries,
      recentEntries,
      profile
    }
  }
}