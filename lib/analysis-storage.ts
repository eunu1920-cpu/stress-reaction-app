import { supabase } from '@/lib/supabase'

export type StoredAnalysis = {
  id: string
  recordCount: number
  analysis: string
  periodStart: string
  periodEnd: string
  createdAt: string
}

type AnalysisRow = {
  id: string
  record_count: number
  analysis: string
  period_start: string
  period_end: string
  created_at: string
}

export async function fetchLatestAnalysis(userId: string | null): Promise<StoredAnalysis | null> {
  if (!userId) return null

  const { data: row, error } = await supabase
    .from('analysis_results')
    .select('id, record_count, analysis, period_start, period_end, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[fetchLatestAnalysis] Supabase error:', error.message)
    return null
  }

  if (!row?.analysis || typeof row.record_count !== 'number') return null

  return {
    id: row.id,
    recordCount: row.record_count,
    analysis: row.analysis,
    periodStart: row.period_start,
    periodEnd: row.period_end,
    createdAt: row.created_at,
  }
}

export async function fetchAnalysisHistory(userId: string | null): Promise<StoredAnalysis[]> {
  if (!userId) return []

  const { data: rows, error } = await supabase
    .from('analysis_results')
    .select('id, record_count, analysis, period_start, period_end, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[fetchAnalysisHistory] Supabase error:', error.message)
    return []
  }

  return (rows ?? [])
    .filter(
      (row): row is AnalysisRow =>
        Boolean(row?.analysis) && typeof row.record_count === 'number' && Boolean(row.id)
    )
    .map((row) => ({
      id: row.id,
      recordCount: row.record_count,
      analysis: row.analysis,
      periodStart: row.period_start,
      periodEnd: row.period_end,
      createdAt: row.created_at,
    }))
}

export async function saveAnalysis(
  userId: string,
  data: Omit<StoredAnalysis, 'id' | 'createdAt'>
): Promise<StoredAnalysis | null> {
  if (!userId) return null

  const { data: row, error } = await supabase
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
    .select('id, record_count, analysis, period_start, period_end, created_at')
    .single()

  if (error) {
    console.error('[saveAnalysis] Supabase error:', error.message)
    return null
  }

  return {
    id: row.id,
    recordCount: row.record_count,
    analysis: row.analysis,
    periodStart: row.period_start,
    periodEnd: row.period_end,
    createdAt: row.created_at,
  }
}
