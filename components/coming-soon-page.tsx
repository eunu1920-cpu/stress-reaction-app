'use client'

import Link from 'next/link'

export function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
      <div className="flex flex-col items-center text-center gap-8 max-w-md bg-white rounded-[18px] shadow-sm p-10">
        <p className="text-base md:text-lg text-[#666666] leading-relaxed whitespace-pre-line">
          이 서비스는 준비 중입니다.
          {'\n'}회원가입을 하시면
          {'\n'}서비스가 시작될 때 알림을 받으실 수 있어요.
        </p>
        <button
          type="button"
          className="w-full max-w-xs px-8 py-4 bg-[#8E7CFF] text-white rounded-2xl text-base font-medium hover:bg-[#7D6BEE] transition-colors"
        >
          회원가입 알림 받기
        </button>
        <Link
          href="/"
          className="text-sm text-[#666666] hover:text-[#8E7CFF] transition-colors"
        >
          홈으로
        </Link>
      </div>
    </main>
  )
}
