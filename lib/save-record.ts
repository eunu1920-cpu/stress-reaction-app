'use client'

import { supabase } from '@/lib/supabase'

const RECENT_DUP_MS = 120_000

async function hasRecentDuplicate(
  userId: string,
  params: SaveRecordParams,
  content: string | null,
): Promise<boolean> {
  const since = new Date(Date.now() - RECENT_DUP_MS).toISOString()

  if (params.questionId && params.optionId) {
    const { data, error } = await supabase
      .from('records')
      .select('id')
      .eq('user_id', userId)
      .eq('question_id', params.questionId)
      .eq('option_id', params.optionId)
      .gte('created_at', since)
      .limit(1)
    if (error || !data) return false
    return data.length > 0
  }

  const contentTrim = (content ?? '').trim()
  if (!contentTrim) return false

  const { data: rows, error } = await supabase
    .from('records')
    .select('id, content')
    .eq('user_id', userId)
    .eq('pattern', params.pattern)
    .gte('created_at', since)
    .limit(50)

  if (error || !rows?.length) return false
  return rows.some((r) => (r.content ?? '').trim() === contentTrim)
}

export type SaveRecordParams = {
  userId?: string | null
  category: string
  pattern: string
  sourceKind?: string
  patternCode?: string
  questionId?: string
  optionId?: string
  questionVersion?: number
  sourceSnapshot?: Record<string, unknown>
  tags?: string[]
  situationTags?: string[]
  bodyReactionTags?: string[]
  behaviorTags?: string[]
  content?: string | null
  q1: string
  q2: string
  q3: string
  summary: string
  resultType: string
  memo?: string
}

export async function saveRecord(params: SaveRecordParams): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const content = params.content ?? params.memo ?? params.summary ?? null

  if (await hasRecentDuplicate(user.id, params, content)) {
    return true
  }

  const base: Record<string, unknown> = {
    user_id: user.id,
    category: params.category,
    pattern: params.pattern,
    source_kind: params.sourceKind ?? (params.pattern === 'manual_record' ? 'manual_record' : 'stress_test'),
    pattern_code: params.patternCode ?? null,
    question_id: params.questionId ?? null,
    option_id: params.optionId ?? null,
    question_version: params.questionVersion ?? null,
    source_snapshot: params.sourceSnapshot ?? {},
    content,
  }
  const payload =
    params.situationTags !== undefined ||
    params.bodyReactionTags !== undefined ||
    params.behaviorTags !== undefined
      ? {
          ...base,
          situation_tags: params.situationTags ?? [],
          body_reaction_tags: params.bodyReactionTags ?? [],
          behavior_tags: params.behaviorTags ?? [],
        }
      : base

  let { error } = await supabase.from('records').insert(payload)
  if (error?.message?.includes('column') || error?.code === '42703') {
    const fallback = await supabase.from('records').insert({
      user_id: user.id,
      category: params.category,
      pattern: params.pattern,
      content,
    })
    error = fallback.error
  }
  if (error) {
    console.error('Supabase save error:', error)
    return false
  }
  return true
}
