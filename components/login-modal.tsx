'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  variant?: 'save' | 'access' | 'record'
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
  const isRecordVariant = variant === 'record'

  const handleGoogleLogin = async () => {
    setEmailError(null)
    const result = await onLogin?.('google')
    if (result && 'error' in result) {
      setEmailError(result.error ?? 'Google 로그인에 실패했습니다.')
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
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-lg font-semibold text-[#333333]">
            {isSaveVariant ? '기록 저장' : '로그인이 필요합니다'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2 min-h-0 overflow-y-auto flex-1">
          <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">
            {isSaveVariant
              ? "무료로그인하면 더 많은 '상태카드'가 있어요."
              : isRecordVariant
                ? '로그인하면 기록이 저장되고, 7개의 기록이 쌓이면 내 반응 패턴이 보이기 시작해요.'
                : '이 기능을 사용하려면 로그인이 필요합니다.'}
          </p>

          {emailSent ? (
            <div className="rounded-xl bg-[#E8E2FF]/50 p-4 text-center">
              <p className="text-sm font-medium text-[#5a4bb5]">
                이메일을 확인해주세요.
              </p>
              <p className="text-xs text-[#555555] mt-1">
                {isSaveVariant || isRecordVariant
                  ? '링크를 클릭한 후 다시 시도해주세요.'
                  : '링크를 클릭한 후 페이지를 새로고침해주세요.'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2 px-3 rounded-lg border border-[#E8E2FF] text-sm text-[#333333] font-medium hover:bg-[#F5F3FA] transition-colors"
              >
                Google 로그인
              </button>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 rounded-lg border border-[#E8E2FF] px-3 py-2 text-sm placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8E7CFF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleEmailLogin}
                  className="w-full py-2 px-3 rounded-lg border border-[#E8E2FF] text-sm text-[#333333] font-medium hover:bg-[#F5F3FA] transition-colors"
                >
                  이메일 로그인
                </button>
              </div>
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>
          )}
          <p className="pt-3 text-center text-[11px] leading-relaxed text-[#999999]">
            <Link
              href="/privacy"
              className="text-[#8E7CFF] underline-offset-2 hover:underline"
              onClick={() => onOpenChange(false)}
            >
              개인정보 및 이용 안내
            </Link>
            <span className="text-[#CCCCCC]"> · </span>
            <a
              href="mailto:eunu1920@gmail.com"
              className="text-[#8E7CFF] underline-offset-2 hover:underline"
            >
              문의
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
