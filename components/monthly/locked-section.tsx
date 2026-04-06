'use client'

import { cn } from '@/lib/utils'

type LockedSectionProps = {
  lines: string[]
  unlocked: boolean
}

export function LockedSection({ lines, unlocked }: LockedSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[#DDD4FF] bg-[#FAFAFA] p-4',
        !unlocked && 'select-none',
      )}
      aria-label={unlocked ? '흐름 상세' : '잠긴 영역 미리보기'}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]/90">
        {unlocked ? '흐름 상세' : '더 보기'}
      </p>
      <ul className="space-y-3 text-sm leading-relaxed text-[#444444]">
        {lines.map((line, i) => (
          <li key={i} className={cn(!unlocked && 'blur-[3px]')}>
            {line}
          </li>
        ))}
      </ul>
      {!unlocked && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFAFA]/40 to-[#FAFAFA]/95"
          aria-hidden
        />
      )}
    </section>
  )
}
