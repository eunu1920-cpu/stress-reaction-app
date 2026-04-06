'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { getLocalAnalysis, loadRecords, setLocalAnalysis } from '@/lib/storage'
import type { ObservationRecord } from '@/lib/history-storage'
import { fetchAnalysisHistory, saveAnalysis, type StoredAnalysis } from '@/lib/analysis-storage'
import { ANALYSIS_BATCH_SIZE, getAnalysisProgress } from '@/lib/analysis-progress'
import {
  SAMPLE_ANALYSIS,
  SAMPLE_RADAR_INNER,
  SAMPLE_RADAR_RELATION,
  SAMPLE_RADAR_STRESS,
} from '@/lib/analysis-sample-data'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/login-modal'

const CATEGORY_LABELS: Record<string, string> = {
  stress: '스트레스 상황',
  relation: '인간관계',
  inner: '자기고민',
}

function parseJsonArray(val: string): string[] | null {
  try {
    if (typeof val !== 'string') return null
    if (val.startsWith('[')) {
      const parsed = JSON.parse(val) as unknown
      return Array.isArray(parsed) ? parsed.map(String).filter((s) => s?.trim()) : null
    }
    if (val.trim()) return [val.trim()]
  } catch {
    /* ignore */
  }
  return null
}

function getCategory(resultType: string): string {
  const t = (resultType || '').toUpperCase()
  if (t === 'QR') return 'inner'
  const first = t.charAt(0)
  if (first === 'S') return 'stress'
  if (first === 'R') return 'relation'
  if (first === 'T') return 'inner'
  return 'stress'
}

const SUBJECTS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] as const
const RELATION_SUBJECTS = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'] as const
const INNER_SUBJECTS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'] as const

const SUBJECT_LABELS: Record<string, string> = {
  S1: '폭주센서',
  S2: '점화방전',
  S3: '즉흥탈선',
  S4: '머리멈춤',
  S5: '고정방어',
  S6: '과집중',
  S7: '속도지연',
  S8: '몰입소진',
}

const RELATION_LABELS: Record<string, string> = {
  R1: '신호 감지형',
  R2: '직진 표현형',
  R3: '즉각 반응형',
  R4: '사고 정리형',
  R5: '거리 조절형',
  R6: '과몰입형',
  R7: '관망 관찰형',
  R8: '안정 유지형',
}

const INNER_LABELS: Record<string, string> = {
  T1: '생각 확장형',
  T2: '의미 탐색형',
  T3: '감정 연결형',
  T4: '구조 정리형',
  T5: '반복 고민형',
  T6: '거리 두기형',
  T7: '직관 포착형',
  T8: '균형 관점형',
}

function getRecordPatternCode(record: ObservationRecord): string {
  const type = (record.resultType || record.patternCode || record.pattern || '').toUpperCase()
  return type
}

/** 패턴 돋보기: API에는 긴 시나리오 대신 영역·유형 코드만 전달 */
const PATTERN_AREA_LABELS: Record<string, string> = {
  stress: '상황스트레스',
  relation: '관계 상황',
  self: '개인 상황',
}

function isPatternLensRecord(r: ObservationRecord): boolean {
  return r.sourceKind === 'pattern_lens' || r.pattern === 'pattern_lens'
}

function getPatternTypeLabel(code: string): string {
  const c = code.toUpperCase()
  return SUBJECT_LABELS[c] || RELATION_LABELS[c] || INNER_LABELS[c] || c
}

/** 해석 본문이 아닌 사용자가 남긴 공감/댓글 줄만 */
function extractUserAnnotationFromMemo(memo: string): string {
  const lines = memo
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  const picked = lines.filter((l) => l.startsWith('공감:') || l.startsWith('댓글:'))
  return picked.join('\n')
}

function shortenGenericSituationTags(tags: string[], maxChars: number): string[] {
  return tags.map((t) => (t.length <= maxChars ? t : `${t.slice(0, maxChars)}… [생략]`))
}

function buildSituationTagsForApi(
  r: ObservationRecord,
  situationArr: string[] | null
): string[] {
  if (isPatternLensRecord(r)) {
    const code = getRecordPatternCode(r)
    const area = r.category
      ? (PATTERN_AREA_LABELS[r.category] ?? r.category)
      : '패턴'
    const label = getPatternTypeLabel(code)
    return [`[패턴 돋보기] ${area} · ${label} (${code})`]
  }
  const raw =
    situationArr?.filter(Boolean) ?? [CATEGORY_LABELS[getCategory(r.resultType)] ?? '']
  return shortenGenericSituationTags(raw, 140)
}

function recordsToApiFormat(records: ObservationRecord[]) {
  return records.map((r) => {
    const situationArr = parseJsonArray(r.answers?.q1 ?? '')
    const bodyArr = parseJsonArray(r.answers?.q2 ?? '')
    const behaviorArr = parseJsonArray(r.answers?.q3 ?? '')
    const memo = (r.memo ?? '').trim()
    const isManual =
      r.sourceKind === 'manual_record' || r.pattern === 'manual_record'

    let content = ''
    if (isManual) {
      content = memo || (r.summary ?? '').trim()
    } else if (isPatternLensRecord(r)) {
      content =
        extractUserAnnotationFromMemo(memo) || '(직접 작성한 한 줄·공감 없음)'
    }

    return {
      date: r.date,
      situationTags: buildSituationTagsForApi(r, situationArr),
      bodyReactionTags: bodyArr ?? [],
      behaviorTags: behaviorArr ?? [],
      content,
      sourceKind:
        r.sourceKind ??
        (isManual
          ? 'manual_record'
          : r.pattern === 'stress_test'
            ? 'stress_test'
            : 'pattern_lens'),
    }
  })
}

function buildChartDataFromRecords(
  records: ObservationRecord[],
  subjects: readonly string[]
): { subject: string; value: number }[] {
  const counts: Record<string, number> = {}
  subjects.forEach((s) => {
    counts[s] = 0
  })
  records.forEach((record) => {
    const type = getRecordPatternCode(record)
    if (subjects.includes(type)) {
      counts[type] = (counts[type] ?? 0) + 1
    }
  })
  return subjects.map((subject) => ({
    subject,
    value: counts[subject] ?? 0,
  }))
}

const initialChartData = SUBJECTS.map((subject) => ({ subject, value: 0 }))
const initialRelationData = RELATION_SUBJECTS.map((subject) => ({ subject, value: 0 }))
const initialInnerData = INNER_SUBJECTS.map((subject) => ({ subject, value: 0 }))

function formatDateShort(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatDateTimeShort(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AnalysisPage() {
  const { user, login, isDemoMode } = useAuth()
  /** 이메일·구글 등 계정 로그인만 실제 기록 그래프 (익명·비로그인·데모는 샘플) */
  const showRealCharts = Boolean(user?.email?.trim()) && !isDemoMode
  const [data, setData] = useState<{ subject: string; value: number }[]>(initialChartData)
  const [relationData, setRelationData] = useState<{ subject: string; value: number }[]>(initialRelationData)
  const [innerData, setInnerData] = useState<{ subject: string; value: number }[]>(initialInnerData)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [records, setRecords] = useState<ObservationRecord[]>([])
  const [analysisHistory, setAnalysisHistory] = useState<StoredAnalysis[]>([])
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    loadRecords(user?.id ?? null).then((hist) => {
      if (!cancelled) {
        setRecords(hist)
        setData(buildChartDataFromRecords(hist, SUBJECTS))
        setRelationData(buildChartDataFromRecords(hist, RELATION_SUBJECTS))
        setInnerData(buildChartDataFromRecords(hist, INNER_SUBJECTS))
      }
    })
    return () => { cancelled = true }
  }, [user?.id])

  useEffect(() => {
    if (!user?.id) {
      const cached = getLocalAnalysis()
      if (cached) {
        setAnalysisHistory([cached])
        setSelectedAnalysisId(cached.id)
      } else {
        setAnalysisHistory([])
        setSelectedAnalysisId(null)
      }
      return
    }

    let cancelled = false
    fetchAnalysisHistory(user.id).then((stored) => {
      if (!cancelled) {
        setAnalysisHistory(stored)
        setSelectedAnalysisId((prev) => {
          if (prev && stored.some((item) => item.id === prev)) return prev
          return stored[0]?.id ?? null
        })
      }
    })
    return () => { cancelled = true }
  }, [user?.id])

  const latestAnalysis = analysisHistory[0] ?? null
  const selectedAnalysis = useMemo(() => {
    if (analysisHistory.length === 0) return null
    return analysisHistory.find((item) => item.id === selectedAnalysisId) ?? latestAnalysis
  }, [analysisHistory, latestAnalysis, selectedAnalysisId])
  const selectedAnalysisIndex = selectedAnalysis
    ? analysisHistory.findIndex((item) => item.id === selectedAnalysis.id)
    : -1
  const selectedAnalysisRound =
    selectedAnalysisIndex >= 0 ? analysisHistory.length - selectedAnalysisIndex : 0

  const fetchAnalysis = useCallback(
    async (previousAnalysisText?: string) => {
      if (records.length < ANALYSIS_BATCH_SIZE) return

      const batch = records.slice(0, ANALYSIS_BATCH_SIZE)
      const apiRecords = recordsToApiFormat(batch)
      const oldestDate = batch[batch.length - 1]?.date ?? ''
      const newestDate = batch[0]?.date ?? ''

      setAnalysisLoading(true)
      setAnalysisError(null)
      try {
        const res = await fetch('/api/analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            records: apiRecords,
            previousAnalysis: previousAnalysisText ?? undefined,
          }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || '분석 요청 실패')
        const text = json.analysis ?? ''

        if (user?.id) {
          const saved = await saveAnalysis(user.id, {
            recordCount: records.length,
            analysis: text,
            periodStart: oldestDate,
            periodEnd: newestDate,
          })
          if (saved) {
            setAnalysisHistory((prev) => [saved, ...prev])
            setSelectedAnalysisId(saved.id)
          }
        } else {
          const tempId = `local-${Date.now()}`
          const item = {
            id: tempId,
            recordCount: records.length,
            analysis: text,
            periodStart: oldestDate,
            periodEnd: newestDate,
            createdAt: new Date().toISOString(),
          }
          setLocalAnalysis({
            recordCount: records.length,
            analysis: text,
            periodStart: oldestDate,
            periodEnd: newestDate,
          })
          setAnalysisHistory((prev) => [item, ...prev])
          setSelectedAnalysisId(tempId)
        }
      } catch (err) {
        setAnalysisError(err instanceof Error ? err.message : '분석을 불러올 수 없습니다.')
      } finally {
        setAnalysisLoading(false)
      }
    },
    [records, user?.id]
  )

  useEffect(() => {
    if (records.length < ANALYSIS_BATCH_SIZE || analysisLoading) return

    if (!latestAnalysis) {
      void fetchAnalysis()
      return
    }

    if (records.length - latestAnalysis.recordCount >= ANALYSIS_BATCH_SIZE) {
      void fetchAnalysis(latestAnalysis.analysis)
    }
  }, [records, user?.id, analysisLoading, fetchAnalysis, latestAnalysis])

  const displayStress = showRealCharts ? data : SAMPLE_RADAR_STRESS
  const displayRelation = showRealCharts ? relationData : SAMPLE_RADAR_RELATION
  const displayInner = showRealCharts ? innerData : SAMPLE_RADAR_INNER

  const domainMax = useMemo(() => {
    const max = Math.max(1, ...displayStress.map((d) => d.value))
    return max
  }, [displayStress])
  const relationDomainMax = useMemo(
    () => Math.max(1, ...displayRelation.map((d) => d.value)),
    [displayRelation]
  )
  const innerDomainMax = useMemo(
    () => Math.max(1, ...displayInner.map((d) => d.value)),
    [displayInner]
  )

  const hasData = data.some((d) => d.value > 0)
  const hasRelationData = relationData.some((d) => d.value > 0)
  const hasInnerData = innerData.some((d) => d.value > 0)
  const { hasEnoughForFirst, recordsNeeded } = getAnalysisProgress(
    records.length,
    latestAnalysis?.recordCount ?? null
  )
  const progressMessage =
    !hasEnoughForFirst
      ? records.length === 0
        ? `새 기록 ${ANALYSIS_BATCH_SIZE}개가 쌓이면 다음 분석이 생성됩니다.`
        : `새 기록 ${ANALYSIS_BATCH_SIZE - records.length}개가 더 쌓이면 다음 분석이 생성됩니다.`
      : recordsNeeded === 0
        ? '새 분석이 준비되었습니다. 잠시만 기다려 주세요.'
        : `새 기록 ${recordsNeeded}개가 더 쌓이면 다음 분석이 생성됩니다.`

  const latestAnalysisRound = analysisHistory.length
  const roundPreviewMessages: Record<number, string> = {
    1: '다음 분석에서는 반복되는 상황과 반응 패턴이 함께 정리됩니다.',
    2: '다음 분석에서는 주요 트리거 상황과 감정 반응 흐름이 분석됩니다.',
    3: '다음 분석에서는 반복되는 생각 패턴과 감정 루프가 정리됩니다.',
    4: '다음 분석에서는 나에게 맞는 대응 전략이 제안됩니다.',
  }
  const roundPreviewMessage =
    latestAnalysisRound >= 4
      ? roundPreviewMessages[4]
      : roundPreviewMessages[latestAnalysisRound as 1 | 2 | 3]

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-8 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">
            나의 반응 패턴
          </h1>
          <p className="text-base text-[#666666] leading-relaxed whitespace-pre-line">
            기록과 테스트가 쌓이면
            {'\n'}나의 반응 패턴이 보입니다.
          </p>
        </header>

        {/* AI 분석 - 차트 위에 표시 */}
        <section className="rounded-xl border border-[#E8E2FF] bg-white shadow-sm overflow-hidden mb-6">
          <h2 className="text-sm font-semibold text-[#333333] px-6 py-4 border-b border-[#E8E2FF]">
            AI 분석
          </h2>
          <div className="px-6 py-6 space-y-4">
            {!hasEnoughForFirst ? (
              <>
                <div className="rounded-xl border-2 border-dashed border-amber-200 bg-amber-50/50 p-4 mb-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">샘플</p>
                  <div className="rounded-lg bg-[#F5F3FA] p-6 min-w-0">
                    <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-line">
                      {SAMPLE_ANALYSIS}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#8E7CFF] font-medium text-center">
                  기록을 {ANALYSIS_BATCH_SIZE}개 저장하면, 해당 분석을 받으실 수 있어요.
                </p>
                <p className="text-sm text-[#666666] leading-relaxed text-center">
                  {progressMessage}
                </p>
                {!user && (
                  <p className="text-sm text-[#555555] text-center mt-2">
                    로그인하면 기록을 저장하고 내 분석을 받을 수 있어요.
                  </p>
                )}
              </>
            ) : analysisLoading ? (
              <p className="text-sm text-[#666666] leading-relaxed text-center">
                분석 중...
              </p>
            ) : analysisError ? (
              <p className="text-sm text-red-600 leading-relaxed text-center">
                {analysisError}
              </p>
            ) : selectedAnalysis ? (
              <>
                {selectedAnalysis && (
                  <p className="text-xs text-[#777777] text-center">
                    {selectedAnalysisRound}회차 분석 · {formatDateShort(selectedAnalysis.periodStart)} ~ {formatDateShort(selectedAnalysis.periodEnd)} (최근 {ANALYSIS_BATCH_SIZE}개 기록)
                  </p>
                )}
                <div className="rounded-lg bg-[#F5F3FA] p-6 min-w-0">
                  <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-line">
                    {selectedAnalysis.analysis}
                  </p>
                </div>
                {analysisHistory.length > 1 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#333333] text-center">이전 분석 다시보기</p>
                    <div className="flex flex-col gap-2">
                      {analysisHistory.map((item, index) => {
                        const round = analysisHistory.length - index
                        const isSelected = selectedAnalysisId === item.id
                        return (
                          <button
                            key={`${item.id}-${index}`}
                            type="button"
                            onClick={() => setSelectedAnalysisId(item.id)}
                            className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                              isSelected
                                ? 'border-[#CFC2FF] bg-[#F3EEFF]'
                                : 'border-[#E8E2FF] bg-white hover:bg-[#F8F5FF]'
                            }`}
                          >
                            <p className="text-sm font-semibold text-[#333333]">
                              {round}회차 분석
                            </p>
                            <p className="mt-1 text-xs text-[#777777]">
                              {formatDateShort(item.periodStart)} ~ {formatDateShort(item.periodEnd)}
                            </p>
                            <p className="mt-1 text-xs text-[#999999]">
                              생성 시각: {formatDateTimeShort(item.createdAt)}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                <div className="space-y-1 text-center">
                  <p className="text-sm text-[#8E7CFF] font-medium">
                    {progressMessage}
                  </p>
                  {roundPreviewMessage && (
                    <p className="text-sm text-[#8E7CFF] font-medium">
                      {roundPreviewMessage}
                    </p>
                  )}
                  {!user && (
                    <div className="pt-3 space-y-2">
                      <p className="text-sm text-[#555555]">
                        이 분석은 내일부터 보이지 않아요. 지속 사용하려면 무료 가입해주세요.
                      </p>
                      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center sm:gap-3">
                        <Link
                          href="/pattern"
                          className="inline-flex items-center justify-center rounded-2xl border-2 border-[#DDD4FF] bg-white px-5 py-2.5 text-sm font-semibold text-[#5a4bb5] transition-colors hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.99]"
                        >
                          조금 더 체험하기
                        </Link>
                        <button
                          type="button"
                          onClick={() => setLoginModalOpen(true)}
                          className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE] active:scale-[0.99]"
                        >
                          무료 회원가입
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </section>

        <section className="rounded-xl border border-[#E8E2FF] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#E8E2FF] px-6 py-4">
            <h2 className="text-sm font-medium text-[#333333]">
              테스트 누적 결과가 그래프로 표시됩니다.
            </h2>
            {!showRealCharts && (
              <p className="mt-1 text-xs text-[#8E7CFF]">
                예시 그래프입니다. 로그인(이메일·Google) 후 내 기록이 반영됩니다.
              </p>
            )}
          </div>
          <div className="px-6 pb-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 스트레스 상태 (S1~S8) */}
              <section className="space-y-2 flex flex-col">
                <h3 className="text-sm font-semibold text-[#333333]">1. 스트레스 상태</h3>
                <div className="rounded-xl bg-[#F5F3FA] p-6 min-w-0">
                  <div className="w-full overflow-hidden flex items-center justify-center h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={displayStress}>
                            <PolarGrid stroke="#E8E2FF" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tickFormatter={(value: string) => SUBJECT_LABELS[value] ?? value}
                              tick={{ fill: '#333333', fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, domainMax]}
                              tick={{ fill: '#666666', fontSize: 10 }}
                            />
                            <Radar
                              name="반응 패턴"
                              dataKey="value"
                              stroke="#8E7CFF"
                              fill="#8E7CFF"
                              fillOpacity={0.4}
                              strokeWidth={2}
                            />
                          </RechartsRadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <p className="text-center text-xs text-[#666666]">
                      {!showRealCharts
                        ? '예시 데이터입니다.'
                        : hasData
                          ? '히스토리에 저장된 테스트 결과를 기반으로 표시됩니다.'
                          : '기록이 쌓이면 나의 반응 패턴이 표시됩니다.'}
                    </p>
                  </section>

                  {/* 관계 반응 (R1~R8) */}
                  <section className="space-y-2 flex flex-col">
                    <h3 className="text-sm font-semibold text-[#333333]">2. 관계 반응</h3>
                    <div className="rounded-xl bg-[#F5F3FA] p-6 min-w-0">
                      <div className="w-full overflow-hidden flex items-center justify-center h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={displayRelation}>
                            <PolarGrid stroke="#E8E2FF" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tickFormatter={(value: string) => RELATION_LABELS[value] ?? value}
                              tick={{ fill: '#333333', fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, relationDomainMax]}
                              tick={{ fill: '#666666', fontSize: 10 }}
                            />
                            <Radar
                              name="반응 패턴"
                              dataKey="value"
                              stroke="#8E7CFF"
                              fill="#8E7CFF"
                              fillOpacity={0.4}
                              strokeWidth={2}
                            />
                          </RechartsRadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <p className="text-center text-xs text-[#666666]">
                      {!showRealCharts
                        ? '예시 데이터입니다.'
                        : hasRelationData
                          ? '히스토리에 저장된 테스트 결과를 기반으로 표시됩니다.'
                          : '기록이 쌓이면 나의 반응 패턴이 표시됩니다.'}
                    </p>
                  </section>

                  {/* 자기 고민 (T1~T8) */}
                  <section className="space-y-2 flex flex-col md:col-span-2">
                    <h3 className="text-sm font-semibold text-[#333333]">3. 자기 고민</h3>
                    <div className="rounded-xl bg-[#F5F3FA] p-6 min-w-0">
                      <div className="w-full overflow-hidden flex items-center justify-center h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={displayInner}>
                            <PolarGrid stroke="#E8E2FF" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tickFormatter={(value: string) => INNER_LABELS[value] ?? value}
                              tick={{ fill: '#333333', fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, innerDomainMax]}
                              tick={{ fill: '#666666', fontSize: 10 }}
                            />
                            <Radar
                              name="반응 패턴"
                              dataKey="value"
                              stroke="#8E7CFF"
                              fill="#8E7CFF"
                              fillOpacity={0.4}
                              strokeWidth={2}
                            />
                          </RechartsRadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <p className="text-center text-xs text-[#666666]">
                      {!showRealCharts
                        ? '예시 데이터입니다.'
                        : hasInnerData
                          ? '히스토리에 저장된 테스트 결과를 기반으로 표시됩니다.'
                          : '기록이 쌓이면 나의 반응 패턴이 표시됩니다.'}
                    </p>
                  </section>
                </div>
              </div>
        </section>
      </div>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={async (email?: string) => {
          const result = await login(email)
          if (result && 'user' in result) setLoginModalOpen(false)
          if (result && 'emailSent' in result) return { emailSent: true }
          if (result && 'error' in result) return { error: result.error }
        }}
        variant="access"
      />
    </main>
  )
}
