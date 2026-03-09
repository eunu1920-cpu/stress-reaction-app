'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getResultData, type TestType } from '@/lib/result-registry'
import { resultData, bodyData, cognitionData, insightPools } from '@/lib/result-data'
import { fetchRecords, updateRecordContent } from '@/lib/history-storage'
import { saveRecord } from '@/lib/save-record'
import { useAuth } from '@/lib/auth-context'
import { Textarea } from '@/components/ui/textarea'
import { ResultMemoSection } from '@/components/result-memo-section'
import { ResultMemoDisplay } from '@/components/result-memo-display'

const S_CODE_PATTERNS: Record<string, string> = {
  S1: "👥 자극 밀도 높은 환경",
  S2: "🔀 예측 어려운 변화",
  S3: "⚡ 빠른 판단 압박",
  S4: "🗣 생각 정리 전달 상황",
  S5: "📏 규칙 변화 상황",
  S6: "❗ 예상 밖 결과",
  S7: "🏁 속도 경쟁 환경",
  S8: "📌 책임 밀도 높은 역할",
}

interface ResultPageProps {
  testType?: TestType
  resultType?: string
  q2Answer: string
  q1Answer?: string
  q3Answer?: string
  onRestart?: () => void
}

export function ResultPage({ testType = 'stress', resultType, q2Answer, q1Answer = '', q3Answer = '', onRestart }: ResultPageProps) {
  const { user } = useAuth()
  const [observationText, setObservationText] = useState<string>('')
  const [insightText, setInsightText] = useState<string>('')
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [memo, setMemo] = useState('')
  const [memoSaved, setMemoSaved] = useState(false)
  const lastSavedSignatureRef = useRef<string | null>(null)

  const type = String(resultType ?? q2Answer).toUpperCase()
  const dataSet = getResultData(testType, type)
  const q2Data = dataSet ? (dataSet.main[type as keyof typeof dataSet.main] ?? null) : (resultData[type as keyof typeof resultData] ?? null)
  const q1Data = q1Answer && dataSet?.body ? dataSet.body[q1Answer as keyof typeof dataSet.body] : (q1Answer ? bodyData[q1Answer as keyof typeof bodyData] : undefined)
  const q3Data = q3Answer && dataSet?.cognition ? dataSet.cognition[q3Answer as keyof typeof dataSet.cognition] : (q3Answer ? cognitionData[q3Answer as keyof typeof cognitionData] : undefined)
  const insightPoolsForType = dataSet?.insightPools ?? insightPools
  const cardImageSrc = `/character-${type}.jpg`
  const hasFullData = !!q1Answer && !!q3Answer && !!q1Data && !!q3Data

  // 결과 자동 저장 (전체 플로우일 때만)
  useEffect(() => {
    if (!hasFullData || !q2Data) return
    const signature = `${q1Answer}|${q2Answer}|${q3Answer}`
    if (lastSavedSignatureRef.current === signature) return
    lastSavedSignatureRef.current = signature
    void saveRecord({
      userId: user?.id ?? null,
      category: 'test',
      pattern: type,
      content: q2Data.oneLine,
      q1: q1Answer,
      q2: q2Answer,
      q3: q3Answer,
      summary: q2Data.oneLine,
      resultType: type,
    })
  }, [hasFullData, q1Answer, q2Answer, q3Answer, q2Data, type, user?.id])

  // 인사이트 랜덤
  useEffect(() => {
    const pools = dataSet?.insightPools ?? (testType === 'stress' ? insightPools : undefined)
    const insights = pools?.[type as keyof typeof pools]
    if (insights?.length) {
      const fullInsight = insights[Math.floor(Math.random() * insights.length)]
      const parts = fullInsight.split('통찰:')
      if (parts.length === 2) {
        setObservationText(parts[0].replace('관찰:', '').trim())
        setInsightText(parts[1].trim())
      }
    }
  }, [type, testType])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const Kakao = (window as { Kakao?: { init: (k: string) => void; isInitialized: () => boolean } }).Kakao
      if (Kakao && !Kakao.isInitialized()) Kakao.init('516d94cf545525bb2d00a935ed4a583d')
    }
  }, [])

  const shareKakao = () => {
    const Kakao = typeof window !== 'undefined' ? (window as { Kakao?: { isInitialized: () => boolean; Share: { sendDefault: (o: object) => void } } }).Kakao : undefined
    if (!Kakao?.isInitialized() || !q2Data) return
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '스트레스 반응 구조 테스트',
        description: q2Data.oneLine,
        imageUrl: `https://stress-reaction-app-fn4y.vercel.app/character-${type}.jpg`,
        link: {
          mobileWebUrl: `https://stress-reaction-app-fn4y.vercel.app/result/${testType}/${type}`,
          webUrl: `https://stress-reaction-app-fn4y.vercel.app/result/${testType}/${type}`,
        },
      },
      buttons: [{ title: '테스트 다시하기', link: { mobileWebUrl: 'https://stress-reaction-app-fn4y.vercel.app/', webUrl: 'https://stress-reaction-app-fn4y.vercel.app/' } }],
    })
  }

  const handleSaveMemo = async () => {
    if (!user?.id) return
    const records = await fetchRecords(user.id)
    const typeUpper = type.toUpperCase()
    const sorted = records
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const match = sorted.find(
      (r) => (r.resultType || '').toUpperCase() === typeUpper
    )
    if (match) {
      await updateRecordContent(match.id, memo.trim() || '')
    } else {
      await saveRecord({
        userId: user.id,
        category: 'test',
        pattern: type,
        content: memo.trim() || q2Data.oneLine,
        q1: q1Answer,
        q2: q2Answer,
        q3: q3Answer,
        summary: q2Data.oneLine,
        resultType: type,
        memo: memo.trim() || undefined,
      })
    }
    setMemo('')
    setMemoSaved(true)
  }

  if (!q2Data) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <p className="text-[#555555]">데이터를 불러올 수 없습니다.</p>
      </main>
    )
  }

  const multiLayerBlocks = q2Data.multiLayer.split('\n\n')

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* 1. Header */}
        <header className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
            당신의 스트레스 반응 구조
          </h1>
          <p className="text-base text-[#555555] leading-relaxed">
            {q2Data.oneLine}
          </p>
        </header>

        {/* 2. Insight Card */}
        {observationText && insightText && (
          <section className="bg-[#F0EDFF] rounded-2xl border border-[#E8E2FF] p-6 shadow-sm">
            <p className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">관찰</p>
            <p className="text-sm text-[#333333] leading-relaxed mb-4">{observationText}</p>
            <p className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">통찰</p>
            <p className="text-sm text-[#333333] leading-relaxed">{insightText}</p>
          </section>
        )}

        {/* 3. S코드 패턴 카드 */}
        {S_CODE_PATTERNS[type] && (
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
            <h3 className="text-base font-semibold text-[#333333] mb-3">
              이런 상황에서 특히 스트레스가 커진다
            </h3>
            <div className="rounded-xl border border-[#E8E2FF] bg-[#F5F3FA] p-4 flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-[#8E7CFF] px-2 py-0.5 text-xs font-medium text-white shrink-0">[{type}]</span>
              <span className="text-sm font-medium text-[#333333]">{S_CODE_PATTERNS[type]}</span>
            </div>
          </section>
        )}

        {/* 4. Section Cards */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
          <h3 className="text-base font-semibold text-[#333333] mb-3">촉발 환경</h3>
          <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">{q2Data.trigger}</p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
          <h3 className="text-base font-semibold text-[#333333] mb-3">사고 반응 구조와 원인</h3>
          <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">{q2Data.thinking}</p>
        </section>

        {q1Data && (
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
            <h3 className="text-base font-semibold text-[#333333] mb-3">신체 반응 구조와 원인</h3>
            <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">{q1Data.structure}</p>
          </section>
        )}

        {q3Data && (
          <>
            <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
              <h3 className="text-base font-semibold text-[#333333] mb-3">숨은 강점</h3>
              <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">{q3Data.strength}</p>
            </section>
            <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
              <h3 className="text-base font-semibold text-[#333333] mb-3">인지 전략 제안</h3>
              <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-line">{q3Data.strategy}</p>
            </section>
          </>
        )}

        <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
          <h3 className="text-base font-semibold text-[#333333] mb-3">다층 해석</h3>
          <div className="space-y-3">
            {multiLayerBlocks.map((block, i) => {
              const parts = block.split(':')
              return (
                <p key={i} className="text-sm text-[#555555] leading-relaxed">
                  <strong className="text-[#333333]">{parts[0]}:</strong> {parts.slice(1).join(':')}
                </p>
              )
            })}
          </div>
        </section>

        {/* 5. 나의 기록 */}
        <ResultMemoDisplay resultType={type} />

        {/* 6. 오늘 상황 기록하기 */}
        {hasFullData ? (
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
            <h3 className="text-base font-semibold text-[#333333] mb-2">오늘 상황 기록하기</h3>
            <p className="text-sm text-[#555555] mb-4 leading-relaxed">
              오늘의 스트레스 상황을 한두 문장으로 기록해보세요. 이 기록이 쌓이면 나의 스트레스 패턴을 AI가 분석할 수 있습니다.
            </p>
            <Textarea
              placeholder="최근 스트레스 상황을 한두 문장으로 기록해보세요."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="min-h-[80px] resize-none border-[#E8E2FF] focus-visible:ring-[#8E7CFF]"
            />
            <div className="mt-4">
              <button
                type="button"
                onClick={handleSaveMemo}
                className="px-6 py-3 bg-[#8E7CFF] text-white rounded-xl text-base font-semibold hover:bg-[#7D6BEE] transition-colors"
              >
                메모 저장
              </button>
            </div>
            {memoSaved && (
              <p className="mt-4 text-sm text-[#555555] leading-relaxed">
                저장되었습니다. 기록은 히스토리에서 확인할 수 있습니다.
              </p>
            )}
          </section>
        ) : (
          <ResultMemoSection resultType={type} summary={q2Data.oneLine} />
        )}

        {/* 7. CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-8 py-3 bg-[#8E7CFF] text-white rounded-xl font-semibold hover:bg-[#7D6BEE] transition-colors"
          >
            결과 공유 · 저장하기
          </button>
          {onRestart ? (
            <button
              onClick={onRestart}
              className="px-6 py-3 border border-[#8E7CFF] text-[#8E7CFF] rounded-xl font-semibold hover:bg-[#E8E2FF] transition-colors"
            >
              다시하기
            </button>
          ) : (
            <Link
              href="/"
              className="px-6 py-3 border border-[#8E7CFF] text-[#8E7CFF] rounded-xl font-semibold hover:bg-[#E8E2FF] transition-colors text-center"
            >
              테스트 다시하기
            </Link>
          )}
        </div>

        <div className="text-center pt-2">
          <a
            href="https://forms.gle/7UNYNXfWnVPjJpws8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563eb] font-semibold hover:underline"
          >
            👉 다음 자기관찰 주제 투표하기(1분)
          </a>
        </div>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative mx-4">
            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-3 right-3 text-xl text-[#555555] hover:text-[#333333]"
            >
              ×
            </button>
            <h3 className="text-lg font-bold text-center mb-4">당신의 반응 구조 카드</h3>
            <img src={cardImageSrc} alt="" className="rounded-xl mb-4 w-full" />
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = cardImageSrc
                link.download = 'stress-card.jpg'
                link.click()
              }}
              className="w-full py-3 bg-[#8E7CFF] text-white rounded-xl font-semibold mb-3 hover:bg-[#7D6BEE] transition-colors"
            >
              이미지 카드 저장하기
            </button>
            <button
              onClick={shareKakao}
              className="w-full py-3 bg-[#FEE500] text-[#191919] rounded-xl font-semibold hover:bg-[#FDD835] transition-colors"
            >
              카카오로 공유하기
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
