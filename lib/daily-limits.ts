'use client'

import { supabase } from '@/lib/supabase'
import { hasManualRecordTodayLocal, hasTestTodayLocal } from '@/lib/storage'

function getTodayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function resolveUserIdForDailyLimits(
  userId?: string | null
): Promise<string | null> {
  if (userId) return userId
  const { ensureAnonymousSession } = await import('@/lib/ensure-anonymous-session')
  const anon = await ensureAnonymousSession()
  return anon?.userId ?? null
}

export async function hasManualRecordToday(userId?: string | null): Promise<boolean> {
  const uid = await resolveUserIdForDailyLimits(userId ?? null)
  if (uid) {
    const todayStart = `${getTodayKey()}T00:00:00.000Z`
    const todayEnd = `${getTodayKey()}T23:59:59.999Z`
    const { data } = await supabase
      .from('records')
      .select('id')
      .eq('user_id', uid)
      .eq('pattern', 'manual_record')
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd)
      .limit(1)
    return (data?.length ?? 0) > 0
  }
  return hasManualRecordTodayLocal()
}

export async function hasTestToday(userId?: string | null): Promise<boolean> {
  const uid = await resolveUserIdForDailyLimits(userId ?? null)
  if (uid) {
    const todayStart = `${getTodayKey()}T00:00:00.000Z`
    const todayEnd = `${getTodayKey()}T23:59:59.999Z`
    const { data } = await supabase
      .from('records')
      .select('id')
      .eq('user_id', uid)
      .neq('pattern', 'manual_record')
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd)
      .limit(1)
    return (data?.length ?? 0) > 0
  }
  return hasTestTodayLocal()
}

const STRESS_TEST_PATTERNS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']

/** 스트레스 반응 테스트를 한 번이라도 완료했는지 여부 */
export async function hasCompletedStressTest(
  userId?: string | null
): Promise<boolean> {
  const uid = await resolveUserIdForDailyLimits(userId ?? null)
  if (!uid) return false
  const { data } = await supabase
    .from('records')
    .select('id, source_kind, pattern')
    .eq('user_id', uid)
    .limit(200)
  if (!data?.length) return false
  return data.some(
    (r: { source_kind?: string | null; pattern?: string | null }) =>
      r.source_kind === 'stress_test' ||
      (r.pattern && STRESS_TEST_PATTERNS.includes(r.pattern))
  )
}
