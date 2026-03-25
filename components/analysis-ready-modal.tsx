'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/lib/auth-context'
import { ANALYSIS_BATCH_SIZE } from '@/lib/analysis-progress'
import { fetchLatestAnalysis } from '@/lib/analysis-storage'
import { getLocalAnalysis, loadRecords } from '@/lib/storage'

function modalStorageKey(userKey: string, threshold: number): string {
  return `myview_analysis_ready_modal_${userKey}_${threshold}`
}

export function AnalysisReadyModal() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const tryOpenForMilestone = useCallback(async () => {
    if (typeof window === 'undefined') return
    if (pathname === '/analysis' || pathname?.startsWith('/analysis/')) return

    const records = await loadRecords(user?.id ?? null)

    let recordsAtLastAnalysis: number | null = null
    if (user?.id) {
      const latest = await fetchLatestAnalysis(user.id)
      recordsAtLastAnalysis = latest?.recordCount ?? null
    } else {
      recordsAtLastAnalysis = getLocalAnalysis()?.recordCount ?? null
    }

    const threshold = (recordsAtLastAnalysis ?? 0) + ANALYSIS_BATCH_SIZE
    if (records.length < threshold) return

    const userKey = user?.id ?? 'nouser'
    const key = modalStorageKey(userKey, threshold)
    if (sessionStorage.getItem(key)) return

    sessionStorage.setItem(key, '1')
    setOpen(true)
  }, [pathname, user?.id])

  useEffect(() => {
    void tryOpenForMilestone()
  }, [tryOpenForMilestone])

  useEffect(() => {
    const handler = () => void tryOpenForMilestone()
    window.addEventListener('records-updated', handler)
    return () => window.removeEventListener('records-updated', handler)
  }, [tryOpenForMilestone])

  useEffect(() => {
    if (pathname === '/analysis' || pathname?.startsWith('/analysis/')) {
      setOpen(false)
    }
  }, [pathname])

  const goToAnalysis = () => {
    setOpen(false)
    router.push('/analysis')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-[calc(100%-2rem)] rounded-2xl border-[#E8E2FF] bg-white sm:max-w-md"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle className="text-center text-lg text-[#333333]">
            기록이 {ANALYSIS_BATCH_SIZE}개 모였어요
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-[#555555]">
            종합분석에서 AI가 지금까지의 패턴을 정리해 드려요. 지금 보러 갈까요?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <button
            type="button"
            onClick={goToAnalysis}
            className="w-full rounded-2xl bg-[#8E7CFF] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
          >
            종합분석 보러 가기
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded-2xl border border-[#E8E2FF] bg-[#F5F3FA] py-3 text-sm font-medium text-[#666666] transition-colors hover:bg-[#EDE9F7]"
          >
            나중에
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
