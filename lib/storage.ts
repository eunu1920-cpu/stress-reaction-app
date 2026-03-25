'use client'

import type { ObservationRecord } from '@/lib/history-storage'
import type { SaveRecordParams } from '@/lib/save-record'

const MYVIEW_TEMP_KEY = 'myview_temp_data'
const MYVIEW_LOCAL_ANALYSIS_KEY = 'myview_local_analysis'

export type LocalTempData = {
  records: LocalRecord[]
  progress: {
    testsCompleted: string[]
    recordsCount: number
  }
}

export type LocalRecord = {
  id: string
  date: string
  category?: string
  resultType: string
  pattern?: string
  sourceKind?: string
  patternCode?: string
  questionId?: string
  optionId?: string
  questionVersion?: number
  sourceSnapshot?: Record<string, unknown> | null
  answers: { q1: string; q2: string; q3: string }
  summary: string
  memo?: string
  content?: string | null
  situationTags?: string[]
  bodyReactionTags?: string[]
  behaviorTags?: string[]
}

function getLocalTempData(): LocalTempData {
  if (typeof window === 'undefined') {
    return { records: [], progress: { testsCompleted: [], recordsCount: 0 } }
  }
  try {
    const raw = localStorage.getItem(MYVIEW_TEMP_KEY)
    if (!raw) return { records: [], progress: { testsCompleted: [], recordsCount: 0 } }
    const parsed = JSON.parse(raw) as Partial<LocalTempData>
    return {
      records: Array.isArray(parsed.records) ? parsed.records : [],
      progress: {
        testsCompleted: Array.isArray(parsed.progress?.testsCompleted) ? parsed.progress.testsCompleted : [],
        recordsCount: typeof parsed.progress?.recordsCount === 'number' ? parsed.progress.recordsCount : 0,
      },
    }
  } catch {
    return { records: [], progress: { testsCompleted: [], recordsCount: 0 } }
  }
}

function setLocalTempData(data: LocalTempData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MYVIEW_TEMP_KEY, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}

function getTestCategoryFromPattern(pattern: string): string {
  const upper = (pattern || '').toUpperCase()
  if (upper.startsWith('S')) return 'stress'
  if (upper.startsWith('R')) return 'relation'
  if (upper.startsWith('T')) return 'self'
  return upper || 'unknown'
}

/** 로컬 레코드 → ObservationRecord */
export function localRecordToObservation(r: LocalRecord): ObservationRecord {
  return {
    id: r.id,
    date: r.date,
    category: r.category,
    resultType: r.resultType,
    pattern: r.pattern,
    sourceKind: r.sourceKind,
    patternCode: r.patternCode,
    questionId: r.questionId,
    optionId: r.optionId,
    questionVersion: r.questionVersion,
    sourceSnapshot: r.sourceSnapshot,
    answers: r.answers,
    summary: r.summary,
    memo: r.memo,
  }
}

function paramsToLocalRecord(params: SaveRecordParams, id: string): LocalRecord {
  const date = new Date().toISOString()
  return {
    id,
    date,
    category: params.category,
    resultType: params.resultType,
    pattern: params.pattern,
    sourceKind: params.sourceKind ?? (params.pattern === 'manual_record' ? 'manual_record' : 'stress_test'),
    patternCode: params.patternCode ?? undefined,
    questionId: params.questionId,
    optionId: params.optionId,
    questionVersion: params.questionVersion,
    sourceSnapshot: params.sourceSnapshot ?? null,
    answers: { q1: params.q1, q2: params.q2, q3: params.q3 },
    summary: params.summary,
    memo: params.memo,
    content: params.content ?? params.memo ?? params.summary ?? null,
    situationTags: params.situationTags,
    bodyReactionTags: params.bodyReactionTags,
    behaviorTags: params.behaviorTags,
  }
}

function generateLocalId(): string {
  if (typeof window === 'undefined') return `local-${Date.now()}`
  const cryptoObj = window.crypto
  if (cryptoObj && 'randomUUID' in cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID()
  }
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/** 기록 저장 후 UI(배너·모달)가 갱신되도록 알림 */
export function dispatchRecordsUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('records-updated'))
}

/** 공통 저장: 로그인·익명→Supabase, 익명 불가 시에만 localStorage */
export async function saveData(
  params: SaveRecordParams,
  userId: string | null
): Promise<boolean> {
  if (userId) {
    const { saveRecord } = await import('@/lib/save-record')
    const ok = await saveRecord({ ...params, userId })
    if (ok) dispatchRecordsUpdated()
    return ok
  }

  const { ensureAnonymousSession } = await import('@/lib/ensure-anonymous-session')
  const anon = await ensureAnonymousSession()
  if (anon) {
    if (getLocalTempRecords().length > 0) {
      await migrateLocalToSupabase(anon.userId)
    }
    const { saveRecord } = await import('@/lib/save-record')
    const ok = await saveRecord({ ...params, userId: anon.userId })
    if (ok) dispatchRecordsUpdated()
    return ok
  }

  const data = getLocalTempData()
  const id = generateLocalId()
  const localRec = paramsToLocalRecord(params, id)
  data.records.unshift(localRec)

  if (params.pattern === 'manual_record') {
    data.progress.recordsCount = (data.progress.recordsCount ?? 0) + 1
  } else {
    const cat = getTestCategoryFromPattern(params.resultType)
    if (cat && !data.progress.testsCompleted.includes(cat)) {
      data.progress.testsCompleted = [...data.progress.testsCompleted, cat]
    }
  }

  setLocalTempData(data)
  dispatchRecordsUpdated()
  return true
}

/** 공통 조회: 로그인·익명→Supabase, 익명 불가 시에만 localStorage */
export async function loadRecords(userId: string | null): Promise<ObservationRecord[]> {
  if (userId) {
    const { fetchRecords } = await import('@/lib/history-storage')
    return fetchRecords(userId)
  }

  const { ensureAnonymousSession } = await import('@/lib/ensure-anonymous-session')
  const anon = await ensureAnonymousSession()
  if (anon) {
    if (getLocalTempRecords().length > 0) {
      await migrateLocalToSupabase(anon.userId)
    }
    const { fetchRecords } = await import('@/lib/history-storage')
    return fetchRecords(anon.userId)
  }

  const data = getLocalTempData()
  return data.records.map(localRecordToObservation)
}

export type LocalStoredAnalysis = {
  id: string
  recordCount: number
  analysis: string
  periodStart: string
  periodEnd: string
  createdAt: string
}

/** 비회원용 로컬 분석 캐시 조회 */
export function getLocalAnalysis(): LocalStoredAnalysis | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(MYVIEW_LOCAL_ANALYSIS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LocalStoredAnalysis>
    if (
      !parsed?.analysis ||
      typeof parsed.recordCount !== 'number' ||
      !parsed.periodStart ||
      !parsed.periodEnd ||
      !parsed.createdAt
    )
      return null
    return {
      id: parsed.id ?? 'local-analysis',
      recordCount: parsed.recordCount,
      analysis: parsed.analysis,
      periodStart: parsed.periodStart,
      periodEnd: parsed.periodEnd,
      createdAt: parsed.createdAt,
    }
  } catch {
    return null
  }
}

/** 비회원용 로컬 분석 캐시 저장 */
export function setLocalAnalysis(data: {
  recordCount: number
  analysis: string
  periodStart: string
  periodEnd: string
}): void {
  if (typeof window === 'undefined') return
  try {
    const stored: LocalStoredAnalysis = {
      id: 'local-analysis',
      ...data,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(MYVIEW_LOCAL_ANALYSIS_KEY, JSON.stringify(stored))
  } catch {
    /* ignore */
  }
}

export type ProgressResult = {
  testsCompleted: string[]
  recordsCount: number
  hasTwoTests: boolean
  hasOneRecord: boolean
  isComplete: boolean
}

/** 체험 완료: 테스트 2종 + 기록 1회 */
export async function checkProgressAsync(userId: string | null): Promise<ProgressResult> {
  const { fetchRecords } = await import('@/lib/history-storage')

  const fromRecords = (records: ObservationRecord[]): ProgressResult => {
    const testCats = new Set<string>()
    let manualCount = 0
    records.forEach((r) => {
      if (r.pattern === 'manual_record') manualCount++
      else {
        const cat = getTestCategoryFromPattern(r.resultType)
        if (cat) testCats.add(cat)
      }
    })
    return {
      testsCompleted: [...testCats],
      recordsCount: manualCount,
      hasTwoTests: testCats.size >= 2,
      hasOneRecord: manualCount >= 1,
      isComplete: testCats.size >= 2 && manualCount >= 1,
    }
  }

  if (userId) {
    const records = await fetchRecords(userId)
    return fromRecords(records)
  }

  const { ensureAnonymousSession } = await import('@/lib/ensure-anonymous-session')
  const anon = await ensureAnonymousSession()
  if (anon) {
    if (getLocalTempRecords().length > 0) {
      await migrateLocalToSupabase(anon.userId)
    }
    const records = await fetchRecords(anon.userId)
    return fromRecords(records)
  }

  const data = getLocalTempData()
  const tests = [...new Set(data.progress.testsCompleted)]
  const manualCount = data.records.filter((r) => r.pattern === 'manual_record').length
  const recordsCount = Math.max(data.progress.recordsCount ?? 0, manualCount)
  return {
    testsCompleted: tests,
    recordsCount,
    hasTwoTests: tests.length >= 2,
    hasOneRecord: recordsCount >= 1,
    isComplete: tests.length >= 2 && recordsCount >= 1,
  }
}

/** 마이그레이션용: 로컬 임시 데이터 */
export function getLocalTempRecords(): LocalRecord[] {
  return getLocalTempData().records
}

/** 메모 업데이트: 로그인·익명→Supabase, 익명 불가 시에만 localStorage */
export async function updateRecordMemo(
  recordId: string,
  content: string,
  userId: string | null
): Promise<boolean> {
  if (userId) {
    const { updateRecordContent } = await import('@/lib/history-storage')
    return updateRecordContent(recordId, content)
  }

  const { ensureAnonymousSession } = await import('@/lib/ensure-anonymous-session')
  const anon = await ensureAnonymousSession()
  if (anon) {
    if (getLocalTempRecords().length > 0) {
      await migrateLocalToSupabase(anon.userId)
    }
    const { updateRecordContent } = await import('@/lib/history-storage')
    return updateRecordContent(recordId, content)
  }

  const data = getLocalTempData()
  const idx = data.records.findIndex((r) => r.id === recordId)
  if (idx < 0) return false
  data.records[idx] = { ...data.records[idx], memo: content, content: content || data.records[idx].content }
  setLocalTempData(data)
  return true
}

/** 오늘 수동 기록 여부 (비로그인용) */
export function hasManualRecordTodayLocal(): boolean {
  const data = getLocalTempData()
  const today = new Date().toDateString()
  return data.records.some((r) => {
    if (r.pattern !== 'manual_record') return false
    return new Date(r.date).toDateString() === today
  })
}

/** 오늘 테스트 완료 여부 (비로그인용) */
export function hasTestTodayLocal(): boolean {
  const data = getLocalTempData()
  const today = new Date().toDateString()
  return data.records.some((r) => {
    if (r.pattern === 'manual_record') return false
    return new Date(r.date).toDateString() === today
  })
}

/** 레코드 삭제: 로그인·익명→Supabase, 익명 불가 시에만 localStorage */
export async function deleteRecordHybrid(
  recordId: string,
  userId: string | null
): Promise<boolean> {
  if (userId) {
    const { deleteRecord } = await import('@/lib/history-storage')
    return deleteRecord(recordId)
  }

  const { ensureAnonymousSession } = await import('@/lib/ensure-anonymous-session')
  const anon = await ensureAnonymousSession()
  if (anon) {
    if (getLocalTempRecords().length > 0) {
      await migrateLocalToSupabase(anon.userId)
    }
    const { deleteRecord } = await import('@/lib/history-storage')
    return deleteRecord(recordId)
  }

  const data = getLocalTempData()
  const idx = data.records.findIndex((r) => r.id === recordId)
  if (idx < 0) return false
  const removed = data.records[idx]
  data.records.splice(idx, 1)
  if (removed?.pattern === 'manual_record') {
    data.progress.recordsCount = Math.max(0, (data.progress.recordsCount ?? 0) - 1)
  }
  setLocalTempData(data)
  return true
}

/** 마이그레이션 완료 후 로컬 초기화 */
export function clearLocalTempData(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(MYVIEW_TEMP_KEY)
    localStorage.removeItem(MYVIEW_LOCAL_ANALYSIS_KEY)
  } catch {
    /* ignore */
  }
}

/** 로컬 데이터를 Supabase로 일괄 업로드 (로그인 시 호출) */
export async function migrateLocalToSupabase(userId: string): Promise<{ migrated: number; failed: number }> {
  const { supabase } = await import('@/lib/supabase')
  const localRecords = getLocalTempRecords()
  if (localRecords.length === 0) {
    clearLocalTempData()
    return { migrated: 0, failed: 0 }
  }

  let migrated = 0
  let failed = 0

  for (const r of localRecords) {
    const content = r.content ?? r.memo ?? r.summary ?? null
    const base: Record<string, unknown> = {
      user_id: userId,
      category: r.category ?? 'test',
      pattern: r.pattern ?? r.resultType,
      source_kind: r.sourceKind ?? (r.pattern === 'manual_record' ? 'manual_record' : 'stress_test'),
      pattern_code: r.patternCode ?? null,
      question_id: r.questionId ?? null,
      option_id: r.optionId ?? null,
      question_version: r.questionVersion ?? null,
      source_snapshot: r.sourceSnapshot ?? {},
      content,
    }
    const hasTags =
      (r.situationTags?.length ?? 0) > 0 ||
      (r.bodyReactionTags?.length ?? 0) > 0 ||
      (r.behaviorTags?.length ?? 0) > 0
    const payload = hasTags
      ? {
          ...base,
          situation_tags: r.situationTags ?? [],
          body_reaction_tags: r.bodyReactionTags ?? [],
          behavior_tags: r.behaviorTags ?? [],
        }
      : base

    const { error } = await supabase.from('records').insert(payload)
    if (error) {
      console.error('[migrateLocalToSupabase] insert error:', error.message, r.id)
      failed++
    } else {
      migrated++
    }
  }

  clearLocalTempData()
  return { migrated, failed }
}
