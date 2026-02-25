'use client'

import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { resultData, bodyData, cognitionData, insightPools } from '@/lib/result-data'

interface ResultPageProps {
  q1Answer: string
  q2Answer: string
  q3Answer: string
  onRestart?: () => void
}

export function ResultPage({ q1Answer, q2Answer, q3Answer, onRestart }: ResultPageProps) {
  const [openItem, setOpenItem] = useState('section-1')
  const [selectedInsight, setSelectedInsight] = useState<string>('')
  const [observationText, setObservationText] = useState<string>('')
  const [insightText, setInsightText] = useState<string>('')
  const [showReflection, setShowReflection] = useState(false)
  const [reflectionText, setReflectionText] = useState<string>('')
  const [showCopyToast, setShowCopyToast] = useState(false)

  const q2Data = resultData[q2Answer as keyof typeof resultData]
  const q1Data = bodyData[q1Answer as keyof typeof bodyData]
  const q3Data = cognitionData[q3Answer as keyof typeof cognitionData]

  useEffect(() => {
    const insights = insightPools[q2Answer as keyof typeof insightPools]
    if (insights && insights.length > 0) {
      const randomIndex = Math.floor(Math.random() * insights.length)
      const fullInsight = insights[randomIndex]
      setSelectedInsight(fullInsight)
      
      // Split observation and insight
      const parts = fullInsight.split('통찰:')
      if (parts.length === 2) {
        setObservationText(parts[0].replace('관찰:', '').trim())
        setInsightText(parts[1].trim())
      }
    }
  }, [q2Answer])

  const handleReflectionClick = () => {
    setShowReflection(true)
    setTimeout(() => {
      document.getElementById('reflection-textarea')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const handleShareClick = async () => {
    const shareText = `[스트레스 반응 구조 결과]\n\n${q2Data.oneLine}\n\n${selectedInsight}`
    
    try {
      await navigator.clipboard.writeText(shareText)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!q2Data || !q1Data || !q3Data) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-[#333333] text-lg">데이터를 불러올 수 없습니다.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#333333] text-center mb-8">
          당신의 스트레스 반응 구조
        </h1>

        <div className="bg-white rounded-[18px] shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#333333] mb-6">
            {q2Data.oneLine}
          </h2>

          {observationText && insightText && (
            <div className="bg-[#E8E2FF] border-l-4 border-[#8E7CFF] rounded-2xl p-5 mb-6">
              <div className="mb-3">
                <p className="text-[#333333] font-bold text-sm mb-1">관찰</p>
                <p className="text-[#333333] text-base leading-[1.6]">
                  {observationText}
                </p>
              </div>
              <div>
                <p className="text-[#333333] font-bold text-sm mb-1">통찰</p>
                <p className="text-[#333333] text-base leading-[1.6]">
                  {insightText}
                </p>
              </div>
            </div>
          )}

          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="space-y-0"
          >
            <AccordionItem value="section-1" className="border-b border-[#E5E5E5]">
              <AccordionTrigger className="text-[#333333] hover:no-underline py-4">
                <span className="text-base font-medium">촉발 환경</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] pt-2 pb-4 leading-relaxed whitespace-pre-line">
                {q2Data.trigger}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-2" className="border-b border-[#E5E5E5]">
              <AccordionTrigger className="text-[#333333] hover:no-underline py-4">
                <span className="text-base font-medium">사고 반응 구조와 원인</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] pt-2 pb-4 leading-relaxed whitespace-pre-line">
                {q2Data.thinking}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-3" className="border-b border-[#E5E5E5]">
              <AccordionTrigger className="text-[#333333] hover:no-underline py-4">
                <span className="text-base font-medium">신체 반응 구조와 원인</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] pt-2 pb-4 leading-relaxed whitespace-pre-line">
                {q1Data.structure}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-4" className="border-b border-[#E5E5E5]">
              <AccordionTrigger className="text-[#333333] hover:no-underline py-4">
                <span className="text-base font-medium">숨은 강점</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] pt-2 pb-4 leading-relaxed whitespace-pre-line">
                {q3Data.strength}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-5" className="border-b border-[#E5E5E5]">
              <AccordionTrigger className="text-[#333333] hover:no-underline py-4">
                <span className="text-base font-medium">인지 전략 제안</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] pt-2 pb-4 leading-relaxed whitespace-pre-line">
                {q3Data.strategy}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-6" className="border-none">
              <AccordionTrigger className="text-[#333333] hover:no-underline py-4">
                <span className="text-base font-medium">다층 해석</span>
              </AccordionTrigger>
              <AccordionContent className="text-[#555555] pt-2 pb-4">
                <div className="space-y-4">
                  {q2Data.multiLayer.split(/\n\n/).map((section, index) => {
                    const trimmedSection = section.trim()
                    if (!trimmedSection) return null
                    
                    // Check if section contains a perspective label
                    const perspectiveMatch = trimmedSection.match(/^(심리학|뇌과학|철학적|불교|기질) 관점:/)
                    
                    if (perspectiveMatch) {
                      const lines = trimmedSection.split('\n')
                      const label = lines[0]
                      const content = lines.slice(1).join('\n').trim()
                      
                      return (
                        <div key={index} className="mb-4">
                          <p className="text-[#333333] font-bold text-sm mb-1">{label}</p>
                          <p className="text-[#555555] text-base leading-[1.7] whitespace-pre-line">{content}</p>
                        </div>
                      )
                    }
                    
                    return null
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Action Section */}
        <div className="mt-8 bg-white rounded-[18px] shadow-sm p-8">
          <p className="text-base text-[#666666] text-center leading-relaxed mb-6">
            이 결과는 현재 당신의 스트레스 반응 구조 요약입니다.
            <br />
            필요하다면 저장해두고 나중에 비교해보세요.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const resultText = `[스트레스 반응 구조 결과]\n\n${q2Data.oneLine}\n\n${selectedInsight}\n\n[촉발 환경]\n${q2Data.trigger}\n\n[사고 반응 구조]\n${q2Data.thinking}\n\n[신체 반응 구조]\n${q1Data.structure}\n\n[숨은 강점]\n${q3Data.strength}\n\n[인지 전략]\n${q3Data.strategy}\n\n[다층 해석]\n${q2Data.multiLayer}`
                const blob = new Blob([resultText], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = '스트레스_반응_구조_결과.txt'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }}
              className="px-10 py-3 bg-[#8E7CFF] text-white rounded-xl text-base font-medium hover:bg-[#7D6BEE] transition-colors"
            >
              결과 저장하기
            </button>
            <button
              onClick={onRestart}
              className="px-10 py-3 bg-white text-[#8E7CFF] rounded-xl text-base font-medium border-2 border-[#8E7CFF] hover:bg-[#F5F3FA] transition-colors"
            >
              다시 해보기
            </button>
          </div>
          <div className="mt-6 text-center">
  <a
    href="https://forms.gle/wG4f1ufFfrsoayhh6"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-4 py-2 bg-black text-white rounded-lg"
  >
    익명 의견 남기기
  </a>
</div>
        </div>
      </div>
    </main>
  )
}
