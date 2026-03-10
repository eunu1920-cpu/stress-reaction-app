import { supabase } from '@/lib/supabase'

export type StoredAnalysis = {
  recordCount: number
  analysis: string
  periodStart: string
  periodEnd: string
}

export async function fetchLatestAnalysis(userId: string | null): Promise<StoredAnalysis | null> {
  if (!userId) return null

  const { data: { user } } = await supabase.auth.getUser()
  const authUserId = user?.id ?? userId
  if (!authUserId) return null

  const { data: row, error } = await supabase
    .from('analysis_results')
    .select('record_count, analysis, period_start, period_end')
    .eq('user_id', authUserId)
    .maybeSingle()

  if (error) {
    console.error('[fetchLatestAnalysis] Supabase error:', error.message)
    return null
  }

  if (!row?.analysis || typeof row.record_count !== 'number') return null

  return {
    recordCount: row.record_count,
    analysis: row.analysis,
    periodStart: row.period_start,
    periodEnd: row.period_end,
  }
}

export async function saveAnalysis(
  userId: string,
  data: StoredAnalysis
): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.id !== userId) return false

  const { error } = await supabase
    .from('analysis_results')
    .upsert(
      {
        user_id: userId,
        record_count: data.recordCount,
        analysis: data.analysis,
        period_start: data.periodStart,
        period_end: data.periodEnd,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )

  if (error) {
    console.error('[saveAnalysis] Supabase error:', error.message)
    return false
  }
  return true
}
