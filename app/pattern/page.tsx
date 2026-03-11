'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const PATTERN_CATEGORIES = [
  { id: 'stress', label: '스트레스 상황' },
  { id: 'relation', label: '인간관계' },
  { id: 'self', label: '자기 고민' },
] as const

const PATTERN_ANONYMOUS_KEY = 'myview-pattern-anonymous-id'

function getOrCreateAnonymousId(): string | null {
  if (typeof window === 'undefined') return null

  const stored = window.localStorage.getItem(PATTERN_ANONYMOUS_KEY)
  if (stored) return stored

  const nextId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`

  window.localStorage.setItem(PATTERN_ANONYMOUS_KEY, nextId)
  return nextId
}

export default function PatternPage() {
  const { user } = useAuth()
  const [infoModalOpen, setInfoModalOpen] = useState(false)

  const handleCategoryClick = async (item: (typeof PATTERN_CATEGORIES)[number]) => {
    setInfoModalOpen(true)

    const anonymousId = user?.id ? null : getOrCreateAnonymousId()

    const { error } = await supabase.from('pattern_interest_clicks').insert({
      user_id: user?.id ?? null,
      anonymous_id: anonymousId,
      button_type: item.id,
    })

    if (error) {
      console.error('[pattern_interest_clicks] insert failed:', error.message)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-[#333333]">
            패턴 돋보기 <span aria-hidden="true">🔎</span>
          </h1>

          <div className="mt-5 space-y-1 text-center">
            <p className="text-sm font-semibold text-[#333333]">
              오늘의 관찰 질문
            </p>
            <p className="text-sm text-[#666666]">
              1질문 · 1선택 · 1패턴 해석
            </p>
          </div>

          <div className="mt-5 h-px w-full bg-[#E8E2FF]" />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-4">
            {PATTERN_CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryClick(item)}
                className="w-full rounded-3xl border border-[#E8E2FF] bg-white px-6 py-5 text-center text-base font-semibold text-[#333333] shadow-sm transition-colors hover:bg-[#FAF8FF] hover:border-[#D8CCFF]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-1 text-center">
          <Link
            href="/observe"
            className="text-sm font-medium text-[#666666] transition-colors hover:text-[#5a4bb5]"
          >
            ← 관찰로 돌아가기
          </Link>
        </div>
      </div>

      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#333333]">
              패턴 돋보기
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-relaxed text-[#555555] whitespace-pre-line">
              {'패턴 수집을 위한 관찰 질문을 준비 중입니다.\n궁금한 항목을 눌러주세요.'}
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            onClick={() => setInfoModalOpen(false)}
            className="w-full rounded-2xl bg-[#8E7CFF] px-4 py-3.5 font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
          >
            확인
          </button>
        </DialogContent>
      </Dialog>
    </main>
  )
}
