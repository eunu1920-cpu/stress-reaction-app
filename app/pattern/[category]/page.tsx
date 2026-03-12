'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RequireAuth } from '@/components/require-auth'
import { isPatternLensCategory } from '@/lib/pattern-lens/registry'
import {
  fetchQuestionResponse,
  fetchTodayPatternCategoryChoice,
  getOrCreateTodayAssignment,
  markAssignmentOpened,
  savePatternLensResponse,
} from '@/lib/pattern-lens/storage'
import type { PatternLensCategory, PatternLensOption, PatternLensQuestion } from '@/lib/pattern-lens/types'
import { useAuth } from '@/lib/auth-context'
import { toBlob } from 'html-to-image'
import { toast } from 'sonner'

const CATEGORY_LABELS: Record<PatternLensCategory, string> = {
  stress: '상황스트레스',
  relation: '관계 상황',
  self: '개인 상황',
}

type LoadedState =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'blocked'; selectedCategory: PatternLensCategory | null }
  | {
      status: 'ready'
      assignmentId: string
      question: PatternLensQuestion
      existingResponse: Awaited<ReturnType<typeof fetchQuestionResponse>>
    }

export default function PatternCategoryPage() {
  const params = useParams()
  const { user } = useAuth()
  const categoryParam = String(params?.category ?? '')
  const [state, setState] = useState<LoadedState>({ status: 'loading' })
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [sharing, setSharing] = useState(false)
  const resultCardRef = useRef<HTMLElement | null>(null)

  const category = useMemo(
    () => (isPatternLensCategory(categoryParam) ? categoryParam : null),
    [categoryParam]
  )

  useEffect(() => {
    if (!user?.id || !category) return

    let cancelled = false

    const load = async () => {
      const selectedCategory = await fetchTodayPatternCategoryChoice(user.id)
      if (cancelled) return

      if (selectedCategory && selectedCategory !== category) {
        setState({ status: 'blocked', selectedCategory })
        return
      }

      const assigned = await getOrCreateTodayAssignment(user.id, category)
      if (cancelled) return

      if (!assigned) {
        setState({ status: 'empty' })
        return
      }

      void markAssignmentOpened(assigned.assignment.id)

      const response = assigned.assignment.response_id
        ? await fetchQuestionResponse(assigned.assignment.response_id)
        : null

      if (cancelled) return

      setState({
        status: 'ready',
        assignmentId: assigned.assignment.id,
        question: assigned.question,
        existingResponse: response,
      })
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [user?.id, category])

  const handleSelect = async (option: PatternLensOption) => {
    if (!user?.id || state.status !== 'ready' || saving) return
    if (state.existingResponse) return

    setSaving(true)
    setSelectedOptionId(option.id)

    const result = await savePatternLensResponse({
      userId: user.id,
      category,
      question: state.question,
      option,
      assignmentId: state.assignmentId,
    })

    const response = result.responseId ? await fetchQuestionResponse(result.responseId) : null

    setState({
      status: 'ready',
      assignmentId: state.assignmentId,
      question: state.question,
      existingResponse: response,
    })
    setSaving(false)
  }

  const handleDownloadResult = async () => {
    if (!resultCardRef.current || sharing || state.status !== 'ready' || !state.existingResponse) {
      return
    }

    setSharing(true)

    try {
      const blob = await toBlob(resultCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        fontEmbedCSS: '',
      })

      if (!blob) throw new Error('blob_generation_failed')

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `myview-pattern-${category}.png`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      toast.success('결과 카드를 저장했어요.')
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }
      console.error('[pattern-download] capture failed:', error)
      toast.error('결과 카드 이미지를 만들지 못했어요.')
    } finally {
      setSharing(false)
    }
  }

  if (!category) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-10">
        <div className="mx-auto max-w-md rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-[#555555]">잘못된 카테고리입니다.</p>
          <Link
            href="/pattern"
            className="mt-4 inline-flex text-sm font-medium text-[#5a4bb5] hover:underline"
          >
            ← 패턴 돋보기로 돌아가기
          </Link>
        </div>
      </main>
    )
  }

  return (
    <RequireAuth>
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-10">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-[#8E7CFF]">{CATEGORY_LABELS[category]}</p>
            <h1 className="mt-2 text-2xl font-bold text-[#333333]">오늘의 관찰 질문</h1>
          </div>

          {state.status === 'loading' && (
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-[#555555]">질문을 불러오는 중입니다.</p>
            </div>
          )}

          {state.status === 'empty' && (
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-sm leading-relaxed text-[#555555]">
                준비된 질문에 모두 응답했습니다.
              </p>
            </div>
          )}

          {state.status === 'blocked' && (
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-sm leading-relaxed text-[#555555]">
                오늘은 이미 다른 카테고리를 선택했습니다.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/pattern"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#DDD4FF] bg-white px-5 py-3 text-sm font-semibold text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF]"
                >
                  패턴 돋보기로 돌아가기
                </Link>
                {state.selectedCategory && (
                  <Link
                    href={`/pattern/${state.selectedCategory}`}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
                  >
                    오늘 선택한 카테고리 보기
                  </Link>
                )}
              </div>
            </div>
          )}

          {state.status === 'ready' && (
            <>
              <section className="rounded-2xl border border-[#DDD4FF] bg-[#F8F5FF] p-6 shadow-sm">
                <div className="space-y-4 text-center">
                  <p className="text-sm leading-relaxed text-[#555555]">
                    {state.question.scenario}
                  </p>
                  <div className="h-px w-full bg-[#E8E2FF]" />
                  <h2 className="text-lg font-semibold text-[#333333]">
                    {state.question.prompt}
                  </h2>
                </div>
              </section>

              {!state.existingResponse && (
                <section className="flex flex-col gap-3">
                  {state.question.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option)}
                      disabled={saving}
                      className="flex min-h-[120px] w-full flex-col justify-start rounded-3xl border border-[#E8E2FF] bg-white px-6 py-5 text-left text-[15px] font-medium text-[#333333] shadow-sm transition-colors hover:border-[#D8CCFF] hover:bg-[#FAF8FF] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="block text-sm font-medium text-[#8E7CFF]">{option.id}</span>
                      <span className="mt-1 block break-words leading-relaxed">{option.label}</span>
                      {saving && selectedOptionId === option.id && (
                        <span className="mt-2 block text-sm font-medium text-[#8E7CFF]">
                          저장 중...
                        </span>
                      )}
                    </button>
                  ))}
                </section>
              )}

              {state.existingResponse?.display_snapshot && (
                <section
                  ref={resultCardRef}
                  className="rounded-2xl border border-[#E8E2FF] bg-white p-6 shadow-sm"
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#8E7CFF]">
                      {state.existingResponse.pattern_code}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-[#333333]">
                      {state.existingResponse.display_snapshot.interpretationTitle}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                      {state.existingResponse.display_snapshot.interpretationSummary}
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#F8F5FF] px-4 py-4">
                    <p className="text-sm leading-7 text-[#555555]">
                      {state.existingResponse.display_snapshot.interpretationBody}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {state.existingResponse.display_snapshot.interpretationPoints.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center whitespace-nowrap break-keep rounded-full bg-[#E8E2FF] px-4 py-2 text-[13px] font-medium text-[#5a4bb5]"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          <div className="pt-1 text-center">
            {state.status === 'ready' && state.existingResponse ? (
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-[#666666]">
                <Link
                  href="/observe"
                  className="transition-colors hover:text-[#5a4bb5]"
                >
                  돌아가기
                </Link>
                <Link
                  href="/record"
                  className="transition-colors hover:text-[#5a4bb5]"
                >
                  기록하기
                </Link>
                <button
                  type="button"
                  onClick={handleDownloadResult}
                  disabled={sharing}
                  className="transition-colors hover:text-[#5a4bb5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sharing ? '이미지 생성 중...' : '결과 카드 다운로드'}
                </button>
              </div>
            ) : (
              <Link
                href="/pattern"
                className="text-sm font-medium text-[#666666] transition-colors hover:text-[#5a4bb5]"
              >
                ← 패턴 돋보기로 돌아가기
              </Link>
            )}
          </div>
        </div>
      </main>
    </RequireAuth>
  )
}
