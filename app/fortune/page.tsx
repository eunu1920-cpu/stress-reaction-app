'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getFortuneForToday } from '@/lib/fortune-data'

const ZODIAC_SIGNS = [
  { id: 'rat', label: '쥐', emoji: '🐀' },
  { id: 'ox', label: '소', emoji: '🐂' },
  { id: 'tiger', label: '호랑이', emoji: '🐅' },
  { id: 'rabbit', label: '토끼', emoji: '🐇' },
  { id: 'dragon', label: '용', emoji: '🐉' },
  { id: 'snake', label: '뱀', emoji: '🐍' },
  { id: 'horse', label: '말', emoji: '🐴' },
  { id: 'goat', label: '양', emoji: '🐏' },
  { id: 'monkey', label: '원숭이', emoji: '🐒' },
  { id: 'rooster', label: '닭', emoji: '🐓' },
  { id: 'dog', label: '개', emoji: '🐕' },
  { id: 'pig', label: '돼지', emoji: '🐷' },
] as const

export default function FortunePage() {
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null)

  if (selectedZodiac) {
    const fortune = getFortuneForToday(selectedZodiac)
    const zodiacInfo = ZODIAC_SIGNS.find((z) => z.id === selectedZodiac)

    return (
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-10 sm:px-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-[#333333] md:text-3xl">
              오늘의 운세
            </h1>
            <p className="mt-2 text-sm text-[#666666]">
              {zodiacInfo?.emoji} {zodiacInfo?.label}띠
            </p>
          </header>

          <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-8 shadow-sm">
            <div className="space-y-4 text-base leading-relaxed text-[#333333]">
              <p>오늘은 {fortune.slot1}</p>
              <p>이건 {fortune.slot2Prefix ?? '운이 아니라'} {fortune.slot2}</p>
              <p>그래서 오늘은 {fortune.slot3}</p>
              {fortune.slot4 && (
                <p>그래도 {fortune.slot4}</p>
              )}
              <p className="mt-6 font-medium text-[#8E7CFF]">
                👉 {fortune.question}
              </p>
            </div>
          </section>

          <Link
            href="/pattern"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#8E7CFF] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
          >
            이 질문으로 패턴 살펴보기
            <span aria-hidden>→</span>
          </Link>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setSelectedZodiac(null)}
              className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-4 text-sm font-medium text-[#666666] transition-colors hover:bg-[#E8E2FF]"
            >
              다른 띠로 다시 보기
            </button>
            <Link
              href="/"
              className="text-center text-sm text-[#8E7CFF] hover:underline"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-[#333333] md:text-3xl">
            오늘의 운세
          </h1>
          <p className="mt-2 text-sm text-[#666666]">
            나의 띠를 선택해 보세요
          </p>
        </header>

        <section className="grid grid-cols-4 gap-3 sm:grid-cols-4 sm:gap-4">
          {ZODIAC_SIGNS.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => setSelectedZodiac(z.id)}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#E8E2FF] bg-white p-4 text-center shadow-sm transition-all hover:border-[#8E7CFF] hover:bg-[#F5F3FA] hover:shadow-md active:scale-[0.98]"
            >
              <span className="text-3xl sm:text-4xl" aria-hidden>
                {z.emoji}
              </span>
              <span className="text-xs font-medium text-[#333333] sm:text-sm">
                {z.label}
              </span>
            </button>
          ))}
        </section>

        <Link
          href="/"
          className="text-center text-sm text-[#8E7CFF] hover:underline"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
