import { supabase } from '@/lib/supabase'

export type ObservationAnswers = {
  q1: string
  q2: string
  q3: string
}

export type ObservationRecord = {
  id: string
  date: string // ISO-8601
  resultType: string
  answers: ObservationAnswers
  summary: string
  memo?: string
  pattern?: string
}

const VALID_TEST_PATTERNS = new Set([
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8',
  'G1', 'G2', 'G3', 'G4', 'T1', 'T2', 'T3', 'T4',
  'R1', 'R2', 'C1', 'C2', 'C3',
])

export function isManualRecord(record: ObservationRecord): boolean {
  if (record.pattern === 'manual_record') return true
  if (record.resultType === 'QR') return true
  const q1 = record.answers?.q1 ?? ''
  if (typeof q1 === 'string' && q1.startsWith('[')) return true
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
  content: string | null
  created_at: string
  situation_tags?: string[] | null
  body_reaction_tags?: string[] | null
  behavior_tags?: string[] | null
}

function supabaseRowToRecord(row: SupabaseRecord): ObservationRecord {
  const isManual = row.pattern === 'manual_record'
  const situation = (row.situation_tags ?? []) as string[]
  const body = (row.body_reaction_tags ?? []) as string[]
  const behavior = (row.behavior_tags ?? []) as string[]
  const tagSummary = [situation.join(', '), body.join(', '), behavior.join(', ')]
    .filter(Boolean)
    .join(' · ')
  const content = row.content ?? ''
  return {
    id: row.id,
    date: row.created_at,
    resultType: isManual ? 'QR' : row.pattern,
    pattern: row.pattern,
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
