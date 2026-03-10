import {
  resultData as stressResults,
  bodyData,
  cognitionData,
  insightPools,
} from './stress-results'
import { relationResults } from './relation-results'
import { selfResults } from './self-results'

export type TestType = 'stress' | 'relation' | 'self'

export type MainResultItem = {
  oneLine: string
  trigger: string
  thinking: string
  multiLayer: string
}

export type ResultDataSet = {
  main: Record<string, MainResultItem>
  body?: Record<string, { description: string; structure: string }>
  cognition?: Record<string, { strength: string; strategy: string }>
  insightPools?: Record<string, string[]>
}

const REGISTRY: Record<TestType, ResultDataSet> = {
  stress: {
    main: stressResults,
    body: bodyData,
    cognition: cognitionData,
    insightPools,
  },
  relation: {
    main: relationResults,
  },
  self: {
    main: selfResults,
  },
}

export function getResultData(testType: TestType, resultType: string): ResultDataSet | null {
  const normalized = resultType.toUpperCase()
  const data = REGISTRY[testType]
  if (!data) return null
  const main = data.main[normalized as keyof typeof data.main]
  return main ? data : null
}

export function getMainResult(testType: TestType, resultType: string): MainResultItem | null {
  const data = getResultData(testType, resultType)
  if (!data) return null
  const normalized = resultType.toUpperCase()
  return (data.main[normalized as keyof typeof data.main] as MainResultItem) ?? null
}
