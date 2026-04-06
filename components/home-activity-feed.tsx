'use client'

import * as React from 'react'
import { HOME_ACTIVITY_CURATED } from '@/lib/home-activity-curated'

const LIST_COUNT = 5
const REFETCH_MS = 45_000

type FeedItem = { text: string; age: string; source?: 'curated' | 'service' }

function curatedItems(): FeedItem[] {
  return HOME_ACTIVITY_CURATED.map((l) => ({ ...l, source: 'curated' as const }))
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

async function fetchActivityFeed(): Promise<FeedItem[]> {
  const res = await fetch('/api/activity-feed', { cache: 'no-store' })
  const json = (await res.json()) as {
    items?: { text: string; age: string; source?: 'service' }[]
  }
  const live = json.items ?? []
  return live.map((row) => ({
    ...row,
    source: 'service' as const,
  }))
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function lineSegments(lines: FeedItem[], keyPrefix: string) {
  return lines.map((line, i) => (
    <span
      key={`${keyPrefix}-${line.text}-${line.age}-${i}`}
      className="inline-flex shrink-0 items-baseline gap-1 whitespace-nowrap text-[13px] font-medium leading-snug text-[#333333]"
    >
      {line.text}
      <span className="text-[#8E7CFF]"> · {line.age}</span>
    </span>
  ))
}

export function HomeActivityFeed() {
  const [items, setItems] = React.useState<FeedItem[]>(() => curatedItems())
  const [mode, setMode] = React.useState<'curated' | 'live'>('curated')
  const reducedMotion = usePrefersReducedMotion()

  React.useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const live = await fetchActivityFeed()
        if (cancelled) return
        if (live.length > 0) {
          setMode('live')
          setItems(live)
        } else {
          setMode('curated')
          setItems(curatedItems())
        }
      } catch {
        /* 네트워크 실패 시 기존 표시 유지 */
      }
    }

    load()
    const id = window.setInterval(load, REFETCH_MS)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [])

  const lines = React.useMemo(() => {
    if (mode === 'live') {
      return items.slice(0, Math.min(LIST_COUNT, items.length))
    }
    const pool = shuffle(items)
    return pool.slice(0, Math.min(LIST_COUNT, pool.length))
  }, [items, mode])

  if (lines.length === 0) return null

  const footer =
    mode === 'live'
      ? '익명 기록 기준 · 태그만 표시'
      : '예시·발언 기반'

  const durationSec = Math.max(28, lines.length * 9)

  return (
    <section
      className="mx-auto w-[88%] max-w-full rounded-lg border border-[#E8E2FF] bg-white/90 px-3 py-3 shadow-sm sm:w-[85%] md:w-[88%]"
      aria-label="실시간 패턴"
    >
      <p className="text-center text-[10px] font-semibold uppercase tracking-wide text-[#8E7CFF]/90">
        실시간 패턴
      </p>

      {reducedMotion ? (
        <ul className="mt-3 space-y-2.5 text-left">
          {lines.map((line, i) => (
            <li
              key={`${mode}-${line.text}-${line.age}-${i}`}
              className="text-[13px] font-medium leading-snug text-[#333333]"
            >
              {line.text}
              <span className="text-[#8E7CFF]"> · {line.age}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mt-3 overflow-hidden" role="presentation">
          <div
            className="home-marquee-track flex w-max"
            style={
              {
                '--home-marquee-duration': `${durationSec}s`,
              } as React.CSSProperties
            }
          >
            <div className="flex shrink-0 items-center gap-10 pr-10">
              {lineSegments(lines, 'm1')}
            </div>
            <div className="flex shrink-0 items-center gap-10 pr-10">
              {lineSegments(lines, 'm2')}
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-center text-[8px] leading-tight text-[#999999]">
        {footer}
      </p>
    </section>
  )
}
