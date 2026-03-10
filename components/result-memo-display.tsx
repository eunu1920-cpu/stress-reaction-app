'use client'

import { useEffect, useState } from 'react'
import { fetchRecords } from '@/lib/history-storage'
import { useAuth } from '@/lib/auth-context'

type Props = {
  resultType: string
}

export function ResultMemoDisplay({ resultType }: Props) {
  const { user } = useAuth()
  const [memo, setMemo] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchRecords(user?.id ?? null).then((records) => {
      if (cancelled) return
      const typeUpper = resultType.toUpperCase()
      const sorted = records
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      const match = sorted.find(
        (r) => (r.resultType || '').toUpperCase() === typeUpper
      )
      setMemo(match?.memo ?? null)
    })
    return () => { cancelled = true }
  }, [resultType, user?.id])

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
      <h3 className="text-base font-semibold text-[#333333] mb-2">
        나의 기록
      </h3>
      <p className="text-sm text-[#555555] leading-relaxed">
        {memo?.trim() ? memo : '기록 없음'}
      </p>
    </section>
  )
}
