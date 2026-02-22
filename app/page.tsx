'use client'

import { useState } from 'react'
import { ResultPage } from '@/components/result-page'

export default function LandingPage() {
  const [step, setStep] = useState<'landing' | 'q1' | 'q2' | 'q3' | 'result'>('landing')
  const [q1Answer, setQ1Answer] = useState<string>('')
  const [q2Answer, setQ2Answer] = useState<string>('')
  const [q3Answer, setQ3Answer] = useState<string>('')

  const handleStart = () => {
    setStep('q1')
  }

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
    setTimeout(() => setStep('result'), 300)
  }

  const handleRestart = () => {
    setQ1Answer('')
    setQ2Answer('')
    setQ3Answer('')
    setStep('q1')
  }

  if (step === 'landing') {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl bg-white rounded-[18px] shadow-sm p-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#333333] leading-tight whitespace-nowrap">
            스트레스 상황에서,
            <br />
            당신은 어떻게 반응하나요?
          </h1>

          <p className="text-base md:text-lg text-[#666666] leading-relaxed">
            {'오늘 뭔가 힘들다면,'}
            <br />
            {'감정이 아니라 반응 구조를 확인해보세요.'}
          </p>

          <button 
            onClick={handleStart}
            className="mt-6 px-12 py-4 bg-[#8E7CFF] text-white rounded-2xl text-base md:text-lg font-medium leading-relaxed hover:bg-[#7D6BEE] transition-colors"
          >
            {'내 스트레스'}
            <br />
            {'반응구조 확인하기'}
          </button>
        </div>
      </main>
    )
  }

  if (step === 'q1') {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl w-full bg-white rounded-[18px] shadow-sm p-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#333333] leading-tight">
            {'스트레스가 올라올 때,'}
            <br />
            {'몸에서 가장 먼저 느껴지는 것은?'}
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
              { value: 'S1', label: '사람이 많고 자극이 많은 환경' },
              { value: 'S2', label: '갑작스러운 일정 변경이나 예측 불가 상황' },
              { value: 'S3', label: '즉각적인 결정이나 선택을 요구받을 때' },
              { value: 'S4', label: '설명하거나 정리해서 말해야 할 때' },
              { value: 'S5', label: '익숙한 방식이 바뀌거나 규칙이 흔들릴 때' },
              { value: 'S6', label: '실수·오류가 발생했을 때' },
              { value: 'S7', label: '빠른 속도나 경쟁 분위기에 놓일 때' },
              { value: 'S8', label: '내가 빠지면 안 될 것 같은 책임 상황' },
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
            {'그 순간 머릿속에서는'}
            <br />
            {'이런 생각이 돈다.'}
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-xl mt-4">
            {[
              { value: 'T1', label: '"왜 저렇게 했지?" 계속 곱씹게 된다' },
              { value: 'T2', label: '"지금 당장 처리해야 해." 급해진다' },
              { value: 'T3', label: '"일단 미루자." 반응이 느려진다' },
              { value: 'T4', label: '"이건 내가 끝까지 책임져야 해." 붙잡게 된다' },
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

  if (step === 'result') {
    return <ResultPage q1Answer={q1Answer} q2Answer={q2Answer} q3Answer={q3Answer} onRestart={handleRestart} />
  }

  return null
}
