'use client'

import { usePathname } from 'next/navigation'
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
      {children}
    </>
  )
}
