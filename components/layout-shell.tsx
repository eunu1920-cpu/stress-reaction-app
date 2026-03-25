'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnalysisReadyModal } from '@/components/analysis-ready-modal'
import { AppNav } from '@/components/app-nav'
import { PatternProgressBanner } from '@/components/PatternProgressBanner'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding =
    pathname === '/promo' ||
    pathname === '/stress' ||
    pathname.startsWith('/result/stress')
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
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-2 px-4 text-center sm:flex-row sm:gap-4">
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
        </footer>
      )}
    </>
  )
}
