'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/login-modal'
import { cn } from '@/lib/utils'

const SECOND_ROW = [
  { href: '/record', label: '기록' },
  { href: '/pattern', label: '패턴' },
  { href: '/history', label: '히스토리' },
  { href: '/analysis', label: '분석' },
  { href: '/stress', label: '테스트' },
] as const

function isSecondRowActive(pathname: string, href: string): boolean {
  if (href === '/stress') {
    return pathname === '/stress' || pathname.startsWith('/result/stress')
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function formatUserId(id: string): string {
  if (id.length < 36) return id
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`
}

export function AppNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user: authUser, logout, login, isDemoMode } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const displayUser = authUser
  const homeActive = pathname === '/'

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#E8E2FF] bg-[#F5F3FA]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F5F3FA]/80">
      <div className="mx-auto max-w-4xl px-3 sm:px-4">
        {/* 1행: 브랜드 · 홈 · 계정 */}
        <div className="flex min-h-[3.25rem] items-center gap-2 py-2 sm:min-h-14 sm:gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="shrink-0 text-[15px] font-semibold tracking-tight text-[#333333] transition-colors hover:text-[#5a4bb5] sm:text-base"
            >
              MyView
            </Link>
            <span
              className="hidden h-4 w-px shrink-0 bg-[#DDD4FF] sm:block"
              aria-hidden
            />
            <Link
              href="/"
              className={cn(
                'shrink-0 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3',
                homeActive
                  ? 'bg-[#8E7CFF] text-white'
                  : 'text-[#555555] hover:bg-[#E8E2FF]/80 hover:text-[#5a4bb5]',
              )}
            >
              홈
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            {displayUser ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 text-xs font-medium text-[#666666] hover:bg-[#E8E2FF] hover:text-[#5a4bb5] sm:text-sm"
                    >
                      계정 정보
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[240px] p-4">
                    <p className="mb-3 text-sm font-semibold text-[#333333]">계정 정보</p>
                    <div className="space-y-1.5 text-sm text-[#666666]">
                      <p>
                        이메일: {displayUser.email ?? (isDemoMode ? '데모 계정' : '-')}
                      </p>
                      <p className="break-all font-mono text-xs">
                        ID: {formatUserId(displayUser.id)}
                      </p>
                      <p className="pt-2 text-xs text-[#8E7CFF]/80">
                        당신이 깨운 타인의 리듬: 0명
                      </p>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-2 py-2 text-xs font-medium text-[#666666] transition-colors hover:bg-[#E8E2FF] hover:text-[#5a4bb5] sm:px-3"
                  title="테스트용: 다른 계정으로 로그인하려면 로그아웃하세요"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="shrink-0 whitespace-nowrap rounded-lg bg-[#8E7CFF] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7D6BEE] sm:px-4 sm:text-sm"
              >
                <span className="sm:hidden">로그인</span>
                <span className="hidden sm:inline">로그인 / 회원가입</span>
              </button>
            )}
          </div>
        </div>

        {/* 2행: 흐름 링크 */}
        <div className="border-t border-[#E8E2FF]/90 pb-2 pt-1.5">
          <div
            className="-mx-1 flex items-stretch justify-between gap-0.5 overflow-x-auto px-1 sm:mx-0 sm:justify-start sm:gap-1 sm:px-0 sm:pb-0.5 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="navigation"
            aria-label="주요 메뉴"
          >
            {SECOND_ROW.map(({ href, label }) => {
              const active = isSecondRowActive(pathname, href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex min-w-0 flex-1 shrink-0 items-center justify-center rounded-lg px-1.5 py-2 text-center text-[11px] font-semibold transition-colors sm:flex-initial sm:px-3.5 sm:py-2 sm:text-sm',
                    active
                      ? 'bg-[#8E7CFF] text-white shadow-sm'
                      : 'text-[#444444] hover:bg-[#EDE8FF]/90 hover:text-[#5a4bb5]',
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={async (email?: string) => {
          const result = await login(email)
          if (result && 'user' in result) {
            setLoginModalOpen(false)
          }
          if (result && 'emailSent' in result) {
            return { emailSent: true }
          }
          if (result && 'error' in result) {
            return { error: result.error }
          }
        }}
        variant="access"
      />
    </nav>
  )
}
