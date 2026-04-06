import { Suspense } from 'react'
import { MonthlyAnalysisPageInner } from '@/components/monthly/monthly-analysis-page'

export default function MonthlyAnalysisPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-[#F5F3FA] px-4">
          <p className="text-sm text-[#666666]">불러오는 중…</p>
        </main>
      }
    >
      <MonthlyAnalysisPageInner />
    </Suspense>
  )
}
