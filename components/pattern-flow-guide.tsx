'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const STEPS: { n: number; title: string; detail?: string }[] = [
  { n: 1, title: '보라색 버튼으로 시작해요' },
  { n: 2, title: '관심 카테고리를 눌러요', detail: '상황스트레스 · 관계 · 개인 중 하나' },
  { n: 3, title: '상황 질문에 답해요', detail: '보이는 선택지를 누르면 돼요' },
  {
    n: 4,
    title: '해석 아래에서 공감 태그·한 줄',
    detail: '넣으면 패턴 분석이 더 정확해져요',
  },
  {
    n: 5,
    title: '5개가 모이면 종합분석에서 AI 분석',
    detail: '상단 숫자가 함께 올라가요',
  },
]

export type PatternFlowGuideProps = {
  /** 1~5: 해당 단계 강조 */
  activeStep?: 1 | 2 | 3 | 4 | 5
  /** 기본 접힘(모바일 여백 절약) */
  defaultOpen?: boolean
  className?: string
}

export function PatternFlowGuide({
  activeStep,
  defaultOpen = true,
  className = '',
}: PatternFlowGuideProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      className={`rounded-2xl border border-[#E8E2FF] bg-white shadow-sm ${className}`}
      aria-labelledby="pattern-flow-guide-title"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-[#FAF8FF] sm:px-5"
        aria-expanded={open}
      >
        <span id="pattern-flow-guide-title" className="text-sm font-semibold text-[#333333]">
          쓰는 순서
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-[#8E7CFF]" aria-hidden />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-[#8E7CFF]" aria-hidden />
        )}
      </button>
      {open && (
        <div className="space-y-2 border-t border-[#EEF0FF] px-4 pb-4 pt-1 sm:px-5">
          <ol className="space-y-2.5">
            {STEPS.map((s) => {
              const isActive = activeStep === s.n
              return (
                <li
                  key={s.n}
                  className={`flex gap-3 rounded-xl px-2 py-1.5 ${
                    isActive ? 'bg-[#F3EEFF] ring-1 ring-[#CFC2FF]' : ''
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-[#8E7CFF] text-white'
                        : 'bg-[#E8E2FF] text-[#5a4bb5]'
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-medium text-[#333333]">{s.title}</p>
                    {s.detail ? (
                      <p className="mt-0.5 text-xs leading-relaxed text-[#777777]">{s.detail}</p>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="rounded-lg bg-[#F8F5FF] px-3 py-2 text-xs leading-relaxed text-[#666666]">
            로그인 없이도 체험할 수 있어요.
          </p>
        </div>
      )}
    </section>
  )
}

/** 인라인 한 줄 (질문 화면 상단 등) */
export function PatternFlowStepHint({
  step,
  children,
  className = '',
}: {
  step: 1 | 2 | 3 | 4 | 5
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-2 text-sm text-[#555555] ${className}`}
      role="status"
    >
      <span className="inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-full bg-[#8E7CFF] px-2 text-xs font-bold text-white">
        {step}
      </span>
      <span>{children}</span>
    </p>
  )
}
