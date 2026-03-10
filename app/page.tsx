'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F3FA] flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8">
      <div className="w-full max-w-[900px] mx-auto mt-8 sm:mt-12 flex flex-col items-center text-center gap-12 sm:gap-16">
        {/* HERO 영역 - 메시지 중심 */}
        <section className="max-w-[520px] flex flex-col items-center gap-4 sm:gap-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] leading-tight">
            나를 바꾸고 싶나요?
          </h1>
          <p className="text-base md:text-lg text-[#333333] font-medium leading-snug mt-1">
            변화는 관찰에서 시작됩니다.
          </p>
          <p className="text-sm text-[#555555] opacity-90 leading-snug mt-2">
            관찰 → 구조 확인 → 기록 → 패턴 분석 → 이해
          </p>
          <Link
            href="/observe"
            className="mt-6 inline-flex items-center justify-center w-full max-w-[280px] rounded-2xl px-6 py-4 text-base font-semibold text-white bg-[#8E7CFF] hover:bg-[#7D6BEE] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            오늘의 나를 관찰하기
          </Link>
        </section>

        {/* 서비스 작동 방식 섹션 */}
        <section className="w-full">
          <h2 className="text-base md:text-lg font-semibold text-[#333333] mb-5">
            마이뷰는 이렇게 작동합니다
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left md:text-center">
            <div className="rounded-[16px] bg-white shadow-sm border border-[#E8E2FF] p-5 md:p-6 flex flex-col items-start md:items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow">
              <span className="text-xl md:text-2xl" aria-hidden="true">
                🔍
              </span>
              <h3 className="text-sm font-semibold text-[#333333]">
                관찰 테스트
              </h3>
              <p className="text-xs text-[#555555] leading-snug">
                간단한 질문으로 스트레스 상황에서의 나의 반응 구조를 확인합니다.
              </p>
            </div>
            <div className="rounded-[16px] bg-white shadow-sm border border-[#E8E2FF] p-5 md:p-6 flex flex-col items-start md:items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow">
              <span className="text-xl md:text-2xl" aria-hidden="true">
                🧠
              </span>
              <h3 className="text-sm font-semibold text-[#333333]">
                반응 구조 이해
              </h3>
              <p className="text-xs text-[#555555] leading-snug">
                신체 반응과 생각 흐름을 기반으로 나의 반응 패턴을 분석합니다.
              </p>
            </div>
            <div className="rounded-[16px] bg-white shadow-sm border border-[#E8E2FF] p-5 md:p-6 flex flex-col items-start md:items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow">
              <span className="text-xl md:text-2xl" aria-hidden="true">
                📊
              </span>
              <h3 className="text-sm font-semibold text-[#333333]">
                패턴 분석
              </h3>
              <p className="text-xs text-[#555555] leading-snug">
                기록이 쌓이면 나의 반응 패턴을 AI가 정리해줍니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
