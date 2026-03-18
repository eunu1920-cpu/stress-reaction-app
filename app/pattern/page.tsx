'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { fetchTodayPatternCategoryChoice } from '@/lib/pattern-lens/storage'
import { supabase } from '@/lib/supabase'

const PATTERN_CATEGORIES = [
  { id: 'stress', label: '상황스트레스' },
  { id: 'relation', label: '관계 상황' },
  { id: 'self', label: '개인 상황' },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) {
      setSelectedCategory(null)
      return
    }

    let cancelled = false

    const load = async () => {
      const category = await fetchTodayPatternCategoryChoice(user.id)
      if (!cancelled) {
        setSelectedCategory(category)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [user?.id])

  const handleCategoryClick = async (item: (typeof PATTERN_CATEGORIES)[number]) => {
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
            {user ? (
              <p className="pt-2 text-sm leading-relaxed text-[#6E6E6E]">
                오늘은 세 가지 중 하나만 선택할 수 있어요. 가장 가까운 카테고리를 골라주세요.
              </p>
            ) : (
              <p className="pt-2 text-sm leading-relaxed text-[#6E6E6E]">
                먼저 둘러보실 수 있어요.
                <br />
                <span className="font-medium text-[#8E7CFF]">모든 질문</span>을 기록 없이 둘러볼 수 있어요.
              </p>
            )}
          </div>

          <div className="mt-5 h-px w-full bg-[#E8E2FF]" />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-4">
            {PATTERN_CATEGORIES.map((item) => {
              const isSelected = selectedCategory === item.id
              const isLocked = Boolean(selectedCategory) && !isSelected

              if (isLocked) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled
                    className="w-full rounded-3xl border border-[#E5DEFF] bg-[#F7F5FD] px-6 py-5 text-center text-base font-semibold text-[#A79DCB] shadow-sm"
                  >
                    <span className="block">{item.label}</span>
                    <span className="mt-1 block text-xs font-medium">내일 다시 열림</span>
                  </button>
                )
              }

              return (
                <Link
                  key={item.id}
                  onClick={() => handleCategoryClick(item)}
                  href={`/pattern/${item.id}`}
                  className={`w-full rounded-3xl border px-6 py-5 text-center text-base font-semibold shadow-sm transition-colors ${
                    isSelected
                      ? 'border-[#CFC2FF] bg-[#F3EEFF] text-[#5a4bb5] hover:bg-[#EEE7FF]'
                      : 'border-[#E8E2FF] bg-white text-[#333333] hover:border-[#D8CCFF] hover:bg-[#FAF8FF]'
                  }`}
                >
                  <span className="block">{item.label}</span>
                  {isSelected && (
                    <span className="mt-1 block text-xs font-medium">오늘 선택한 카테고리</span>
                  )}
                </Link>
              )
            })}
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
    </main>
  )
}
