'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toBlob } from 'html-to-image'
import { toast } from 'sonner'
import { MyPickShareCardCanvas } from '@/components/mypick-share-card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  getMyPickShareCard,
  SHARE_CARD_HEIGHT,
  SHARE_CARD_WIDTH,
} from '@/lib/mypick/share-cards'
import { getRandomMyPickQuestion } from '@/lib/mypick/registry'
import type { MyPickChoice, MyPickQuestion } from '@/lib/mypick/types'
import { getOrCreatePatternAnonymousId } from '@/lib/pattern-anonymous-id'
import { supabase } from '@/lib/supabase'

type Phase = 'pick' | 'result'

export default function MyPickPage() {
  const [question, setQuestion] = useState<MyPickQuestion | null>(null)
  const [phase, setPhase] = useState<Phase>('pick')
  const [selected, setSelected] = useState<MyPickChoice | null>(null)
  const [pctA, setPctA] = useState<number | null>(null)
  const [pctB, setPctB] = useState<number | null>(null)
  const [statsLoaded, setStatsLoaded] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [sharePreviewUrl, setSharePreviewUrl] = useState<string | null>(null)
  const [shareBusy, setShareBusy] = useState(false)
  const shareCardRef = useRef<HTMLDivElement>(null)

  const loadRandom = useCallback((excludeId?: string) => {
    setQuestion(getRandomMyPickQuestion(excludeId))
    setPhase('pick')
    setSelected(null)
    setPctA(null)
    setPctB(null)
    setStatsLoaded(false)
    setShareModalOpen(false)
    setShareBusy(false)
    setSharePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }, [])

  useEffect(() => {
    loadRandom()
  }, [loadRandom])

  const sharePreviewUrlRef = useRef<string | null>(null)
  sharePreviewUrlRef.current = sharePreviewUrl

  useEffect(() => {
    return () => {
      if (sharePreviewUrlRef.current) {
        URL.revokeObjectURL(sharePreviewUrlRef.current)
      }
    }
  }, [])

  const handleChoice = async (choice: MyPickChoice) => {
    if (!question || phase !== 'pick') return

    setSelected(choice)
    setPhase('result')

    const anonymousId = getOrCreatePatternAnonymousId()

    try {
      const { error: insertError } = await supabase.from('mypick_choices').insert({
        question_id: question.id,
        choice,
        anonymous_id: anonymousId,
      })

      if (insertError) {
        console.warn('[mypick] insert:', insertError.message)
        setStatsLoaded(false)
        return
      }

      const { data, error: selectError } = await supabase
        .from('mypick_choices')
        .select('choice')
        .eq('question_id', question.id)

      if (selectError || !data) {
        console.warn('[mypick] select:', selectError?.message)
        setStatsLoaded(false)
        return
      }

      const a = data.filter((r) => r.choice === 'a').length
      const b = data.filter((r) => r.choice === 'b').length
      const t = a + b
      if (t === 0) {
        setStatsLoaded(false)
        return
      }
      setPctA(Math.round((a / t) * 100))
      setPctB(Math.round((b / t) * 100))
      setStatsLoaded(true)
    } catch (e) {
      console.warn('[mypick]', e)
      setStatsLoaded(false)
    }
  }

  const handleShareCard = async () => {
    if (!question || !selected || shareBusy) return
    if (!getMyPickShareCard(question.id, selected)) {
      toast.error('카드 정보를 찾지 못했어요.')
      return
    }
    const el = shareCardRef.current
    if (!el) {
      toast.error('카드를 불러오지 못했어요.')
      return
    }

    setShareBusy(true)
    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      })

      const blob = await toBlob(el, {
        cacheBust: true,
        pixelRatio: 1,
        width: SHARE_CARD_WIDTH,
        height: SHARE_CARD_HEIGHT,
        backgroundColor: '#ffffff',
        fontEmbedCSS: '',
      })

      if (!blob) {
        throw new Error('blob_generation_failed')
      }

      if (sharePreviewUrl) {
        URL.revokeObjectURL(sharePreviewUrl)
      }
      const url = URL.createObjectURL(blob)
      setSharePreviewUrl(url)

      const link = document.createElement('a')
      link.href = url
      link.download = `myview-mypick-${question.id}-${selected}.png`
      document.body.appendChild(link)
      link.click()
      link.remove()

      setShareModalOpen(true)
      toast.success('카드 이미지를 저장했어요.')
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        return
      }
      console.error('[mypick-share]', e)
      toast.error('카드 이미지를 만들지 못했어요.')
    } finally {
      setShareBusy(false)
    }
  }

  if (!question) {
    return (
      <main className="min-h-[calc(100dvh-3.5rem)] bg-[#F5F3FA] px-4 py-8">
        <div className="mx-auto max-w-md text-center text-sm text-[#666666]">불러오는 중…</div>
      </main>
    )
  }

  const shareCardContent =
    phase === 'result' && selected
      ? getMyPickShareCard(question.id, selected)
      : null

  const blurb =
    selected === 'a'
      ? question.blurbA
      : selected === 'b'
        ? question.blurbB
        : ''

  return (
    <main className="min-h-[calc(100dvh-3.5rem)] bg-[#F5F3FA] px-4 py-6">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8E7CFF]">
            MyPick
          </p>
          <p className="mt-1 text-sm font-medium text-[#444444]">생각 말고 한 번만.</p>
        </header>

        {phase === 'pick' && (
          <>
            <div className="rounded-2xl border-2 border-[#CFC2FF] bg-white p-5 text-center shadow-sm sm:p-6">
              <p className="text-base font-bold leading-snug text-[#111111] sm:text-lg">
                {question.line1}
              </p>
              <p className="mt-2 text-base font-bold leading-snug text-[#111111] sm:text-lg">
                {question.line2}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleChoice('a')}
                className="w-full rounded-2xl border-2 border-[#E8E2FF] bg-white px-5 py-4 text-left text-base font-semibold text-[#333333] shadow-sm transition-colors hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.99]"
              >
                <span className="text-xs font-medium text-[#8E7CFF]">A</span>
                <span className="mt-1 block">{question.optionA}</span>
              </button>
              <button
                type="button"
                onClick={() => handleChoice('b')}
                className="w-full rounded-2xl border-2 border-[#E8E2FF] bg-white px-5 py-4 text-left text-base font-semibold text-[#333333] shadow-sm transition-colors hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.99]"
              >
                <span className="text-xs font-medium text-[#8E7CFF]">B</span>
                <span className="mt-1 block">{question.optionB}</span>
              </button>
            </div>
          </>
        )}

        {phase === 'result' && selected && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-[#333333] bg-white px-5 py-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-[#333333]">해석</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-[#111111]">{blurb}</p>
            </div>

            {shareCardContent && (
              <button
                type="button"
                onClick={handleShareCard}
                disabled={shareBusy}
                className="w-full rounded-2xl border-2 border-[#8E7CFF] bg-white px-5 py-3.5 text-sm font-semibold text-[#5a4bb5] transition-colors hover:bg-[#FAF8FF] disabled:opacity-60"
              >
                {shareBusy ? '이미지 만드는 중…' : "👉 오늘의 '나' 카드 가져가기"}
              </button>
            )}

            <div className="rounded-2xl border border-[#E8E2FF] bg-white px-5 py-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-[#333333]">
                같은 순간, 다른 사람은?
              </p>
              {!statsLoaded ? (
                <p className="mt-3 text-sm font-medium text-[#666666]">
                  비율 없음. 다시 눌러 보거나 다른 질문으로.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-xs text-[#555555]">
                      <span className="truncate pr-2">A · {question.optionA}</span>
                      <span className="shrink-0 font-medium">{pctA}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#E8E2FF]">
                      <div
                        className="h-full rounded-full bg-[#8E7CFF] transition-all"
                        style={{ width: `${pctA}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs text-[#555555]">
                      <span className="truncate pr-2">B · {question.optionB}</span>
                      <span className="shrink-0 font-medium">{pctB}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#E8E2FF]">
                      <div
                        className="h-full rounded-full bg-[#B8A8E8] transition-all"
                        style={{ width: `${pctB}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[11px] font-medium leading-relaxed text-[#777777]">
                    누적 선택 비율. 개인 로그는 안 쌓음.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => loadRandom(question.id)}
                className="w-full rounded-2xl bg-[#8E7CFF] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
              >
                다음 질문
              </button>
              <Link
                href="/pattern"
                className="flex w-full items-center justify-center rounded-2xl border-2 border-[#333333] bg-white px-5 py-3 text-center text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F5F5F5]"
              >
                천천히 — MyView 패턴
              </Link>
              <Link
                href="/"
                className="py-2 text-center text-xs text-[#888888] underline-offset-4 hover:text-[#5a4bb5] hover:underline"
              >
                홈으로
              </Link>
            </div>
          </div>
        )}
      </div>

      {shareCardContent && (
        <div
          className="pointer-events-none fixed top-0 left-[-9999px] z-[-1]"
          aria-hidden
        >
          <MyPickShareCardCanvas ref={shareCardRef} {...shareCardContent} />
        </div>
      )}

      <Dialog
        open={shareModalOpen}
        onOpenChange={(open) => {
          setShareModalOpen(open)
          if (!open) {
            setSharePreviewUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev)
              return null
            })
          }
        }}
      >
        <DialogContent className="max-w-md sm:max-w-md">
          <DialogHeader>
            <DialogTitle>오늘의 나 카드</DialogTitle>
            <DialogDescription>
              저장한 이미지와 동일해요. 인스타·프로필 등에 올려 보세요.
            </DialogDescription>
          </DialogHeader>
          {sharePreviewUrl && (
            // blob URL 미리보기 — next/image는 blob 스키마와 조합 시 제한이 있어 img 사용
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sharePreviewUrl}
              alt="오늘의 나 카드"
              width={SHARE_CARD_WIDTH}
              height={SHARE_CARD_HEIGHT}
              className="mx-auto h-auto max-h-[65vh] w-auto max-w-full rounded-lg border border-[#E8E2FF] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
