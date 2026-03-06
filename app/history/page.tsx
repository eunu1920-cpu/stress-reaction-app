'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ObservationRecord } from '@/lib/history-storage'
import { getHistory } from '@/lib/history-storage'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

function formatDate(dateString: string) {
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return dateString
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`
}

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<ObservationRecord[] | null>(null)

  useEffect(() => {
    const data = getHistory()
    const sorted = data
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setHistory(sorted)
  }, [])

  const isLoading = history === null
  const hasNoData = history !== null && history.length === 0

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          나의 자기관찰 기록
        </h1>

        {isLoading && (
          <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
            기록을 불러오는 중입니다.
          </div>
        )}

        {hasNoData && !isLoading && (
          <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
            아직 기록이 없습니다.
          </div>
        )}

        {history && history.length > 0 && (
          <div className="flex flex-col gap-4">
            {history.map((record) => {
              const handleClick = () => {
                const type = (record.resultType || '').toUpperCase()
                if (!type) return
                router.push(`/result/${type}`)
              }

              const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleClick()
                }
              }

              return (
                <Card
                  key={record.id}
                  role="button"
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  className="cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardHeader>
                    <CardTitle>{formatDate(record.date)}</CardTitle>
                    <CardDescription>결과 타입: {record.resultType}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {record.summary}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

