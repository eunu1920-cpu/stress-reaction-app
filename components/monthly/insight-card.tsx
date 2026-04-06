import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type InsightCardProps = {
  title: string
  children: ReactNode
  className?: string
}

export function InsightCard({ title, children, className }: InsightCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-[#E8E2FF] bg-white p-4 shadow-sm',
        className,
      )}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
        {title}
      </h3>
      <div className="mt-2 text-sm font-medium leading-relaxed text-[#333333]">
        {children}
      </div>
    </article>
  )
}
