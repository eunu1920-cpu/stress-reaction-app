'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type LoginModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin?: (email?: string) => Promise<{ emailSent?: boolean; error?: string } | void>
  variant?: 'save' | 'access'
}

export function LoginModal({
  open,
  onOpenChange,
  onLogin,
  variant = 'save',
}: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const isSaveVariant = variant === 'save'

  const handleGoogleLogin = async () => {
    setEmailError(null)
    const result = await onLogin?.('google')
    if (result && 'error' in result) {
      setEmailError(result.error ?? 'Google 로그인에 실패했습니다.')
      return
    }
    onOpenChange(false)
  }

  const handleKakaoLogin = async () => {
    setEmailError(null)
    const result = await onLogin?.('kakao')
    if (result && 'error' in result) {
      setEmailError(result.error ?? '카카오 로그인에 실패했습니다.')
      return
    }
    onOpenChange(false)
  }

  const handleEmailLogin = async () => {
    const trimmed = email.trim()
    if (!trimmed) {
      setEmailError('이메일을 입력해주세요.')
      return
    }
    setEmailError(null)
    const result = await onLogin?.(trimmed)
    if (result && 'error' in result) {
      setEmailError(result.error)
      return
    }
    if (result?.emailSent) {
      setEmailSent(true)
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setEmail('')
      setEmailSent(false)
      setEmailError(null)
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#333333]">
            {isSaveVariant ? '기록 저장' : '로그인이 필요합니다'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-2">
          <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">
            {isSaveVariant
              ? '기록을 저장하려면 로그인이 필요합니다.\n로그인하면 나의 반응 패턴을 기록하고\n히스토리와 종합 분석을 확인할 수 있습니다.'
              : '이 기능을 사용하려면 로그인이 필요합니다.'}
          </p>

          {emailSent ? (
            <div className="rounded-xl bg-[#E8E2FF]/50 p-4 text-center">
              <p className="text-sm font-medium text-[#5a4bb5]">
                이메일을 확인해주세요.
              </p>
              <p className="text-xs text-[#555555] mt-1">
                {isSaveVariant
                  ? '링크를 클릭한 후 다시 저장해주세요.'
                  : '링크를 클릭한 후 페이지를 새로고침해주세요.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 rounded-xl border-2 border-[#E8E2FF] text-[#333333] font-medium hover:bg-[#F5F3FA] transition-colors"
              >
                Google 로그인
              </button>
              <button
                type="button"
                onClick={handleKakaoLogin}
                className="w-full py-3 px-4 rounded-xl border-2 border-[#E8E2FF] text-[#333333] font-medium hover:bg-[#F5F3FA] transition-colors"
              >
                카카오로 로그인
              </button>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border-2 border-[#E8E2FF] px-4 py-3 text-sm placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8E7CFF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleEmailLogin}
                  className="shrink-0 py-3 px-4 rounded-xl border-2 border-[#E8E2FF] text-[#333333] font-medium hover:bg-[#F5F3FA] transition-colors whitespace-nowrap"
                >
                  이메일 로그인
                </button>
              </div>
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
