import { supabase } from '@/lib/supabase'

export type ObservationAnswers = {
  q1: string
  q2: string
  q3: string
}

export type ObservationRecord = {
  id: string
  date: string // ISO-8601
  category?: string
  resultType: string
  answers: ObservationAnswers
  summary: string
  memo?: string
  pattern?: string
  sourceKind?: string
  patternCode?: string
  questionId?: string
  optionId?: string
  questionVersion?: number
  sourceSnapshot?: Record<string, unknown> | null
}

const VALID_TEST_PATTERNS = new Set([
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8',
  'G1', 'G2', 'G3', 'G4', 'T1', 'T2', 'T3', 'T4',
  'R1', 'R2', 'C1', 'C2', 'C3',
])

export function isManualRecord(record: ObservationRecord): boolean {
  if (record.sourceKind === 'pattern_lens') return false
  if (record.pattern === 'manual_record') return true
  if (record.resultType === 'QR') return true
  const type = (record.resultType || record.pattern || '').toUpperCase()
  if (!VALID_TEST_PATTERNS.has(type)) return true
  return false
}

// Supabase records table row shape
type SupabaseRecord = {
  id: string
  user_id: string
  category: string
  pattern: string
  source_kind?: string | null
  pattern_code?: string | null
  question_id?: string | null
  option_id?: string | null
  question_version?: number | null
  source_snapshot?: Record<string, unknown> | null
  content: string | null
  created_at: string
  situation_tags?: string[] | null
  body_reaction_tags?: string[] | null
  behavior_tags?: string[] | null
}

function supabaseRowToRecord(row: SupabaseRecord): ObservationRecord {
  const sourceKind = row.source_kind ?? (row.pattern === 'manual_record' ? 'manual_record' : row.pattern === 'pattern_lens' ? 'pattern_lens' : 'stress_test')
  const isManual = row.pattern === 'manual_record'
  const isPatternLens = sourceKind === 'pattern_lens'
  const situation = (row.situation_tags ?? []) as string[]
  const body = (row.body_reaction_tags ?? []) as string[]
  const behavior = (row.behavior_tags ?? []) as string[]
  const tagSummary = [situation.join(', '), body.join(', '), behavior.join(', ')]
    .filter(Boolean)
    .join(' · ')
  const content = row.content ?? ''
  return {
    id: row.id,
    category: row.category,
    date: row.created_at,
    resultType: isManual ? 'QR' : isPatternLens ? (row.pattern_code ?? row.pattern) : row.pattern,
    pattern: row.pattern,
    sourceKind,
    patternCode: row.pattern_code ?? undefined,
    questionId: row.question_id ?? undefined,
    optionId: row.option_id ?? undefined,
    questionVersion: row.question_version ?? undefined,
    sourceSnapshot: row.source_snapshot ?? null,
    answers: {
      q1: JSON.stringify(situation),
      q2: JSON.stringify(body),
      q3: JSON.stringify(behavior),
    },
    summary: tagSummary || content,
    memo: content || undefined,
  }
}

export async function fetchRecords(userId?: string | null): Promise<ObservationRecord[]> {
  const { data: { user } } = await supabase.auth.getUser()
  const authUserId = user?.id ?? userId
  if (!authUserId) return []

  const { data: rows, error } = await supabase
    .from('records')
    .select('*')
    .eq('user_id', authUserId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[fetchRecords] Supabase error:', error.message, { code: error.code, userId: authUserId })
    return []
  }

  return (rows ?? []).map((r) => supabaseRowToRecord(r as SupabaseRecord))
}

export async function deleteRecord(recordId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { error } = await supabase
    .from('records')
    .delete()
    .eq('id', recordId)
    .eq('user_id', user.id)
  return !error
}

export async function updateRecordContent(
  recordId: string,
  content: string
): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { error } = await supabase
    .from('records')
    .update({ content })
    .eq('id', recordId)
    .eq('user_id', user.id)
  return !error
}

function generateId(): string {
  if (typeof window === 'undefined') return `ssr-${Date.now()}`
  const cryptoObj = window.crypto
  if (cryptoObj && 'randomUUID' in cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function createRecord(params: {
  q1: string
  q2: string
  q3: string
  summary: string
  date?: Date
  resultType?: string
  memo?: string
}): ObservationRecord {
  const date = params.date ?? new Date()
  const resultType = params.resultType ?? params.q2

  const record: ObservationRecord = {
    id: generateId(),
    date: date.toISOString(),
    resultType,
    answers: {
      q1: params.q1,
      q2: params.q2,
      q3: params.q3,
    },
    summary: params.summary,
  }
  if (params.memo !== undefined) record.memo = params.memo
  return record
}
