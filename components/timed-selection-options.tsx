'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { playSound } from '@/lib/play-sound'

const TIMER_MS = 30000
const HINT_AT_MS = 7000
const MESSAGE_DELAY_MS = 500
const TRANSITION_DURATION_MS = 1500

export type TimedSelectionPhase = 'choosing' | 'transition' | 'result'

export type TimedSelectionOption = {
  id: string
  label: string
}

type TimedSelectionOptionsProps<T extends TimedSelectionOption> = {
  options: T[]
  onSelect: (option: T) => void
  onTimeout: () => T
  disabled?: boolean
  enabled?: boolean
}

export function TimedSelectionOptions<T extends TimedSelectionOption>({
  options,
  onSelect,
  onTimeout,
  disabled = false,
  enabled = true,
}: TimedSelectionOptionsProps<T>) {
  const [phase, setPhase] = useState<TimedSelectionPhase>('choosing')
  const [showHint, setShowHint] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [transitionMessage, setTransitionMessage] = useState<string>('')
  const [isUserChoice, setIsUserChoice] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hintRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (hintRef.current) {
      clearTimeout(hintRef.current)
      hintRef.current = null
    }
    transitionTimersRef.current.forEach(clearTimeout)
    transitionTimersRef.current = []
  }, [])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  useEffect(() => {
    if (!enabled || phase !== 'choosing' || disabled) return

    hintRef.current = setTimeout(() => {
      setShowHint(true)
    }, HINT_AT_MS)

    timerRef.current = setTimeout(() => {
      clearTimers()
      if (phase !== 'choosing') return
      const fallback = onTimeout()
      setTransitionMessage('잠깐 멈춘 상태네요\n이럴 때는 보통 이런 흐름이 나타납니다')
      setIsUserChoice(false)
      setPhase('transition')
      playSound('SOUND_02')

      const t = setTimeout(() => {
        playSound('SOUND_03')
        onSelect(fallback)
        setPhase('result')
      }, TRANSITION_DURATION_MS)
      transitionTimersRef.current.push(t)
    }, TIMER_MS)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (hintRef.current) {
        clearTimeout(hintRef.current)
        hintRef.current = null
      }
    }
  }, [enabled, phase, disabled, onTimeout, onSelect])

  const handleOptionClick = useCallback(
    (option: T) => {
      if (phase !== 'choosing' || disabled) return
      clearTimers()
      setSelectedId(option.id)
      setIsUserChoice(true)
      playSound('SOUND_01')

      const t1 = setTimeout(() => {
        setTransitionMessage('지금 당신은 이런 반응을 선택했습니다')
        setPhase('transition')
      }, MESSAGE_DELAY_MS)
      const t2 = setTimeout(() => {
        playSound('SOUND_03')
        onSelect(option)
        setPhase('result')
      }, MESSAGE_DELAY_MS + TRANSITION_DURATION_MS)
      transitionTimersRef.current.push(t1, t2)
    },
    [phase, disabled, onSelect, clearTimers]
  )

  if (!enabled) return null

  if (phase === 'transition') {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-[#E8E2FF] bg-white p-8 text-center shadow-sm">
        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-[#333333]">
          {transitionMessage}
        </p>
      </div>
    )
  }

  if (phase === 'result') {
    return null
  }

  return (
    <section className="flex flex-col gap-3">
      {showHint && (
        <p className="text-center text-sm text-[#888888] transition-opacity duration-300">
          어떤 쪽에 더 가까운지만 느껴보세요
        </p>
      )}
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionClick(option)}
              disabled={disabled}
              className={`flex min-h-[120px] w-full flex-col justify-start rounded-3xl border px-6 py-5 text-left text-[15px] font-medium text-[#333333] shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? 'animate-selection-feedback border-[#CFC2FF] bg-[#F3EEFF]'
                  : 'border-[#E8E2FF] bg-white hover:border-[#D8CCFF] hover:bg-[#FAF8FF]'
              }`}
            >
              <span className="block text-sm font-medium text-[#8E7CFF]">{option.id}</span>
              <span className="mt-1 block break-words leading-relaxed">{option.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
