'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

type PatternInsightCollapsibleProps = {
  insight: string
  /** compact: 패턴 응답 플로우, comfortable: 히스토리 상세 */
  variant?: 'compact' | 'comfortable'
}

export function PatternInsightCollapsible({
  insight,
  variant = 'compact',
}: PatternInsightCollapsibleProps) {
  const [open, setOpen] = useState(false)
  const padding =
    variant === 'compact' ? 'px-4 py-4' : 'p-5'
  const bodyClass =
    variant === 'compact'
      ? 'text-sm leading-7 text-[#555555]'
      : 'text-sm leading-relaxed text-[#333333]'

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        'rounded-2xl border border-[#E8E2FF] bg-white',
        padding,
      )}
    >
      <CollapsibleTrigger
        type="button"
        className="flex w-full flex-nowrap items-center justify-between gap-2 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-[#8E7CFF] focus-visible:ring-offset-2"
      >
        {/* shrink·nowrap: html-to-image 캡처 시 라벨이 글자 단위로 줄바꿈되는 현상 방지 */}
        <span className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
          통찰
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-[#8E7CFF] transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <p className={cn('mt-2 break-keep', bodyClass)}>{insight}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
