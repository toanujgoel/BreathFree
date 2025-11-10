import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { DatabaseService } from '../services/databaseService'
import type { AuthUser, UserProfile } from '../types'

interface AuthContextType {
  user: AuthUser | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, userData?: Partial<UserProfile>) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<any>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }

        if (session?.user) {
          const authUser = { 
            id: session.user.id, 
            email: session.user.email 
          }
          setUser(authUser)
          
          // Fetch user profile
          await fetchUserProfile(session.user.id)
        } else {
          console.log('No active session found')
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Fallback timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('Loading timeout reached, setting loading to false')
      setLoading(false)
    }, 3000) // 3 seconds timeout - reduced for better UX

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id)
      
      if (session?.user) {
        const authUser = { 
          id: session.user.id, 
          email: session.user.email 
        }
        setUser(authUser)
        
        // Always fetch profile for authenticated users
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
      }
      
      // Only set loading to false after profile fetch is complete
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(loadingTimeout)
    }
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await DatabaseService.getProfile(userId)
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching profile:', error)
        return
      }
      
      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })

      if (error) return { data, error }

      // If signup successful and user is immediately available, create profile
      if (data.user && !error) {
        const profileData = {
          id: data.user.id,
          name: userData?.name || '',
          email: email,
          quit_date: userData?.quit_date || new Date().toISOString().split('T')[0],
          cigarettes_per_day: userData?.cigarettes_per_day || 0,
          price_per_pack: userData?.price_per_pack || 0,
          cigarettes_per_pack: userData?.cigarettes_per_pack || 20,
          motivation: userData?.motivation || '',
          years_smoking: userData?.years_smoking || 0,
          age: userData?.age || 0
        }

        const { error: profileError } = await DatabaseService.createProfile(profileData)
        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
      }

      return { data, error }
    } catch (error) {
      console.error('Error in signUp:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })
    return { data, error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { data: null, error: 'No user logged in' }

    try {
      const { data, error } = await DatabaseService.updateProfile(user.id, updates)
      
      if (error) return { data, error }
      
      if (data) {
        setProfile(data)
      }
      
      return { data, error }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      loading, 
      signUp, 
      signIn, 
      signOut, 
      updateProfile,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}