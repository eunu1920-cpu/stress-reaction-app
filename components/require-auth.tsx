'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/login-modal'

type RequireAuthProps = {
  children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isLoggedIn, login } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  if (isLoggedIn) {
    return <>{children}</>
  }

  return (
    <>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#E8E2FF] p-8 text-center">
          <p className="text-base font-semibold text-[#333333] mb-2">
            로그인이 필요합니다
          </p>
          <p className="text-sm text-[#555555] mb-6 leading-relaxed">
            히스토리와 종합 분석을 확인하려면
            <br />
            로그인해 주세요.
          </p>
          <button
            type="button"
            onClick={() => setLoginModalOpen(true)}
            className="w-full py-3.5 bg-[#8E7CFF] text-white rounded-2xl font-semibold hover:bg-[#7D6BEE] transition-colors"
          >
            로그인하기
          </button>
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
    </>
  )
}
