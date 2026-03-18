'use client'

import Link from 'next/link'
import { toast } from 'sonner'

const TOAST_DURATION_MS = 5500

export function showRecordSuccessToast() {
  return toast.custom(
    (id) => (
      <div className="flex min-w-[280px] max-w-md flex-col gap-3 rounded-xl border border-[#E8E2FF] bg-white px-4 py-4 shadow-lg">
        <p className="text-sm font-medium text-[#333333]">
          하나의 패턴이 추가되었어요
        </p>
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
            패턴 분석 보러가기
          </Link>
        </div>
      </div>
    ),
    { duration: TOAST_DURATION_MS }
  )
}
