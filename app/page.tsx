'use client'

import Link from 'next/link'
import { HomeActivityFeed } from '@/components/home-activity-feed'
import { HomePromoCarousel } from '@/components/home-promo-carousel'

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100dvh-3.5rem)] flex-col bg-[#FAFAFA] px-4 pb-8">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col py-6">
        <h1 className="text-center text-xl font-bold leading-snug tracking-tight text-[#333333] sm:text-[1.35rem]">
          무엇이 나를 건드렸을까?
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-[#555555]">
          기록과 질문으로 내 반응을 남겨두면, 비슷한 순간에 덜 막혀요.
        </p>

        <div className="mt-6 w-full">
          <HomeActivityFeed />
        </div>

        <p className="mt-4 text-center text-xs leading-snug text-[#666666]">
          먼저 떠오른 건 말이었을까, 행동이었을까
        </p>

        <div className="mt-5 flex w-full flex-col gap-2">
          <Link
            href="/record"
            className="flex w-full items-center justify-center rounded-2xl bg-[#8E7CFF] px-6 py-4 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-[#7D6BEE] active:scale-[0.99]"
          >
            한 줄만 남겨보기
          </Link>
          <Link
            href="/pattern"
            className="flex w-full items-center justify-center rounded-2xl border border-[#E8E2FF] bg-[#FAFAFA] px-6 py-3 text-center text-sm font-medium text-[#555555] transition-colors hover:bg-[#F0EDFF] active:scale-[0.99]"
          >
            내 패턴 보기
          </Link>
          <div className="flex flex-col gap-2 text-center">
            <p>
              <Link
                href="/mypick"
                className="text-sm text-[#8E7CFF] underline-offset-2 hover:underline"
              >
                급한 결정이 있을 때 · 둘 중 하나 골라보기
              </Link>
            </p>
            <p>
              <Link
                href="/fortune"
                className="text-sm text-[#8E7CFF] underline-offset-2 hover:underline"
              >
                오늘의 운세 보기
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 w-full">
          <div className="mb-3 text-center">
            <p className="text-sm font-semibold text-[#333333]">
              이렇게 이어서 써 볼 수 있어요
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#666666]">
              반복되는 순간에 덜 막히고, 내 반응을 스스로 알아가게 돼요.
            </p>
          </div>
          <HomePromoCarousel />
        </div>
      </div>
    </main>
  )
}
