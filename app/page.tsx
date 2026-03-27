'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100dvh-3.5rem)] flex-col bg-[#F5F3FA] px-4 pb-6">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-6">
        <h1 className="text-center text-2xl font-bold leading-snug tracking-tight text-[#333333] sm:text-[1.65rem]">
          <span className="block whitespace-pre-line">
            {`결정의 순간들\n급할 땐 지금 결정하고\n천천히 보면 패턴이 보인다.`}
          </span>
        </h1>

        <div className="mt-10 flex w-full flex-col gap-2">
          <Link
            href="/mypick"
            className="flex w-full items-center justify-center rounded-2xl bg-[#8E7CFF] px-6 py-4 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-[#7D6BEE] active:scale-[0.99]"
          >
            지금 결정하기
          </Link>
          <Link
            href="/pattern"
            className="flex w-full items-center justify-center rounded-2xl border-2 border-[#DDD4FF] bg-white px-6 py-3.5 text-center text-base font-medium text-[#333333] transition-colors hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.99]"
          >
            내 패턴 보기
          </Link>
          <p className="text-center">
            <Link
              href="/fortune"
              className="text-sm text-[#8E7CFF] underline-offset-2 hover:underline"
            >
              오늘의 운세 보기
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
