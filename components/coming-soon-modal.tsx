'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type ComingSoonModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNotify?: () => void
}

export function ComingSoonModal({
  open,
  onOpenChange,
  onNotify,
}: ComingSoonModalProps) {
  const handleNotify = () => {
    onNotify?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#333333]">
            서비스 준비 중
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-2">
          <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">
            이 서비스는 준비 중입니다.
            {'\n'}회원가입을 하시면
            {'\n'}서비스가 시작될 때 알림을 받으실 수 있어요.
          </p>
          <button
            type="button"
            onClick={handleNotify}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#8E7CFF] text-white font-semibold hover:bg-[#7D6BEE] transition-colors"
          >
            회원가입 알림 받기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
