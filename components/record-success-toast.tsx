'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { loadRecords, getLocalAnalysis } from '@/lib/storage'
import { fetchLatestAnalysis } from '@/lib/analysis-storage'
import { getAnalysisProgress, ANALYSIS_BATCH_SIZE } from '@/lib/analysis-progress'

const TOAST_DURATION_MS = 6000

export type RecordSuccessHint = {
  remainingToNext: number
  readyForAnalysis: boolean
}

export async function getRecordSuccessHint(userId: string | null): Promise<RecordSuccessHint> {
  const hist = await loadRecords(userId)
  const last = userId
    ? (await fetchLatestAnalysis(userId))?.recordCount ?? null
    : getLocalAnalysis()?.recordCount ?? null
  const { recordsNeeded, canGenerateNext } = getAnalysisProgress(hist.length, last)
  return {
    remainingToNext: recordsNeeded,
    readyForAnalysis: canGenerateNext,
  }
}

export function showRecordSuccessToast(hint?: RecordSuccessHint) {
  const sub =
    hint?.readyForAnalysis === true
      ? '지금 종합 분석을 받을 수 있어요.'
      : hint && hint.remainingToNext > 0
        ? `종합 분석까지 ${hint.remainingToNext}개만 더 모이면 열려요.`
        : `기록이 ${ANALYSIS_BATCH_SIZE}개 모이면 종합 분석이 열려요.`

  return toast.custom(
    (id) => (
      <div className="flex min-w-[280px] max-w-md flex-col gap-3 rounded-xl border border-[#E8E2FF] bg-white px-4 py-4 shadow-lg">
        <p className="text-sm font-medium text-[#333333]">하나의 패턴이 추가되었어요</p>
        <p className="text-xs leading-relaxed text-[#666666]">{sub}</p>
        <div className="flex flex-nowrap gap-2">
          <Link
            href="/history"
            onClick={() => toast.dismiss(id)}
            className="flex-1 rounded-xl border border-[#8E7CFF] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#8E7CFF] transition-colors hover:bg-[#F8F5FF]"
          >
            히스토리 보기
          </Link>
          <Link
            href="/analysis"
            onClick={() => toast.dismiss(id)}
            className="flex-1 rounded-xl bg-[#8E7CFF] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
          >
            {hint?.readyForAnalysis ? '분석 받기' : '분석 보기'}
          </Link>
        </div>
      </div>
    ),
    { duration: TOAST_DURATION_MS }
  )
}
