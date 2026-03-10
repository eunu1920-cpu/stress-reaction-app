'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

function isKakaoTalkInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false
  return navigator.userAgent.toUpperCase().includes('KAKAOTALK')
}

export function KakaoInAppBrowserModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isKakaoTalkInAppBrowser()) {
      setOpen(true)
    }
  }, [])

  const handleOpenInBrowser = () => {
    const url = window.location.href
    const opened = window.open(url, '_blank', 'noopener,noreferrer')
    if (!opened) {
      navigator.clipboard?.writeText(url)
      alert('링크를 복사했습니다. 브라우저 주소창에 붙여넣어 열어주세요.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#333333]">
            카카오톡에서 접속 중입니다
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">
            카카오톡 내부 브라우저에서는 Google 로그인이 제한됩니다.
            {'\n'}브라우저에서 열어 계속 진행해주세요.
          </p>
          <button
            type="button"
            onClick={handleOpenInBrowser}
            className="w-full py-2 px-4 rounded-lg bg-[#8E7CFF] text-white text-sm font-medium hover:bg-[#7D6BEE] transition-colors"
          >
            브라우저에서 열기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
