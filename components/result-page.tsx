'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RotateCcw } from 'lucide-react'
import { getResultData, type TestType } from '@/lib/result-registry'
import { resultData, bodyData, cognitionData, insightPools } from '@/lib/result-data'
import { saveData, loadRecords, updateRecordMemo } from '@/lib/storage'
import { useAuth } from '@/lib/auth-context'
import { Textarea } from '@/components/ui/textarea'
import { PATTERN_LENS_RELATION_HREF, ResultMemoSection } from '@/components/result-memo-section'
import { ResultMemoDisplay } from '@/components/result-memo-display'
import { LoginModal } from '@/components/login-modal'
import { SimilarReactionsBlock } from '@/components/similar-reactions-block'

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
  const pathname = usePathname()
  const { user, login } = useAuth()
  const [observationText, setObservationText] = useState<string>('')
  const [insightText, setInsightText] = useState<string>('')
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [memo, setMemo] = useState('')
  const [memoSaved, setMemoSaved] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
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
    void saveData(
      {
        category: 'test',
        pattern: type,
        content: q2Data.oneLine,
        q1: q1Answer,
        q2: q2Answer,
        q3: q3Answer,
        summary: q2Data.oneLine,
        resultType: type,
      },
      user?.id ?? null
    )
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
    const records = await loadRecords(user?.id ?? null)
    const typeUpper = type.toUpperCase()
    const sorted = records
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const match = sorted.find(
      (r) => (r.resultType || '').toUpperCase() === typeUpper
    )
    if (match) {
      await updateRecordMemo(match.id, memo.trim() || '', user?.id ?? null)
    } else {
      await saveData(
        {
          category: 'test',
          pattern: type,
          content: memo.trim() || q2Data.oneLine,
          q1: q1Answer,
          q2: q2Answer,
          q3: q3Answer,
          summary: q2Data.oneLine,
          resultType: type,
          memo: memo.trim() || undefined,
        },
        user?.id ?? null
      )
    }
    setMemo('')
    setMemoSaved(true)
  }

  const handleLoginSuccess = async (email?: string) => {
    const result = await login(email, { redirectTo: pathname ?? undefined })
    if (result && 'user' in result) {
      setLoginModalOpen(false)
    }
    if (result && 'emailSent' in result) {
      return { emailSent: true }
    }
    if (result && 'error' in result) {
      return { error: result.error }
    }
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
    <main className="min-h-screen bg-[#F5F3FA] py-12 sm:py-16 pb-24 sm:pb-28 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* 1. 카드 - 바로 보임 */}
        <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
          <h2 className="text-lg font-bold text-center mb-4">당신의 반응 구조 카드</h2>
          <img src={cardImageSrc} alt="" className="rounded-xl mb-4 w-full" />
          {observationText && insightText && (
            <div className="space-y-3 mb-6">
              <p className="text-sm text-[#333333] leading-relaxed">{observationText}</p>
              <p className="text-base font-medium text-[#333333] leading-relaxed">{insightText}</p>
            </div>
          )}
          {!observationText && !insightText && (
            <p className="text-base text-[#555555] leading-relaxed mb-6">{q2Data.oneLine}</p>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex-1 py-3 bg-[#8E7CFF] text-white rounded-xl font-semibold hover:bg-[#7D6BEE] transition-colors"
            >
              공유하기
            </button>
            <button
              onClick={() => setShowAnalysis(true)}
              className="flex-1 py-3 border border-[#8E7CFF] text-[#8E7CFF] rounded-xl font-semibold hover:bg-[#E8E2FF] transition-colors"
            >
              해석 보기
            </button>
          </div>
        </section>

        {testType === 'stress' && /^S[1-8]$/.test(type) ? (
          <SimilarReactionsBlock userType={type} />
        ) : null}

        {/* 2. 해석 섹션 - 클릭 시에만 표시 */}
        {showAnalysis && (
          <div className="space-y-6 sm:space-y-8">
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

            <ResultMemoDisplay resultType={type} />

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
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveMemo}
                    className="rounded-xl bg-[#8E7CFF] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
                  >
                    메모 저장
                  </button>
                  <Link
                    href={PATTERN_LENS_RELATION_HREF}
                    className="inline-flex items-center justify-center rounded-xl border border-[#E8E2FF] bg-[#F5F3FA] px-6 py-3 text-base font-semibold text-[#5a4bb5] transition-colors hover:bg-[#EDE9F7]"
                  >
                    패턴돋보기
                  </Link>
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
          </div>
        )}
      </div>

      {/* 하단 고정 CTA 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E2FF] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {onRestart ? (
            <button
              onClick={onRestart}
              className="p-2.5 rounded-xl text-[#8E7CFF] hover:bg-[#E8E2FF] transition-colors"
              title="테스트 다시하기"
              aria-label="테스트 다시하기"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/stress"
              className="p-2.5 rounded-xl text-[#8E7CFF] hover:bg-[#E8E2FF] transition-colors"
              title="테스트 다시하기"
              aria-label="테스트 다시하기"
            >
              <RotateCcw className="w-5 h-5" />
            </Link>
          )}
          <div className="flex gap-3 flex-1 justify-end">
            <button
              onClick={() => setIsShareOpen(true)}
              className="px-5 py-2.5 bg-[#8E7CFF] text-white rounded-xl text-sm font-semibold hover:bg-[#7D6BEE] transition-colors"
            >
              공유하기
            </button>
            <button
              onClick={() => setShowAnalysis((v) => !v)}
              className="px-5 py-2.5 border border-[#8E7CFF] text-[#8E7CFF] rounded-xl text-sm font-semibold hover:bg-[#E8E2FF] transition-colors"
            >
              {showAnalysis ? '해석 접기' : '해석 보기'}
            </button>
          </div>
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
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={handleLoginSuccess}
        variant="save"
      />
    </main>
  )
}
