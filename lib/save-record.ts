'use client'

import { supabase } from '@/lib/supabase'

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
