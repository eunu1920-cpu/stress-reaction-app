'use client'

import { usePathname } from 'next/navigation'
import { AppNav } from '@/components/app-nav'
import { PatternProgressBanner } from '@/components/PatternProgressBanner'
import { useAuth } from '@/lib/auth-context'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const isLanding =
    pathname === '/promo' ||
    pathname === '/stress' ||
    pathname.startsWith('/result/stress')
  const showNav = !isLanding && !!user

  return (
    <>
      {showNav && <AppNav />}
      {showNav && <PatternProgressBanner />}
      {children}
    </>
  )
}
