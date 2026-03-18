'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    setIsExiting(true)
    setTimeout(() => {
      router.push('/pattern')
    }, 500)
  }

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center bg-[#FDFCFE] transition-opacity duration-500 ease-out pt-[22vh] md:pt-0 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FC 100%)',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* 감성용 배경 - 보라색 원 (절대 버튼 아님) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div
          className="w-56 h-56 sm:w-64 sm:h-64 rounded-full animate-landing-pulse"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(200, 180, 255, 0.5), rgba(230, 220, 255, 0.3))',
            boxShadow: '0 0 60px rgba(180, 160, 230, 0.25), inset 0 0 40px rgba(255, 255, 255, 0.4)',
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="text-sm text-[#888]">
          요즘
        </span>

        <h1 className="mt-2 text-[18px] sm:text-[22px] font-semibold text-[#111] leading-snug max-w-[280px]">
          어디에 더 신경 쓰여요?
        </h1>

        <button
          type="button"
          onClick={handleStart}
          className="mt-4 py-4 px-5 text-[14px] sm:text-[16px] font-medium text-[#111] hover:opacity-70 active:opacity-90 transition-opacity duration-200 cursor-pointer"
          style={{ fontFamily: 'inherit' }}
        >
          지금 선택하기 &gt;
        </button>
      </div>
    </main>
  )
}
