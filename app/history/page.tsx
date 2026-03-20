'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ObservationRecord } from '@/lib/history-storage'
import { loadRecords } from '@/lib/storage'
import { isManualRecord } from '@/lib/history-storage'
import { SAMPLE_HISTORY_RECORDS } from '@/lib/history-sample-data'
import { useAuth } from '@/lib/auth-context'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'

const SEVEN_RECORDS_POPUP_KEY = 'myview_7_records_popup_shown'

const VIEW_TABS = [
  { id: 'timeline', label: '타임라인' },
  { id: 'calendar', label: '캘린더' },
] as const

const RECORD_TYPE_FILTERS = [
  { id: 'test', label: '테스트' },
  { id: 'manual', label: '기록' },
  { id: 'category', label: '카테고리' },
] as const

const CATEGORY_OPTIONS = [
  { id: 'all', label: '전체' },
  { id: 'stress', label: '스트레스' },
  { id: 'relation', label: '관계' },
  { id: 'inner', label: '자기고민' },
] as const

const CATEGORY_LABELS: Record<string, string> = {
  stress: '스트레스 상황',
  relation: '인간관계',
  inner: '자기고민',
}

const REACTION_LABELS: Record<string, string> = {
  tense: '긴장',
  overthink: '생각 많아짐',
  avoid: '피하고 싶음',
  solve: '해결하려 함',
  other: '기타',
}

type ViewTabId = (typeof VIEW_TABS)[number]['id']
type RecordTypeFilterId = 'all' | (typeof RECORD_TYPE_FILTERS)[number]['id']
type CategoryId = (typeof CATEGORY_OPTIONS)[number]['id']

const VALID_TEST_PATTERNS = new Set([
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8',
  'G1', 'G2', 'G3', 'G4', 'T1', 'T2', 'T3', 'T4',
  'R1', 'R2', 'C1', 'C2', 'C3',
])

function getCategory(recordOrType: ObservationRecord | string): CategoryId {
  if (typeof recordOrType !== 'string') {
    if (recordOrType.sourceKind === 'pattern_lens') {
      const mapped = recordOrType.category === 'self' ? 'inner' : recordOrType.category
      if (mapped === 'stress' || mapped === 'relation' || mapped === 'inner') return mapped
    }
    return getCategory(recordOrType.resultType || '')
  }

  const resultType = recordOrType
  const t = (resultType || '').toUpperCase()
  if (t === 'QR') return 'inner'
  const first = t.charAt(0)
  if (first === 'S') return 'stress'
  if (first === 'R') return 'relation'
  if (first === 'T') return 'inner'
  return 'stress'
}

function formatDateShort(dateString: string) {
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return dateString
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

function parseJsonArray(val: string): string[] | null {
  try {
    if (typeof val !== 'string') return null
    if (val.startsWith('[')) {
      const parsed = JSON.parse(val) as unknown
      return Array.isArray(parsed) ? parsed.map(String) : null
    }
  } catch {
    /* ignore */
  }
  return null
}

function formatTagsForDisplay(tags: string[] | null | undefined): string {
  if (!tags || !Array.isArray(tags)) return ''
  const filtered = tags.filter((t) => t != null && String(t).trim() !== '')
  return filtered.join(', ')
}

function getSituationLabel(record: ObservationRecord): string {
  if (record.sourceKind === 'pattern_lens' && record.answers?.q1) {
    const arr = parseJsonArray(record.answers.q1)
    const text = formatTagsForDisplay(arr)
    if (text) return text
  }
  if (record.resultType === 'QR' && record.answers?.q1) {
    const arr = parseJsonArray(record.answers.q1)
    const tagsText = formatTagsForDisplay(arr)
    if (tagsText) return tagsText
    const map: Record<string, string> = {
      stress: '스트레스 상황',
      relation: '인간관계',
      inner: '자기고민',
      custom: '직접 입력',
    }
    const fallback = map[record.answers.q1] ?? record.answers.q1
    return fallback === '[]' || fallback === '""' ? '' : fallback
  }
  return CATEGORY_LABELS[getCategory(record)] ?? '스트레스 상황'
}

function getReactionLabel(record: ObservationRecord): string {
  if (record.sourceKind === 'pattern_lens') {
    const q2 = parseJsonArray(record.answers?.q2 ?? '')
    const q3 = parseJsonArray(record.answers?.q3 ?? '')
    const combined = [formatTagsForDisplay(q2), formatTagsForDisplay(q3)]
      .filter(Boolean)
      .join(' · ')
    return combined || record.summary || '-'
  }
  if (record.resultType === 'QR') {
    const q2 = parseJsonArray(record.answers?.q2 ?? '')
    const q3 = parseJsonArray(record.answers?.q3 ?? '')
    const tags2 = formatTagsForDisplay(q2)
    const tags3 = formatTagsForDisplay(q3)
    const combined = [tags2, tags3].filter(Boolean).join(', ')
    if (combined) return combined
    if (record.answers?.q3 && REACTION_LABELS[record.answers.q3]) {
      return REACTION_LABELS[record.answers.q3]
    }
    const parts = (record.summary || '').split(' · ')
    const fromSummary = parts[1]?.trim() || parts[0]?.trim()
    return fromSummary || ''
  }
  return record.summary || '-'
}

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const days: (number | null)[] = []
  const firstDay = first.getDay()
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(d)
  return days
}

function RecordCard({
  record,
  onClick,
  isSample,
}: {
  record: ObservationRecord
  onClick: () => void
  isSample?: boolean
}) {
  const type = (record.resultType || '').toUpperCase()
  const situationLabel = getSituationLabel(record)
  const reactionLabel = getReactionLabel(record)
  const isManual = isManualRecord(record)
  const icon = isManual ? '✍' : '🧪'

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={isSample ? undefined : onClick}
      onKeyDown={
        isSample
          ? undefined
          : (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
      }
      className={cn(
        'transition p-4 gap-0 rounded-xl border border-[#E8E2FF] h-[140px] flex flex-col min-h-[140px] overflow-hidden',
        isSample ? 'cursor-default opacity-90' : 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
      )}
    >
      <div className="flex items-center gap-2 flex-wrap shrink-0">
        <span className="text-base" title={isManual ? '오늘의 관찰' : '테스트 결과'}>
          {icon}
        </span>
        <span className="text-sm font-medium text-[#333333]">
          {formatDateShort(record.date)}
        </span>
        <span className="inline-flex items-center rounded-md bg-[#E8E2FF] px-2 py-0.5 text-xs font-medium text-[#5a4bb5]">
          [{type}]
        </span>
        {isSample && (
          <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            샘플
          </span>
        )}
      </div>
      <p className="text-sm text-[#555555] leading-relaxed mt-1.5 line-clamp-1 shrink-0">
        {situationLabel || ''}
      </p>
      <p className="text-xs text-[#777777] line-clamp-1 shrink-0">
        {reactionLabel || ''}
      </p>
      <div className="pt-2 mt-auto border-t border-border/50 flex-1 min-h-0 flex flex-col overflow-hidden">
        <p
          className="text-xs text-gray-600 leading-relaxed min-h-0 overflow-hidden text-ellipsis line-clamp-2 break-words"
          title={record.memo?.trim() || undefined}
        >
          {record.memo?.trim() ?? ''}
        </p>
      </div>
    </Card>
  )
}

export default function HistoryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [history, setHistory] = useState<ObservationRecord[] | null>(null)
  const [viewTab, setViewTab] = useState<ViewTabId>('timeline')
  const [recordTypeFilter, setRecordTypeFilter] = useState<RecordTypeFilterId>('all')
  const [category, setCategory] = useState<CategoryId>('all')
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showSevenRecordsPopup, setShowSevenRecordsPopup] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const records = await loadRecords(user?.id ?? null)
      const sorted = records
        .slice()
        .sort((a, b) => {
          const ta = new Date(a.date).getTime()
          const tb = new Date(b.date).getTime()
          return tb - ta || (a.id < b.id ? 1 : -1)
        })
      if (!cancelled) setHistory(sorted)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  useEffect(() => {
    if (!history || history.length < 7) return
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem(SEVEN_RECORDS_POPUP_KEY)) return
    sessionStorage.setItem(SEVEN_RECORDS_POPUP_KEY, '1')
    setShowSevenRecordsPopup(true)
  }, [history])

  const recordsByDate = useMemo(() => {
    const map: Record<string, ObservationRecord[]> = {}
    history?.forEach((r) => {
      const key = r.date.slice(0, 10)
      if (!map[key]) map[key] = []
      map[key].push(r)
    })
    Object.keys(map).forEach((k) => map[k].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    return map
  }, [history])

  const recordsForCalendar = useMemo(() => {
    if (!history) return recordsByDate
    let list = history
    if (recordTypeFilter === 'test') list = list.filter((r) => !isManualRecord(r))
    else if (recordTypeFilter === 'manual') list = list.filter((r) => isManualRecord(r))
    if (category !== 'all') list = list.filter((r) => getCategory(r) === category)
    const map: Record<string, ObservationRecord[]> = {}
    list.forEach((r) => {
      const key = r.date.slice(0, 10)
      if (!map[key]) map[key] = []
      map[key].push(r)
    })
    Object.keys(map).forEach((k) => map[k].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    return map
  }, [history, recordTypeFilter, category])

  const filteredHistory = useMemo(() => {
    if (!history) return null
    let list = history
    if (viewTab === 'calendar' && selectedDate) {
      list = (recordsByDate[selectedDate] ?? []).slice()
    }
    if (recordTypeFilter === 'test') {
      list = list.filter((r) => !isManualRecord(r))
    } else if (recordTypeFilter === 'manual') {
      list = list.filter((r) => isManualRecord(r))
    }
    if (category !== 'all') {
      list = list.filter((r) => getCategory(r) === category)
    }
    return list
  }, [history, recordTypeFilter, category, viewTab, selectedDate, recordsByDate])

  const handleCardClick = (record: ObservationRecord) => {
    if (record.sourceKind === 'pattern_lens') {
      router.push(`/pattern/response/${record.id}`)
      return
    }
    if (isManualRecord(record)) {
      router.push(`/record/detail/${record.id}`)
      return
    }
    const type = (record.resultType || record.pattern || '').toUpperCase()
    if (!type || !VALID_TEST_PATTERNS.has(type)) return
    const cat = getCategory(type)
    const testType = cat === 'inner' ? 'self' : cat
    router.push(`/result/${testType}/${type}`)
  }

  const isLoading = history === null
  const hasNoData = history !== null && history.length === 0
  const hasNoFilteredData =
    filteredHistory !== null && filteredHistory.length === 0 && !hasNoData

  const calendarDays = getDaysInMonth(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth()
  )
  const monthLabel = `${calendarMonth.getFullYear()}년 ${calendarMonth.getMonth() + 1}월`
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          나의 반응 관찰 히스토리
        </h1>
        <p className="text-sm text-[#555555] text-center mb-6">
          관찰이 쌓이면 나의 반응 패턴이 보입니다.
        </p>

        {/* 보기 방식 탭 */}
        <div className="flex justify-center gap-2 mb-4">
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setViewTab(tab.id)
                if (tab.id !== 'calendar') setSelectedDate(null)
              }}
              className={cn(
                'rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors',
                viewTab === tab.id
                  ? 'bg-[#8E7CFF] text-white'
                  : 'bg-white text-[#333333] border border-[#E8E2FF] hover:bg-[#F5F3FA]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 필터: 테스트 | 기록 | 카테고리 ▼ */}
        <div className="flex flex-row items-center justify-center gap-4 mb-6 text-sm">
          <button
            type="button"
            onClick={() =>
              setRecordTypeFilter((prev) => (prev === 'test' ? 'all' : 'test'))
            }
            className={cn(
              'transition-colors hover:text-[#8E7CFF]',
              recordTypeFilter === 'test' ? 'text-[#8E7CFF] font-semibold' : 'text-[#555555]'
            )}
          >
            테스트
          </button>
          <span className="text-[#CCCCCC]">|</span>
          <button
            type="button"
            onClick={() =>
              setRecordTypeFilter((prev) => (prev === 'manual' ? 'all' : 'manual'))
            }
            className={cn(
              'transition-colors hover:text-[#8E7CFF]',
              recordTypeFilter === 'manual' ? 'text-[#8E7CFF] font-semibold' : 'text-[#555555]'
            )}
          >
            기록
          </button>
          <span className="text-[#CCCCCC]">|</span>
          <div className="relative inline-flex">
            <select
              value={category}
              onChange={(e) => {
                const val = e.target.value as CategoryId
                setCategory(val)
                setRecordTypeFilter(val === 'all' ? 'all' : 'category')
              }}
              className={cn(
                'appearance-none rounded-md border-0 bg-transparent pr-8 py-1.5 pl-2 text-sm transition-colors hover:text-[#8E7CFF] focus:outline-none focus:ring-2 focus:ring-[#8E7CFF]/50 cursor-pointer',
                recordTypeFilter === 'category' || category !== 'all'
                  ? 'text-[#8E7CFF] font-semibold'
                  : 'text-[#555555]'
              )}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.id === 'all' ? '카테고리' : opt.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              className="pointer-events-none absolute right-1 top-1/2 size-4 -translate-y-1/2 text-[#666666]"
              aria-hidden
            />
          </div>
        </div>

        {isLoading && (
          <div className="min-h-[200px] flex items-center justify-center text-[#555555]">
            기록을 불러오는 중입니다.
          </div>
        )}

        {hasNoData && !isLoading && (
          <div className="space-y-4">
            <p className="text-center text-[#555555] font-medium">
              샘플입니다. 마음껏 둘러보세요.
            </p>
            {!user && (
              <p className="text-center text-sm text-[#8E7CFF] font-medium">
                로그인하면 내 기록을 저장할 수 있어요.
              </p>
            )}
            <div className="rounded-xl border-2 border-dashed border-amber-200 bg-amber-50/50 p-4">
              <p className="text-sm font-semibold text-amber-800 mb-3">
                샘플
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_HISTORY_RECORDS.map((record) => (
                  <RecordCard
                    key={record.id}
                    record={record}
                    onClick={() => {}}
                    isSample
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 타임라인 */}
        {viewTab === 'timeline' && !isLoading && !hasNoData && (
          <>
            {hasNoFilteredData && (
              <div className="min-h-[120px] flex items-center justify-center text-[#555555] text-sm">
                이 조건에 맞는 기록이 없습니다.
              </div>
            )}
            {filteredHistory && filteredHistory.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHistory.map((record) => (
                  <RecordCard
                    key={record.id}
                    record={record}
                    onClick={() => handleCardClick(record)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* 캘린더 */}
        {viewTab === 'calendar' && !isLoading && !hasNoData && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF] p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setCalendarMonth(
                      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1)
                    )
                  }
                  className="p-2 rounded-lg hover:bg-[#F5F3FA] text-[#333333]"
                >
                  ←
                </button>
                <span className="text-base font-semibold text-[#333333]">
                  {monthLabel}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCalendarMonth(
                      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1)
                    )
                  }
                  className="p-2 rounded-lg hover:bg-[#F5F3FA] text-[#333333]"
                >
                  →
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {weekDays.map((d) => (
                  <div key={d} className="text-xs font-medium text-[#666666] py-1">
                    {d}
                  </div>
                ))}
                {calendarDays.map((d, i) => {
                  if (d === null) return <div key={`empty-${i}`} />
                  const y = calendarMonth.getFullYear()
                  const m = calendarMonth.getMonth()
                  const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
                  const hasRecords = (recordsForCalendar[key]?.length ?? 0) > 0
                  const isSelected = selectedDate === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDate(isSelected ? null : key)}
                      className={cn(
                        'aspect-square rounded-lg text-sm font-medium transition-colors flex flex-col items-center justify-center',
                        isSelected
                          ? 'bg-[#8E7CFF] text-white'
                          : hasRecords
                            ? 'bg-[#E8E2FF] text-[#5a4bb5] hover:bg-[#D8CCFF]'
                            : 'text-[#333333] hover:bg-[#F5F3FA]'
                      )}
                    >
                      {d}
                      {hasRecords && (
                        <span className="text-[10px] mt-0.5">●</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            {selectedDate && (
              <div>
                <h3 className="text-sm font-semibold text-[#333333] mb-3">
                  {selectedDate.replace(/-/g, '.')} 기록
                </h3>
                {filteredHistory && filteredHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredHistory.map((record) => (
                      <RecordCard
                        key={record.id}
                        record={record}
                        onClick={() => handleCardClick(record)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#555555] py-4">
                    {recordTypeFilter !== 'all' || category !== 'all'
                      ? '이 날짜에 해당 조건의 기록이 없습니다.'
                      : '이 날짜에 기록이 없습니다.'}
                  </p>
                )}
              </div>
            )}
            {selectedDate === null && (
              <p className="text-sm text-[#555555] text-center py-4">
                날짜를 클릭하면 해당 날짜의 기록을 볼 수 있습니다.
              </p>
            )}
          </div>
        )}
      </div>

      <Dialog open={showSevenRecordsPopup} onOpenChange={setShowSevenRecordsPopup}>
        <DialogContent className="sm:max-w-md border-[#E8E2FF] bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-[#333333]">
              7개의 기록이 쌓였어요
            </DialogTitle>
            <DialogDescription className="text-center text-[#555555] pt-2">
              7개의 기록이 쌓여 당신의 패턴을 종합해서 보여드릴 수 있어요.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col pt-4">
            <Link
              href="/analysis"
              onClick={() => setShowSevenRecordsPopup(false)}
              className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
            >
              종합분석 바로보기
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
