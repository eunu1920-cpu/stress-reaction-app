'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { fetchRecords } from '@/lib/history-storage'

type PatternProgressBannerProps = {
  currentCount?: number
  totalCount?: number
  className?: string
}

export function PatternProgressBanner({
  currentCount,
  totalCount = 7,
  className = '',
}: PatternProgressBannerProps) {
  const { user } = useAuth()
  const [resolvedCount, setResolvedCount] = useState(currentCount ?? 0)

  useEffect(() => {
    if (typeof currentCount === 'number') {
      setResolvedCount(currentCount)
      return
    }

    if (!user) {
      setResolvedCount(0)
      return
    }

    let cancelled = false

    fetchRecords(user.id).then((records) => {
      if (cancelled) return
      setResolvedCount(records.length)
    })

    return () => {
      cancelled = true
    }
  }, [currentCount, user?.id])

  const progressCount = useMemo(() => {
    if (resolvedCount <= 0) return 0
    const remainder = resolvedCount % totalCount
    return remainder === 0 ? totalCount : remainder
  }, [resolvedCount, totalCount])

  if (!user) return null

  return (
    <div className="mt-3 px-4">
      <div
        className={[
          'mx-auto flex w-full max-w-4xl flex-col items-center justify-center',
          className,
        ].join(' ')}
      >
        <p className="text-center text-sm font-semibold leading-none text-[#5a4bb5]">
          패턴 분석까지 {progressCount} / {totalCount}
        </p>

        <div className="mt-2 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalCount }).map((_, index) => {
            const filled = index < progressCount

            return (
              <span
                key={index}
                className={[
                  'h-2 w-2 rounded-full transition-colors',
                  filled ? 'bg-[#8E7CFF]' : 'bg-[#D9D4E8]',
                ].join(' ')}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
