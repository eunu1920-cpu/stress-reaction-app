'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { fetchRecords } from '@/lib/history-storage'
import { fetchLatestAnalysis } from '@/lib/analysis-storage'
import { ANALYSIS_BATCH_SIZE, getAnalysisProgress } from '@/lib/analysis-progress'

type PatternProgressBannerProps = {
  currentCount?: number
  totalCount?: number
  className?: string
}

export function PatternProgressBanner({
  currentCount,
  totalCount = ANALYSIS_BATCH_SIZE,
  className = '',
}: PatternProgressBannerProps) {
  const { user } = useAuth()
  const [resolvedCount, setResolvedCount] = useState(currentCount ?? 0)
  const [recordsAtLastAnalysis, setRecordsAtLastAnalysis] = useState<number | null>(null)

  useEffect(() => {
    if (typeof currentCount === 'number') {
      setResolvedCount(currentCount)
    }

    if (!user) {
      setResolvedCount(0)
      setRecordsAtLastAnalysis(null)
      return
    }

    let cancelled = false

    Promise.all([fetchRecords(user.id), fetchLatestAnalysis(user.id)]).then(([records, latestAnalysis]) => {
      if (cancelled) return
      if (typeof currentCount !== 'number') {
        setResolvedCount(records.length)
      }
      setRecordsAtLastAnalysis(latestAnalysis?.recordCount ?? null)
    })

    return () => {
      cancelled = true
    }
  }, [currentCount, user?.id])

  const progressCount = useMemo(
    () => getAnalysisProgress(resolvedCount, recordsAtLastAnalysis).progressCount,
    [recordsAtLastAnalysis, resolvedCount]
  )

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
