import type { ObservationRecord } from '@/lib/history-storage'
import { isManualRecord } from '@/lib/history-storage'

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

function labelForCode(code: string): string {
  const c = code.toUpperCase()
  return SUBJECT_LABELS[c] || RELATION_LABELS[c] || INNER_LABELS[c] || c
}

/** 분석·히스토리 헤더 등에서 S/R/T 코드 → 앱 전체와 동일한 표시명 */
export function labelForPatternCode(code: string): string {
  return labelForCode(code)
}

export type PatternAxis = 'S' | 'R' | 'T'

export type DominantPatternChip = {
  axis: PatternAxis
  code: string
  label: string
  /** 해당 축에서 이 코드가 나온 횟수 */
  count: number
  /** 해당 월·해당 축(S만 / R만 / T만)에 붙은 기록 수(분모) */
  total: number
}

/**
 * 월 단위로 S·R·T 각각에서만 1위 코드(동률이면 코드 문자순).
 * 한 축에 기록이 없으면 그 축은 생략.
 */
export function dominantPatternChipsByAxisForMonth(
  recordsInMonth: ObservationRecord[],
): DominantPatternChip[] {
  const byAxis: Record<PatternAxis, Record<string, number>> = {
    S: {},
    R: {},
    T: {},
  }
  for (const r of recordsInMonth) {
    const code = extractPatternCode(r)
    if (!code) continue
    const prefix = code[0] as PatternAxis
    if (prefix !== 'S' && prefix !== 'R' && prefix !== 'T') continue
    byAxis[prefix][code] = (byAxis[prefix][code] ?? 0) + 1
  }

  const out: DominantPatternChip[] = []
  for (const axis of ['S', 'R', 'T'] as const) {
    const counts = byAxis[axis]
    const entries = Object.entries(counts)
    if (entries.length === 0) continue
    const total = entries.reduce((s, [, n]) => s + n, 0)
    const sorted = entries.sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1]
      return a[0].localeCompare(b[0])
    })
    const [code, count] = sorted[0]!
    out.push({
      axis,
      code,
      label: labelForCode(code),
      count,
      total,
    })
  }
  return out
}

/** S/R/T 코드만 집계 */
export function extractPatternCode(record: ObservationRecord): string | null {
  const raw = (record.resultType || record.patternCode || '').toUpperCase()
  if (/^S[1-8]$/.test(raw) || /^R[1-8]$/.test(raw) || /^T[1-8]$/.test(raw)) return raw
  const pc = (record.patternCode ?? '').toUpperCase()
  if (/^S[1-8]$/.test(pc) || /^R[1-8]$/.test(pc) || /^T[1-8]$/.test(pc)) return pc
  return null
}

export function monthKeyFromDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function groupRecordsByMonth(
  records: ObservationRecord[],
): Map<string, ObservationRecord[]> {
  const map = new Map<string, ObservationRecord[]>()
  for (const r of records) {
    const key = monthKeyFromDate(r.date)
    if (!key) continue
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(r)
  }
  for (const key of map.keys()) {
    map.get(key)!.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  return map
}

/** 최근 N개월 키 (YYYY-MM), 내림차순 */
export function recentMonthKeys(count: number, anchor?: Date): string[] {
  const d = anchor ?? new Date()
  const keys: string[] = []
  for (let i = 0; i < count; i++) {
    const x = new Date(d.getFullYear(), d.getMonth() - i, 1)
    const y = x.getFullYear()
    const m = String(x.getMonth() + 1).padStart(2, '0')
    keys.push(`${y}-${m}`)
  }
  return keys
}

export function formatMonthLabel(monthKey: string): string {
  const [y, m] = monthKey.split('-')
  if (!y || !m) return monthKey
  return `${Number(m)}월`
}

/** 히스토리 월 헤더용, 예: 2026년 4월 */
export function formatMonthHeading(monthKey: string): string {
  const [y, m] = monthKey.split('-')
  if (!y || !m) return monthKey
  return `${y}년 ${Number(m)}월`
}

export type MonthlyInsight = {
  monthKey: string
  monthLabelShort: string
  recordCount: number
  corePatternLine: string
  topTypes: { code: string; label: string; count: number }[]
  empathyLines: string[]
  question: string
  flowArrows: string
  nextChoices: [string, string]
  lockedPreviewLines: string[]
  /** 로그인 후 같은 항목의 조금 더 긴 문장 */
  lockedLinesFull: string[]
}

const EMPATHY_FALLBACK = [
  '그때는 그냥 참는 게 편했어요',
  '말로 꺼내기 전에 이미 몸이 반응했어요',
]

const QUESTIONS = [
  '비슷한 순간이 오면, 먼저 가만히 느끼는 건 무엇이었나요?',
  '그때 피하고 싶었던 건 상황이었나요, 감정이었나요?',
  '지금 돌이켜보면 가장 먼저 떠오르는 건 말이었나요, 행동이었나요?',
]

const FLOW_WORDS = ['버티기', '쌓임', '과부하', '거리두기', '정리', '되돌아보기']

const CHOICE_PAIRS: [string, string][] = [
  ['참기 전에 한 번 말하기', '생각 전에 한 번 움직이기'],
  ['한 줄만 먼저 적기', '5분만 자리 뜨기'],
  ['숨 한 번 고르기', '지금 느낌 한 단어로 말하기'],
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function buildMonthlyInsight(
  monthKey: string,
  recordsInMonth: ObservationRecord[],
): MonthlyInsight {
  const counts: Record<string, number> = {}
  for (const r of recordsInMonth) {
    const code = extractPatternCode(r)
    if (!code) continue
    counts[code] = (counts[code] ?? 0) + 1
  }

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([code, count]) => ({
      code,
      label: labelForCode(code),
      count,
    }))

  const top2 = sorted.slice(0, 3)
  const topLabel = top2[0]?.label

  let corePatternLine = ''
  if (recordsInMonth.length === 0) {
    corePatternLine = '이번 달 기록이 아직 없어요. 한 줄만 남겨도 흐름이 잡힙니다.'
  } else if (topLabel) {
    corePatternLine = `${topLabel} 반응이 이번 달에 자주 이어졌어요.`
  } else {
    corePatternLine = '이번 달은 기록이 쌓이면서 패턴이 조금씩 드러나고 있어요.'
  }

  const manualMemos = recordsInMonth
    .filter(isManualRecord)
    .map((r) => (r.memo ?? '').trim())
    .filter((m) => m.length >= 4)

  const empathyLines: string[] = []
  if (manualMemos.length > 0) {
    const h = hashString(monthKey)
    const a = manualMemos[h % manualMemos.length]
    empathyLines.push(a.length > 72 ? `${a.slice(0, 69)}…` : a)
    if (manualMemos.length > 1) {
      const b = manualMemos[(h + 1) % manualMemos.length]
      if (b !== empathyLines[0]) {
        empathyLines.push(b.length > 72 ? `${b.slice(0, 69)}…` : b)
      }
    }
  }
  while (empathyLines.length < 2 && empathyLines.length < EMPATHY_FALLBACK.length) {
    empathyLines.push(EMPATHY_FALLBACK[empathyLines.length])
  }

  const h = hashString(monthKey)
  const question = QUESTIONS[h % QUESTIONS.length]

  const flowStart = h % FLOW_WORDS.length
  const flowArrows = [
    FLOW_WORDS[flowStart % FLOW_WORDS.length],
    FLOW_WORDS[(flowStart + 1) % FLOW_WORDS.length],
    FLOW_WORDS[(flowStart + 2) % FLOW_WORDS.length],
    FLOW_WORDS[(flowStart + 3) % FLOW_WORDS.length],
  ].join(' → ')

  const nextChoices = CHOICE_PAIRS[h % CHOICE_PAIRS.length]

  const lockedPreviewLines = [
    '반복되는 축은 시간·관계·몸 중 어디에 가까웠는지',
    '같은 자극에 몸이 먼저 반응한 순간이 있었는지',
    '피할 수 없는 상황일 때 리스크가 커지는 패턴',
    '한 줄만 바꿔도 흐름이 달라질 수 있는 지점',
  ]

  const lockedLinesFull = [
    '반복되는 축은 시간·관계·몸 중 어디에 가까웠는지 — 이번 달 기록을 기준으로 보면, 한쪽에 계속 치우치지 않았는지 짚어볼 수 있어요.',
    '같은 자극에 몸이 먼저 반응한 순간이 있었는지, 그때는 어떤 선택을 했는지도 함께 보입니다.',
    '피할 수 없는 상황일 때 리스크가 커지는 패턴이 있는지, 스스로에게 물어볼 수 있어요.',
    '한 줄만 바꿔도 흐름이 달라질 수 있는 지점 — 아주 작은 행동부터 시도해 볼 수 있어요.',
  ]

  return {
    monthKey,
    monthLabelShort: formatMonthLabel(monthKey),
    recordCount: recordsInMonth.length,
    corePatternLine,
    topTypes: top2,
    empathyLines: empathyLines.slice(0, 2),
    question,
    flowArrows,
    nextChoices,
    lockedPreviewLines,
    lockedLinesFull,
  }
}
