import { create } from 'zustand'

interface User {
  id: string
  email: string
  user_metadata?: {
    avatar_url?: string
  }
}

interface AuthState {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  signIn: async (email: string, password: string) => {
    // Mock sign in
    set({
      user: {
        id: '1',
        email,
        user_metadata: {
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        }
      }
    })
  },
  signUp: async (email: string, password: string) => {
    // Mock sign up
    set({
      user: {
        id: '1',
        email,
        user_metadata: {
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        }
      }
    })
  },
  signOut: async () => {
    set({ user: null })
  }
}))

// For backward compatibility
export const useSupabase = () => {
  const { user, signIn, signUp, signOut } = useAuth()
  return { user, signIn, signUp, signOut }
} 