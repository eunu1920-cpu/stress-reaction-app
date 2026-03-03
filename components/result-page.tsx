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

  // ✅ 추가: 모달 열림 상태
  const [isShareOpen, setIsShareOpen] = useState(false)

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

  // ✅ 추가: 이미지 경로 (네 파일명 규칙 그대로)
  const cardImageSrc = `/character-${String(q2Answer).toUpperCase()}.jpg`

  // ✅ 추가: 테스트 링크 복사
  const copyTestLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 2000)
    } catch (e) {
      alert('복사 실패! 주소창의 링크를 직접 복사해주세요.')
    }
  }

  // ✅ 추가: “카카오 공유” 가장 안전한 방식 = Web Share(가능하면)
  // (모바일에서 카톡 선택 가능 / 안 되면 링크 복사로 폴백)
  const shareToKakaoSafely = async () => {
    const shareData = {
      title: '스트레스 반응 구조 결과',
      text: `${q2Data.oneLine}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
    } catch (e) {
      // 그냥 폴백으로 내려감
    }

    // 폴백: 링크 복사
    await copyTestLink()
    alert('공유 기능이 지원되지 않아 링크를 복사했어요. 카톡에 붙여넣어 공유해 주세요!')
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
            {/* ✅ 기존 “결과 저장하기” 버튼 → 모달 오픈으로만 변경 */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="px-10 py-3 bg-[#8E7CFF] text-white rounded-xl text-base font-medium hover:bg-[#7D6BEE] transition-colors"
            >
              결과 공유 · 저장하기
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

      {/* ✅ 모달: 원래 페이지는 그대로 두고, 위에만 덮는 구조 */}
      {isShareOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setIsShareOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              aria-label="close"
            >
              ×
            </button>

            <h3 className="text-lg font-bold text-center mb-4">
              당신의 반응 구조 카드
            </h3>

            <div className="rounded-2xl bg-[#F5F3FA] p-3">
              <img
                src={cardImageSrc}
                alt="결과 카드"
                className="rounded-xl shadow-sm w-full"
              />
            </div>

            <div className="space-y-3 mt-4">
              {/* 이미지 저장 */}
              <a
                href={cardImageSrc}
                download
                className="block w-full text-center py-3 bg-[#8E7CFF] text-white rounded-xl font-medium hover:bg-[#7D6BEE]"
              >
                이미지 저장하기
              </a>

              {/* 카카오 공유 (가장 안전: Web Share → 폴백: 링크복사) */}
              <button
                onClick={shareToKakaoSafely}
                className="block w-full py-3 bg-yellow-400 text-black rounded-xl font-medium"
              >
                카카오로 공유하기
              </button>

              {/* 테스트 링크 공유 */}
              <button
                onClick={copyTestLink}
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                테스트 링크 공유
              </button>
            </div>

            {/* 작은 토스트 */}
            {showCopyToast && (
              <div className="mt-4 text-center text-sm text-[#333333]">
                ✅ 복사되었습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
