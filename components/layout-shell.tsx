'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnalysisReadyModal } from '@/components/analysis-ready-modal'
import { AppNav } from '@/components/app-nav'
import { PatternProgressBanner } from '@/components/PatternProgressBanner'

/** 푸터 「왜 이렇게 작동할까」 — 좌 MyView / 우 MyPick */
const WHY_MYVIEW_STANZAS: string[][] = [
  ['사람은 읽어서 이해하지 않는다', '질문이 생길 때 자기 것이 된다'],
  ['이 서비스는 답을 주지 않는다', '당신이 스스로 질문하게 만든다'],
]

const WHY_MYPICK_STANZAS: string[][] = [
  ['생각은 길어질수록 흐려지고', '선택은 할수록 선명해진다'],
  ['정답은 없다', '지금 하나를 고를 뿐이다'],
]

function WhyItWorksColumn({
  label,
  stanzas,
}: {
  label: string
  stanzas: string[][]
}) {
  return (
    <div className="flex min-w-0 flex-col text-center sm:text-left">
      <p className="mb-3 text-center text-sm font-semibold tracking-wide text-[#8E7CFF]">{label}</p>
      <div className="space-y-4">
        {stanzas.map((lines, i) => (
          <div key={i} className="space-y-1.5">
            {lines.map((line, j) => (
              <p key={j}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isLanding =
    pathname === '/promo' || pathname.startsWith('/result/stress')
  const showNav = !isLanding

  const showBanner = showNav && pathname !== '/'

  return (
    <>
      {showNav && <AppNav />}
      {showBanner && <PatternProgressBanner />}
      <AnalysisReadyModal />
      {children}
      {showNav && (
        <footer className="border-t border-[#E8E2FF] bg-[#F5F3FA] py-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4">
            <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
              <Link
                href="/privacy"
                className="text-xs text-[#888888] underline-offset-2 hover:text-[#5a4bb5] hover:underline"
              >
                개인정보 및 이용 안내
              </Link>
              <span className="hidden text-[#DDDDDD] sm:inline" aria-hidden>
                |
              </span>
              <a
                href="mailto:eunu1920@gmail.com"
                className="text-xs text-[#888888] underline-offset-2 hover:text-[#5a4bb5] hover:underline"
              >
                문의: eunu1920@gmail.com
              </a>
            </div>

            {/* native details: 푸터에서 접기 동작 안정화 */}
            <details
              key={pathname}
              className="w-full max-w-2xl open:[&>summary>span:last-child]:rotate-180"
            >
              <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-1 text-xs font-medium text-[#555555] underline-offset-2 transition-colors hover:text-[#5a4bb5] hover:underline [&::-webkit-details-marker]:hidden">
                왜 이렇게 작동할까
                <span className="text-[10px] text-[#888888] transition-transform" aria-hidden>
                  ▼
                </span>
              </summary>
              <div
                className="mt-3 border-t border-[#E8E2FF] pt-4 text-center text-sm leading-relaxed text-[#333333] antialiased sm:text-left"
                role="region"
                aria-label="왜 이렇게 작동할까"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="rounded-2xl border border-[#E8E2FF] bg-white p-4 shadow-sm">
                    <WhyItWorksColumn label="[MyView]" stanzas={WHY_MYVIEW_STANZAS} />
                  </div>
                  <div className="rounded-2xl border border-[#E8E2FF] bg-white p-4 shadow-sm">
                    <WhyItWorksColumn label="[MyPick]" stanzas={WHY_MYPICK_STANZAS} />
                  </div>
                </div>
              </div>
            </details>
          </div>
        </footer>
      )}
    </>
  )
}
