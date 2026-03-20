'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { migrateLocalToSupabase } from '@/lib/storage'

/**
 * 로그인 시 localStorage 임시 데이터를 Supabase로 마이그레이션
 */
export function useSyncData(): void {
  const { user, isDemoMode } = useAuth()
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (!user?.id) {
      hasRunRef.current = false
      return
    }
    if (isDemoMode) return
    if (hasRunRef.current) return

    hasRunRef.current = true
    migrateLocalToSupabase(user.id).then(({ migrated }) => {
      if (migrated > 0) {
        console.log(`[useSyncData] Migrated ${migrated} local records to Supabase`)
      }
    })
  }, [user?.id, isDemoMode])
}
