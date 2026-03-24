'use client'

import { supabase } from '@/lib/supabase'

/**
 * 비로그인 사용자용: Supabase 익명 세션이 없으면 생성합니다.
 * RLS(auth.uid() = user_id)로 records에 쓰려면 실제 auth 세션이 필요합니다.
 * 익명 로그인 비활성화·네트워크 오류 시 null (호출부에서 localStorage 폴백).
 */
export async function ensureAnonymousSession(): Promise<{ userId: string } | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session?.user) {
    return { userId: session.user.id }
  }

  const { data, error } = await supabase.auth.signInAnonymously()
  if (error || !data.user) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ensureAnonymousSession]', error?.message ?? 'no user')
    }
    return null
  }
  return { userId: data.user.id }
}
