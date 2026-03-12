import { relationQuestions } from '@/content/pattern-lens/relation'
import { selfQuestions } from '@/content/pattern-lens/self'
import { stressQuestions } from '@/content/pattern-lens/stress'
import type { PatternLensCategory, PatternLensQuestion } from '@/lib/pattern-lens/types'

const QUESTION_MAP: Record<PatternLensCategory, PatternLensQuestion[]> = {
  stress: stressQuestions,
  relation: relationQuestions,
  self: selfQuestions,
}

export function getPatternLensQuestions(category: PatternLensCategory): PatternLensQuestion[] {
  return QUESTION_MAP[category].filter((question) => question.status === 'active')
}

export function getPatternLensQuestionById(
  category: PatternLensCategory,
  questionId: string
): PatternLensQuestion | null {
  return (
    QUESTION_MAP[category].find(
      (question) => question.id === questionId && question.status === 'active'
    ) ?? null
  )
}

export function isPatternLensCategory(value: string): value is PatternLensCategory {
  return value === 'stress' || value === 'relation' || value === 'self'
}
