'use client'

import { supabase } from '@/lib/supabase'

function getTodayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function hasManualRecordToday(userId?: string | null): Promise<boolean> {
  if (userId) {
    const todayStart = `${getTodayKey()}T00:00:00.000Z`
    const todayEnd = `${getTodayKey()}T23:59:59.999Z`
    const { data } = await supabase
      .from('records')
      .select('id')
      .eq('user_id', userId)
      .eq('pattern', 'manual_record')
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd)
      .limit(1)
    return (data?.length ?? 0) > 0
  }
  return false
}

export async function hasTestToday(userId?: string | null): Promise<boolean> {
  if (userId) {
    const todayStart = `${getTodayKey()}T00:00:00.000Z`
    const todayEnd = `${getTodayKey()}T23:59:59.999Z`
    const { data } = await supabase
      .from('records')
      .select('id')
      .eq('user_id', userId)
      .neq('pattern', 'manual_record')
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd)
      .limit(1)
    return (data?.length ?? 0) > 0
  }
  return false
}
