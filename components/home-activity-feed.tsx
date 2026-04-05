'use client'

import * as React from 'react'
import { HOME_ACTIVITY_CURATED } from '@/lib/home-activity-curated'

type FeedItem = { text: string; age: string; source?: 'curated' | 'service' }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false)

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return reduced
}

function buildTickerSegment(items: FeedItem[]): string {
  return items
    .map((l) => `${l.text} · ${l.age}`)
    .join('    ·    ')
}

export function HomeActivityFeed() {
  const [items, setItems] = React.useState<FeedItem[]>(() =>
    HOME_ACTIVITY_CURATED.map((l) => ({ ...l, source: 'curated' as const })),
  )
  const [hasService, setHasService] = React.useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/activity-feed', { cache: 'no-store' })
        const json = (await res.json()) as {
          items?: { text: string; age: string; source?: 'service' }[]
        }
        const live = json.items ?? []
        if (cancelled) return
        if (!live.length) return
        setHasService(true)
        const curated = HOME_ACTIVITY_CURATED.map((l) => ({
          ...l,
          source: 'curated' as const,
        }))
        setItems(shuffle([...live, ...curated]))
      } catch {
        /* 큐레이션만 유지 */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const segment = React.useMemo(() => buildTickerSegment(items), [items])
  const first = items[0]

  if (!first) return null

  return (
    <section
      className="mx-auto w-[88%] max-w-full rounded-lg border border-[#E8E2FF] bg-white/90 px-2 py-1.5 shadow-sm sm:w-[85%] md:w-[88%]"
      aria-label="실시간 패턴 흐름"
    >
      <p className="text-center text-[9px] font-semibold uppercase tracking-wide text-[#8E7CFF]/90">
        실시간 패턴
      </p>

      {prefersReducedMotion ? (
        <p
          className="mt-1 line-clamp-2 text-center text-[11px] font-medium leading-snug text-[#333333]"
          title={segment}
        >
          {first.text}
          <span className="text-[#8E7CFF]"> · {first.age}</span>
        </p>
      ) : (
        <div
          className="relative mt-1 overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
        >
          <div className="home-ticker-track">
            <span className="inline-block shrink-0 whitespace-nowrap pr-10 text-[11px] font-medium leading-snug text-[#333333]">
              {segment}
            </span>
            <span
              className="inline-block shrink-0 whitespace-nowrap pr-10 text-[11px] font-medium leading-snug text-[#333333]"
              aria-hidden
            >
              {segment}
            </span>
          </div>
        </div>
      )}

      <p className="mt-1 line-clamp-2 text-center text-[8px] leading-tight text-[#999999]">
        예시는 공개 댓글·발언 기반.
        {hasService ? ' 서비스는 태그만.' : ''}
      </p>
    </section>
  )
}
