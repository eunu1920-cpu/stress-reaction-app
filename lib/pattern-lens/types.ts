'use client'

export type PatternLensCategory = 'stress' | 'relation' | 'self'

export type PatternLensCode =
  | 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6' | 'S7' | 'S8'
  | 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7' | 'R8'
  | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8'
  | 'AUTO'

export type PatternLensInterpretation = {
  title: string
  summary: string
  body: string
  insight?: string
  reflectionQuestion?: string
  points: string[]
}

export type PatternLensOption = {
  id: 'A' | 'B' | 'C' | 'D' | 'E'
  label: string
  patternCode: PatternLensCode
  interpretation: PatternLensInterpretation
}

export type PatternLensQuestion = {
  id: string
  category: PatternLensCategory
  version: number
  status: 'active' | 'draft' | 'archived'
  scenario: string
  prompt: string
  options: PatternLensOption[]
}
