'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/', label: '홈', shortLabel: '홈' },
  { href: '/observe', label: '관찰', shortLabel: '관찰' },
  { href: '/history', label: '히스토리', shortLabel: '기록' },
  { href: '/analysis', label: '종합분석', shortLabel: '분석' },
] as const

function formatUserId(id: string): string {
  if (id.length < 36) return id
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`
}

export function AppNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user: authUser, logout, isDemoMode } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    router.push('/')
  }

  const displayUser = authUser

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#E8E2FF] bg-[#F5F3FA]/95 backdrop-blur supports-[backdrop-filter]:bg-[#F5F3FA]/80">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-1 px-4 sm:gap-2">
        <Link
          href="/"
          className="mr-2 shrink-0 text-base font-semibold text-[#333333] hover:text-[#5a4bb5] transition-colors sm:mr-4"
        >
          MyView
        </Link>
        {navItems.map(({ href, label, shortLabel }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-lg px-2 py-2 text-sm font-medium transition-colors sm:px-4 ${
                isActive
                  ? 'bg-[#8E7CFF] text-white'
                  : 'text-[#333333] hover:bg-[#E8E2FF] hover:text-[#5a4bb5]'
              }`}
            >
              <span className="md:hidden">{shortLabel}</span>
              <span className="hidden md:inline">{label}</span>
            </Link>
          )
        })}
        <div className="ml-auto flex items-center gap-1">
          {displayUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-medium text-[#666666] hover:bg-[#E8E2FF] hover:text-[#5a4bb5] flex items-center gap-1"
                >
                  계정 정보
                  {/* 질문 채택 시 표시: 아주 작은 보라 다이아몬드 뱃지 (adoptedCount > 0일 때) */}
                  {false && (
                    <span
                      className="inline-block w-1.5 h-1.5 rotate-45 bg-[#8E7CFF] shadow-[0_0_6px_rgba(142,124,255,0.6)]"
                      aria-hidden
                    />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[240px] p-4">
                <p className="text-sm font-semibold text-[#333333] mb-3">계정 정보</p>
                <div className="space-y-1.5 text-sm text-[#666666]">
                  <p>
                    이메일: {displayUser.email ?? (isDemoMode ? '데모 계정' : '-')}
                  </p>
                  <p className="font-mono text-xs break-all">
                    ID: {formatUserId(displayUser.id)}
                  </p>
                  <p className="pt-2 text-xs text-[#8E7CFF]/80">
                    당신이 깨운 타인의 리듬: 0명
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg px-3 py-2 text-xs font-medium text-[#666666] hover:bg-[#E8E2FF] hover:text-[#5a4bb5] transition-colors"
            title="테스트용: 다른 계정으로 로그인하려면 로그아웃하세요"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
