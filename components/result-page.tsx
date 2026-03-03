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
  const [selectedInsight, setSelectedInsight] = useState('')
  const [observationText, setObservationText] = useState('')
  const [insightText, setInsightText] = useState('')
  const [showCopyToast, setShowCopyToast] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const q2Data = resultData[q2Answer as keyof typeof resultData]
  const q1Data = bodyData[q1Answer as keyof typeof bodyData]
  const q3Data = cognitionData[q3Answer as keyof typeof cognitionData]

  useEffect(() => {
    const insights = insightPools[q2Answer as keyof typeof insightPools]
    if (insights?.length) {
      const full = insights[Math.floor(Math.random() * insights.length)]
      setSelectedInsight(full)

      const parts = full.split('통찰:')
      if (parts.length === 2) {
        setObservationText(parts[0].replace('관찰:', '').trim())
        setInsightText(parts[1].trim())
      }
    }
  }, [q2Answer])

  if (!q2Data || !q1Data || !q3Data) return null

  const type = String(q2Answer).toUpperCase()
  const cardImageSrc = `/character-${type}.jpg`
  const shareUrl = `https://stress-reaction-app-fn4y.vercel.app/result/${type}`

  // 🔥 카카오 SDK 공유
  const shareToKakao = () => {
    if (typeof window === 'undefined' || !window.Kakao) {
      alert('카카오 SDK가 준비되지 않았어요.')
      return
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '스트레스 반응 구조 테스트',
        description: q2Data.oneLine,
        imageUrl: `https://stress-reaction-app-fn4y.vercel.app/character-${type}.jpg`,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '나도 테스트 해보기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    })
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          당신의 스트레스 반응 구조
        </h1>

        <div className="bg-white rounded-[18px] shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">{q2Data.oneLine}</h2>

          {observationText && insightText && (
            <div className="bg-[#E8E2FF] rounded-2xl p-5 mb-6">
              <p className="font-bold text-sm mb-1">관찰</p>
              <p className="mb-3">{observationText}</p>
              <p className="font-bold text-sm mb-1">통찰</p>
              <p>{insightText}</p>
            </div>
          )}

          <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
            <AccordionItem value="section-1">
              <AccordionTrigger>촉발 환경</AccordionTrigger>
              <AccordionContent>{q2Data.trigger}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-2">
              <AccordionTrigger>사고 반응 구조</AccordionTrigger>
              <AccordionContent>{q2Data.thinking}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-3">
              <AccordionTrigger>신체 반응 구조</AccordionTrigger>
              <AccordionContent>{q1Data.structure}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-4">
              <AccordionTrigger>숨은 강점</AccordionTrigger>
              <AccordionContent>{q3Data.strength}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* 버튼 영역 */}
        <div className="mt-8 text-center space-y-4">
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-8 py-3 bg-[#8E7CFF] text-white rounded-xl"
          >
            결과 공유 · 저장하기
          </button>

          <button
            onClick={onRestart}
            className="px-8 py-3 border border-[#8E7CFF] text-[#8E7CFF] rounded-xl"
          >
            다시 해보기
          </button>
        </div>
      </div>

      {/* 🔥 공유 모달 */}
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
              className="absolute top-3 right-3 text-xl"
            >
              ×
            </button>

            <h3 className="text-lg font-bold text-center mb-4">
              당신의 반응 구조 카드
            </h3>

            <img src={cardImageSrc} className="rounded-xl mb-4" />

            <button
              onClick={shareToKakao}
              className="w-full py-3 bg-yellow-400 rounded-xl font-medium"
            >
              카카오로 공유하기
            </button>
          </div>
        </div>
      )}
    </main>
  )
}