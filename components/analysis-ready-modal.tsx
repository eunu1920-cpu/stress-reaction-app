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

/** 모달을 읽을 수 있게 한 뒤 자동 이동 (너무 짧으면 스크린리더·취소 여유가 부족해짐) */
const AUTO_NAVIGATE_MS = 3000

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

  /** 모달이 한 번 그려진 뒤에만 타이머 시작 — 첫 페인트 전에 replace 되어 ‘창이 안 뜬 것 같음’ 완화 */
  useEffect(() => {
    if (!open) return
    let timeoutId: ReturnType<typeof window.setTimeout> | undefined
    const rafId = requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        setOpen(false)
        router.replace('/analysis')
      }, AUTO_NAVIGATE_MS)
    })
    return () => {
      cancelAnimationFrame(rafId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [open, router])

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
          <p className="mt-3 text-center text-xs font-medium text-[#8E7CFF]">
            잠시 후 종합분석으로 이동해요
          </p>
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
