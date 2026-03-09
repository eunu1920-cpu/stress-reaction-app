'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { RequireAuth } from '@/components/require-auth'
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { fetchRecords, type ObservationRecord } from '@/lib/history-storage'
import { useAuth } from '@/lib/auth-context'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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

function recordsToApiFormat(records: ObservationRecord[]) {
  return records.map((r) => {
    const situationArr = parseJsonArray(r.answers?.q1 ?? '')
    const bodyArr = parseJsonArray(r.answers?.q2 ?? '')
    const behaviorArr = parseJsonArray(r.answers?.q3 ?? '')
    return {
      date: r.date,
      situationTags: situationArr ?? [CATEGORY_LABELS[getCategory(r.resultType)] ?? ''],
      bodyReactionTags: bodyArr ?? [],
      behaviorTags: behaviorArr ?? [],
      content: (r.memo ?? r.summary ?? '').trim(),
    }
  })
}

const SUBJECTS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] as const

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

function buildChartDataFromRecords(records: ObservationRecord[]): { subject: string; value: number }[] {
  const counts: Record<string, number> = {}
  SUBJECTS.forEach((s) => {
    counts[s] = 0
  })
  records.forEach((record) => {
    const type = (record.resultType || '').toUpperCase()
    if (SUBJECTS.includes(type as (typeof SUBJECTS)[number])) {
      counts[type] = (counts[type] ?? 0) + 1
    }
  })
  return SUBJECTS.map((subject) => ({
    subject,
    value: counts[subject] ?? 0,
  }))
}

const initialChartData = SUBJECTS.map((subject) => ({ subject, value: 0 }))

// 관계 반응 (R1~R8) 예시 그래프용 고정 데이터
const relationPlaceholderData: { subject: string; value: number }[] = [
  { subject: 'R1', value: 2 },
  { subject: 'R2', value: 3 },
  { subject: 'R3', value: 1 },
  { subject: 'R4', value: 2 },
  { subject: 'R5', value: 1 },
  { subject: 'R6', value: 3 },
  { subject: 'R7', value: 2 },
  { subject: 'R8', value: 1 },
]

// 내면 흐름 (T1~T8) 예시 그래프용 고정 데이터
const innerPlaceholderData: { subject: string; value: number }[] = [
  { subject: 'T1', value: 1 },
  { subject: 'T2', value: 2 },
  { subject: 'T3', value: 3 },
  { subject: 'T4', value: 2 },
  { subject: 'T5', value: 1 },
  { subject: 'T6', value: 2 },
  { subject: 'T7', value: 3 },
  { subject: 'T8', value: 1 },
]

const PLACEHOLDER_DOMAIN_MAX = 4

export default function AnalysisPage() {
  const { user } = useAuth()
  const [data, setData] = useState<{ subject: string; value: number }[]>(initialChartData)
  const [records, setRecords] = useState<ObservationRecord[]>([])
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchRecords(user?.id ?? null).then((hist) => {
      if (!cancelled) {
        setRecords(hist)
        setData(buildChartDataFromRecords(hist))
      }
    })
    return () => { cancelled = true }
  }, [user?.id])

  const fetchAnalysis = useCallback(async () => {
    if (records.length < 7) return
    setAnalysisLoading(true)
    setAnalysisError(null)
    try {
      const apiRecords = recordsToApiFormat(records)
      const res = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: apiRecords }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || '분석 요청 실패')
      setAnalysis(json.analysis ?? '')
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : '분석을 불러올 수 없습니다.')
    } finally {
      setAnalysisLoading(false)
    }
  }, [records])

  useEffect(() => {
    if (records.length >= 7 && !analysis && !analysisLoading && !analysisError) {
      void fetchAnalysis()
    }
  }, [records, analysis, analysisLoading, analysisError, fetchAnalysis])

  const domainMax = useMemo(() => {
    const max = Math.max(1, ...data.map((d) => d.value))
    return max
  }, [data])

  const hasData = data.some((d) => d.value > 0)
  const hasEnoughRecords = records.length >= 7

  return (
    <RequireAuth>
    <main className="min-h-screen bg-[#F5F3FA] py-8 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">
            나의 반응 패턴 지도
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
          <div className="px-6 py-6">
            {!hasEnoughRecords ? (
              <p className="text-sm text-[#666666] leading-relaxed text-center">
                7일 이상 기록하면 AI 분석이 제공됩니다.
              </p>
            ) : analysisLoading ? (
              <p className="text-sm text-[#666666] leading-relaxed text-center">
                분석 중...
              </p>
            ) : analysisError ? (
              <p className="text-sm text-red-600 leading-relaxed text-center">
                {analysisError}
              </p>
            ) : analysis ? (
              <div className="rounded-lg bg-[#F5F3FA] p-6 min-w-0">
                <p className="text-sm text-[#666666] leading-relaxed whitespace-pre-line">
                  {analysis}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <Accordion type="multiple" defaultValue={[]} className="space-y-4">
          {/* Test Results */}
          <AccordionItem
            value="tests"
            className="rounded-xl border border-[#E8E2FF] bg-white shadow-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <span className="text-sm font-medium text-[#333333] text-left">
                테스트 누적 결과가 그래프로 표시됩니다.
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 pb-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 스트레스 상태 (S1~S8) */}
                  <section className="space-y-2 flex flex-col">
                    <h3 className="text-sm font-semibold text-[#333333]">1. 스트레스 상태</h3>
                    <div className="rounded-xl bg-[#F5F3FA] p-6 min-w-0">
                      <div className="w-full overflow-hidden flex items-center justify-center h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
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
                      {hasData
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
                          <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={relationPlaceholderData}>
                            <PolarGrid stroke="#E8E2FF" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tick={{ fill: '#333333', fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, PLACEHOLDER_DOMAIN_MAX]}
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
                      예시 그래프입니다. 기록이 쌓이면 나의 패턴이 보입니다.
                    </p>
                  </section>

                  {/* 자기 고민 (T1~T8) */}
                  <section className="space-y-2 flex flex-col md:col-span-2">
                    <h3 className="text-sm font-semibold text-[#333333]">3. 자기 고민</h3>
                    <div className="rounded-xl bg-[#F5F3FA] p-6 min-w-0">
                      <div className="w-full overflow-hidden flex items-center justify-center h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsRadarChart cx="50%" cy="50%" outerRadius="65%" data={innerPlaceholderData}>
                            <PolarGrid stroke="#E8E2FF" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tick={{ fill: '#333333', fontSize: 10 }}
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, PLACEHOLDER_DOMAIN_MAX]}
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
                      예시 그래프입니다. 기록이 쌓이면 나의 패턴이 보입니다.
                    </p>
                  </section>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
    </RequireAuth>
  )
}
