'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { hasCompletedStressTest } from '@/lib/daily-limits'

export default function ObservePage() {
  const { user } = useAuth()
  const [hasCompleted, setHasCompleted] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user?.id) {
      setHasCompleted(null)
      return
    }
    let cancelled = false
    hasCompletedStressTest(user.id).then((result) => {
      if (!cancelled) setHasCompleted(result)
    })
    return () => {
      cancelled = true
    }
  }, [user?.id])

  const isReturningMode = hasCompleted === true

  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-[#333333] md:text-3xl">
            지금 나를 관찰합니다
          </h1>
        </header>

        {isReturningMode ? (
          <>
            {/* 재방문 모드: 테스트 슬림 배너 */}
            <section className="rounded-xl border border-[#E8E2FF] bg-white px-4 py-3 text-center shadow-sm">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-medium text-[#666666]">
                  나의 기본값 확인하기
                </span>
                <Link
                  href="/stress"
                  className="text-sm font-semibold text-[#8E7CFF] underline-offset-2 hover:underline"
                >
                  스트레스 반응 테스트 →
                </Link>
              </div>
            </section>

            {/* 재방문 모드: 기록·패턴 메인 (시선 유도) */}
            <section className="space-y-3">
              <p className="text-center text-sm font-medium text-[#555555]">
                오늘의 질문이 도착했습니다
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <Link
                  href="/record"
                  className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[#DCCFFF] bg-[#8E7CFF] px-6 py-6 text-center shadow-sm transition-colors hover:bg-[#7D6BEE] hover:border-[#CBB8FF]"
                >
                  <span className="text-base font-semibold text-white">
                    지금 반응 기록하기
                  </span>
                  <span className="mt-1 text-xs text-white/90">
                    기록하면 패턴이 쌓입니다
                  </span>
                </Link>

                <Link
                  href="/pattern"
                  className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[#DCCFFF] bg-white px-6 py-6 text-center shadow-sm transition-colors hover:border-[#CBB8FF] hover:bg-[#F8F5FF]"
                >
                  <span className="text-base font-semibold text-[#5a4bb5]">
                    패턴 돋보기 <span aria-hidden="true">🔎</span>
                  </span>
                  <span className="mt-1 text-xs text-[#555555]">
                    질문을 통해 반응 패턴을 살펴봅니다
                  </span>
                </Link>
              </div>
            </section>

            {/* 명예의 전당 - 데스크톱만, 은밀하고 고귀하게 */}
            <section className="hidden md:block mt-8">
              <div className="rounded-xl border border-[#E8E2FF]/60 bg-white/50 px-5 py-4 text-center shadow-sm">
                <p className="text-xs font-medium tracking-wide text-[#8E7CFF]/70 uppercase">
                  이번 주 가장 많은 사람의 무릎을 탁 치게 만든 &apos;오늘의 질문&apos;
                </p>
                <p className="mt-3 text-sm text-[#999999]">준비중</p>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* 최초 방문/미완료: 테스트 메인 */}
            <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-7 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-[#333333]">
                스트레스 반응 테스트
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                간단한 질문으로 스트레스 반응 패턴을 확인합니다.
              </p>

              <Link
                href="/stress"
                className="mt-5 inline-flex w-full max-w-sm items-center justify-center rounded-2xl bg-[#8E7CFF] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
              >
                테스트 시작
              </Link>
            </section>

            <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-7 text-center shadow-sm">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-[#333333]">
                  MyView
                </h2>
                <p className="text-sm leading-relaxed text-[#555555]">
                  기록하면 패턴이 쌓입니다.
                </p>
              </div>

              <Link
                href="/record"
                className="mt-5 inline-flex w-full max-w-sm items-center justify-center rounded-2xl border border-[#DCCFFF] bg-[#F0EBFF] px-8 py-4 text-base font-semibold text-[#5a4bb5] transition-colors hover:border-[#CBB8FF] hover:bg-[#E8E2FF]"
              >
                반응 바로 기록하기
              </Link>
            </section>

            <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-7 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-[#333333]">
                패턴 돋보기 <span aria-hidden="true">🔎</span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                질문을 통해 반응 패턴을 살펴봅니다.
              </p>

              <Link
                href="/pattern"
                className="mt-5 inline-flex w-full max-w-sm items-center justify-center rounded-2xl border border-[#DCCFFF] bg-white px-8 py-4 text-base font-semibold text-[#5a4bb5] transition-colors hover:border-[#CBB8FF] hover:bg-[#F8F5FF]"
              >
                질문 시작
              </Link>
            </section>

            <section className="hidden md:block mt-8">
              <div className="rounded-xl border border-[#E8E2FF]/60 bg-white/50 px-5 py-4 text-center shadow-sm">
                <p className="text-xs font-medium tracking-wide text-[#8E7CFF]/70 uppercase">
                  이번 주 가장 많은 사람의 무릎을 탁 치게 만든 &apos;오늘의 질문&apos;
                </p>
                <p className="mt-3 text-sm text-[#999999]">준비중</p>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
