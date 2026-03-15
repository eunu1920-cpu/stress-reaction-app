'use client'

import { supabase } from '@/lib/supabase'
import { saveRecord } from '@/lib/save-record'
import {
  getPatternLensQuestionById,
  getPatternLensQuestions,
} from '@/lib/pattern-lens/registry'
import type {
  PatternLensCategory,
  PatternLensOption,
  PatternLensQuestion,
} from '@/lib/pattern-lens/types'

export type AssignmentRow = {
  id: string
  question_id: string
  status: 'assigned' | 'opened' | 'answered' | 'skipped' | 'expired'
  response_id: string | null
}

type AssignmentCategoryRow = {
  category: PatternLensCategory
}

type QuestionResponseRow = {
  id: string
  question_id: string
  category: PatternLensCategory
  option_id: string
  pattern_code: string
  question_version: number
  display_snapshot: PatternLensResponseSnapshot
  answered_at: string
}

export type PatternLensResponseSnapshot = {
  scenario: string
  prompt: string
  selectedLabel: string
  interpretationTitle: string
  interpretationSummary: string
  interpretationBody: string
  interpretationInsight?: string
  reflectionQuestion?: string
  interpretationPoints: string[]
}

function getTodayDateKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function getTodayAssignment(
  userId: string,
  category: PatternLensCategory
): Promise<AssignmentRow | null> {
  const today = getTodayDateKey()
  const { data: existing, error: existingError } = await supabase
    .from('question_assignments')
    .select('id, question_id, status, response_id')
    .eq('user_id', userId)
    .eq('category', category)
    .eq('assigned_date', today)
    .maybeSingle()

  if (existingError) {
    console.error('[question_assignments] read failed:', existingError.message)
    return null
  }

  return (existing as AssignmentRow | null) ?? null
}

async function selectTodayQuestion(
  userId: string,
  category: PatternLensCategory
): Promise<PatternLensQuestion | null> {
  const questions = getPatternLensQuestions(category)
  if (questions.length === 0) return null

  const { data: answeredRows } = await supabase
    .from('question_responses')
    .select('question_id')
    .eq('user_id', userId)
    .eq('category', category)

  const answeredIds = new Set((answeredRows ?? []).map((row) => String(row.question_id)))
  return questions.find((question) => !answeredIds.has(question.id)) ?? null
}

export async function fetchTodayPatternCategoryChoice(
  userId: string
): Promise<PatternLensCategory | null> {
  const today = getTodayDateKey()
  const { data, error } = await supabase
    .from('question_assignments')
    .select('category')
    .eq('user_id', userId)
    .eq('assigned_date', today)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[question_assignments] category read failed:', error.message)
    return null
  }

  return ((data as AssignmentCategoryRow | null)?.category ?? null) as PatternLensCategory | null
}

export async function getOrCreateTodayPatternCategoryChoice(
  userId: string,
  category: PatternLensCategory
): Promise<PatternLensCategory | null> {
  const existingCategory = await fetchTodayPatternCategoryChoice(userId)
  return existingCategory ?? category
}

export async function getOrCreateTodayAssignment(
  userId: string,
  category: PatternLensCategory,
  questionId?: string
): Promise<{ assignment: AssignmentRow; question: PatternLensQuestion } | null> {
  const today = getTodayDateKey()
  const selectedCategory = await fetchTodayPatternCategoryChoice(userId)
  if (selectedCategory && selectedCategory !== category) {
    return null
  }
  const existing = await getTodayAssignment(userId, category)

  if (existing) {
    if (questionId && existing.question_id !== questionId) {
      return null
    }

    const question = getPatternLensQuestionById(category, existing.question_id)
    if (!question) return null
    return { assignment: existing, question }
  }

  const nextQuestionId = questionId ?? (await selectTodayQuestion(userId, category))?.id
  if (!nextQuestionId) return null

  const question = getPatternLensQuestionById(category, nextQuestionId)
  if (!question) return null

  const { data: inserted, error: insertError } = await supabase
    .from('question_assignments')
    .insert({
      user_id: userId,
      category,
      question_id: nextQuestionId,
      assigned_date: today,
      status: 'assigned',
    })
    .select('id, question_id, status, response_id')
    .single()

  if (insertError) {
    const isDuplicate =
      insertError.code === '23505' ||
      insertError.message?.toLowerCase().includes('duplicate key')

    if (isDuplicate) {
      const { data: existingAfterConflict, error: conflictReadError } = await supabase
        .from('question_assignments')
        .select('id, question_id, status, response_id')
        .eq('user_id', userId)
        .eq('category', category)
        .eq('assigned_date', today)
        .maybeSingle()

      if (conflictReadError) {
        console.error('[question_assignments] conflict read failed:', conflictReadError.message)
        return null
      }

      if (existingAfterConflict) {
        const existingQuestion = getPatternLensQuestionById(
          category,
          existingAfterConflict.question_id
        )
        if (!existingQuestion) return null
        return {
          assignment: existingAfterConflict as AssignmentRow,
          question: existingQuestion,
        }
      }
    }

    console.error('[question_assignments] insert failed:', insertError?.message)
    return null
  }

  if (!inserted) {
    return null
  }

  return { assignment: inserted as AssignmentRow, question }
}

export async function markAssignmentOpened(assignmentId: string): Promise<void> {
  const { error } = await supabase
    .from('question_assignments')
    .update({ status: 'opened', opened_at: new Date().toISOString() })
    .eq('id', assignmentId)
    .in('status', ['assigned'])

  if (error) {
    console.error('[question_assignments] open failed:', error.message)
  }
}

export async function fetchQuestionResponse(responseId: string): Promise<QuestionResponseRow | null> {
  const { data, error } = await supabase
    .from('question_responses')
    .select('id, question_id, category, option_id, pattern_code, question_version, display_snapshot, answered_at')
    .eq('id', responseId)
    .maybeSingle()

  if (error) {
    console.error('[question_responses] read failed:', error.message)
    return null
  }

  return (data as QuestionResponseRow | null) ?? null
}

export async function savePatternLensResponse(params: {
  userId: string
  category: PatternLensCategory
  question: PatternLensQuestion
  option: PatternLensOption
  assignmentId: string
}): Promise<{ responseId: string | null }> {
  const snapshot: PatternLensResponseSnapshot = {
    scenario: params.question.scenario,
    prompt: params.question.prompt,
    selectedLabel: params.option.label,
    interpretationTitle: params.option.interpretation.title,
    interpretationSummary: params.option.interpretation.summary,
    interpretationBody: params.option.interpretation.body,
    interpretationInsight: params.option.interpretation.insight,
    reflectionQuestion: params.option.interpretation.reflectionQuestion,
    interpretationPoints: params.option.interpretation.points,
  }

  const { count } = await supabase
    .from('question_responses')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', params.userId)
    .eq('question_id', params.question.id)

  const isRetry = (count ?? 0) > 0

  const { data: responseRow, error: responseError } = await supabase
    .from('question_responses')
    .insert({
      user_id: params.userId,
      question_id: params.question.id,
      category: params.category,
      option_id: params.option.id,
      pattern_code: params.option.patternCode,
      question_version: params.question.version,
      display_snapshot: snapshot,
      is_retry: isRetry,
    })
    .select('id')
    .single()

  if (responseError || !responseRow) {
    console.error('[question_responses] insert failed:', responseError?.message)
    return { responseId: null }
  }

  const saveOk = await saveRecord({
    userId: params.userId,
    category: params.category,
    pattern: 'pattern_lens',
    sourceKind: 'pattern_lens',
    patternCode: params.option.patternCode,
    questionId: params.question.id,
    optionId: params.option.id,
    questionVersion: params.question.version,
    sourceSnapshot: snapshot,
    situationTags: [params.question.scenario],
    bodyReactionTags: [params.option.label],
    behaviorTags: [params.option.interpretation.title],
    content: params.option.interpretation.body,
    q1: JSON.stringify([params.question.scenario]),
    q2: JSON.stringify([params.option.label]),
    q3: JSON.stringify([params.option.interpretation.title]),
    summary: params.option.interpretation.summary,
    resultType: params.option.patternCode,
    memo: params.option.interpretation.body,
  })

  if (!saveOk) {
    console.error('[records] save failed for pattern lens response')
  }

  const { error: assignmentError } = await supabase
    .from('question_assignments')
    .update({
      status: 'answered',
      answered_at: new Date().toISOString(),
      response_id: responseRow.id,
      retry_count: isRetry ? 1 : 0,
    })
    .eq('id', params.assignmentId)

  if (assignmentError) {
    console.error('[question_assignments] answer update failed:', assignmentError.message)
  }

  return { responseId: responseRow.id as string }
}
