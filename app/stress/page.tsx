'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth-context'
import { hasTestToday } from '@/lib/daily-limits'

export default function StressPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState<'q1' | 'q2' | 'q3'>('q1')
  const [q1Answer, setQ1Answer] = useState<string>('')
  const [q2Answer, setQ2Answer] = useState<string>('')
  const [q3Answer, setQ3Answer] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    hasTestToday(user?.id ?? null).then((exists) => {
      if (!cancelled && exists) {
        toast.error('오늘 테스트는 이미 완료되었습니다.')
        router.replace('/')
      }
    })
    return () => { cancelled = true }
  }, [user?.id, router])

  const handleQ1Select = (value: string) => {
    setQ1Answer(value)
    setTimeout(() => setStep('q2'), 300)
  }

  const handleQ2Select = (value: string) => {
    setQ2Answer(value)
    setTimeout(() => setStep('q3'), 300)
  }

  const handleQ3Select = (value: string) => {
    setQ3Answer(value)
    setTimeout(() => {
      const params = new URLSearchParams()
      if (q1Answer) params.set('q1', q1Answer)
      if (value) params.set('q3', value)
      const query = params.toString()
      router.push(`/result/stress/${q2Answer}${query ? `?${query}` : ''}`)
    }, 300)
  }

  if (step === 'q1') {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full bg-white rounded-[18px] shadow-sm p-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#333333] leading-tight">
            {'스트레스받으면 몸에서 가장 자주 느끼는 신호는?'}
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-xl mt-4">
            {[
              { value: 'G1', label: '가슴이 답답해지고 숨이 얕아진다' },
              { value: 'G2', label: '심장이 빨리 뛰고 얼굴이 달아오른다' },
              { value: 'G3', label: '배가 뒤틀리거나 배앓이·배탈이 난다' },
              { value: 'G4', label: '머리가 멍해지거나 시야가 흐려진다' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQ1Select(option.value)}
                className="w-full px-6 py-4 bg-[#EFEFF3] text-[#333333] rounded-2xl text-left hover:bg-[#E8E2FF] active:bg-[#D8CCFF] transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (step === 'q2') {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full bg-white rounded-[18px] shadow-sm p-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#333333] leading-tight">
            {'이런 상황에서 특히'}
            <br />
            {'스트레스가 커진다.'}
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-xl mt-4">
            {[
              { value: 'S1', label: '주변이 사람많고 정신없을때' },
              { value: 'S2', label: '일정이 바뀌거나 예측이 안 될 때' },
              { value: 'S3', label: '생각할 틈없이 바로 결정해야 할 때' },
              { value: 'S4', label: '뭔가 정리해서 설명해야 할 때' },
              { value: 'S5', label: '내가 하던 방식, 규칙을 바꿔야 할 때' },
              { value: 'S6', label: '착오나 실수가 생겼을 때' },
              { value: 'S7', label: '분위기가 빠르게 바뀌고 경쟁적일 때' },
              { value: 'S8', label: '내가 왠지 빠지면 안 될 거 같은 책임감이나 부담이 느껴질 때' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQ2Select(option.value)}
                className="w-full px-6 py-4 bg-[#EFEFF3] text-[#333333] rounded-2xl text-left hover:bg-[#E8E2FF] active:bg-[#D8CCFF] transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (step === 'q3') {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full bg-white rounded-[18px] shadow-sm p-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#333333] leading-tight">
            {'그 때 일어나는 생각은?'}
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-xl mt-4">
            {[
              { value: 'T1', label: '"왜 그랬지..." 계속 생각난다' },
              { value: 'T2', label: '"지금 당장 해버리자"...급해진다' },
              { value: 'T3', label: '"일단 미루자"...느려진다' },
              { value: 'T4', label: '"내가 끝까지 하고 해야지"...붙잡힌다' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleQ3Select(option.value)}
                className="w-full px-6 py-4 bg-[#EFEFF3] text-[#333333] rounded-2xl text-left hover:bg-[#E8E2FF] active:bg-[#D8CCFF] transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return null
}
