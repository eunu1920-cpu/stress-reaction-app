'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        {/* HERO 영역 - 메시지 중심 */}
        <section className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#333333] md:text-3xl">
            나를 바꾸고 싶나요?
          </h1>
          <p className="text-base text-[#555555]">
            변화는 관찰에서 시작됩니다.
          </p>
          <p className="text-sm text-[#666666]">
            관찰 → 구조 확인 → 기록 → 패턴 분석 → 이해
          </p>
          <Link
            href="/observe"
            className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
          >
            오늘의 나를 관찰하기
          </Link>
        </section>

        {/* 서비스 작동 방식 섹션 */}
        <section className="space-y-6">
          <h2 className="text-center text-lg font-semibold text-[#333333]">
            마이뷰는 이렇게 작동합니다
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-2xl mb-3">🔍</p>
              <h3 className="text-sm font-semibold text-[#333333]">관찰 테스트</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                간단한 질문으로 스트레스 상황에서의 나의 반응 구조를 확인합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-2xl mb-3">🧠</p>
              <h3 className="text-sm font-semibold text-[#333333]">반응 구조 이해</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                신체 반응과 생각 흐름을 기반으로 나의 반응 패턴을 분석합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-2xl mb-3">📊</p>
              <h3 className="text-sm font-semibold text-[#333333]">패턴 분석</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                기록이 쌓이면 나의 반응 패턴을 AI가 정리해줍니다.
              </p>
            </div>
          </div>
        </section>

        <p className="text-center">
          <Link
            href="/fortune"
            className="text-sm text-[#8E7CFF] hover:underline"
          >
            오늘의 운세 보기
          </Link>
        </p>
      </div>
    </main>
  )
}
