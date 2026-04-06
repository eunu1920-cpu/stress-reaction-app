'use client'

import { cn } from '@/lib/utils'

type MonthSelectorProps = {
  months: { key: string; label: string }[]
  selected: string
  onSelect: (monthKey: string) => void
}

export function MonthSelector({ months, selected, onSelect }: MonthSelectorProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2"
      role="tablist"
      aria-label="월 선택"
    >
      {months.map(({ key, label }) => {
        const isActive = key === selected
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(key)}
            className={cn(
              'min-w-[4.5rem] rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
              isActive
                ? 'bg-[#8E7CFF] text-white shadow-sm'
                : 'border border-[#E8E2FF] bg-white text-[#555555] hover:bg-[#F5F3FA]',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
