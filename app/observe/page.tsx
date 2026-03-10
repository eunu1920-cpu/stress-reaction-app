'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { ComingSoonModal } from '@/components/coming-soon-modal'

const TEST_CATEGORIES = [
  { id: 'stress', href: '/stress', label: '스트레스', requiresLogin: false },
  { id: 'relation', href: '/relations', label: '인간관계', requiresLogin: true },
  { id: 'self', href: '/self', label: '자기 고민', requiresLogin: true },
] as const

export default function ObservePage() {
  const { isLoggedIn } = useAuth()
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  const handleTestClick = (item: (typeof TEST_CATEGORIES)[number]) => {
    if (item.requiresLogin && !isLoggedIn) {
      setComingSoonOpen(true)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] flex flex-col items-center p-6 py-12">
      <div className="flex flex-col items-center w-full max-w-2xl gap-10">
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">
            지금 나를 관찰합니다
          </h1>
        </header>

        {/* 1. 기록하기 */}
        <section className="w-full flex flex-col items-center gap-3">
          <Link
            href="/record"
            className="w-full max-w-sm px-8 py-5 bg-[#8E7CFF] text-white rounded-2xl text-lg font-semibold hover:bg-[#7D6BEE] transition-colors text-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            오늘 반응 기록하기
          </Link>
          <p className="text-sm text-[#555555] text-center leading-relaxed whitespace-pre-line">
            기록이 어렵다면
            {'\n'}테스트를 통해 오늘의 반응을 관찰할 수 있어요.
          </p>
        </section>

        {/* 2. 테스트하기 */}
        <section className="w-full flex flex-col items-center gap-4">
          <div className="text-center">
            <h2 className="text-base font-semibold text-[#333333] mb-1">
              관찰 테스트
            </h2>
            <p className="text-sm text-[#555555]">
              간단한 질문으로 반응 구조를 확인합니다.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TEST_CATEGORIES.map((item) =>
              item.requiresLogin && !isLoggedIn ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTestClick(item)}
                  className="rounded-full px-6 py-3 bg-white text-[#333333] text-sm font-medium border-2 border-[#E8E2FF] hover:bg-[#F5F3FA] hover:border-[#D8CCFF] transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className="rounded-full px-6 py-3 bg-white text-[#333333] text-sm font-medium border-2 border-[#E8E2FF] hover:bg-[#F5F3FA] hover:border-[#D8CCFF] transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </section>
      </div>

      <ComingSoonModal
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
      />
    </main>
  )
}
