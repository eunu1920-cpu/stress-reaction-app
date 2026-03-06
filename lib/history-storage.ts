export const STORAGE_KEY = 'stressObservationHistory.v1'

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
}

// localStorage is only available on the client.
function isClient() {
  return typeof window !== 'undefined'
}

function generateId() {
  if (!isClient()) return `ssr-${Date.now()}`
  const cryptoObj = window.crypto
  if (cryptoObj && 'randomUUID' in cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function getHistory(): ObservationRecord[] {
  if (!isClient()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as ObservationRecord[]) : []
  } catch {
    return []
  }
}

export function setHistory(next: ObservationRecord[]) {
  if (!isClient()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore (quota / privacy mode / blocked storage)
  }
}

export function appendHistory(entry: ObservationRecord) {
  const normalized: ObservationRecord = {
    ...entry,
    resultType: entry.resultType.toUpperCase(),
  }

  const prev = getHistory()
  const next = [...prev, normalized]
  setHistory(next)
}

export function createRecord(params: {
  q1: string
  q2: string
  q3: string
  summary: string
  date?: Date
  resultType?: string
}): ObservationRecord {
  const date = params.date ?? new Date()
  const resultType = params.resultType ?? params.q2

  return {
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
}

