import { create } from 'zustand'
import { useAuth } from './useSupabase'

interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url: string
  bio?: string
}

interface ProfileState {
  profile: Profile | null
  loading: boolean
  error: string | null
  fetchProfile: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
}

export const useProfile = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    const { user } = useAuth.getState()
    if (!user) {
      set({ profile: null, error: 'No user logged in' })
      return
    }

    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set({
        profile: {
          id: user.id,
          username: user.email?.split('@')[0] || 'user',
          full_name: user.email?.split('@')[0] || 'User',
          avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
          bio: 'This is a mock profile'
        },
        loading: false
      })
    } catch (error) {
      set({ error: 'Failed to fetch profile', loading: false })
    }
  },
  updateProfile: async (updates: Partial<Profile>) => {
    set({ loading: true, error: null })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set(state => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
        loading: false
      }))
    } catch (error) {
      set({ error: 'Failed to update profile', loading: false })
    }
  }
})) 