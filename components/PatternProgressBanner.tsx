'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { loadRecords } from '@/lib/storage'
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

  const refetch = useCallback(() => {
    Promise.all([
      loadRecords(user?.id ?? null),
      user?.id ? fetchLatestAnalysis(user.id) : Promise.resolve(null),
    ]).then(([records, latestAnalysis]) => {
      if (typeof currentCount !== 'number') {
        setResolvedCount(records.length)
      }
      setRecordsAtLastAnalysis(latestAnalysis?.recordCount ?? null)
    })
  }, [currentCount, user?.id])

  useEffect(() => {
    if (typeof currentCount === 'number') {
      setResolvedCount(currentCount)
    }

    let cancelled = false

    Promise.all([
      loadRecords(user?.id ?? null),
      user?.id ? fetchLatestAnalysis(user.id) : Promise.resolve(null),
    ]).then(([records, latestAnalysis]) => {
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

  useEffect(() => {
    const handler = () => refetch()
    window.addEventListener('records-updated', handler)
    return () => window.removeEventListener('records-updated', handler)
  }, [refetch])

  const progressCount = useMemo(
    () => getAnalysisProgress(resolvedCount, recordsAtLastAnalysis).progressCount,
    [recordsAtLastAnalysis, resolvedCount]
  )

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
        <p className="mt-1 text-center text-xs text-[#888888]">
          질문에 답할 때마다 1씩 쌓여요
        </p>
        <p className="mt-0.5 text-center text-xs text-[#888888]">
          {totalCount}개 모이면{' '}
          <span className="font-medium text-[#666666]">종합분석</span>에서 AI 패턴을 볼 수 있어요
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
