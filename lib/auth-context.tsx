'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

const DEMO_USER_KEY = 'myview-demo-user'

export type LoginResult =
  | { user: User; isDemo: boolean }
  | { emailSent: true }
  | { error: string }
  | null

type AuthContextValue = {
  user: User | null
  isLoggedIn: boolean
  login: (email?: string) => Promise<LoginResult>
  logout: () => void
  isDemoMode: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function createDemoUser(): User {
  const id = crypto.randomUUID()
  return {
    id,
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(DEMO_USER_KEY) : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { id: string }
        setUser({ id: parsed.id } as User)
        setIsDemoMode(true)
        return
      } catch {
        localStorage.removeItem(DEMO_USER_KEY)
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        setIsDemoMode(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setIsDemoMode(false)
      } else {
        setUser(null)
        setIsDemoMode(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email?: string): Promise<LoginResult> => {
    if (email === 'google') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            prompt: 'select_account',
          },
        },
      })
      if (error) {
        console.error('Auth error:', error)
        return { error: error.message || 'Google 로그인에 실패했습니다.' }
      }
      return null
    }

    if (email === 'kakao') {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          scopes: 'profile_nickname profile_image',
        },
      })
      if (error) {
        console.error('Auth error:', error)
        return { error: error.message || '카카오 로그인에 실패했습니다.' }
      }
      return null
    }

    if (email) {
      const { data, error } = await supabase.auth.signInWithOtp({ email })
      if (error) {
        console.error('Auth error:', error)
        if (error.message?.toLowerCase().includes('rate limit')) {
          return { error: '이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' }
        }
        return { error: error.message || '로그인에 실패했습니다.' }
      }
      if (data.user) return { user: data.user, isDemo: false }
      return { emailSent: true }
    }

    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) {
      if (error.message?.includes('Anonymous sign-ins are disabled')) {
        const demoUser = createDemoUser()
        if (typeof window !== 'undefined') {
          localStorage.setItem(DEMO_USER_KEY, JSON.stringify({ id: demoUser.id }))
        }
        setUser(demoUser)
        setIsDemoMode(true)
        return { user: demoUser, isDemo: true }
      }
      console.error('Auth error:', error)
      return { error: error.message || '로그인에 실패했습니다.' }
    }
    return data.user ? { user: data.user, isDemo: false } : null
  }, [])

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_USER_KEY)
    }
    supabase.auth.signOut()
    setUser(null)
    setIsDemoMode(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    return {
      user: null,
      isLoggedIn: false,
      login: async () => null as LoginResult,
      logout: () => {},
      isDemoMode: false,
    }
  }
  return ctx
}
