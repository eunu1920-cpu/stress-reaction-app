'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { LoginModal } from '@/components/login-modal'
import {
  getPatternLensQuestionById,
  getPatternLensQuestions,
  isPatternLensCategory,
} from '@/lib/pattern-lens/registry'
import {
  fetchQuestionResponse,
  fetchTodayPatternCategoryChoice,
  getOrCreateTodayAssignment,
  markAssignmentOpened,
  savePatternLensResponse,
} from '@/lib/pattern-lens/storage'
import type { PatternLensResponseSnapshot } from '@/lib/pattern-lens/storage'
import type { PatternLensCategory, PatternLensOption, PatternLensQuestion } from '@/lib/pattern-lens/types'
import { useAuth } from '@/lib/auth-context'
import { toBlob } from 'html-to-image'
import { toast } from 'sonner'

const TRIAL_QUESTIONS_PER_CATEGORY = 2
const PATTERN_TRIAL_KEY = 'myview-pattern-trial'

function getTrialStorageKey(anonymousId: string): string {
  return `${PATTERN_TRIAL_KEY}-${anonymousId}`
}

function getTrialAnswered(anonymousId: string | null): Record<string, string[]> {
  if (typeof window === 'undefined' || !anonymousId) return {}
  try {
    const raw = window.localStorage.getItem(getTrialStorageKey(anonymousId))
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, string[]>
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

function addTrialAnswered(anonymousId: string | null, category: string, questionId: string): void {
  if (typeof window === 'undefined' || !anonymousId) return
  const key = getTrialStorageKey(anonymousId)
  const current = getTrialAnswered(anonymousId)
  const list = current[category] ?? []
  if (!list.includes(questionId)) {
    current[category] = [...list, questionId]
    window.localStorage.setItem(key, JSON.stringify(current))
  }
}

function getOrCreateAnonymousId(): string | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem('myview-pattern-anonymous-id')
  if (stored) return stored
  const nextId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`
  window.localStorage.setItem('myview-pattern-anonymous-id', nextId)
  return nextId
}

const CATEGORY_LABELS: Record<PatternLensCategory, string> = {
  stress: '상황스트레스',
  relation: '관계 상황',
  self: '개인 상황',
}

function TrialLoginButton() {
  const { login } = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
      >
        로그인하기
      </button>
      <LoginModal
        open={open}
        onOpenChange={setOpen}
        onLogin={async (email?: string) => {
          const result = await login(email)
          if (result && 'user' in result) setOpen(false)
          if (result && 'emailSent' in result) return { emailSent: true }
          if (result && 'error' in result) return { error: result.error }
        }}
        variant="access"
      />
    </>
  )
}

type LoadedState =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'invalidPreview'; questionId: string }
  | { status: 'blocked'; selectedCategory: PatternLensCategory | null }
  | { status: 'trialComplete' }
  | {
      status: 'ready'
      assignmentId: string
      question: PatternLensQuestion
      existingResponse: PatternResponseLike | null
      isTrial?: boolean
    }

type PatternResponseLike = {
  pattern_code: string
  display_snapshot: PatternLensResponseSnapshot
}

type PatternInterpretationSnapshot = {
  interpretationSummary?: string
  interpretationBody?: string
  interpretationInsight?: string
  reflectionQuestion?: string
}

function getInterpretationSections(snapshot?: PatternInterpretationSnapshot | null) {
  const summary = snapshot?.interpretationSummary?.trim() ?? ''
  const rawBody = snapshot?.interpretationBody?.trim() ?? ''
  const explicitInsight = snapshot?.interpretationInsight?.trim() ?? ''
  const explicitQuestion = snapshot?.reflectionQuestion?.trim() ?? ''
  const normalizedBody = rawBody && rawBody !== summary ? rawBody : ''

  if (explicitInsight || explicitQuestion) {
    return {
      summary,
      body: normalizedBody,
      insight: explicitInsight,
      question: explicitQuestion,
    }
  }

  const insightMatch = rawBody.match(/통찰\s*:/)
  const questionMatch = rawBody.match(/질문\s*:/)
  const insightIndex = insightMatch?.index ?? -1
  const questionIndex = questionMatch?.index ?? -1

  if (insightIndex >= 0 || questionIndex >= 0) {
    const bodyEnd =
      insightIndex >= 0
        ? insightIndex
        : questionIndex >= 0
          ? questionIndex
          : rawBody.length
    const body = rawBody.slice(0, bodyEnd).trim()
    const insightLabelLength = insightMatch?.[0]?.length ?? 0
    const questionLabelLength = questionMatch?.[0]?.length ?? 0
    const insight =
      insightIndex >= 0
        ? rawBody
            .slice(
              insightIndex + insightLabelLength,
              questionIndex >= 0 && questionIndex > insightIndex ? questionIndex : rawBody.length
            )
            .trim()
        : ''
    const question =
      questionIndex >= 0
        ? rawBody.slice(questionIndex + questionLabelLength).trim()
        : ''

    return {
      summary: summary && summary !== body ? summary : '',
      body,
      insight,
      question,
    }
  }

  return {
    summary,
    body: normalizedBody,
    insight: '',
    question: '',
  }
}

function buildPreviewResponse(
  question: PatternLensQuestion,
  option: PatternLensOption
): PatternResponseLike {
  return {
    pattern_code: option.patternCode,
    display_snapshot: {
      scenario: question.scenario,
      prompt: question.prompt,
      selectedLabel: option.label,
      interpretationTitle: option.interpretation.title,
      interpretationSummary: option.interpretation.summary,
      interpretationBody: option.interpretation.body,
      interpretationInsight: option.interpretation.insight,
      reflectionQuestion: option.interpretation.reflectionQuestion,
      interpretationPoints: option.interpretation.points,
    },
  }
}

export default function PatternCategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const categoryParam = String(params?.category ?? '')
  const [state, setState] = useState<LoadedState>({ status: 'loading' })
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [previewResponse, setPreviewResponse] = useState<PatternResponseLike | null>(null)
  const resultCardRef = useRef<HTMLElement | null>(null)

  const category = useMemo(
    () => (isPatternLensCategory(categoryParam) ? categoryParam : null),
    [categoryParam]
  )
  const isPreviewMode = searchParams.get('preview') === '1'
  const previewQuestionId = searchParams.get('questionId')?.trim() ?? ''
  const activeQuestions = useMemo(
    () => (category ? getPatternLensQuestions(category) : []),
    [category]
  )
  const previewQuestion = useMemo(() => {
    if (!category || !isPreviewMode) return null
    if (previewQuestionId) return getPatternLensQuestionById(category, previewQuestionId)
    return activeQuestions[0] ?? null
  }, [activeQuestions, category, isPreviewMode, previewQuestionId])
  const activeResponse =
    state.status === 'ready'
      ? isPreviewMode || state.isTrial
        ? previewResponse
        : state.existingResponse
      : null
  const interpretationSections = activeResponse
    ? getInterpretationSections(activeResponse.display_snapshot)
    : null
  const currentQuestionIndex =
    state.status === 'ready' && state.question
      ? activeQuestions.findIndex((question) => question.id === state.question.id)
      : -1
  const previousQuestion =
    currentQuestionIndex > 0 ? (activeQuestions[currentQuestionIndex - 1] ?? null) : null
  const nextQuestion =
    currentQuestionIndex >= 0 && currentQuestionIndex < activeQuestions.length - 1
      ? (activeQuestions[currentQuestionIndex + 1] ?? null)
      : null

  useEffect(() => {
    if (!category) return

    if (isPreviewMode) {
      setSaving(false)
      setSelectedOptionId(null)
      setPreviewResponse(null)

      if (!previewQuestion) {
        setState({ status: 'invalidPreview', questionId: previewQuestionId })
        return
      }

      setState({
        status: 'ready',
        assignmentId: 'preview',
        question: previewQuestion,
        existingResponse: null,
      })
      return
    }

    if (!user?.id) {
      const anonymousId = getOrCreateAnonymousId()
      const trialQuestions = activeQuestions.slice(0, TRIAL_QUESTIONS_PER_CATEGORY)
      const answered = getTrialAnswered(anonymousId)[category] ?? []
      const nextQuestion = trialQuestions.find((q) => !answered.includes(q.id))
      if (!nextQuestion) {
        setState({ status: 'trialComplete' })
        return
      }
      setState({
        status: 'ready',
        assignmentId: 'trial',
        question: nextQuestion,
        existingResponse: null,
        isTrial: true,
      })
      return
    }

    let cancelled = false
    const resolvedCategory = category

    const load = async () => {
      const selectedCategory = await fetchTodayPatternCategoryChoice(user.id)
      if (cancelled) return

      if (selectedCategory && selectedCategory !== resolvedCategory) {
        setState({ status: 'blocked', selectedCategory })
        return
      }

      const assigned = await getOrCreateTodayAssignment(user.id, resolvedCategory)
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
  }, [user?.id, category, isPreviewMode, previewQuestion, previewQuestionId, activeQuestions])

  const handleSelect = async (option: PatternLensOption) => {
    if (state.status !== 'ready' || saving) return

    if (isPreviewMode || state.isTrial) {
      setSelectedOptionId(option.id)
      setPreviewResponse(buildPreviewResponse(state.question, option))
      return
    }

    if (!user?.id) return
    if (state.existingResponse) return

    setSaving(true)
    setSelectedOptionId(option.id)

    const result = await savePatternLensResponse({
      userId: user.id,
      category: state.question.category,
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

  const trialQuestions = useMemo(
    () => (category ? getPatternLensQuestions(category).slice(0, TRIAL_QUESTIONS_PER_CATEGORY) : []),
    [category]
  )

  const handleTrialNext = useCallback(() => {
    if (state.status !== 'ready' || !state.isTrial || !state.question || !category) return
    const anonymousId = getOrCreateAnonymousId()
    addTrialAnswered(anonymousId, category, state.question.id)
    const answered = getTrialAnswered(anonymousId)[category] ?? []
    const nextQuestion = trialQuestions.find((q) => !answered.includes(q.id))
    setSelectedOptionId(null)
    setPreviewResponse(null)
    if (!nextQuestion) {
      setState({ status: 'trialComplete' })
      return
    }
    setState({
      status: 'ready',
      assignmentId: 'trial',
      question: nextQuestion,
      existingResponse: null,
      isTrial: true,
    })
  }, [state.status, state.isTrial, 'question' in state ? state.question?.id : undefined, category, trialQuestions])

  const handleDownloadResult = async () => {
    if (!resultCardRef.current || sharing || state.status !== 'ready' || !activeResponse) {
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
      link.download = `myview-pattern-${category}${isPreviewMode && state.question ? `-${state.question.id}` : ''}.png`
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

  if (state.status === 'invalidPreview') {
    return (
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-10">
          <div className="mx-auto flex w-full max-w-md flex-col gap-6">
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold text-[#8E7CFF]">미리보기 모드</p>
              <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                요청한 질문을 찾지 못했습니다.
                {state.questionId ? ` (${state.questionId})` : ''}
              </p>
            </div>

            {activeQuestions.length > 0 && (
              <div className="rounded-2xl border border-[#E8E2FF] bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-[#333333]">열 수 있는 질문</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeQuestions.map((question) => (
                    <Link
                      key={question.id}
                      href={`/pattern/${category}?preview=1&questionId=${question.id}`}
                      className="rounded-full border border-[#DDD4FF] bg-[#F8F5FF] px-3 py-1.5 text-xs font-medium text-[#5a4bb5]"
                    >
                      {question.id}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/pattern"
                className="text-sm font-medium text-[#666666] transition-colors hover:text-[#5a4bb5]"
              >
                ← 패턴 돋보기로 돌아가기
              </Link>
            </div>
          </div>
        </main>
    )
  }

  return (
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-10">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-[#8E7CFF]">{CATEGORY_LABELS[category]}</p>
            <h1 className="mt-2 text-2xl font-bold text-[#333333]">오늘의 관찰 질문</h1>
          </div>

          {state.isTrial && state.status === 'ready' && state.question && (
            <section className="rounded-2xl border border-[#DDD4FF] bg-[#F8F5FF] p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                비회원 체험
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                로그인 없이 카테고리당 2개까지 체험할 수 있어요. 기록은 저장되지 않습니다.
              </p>
              <p className="mt-1 text-xs text-[#777777]">
                {(trialQuestions.findIndex((q) => q.id === state.question?.id) + 1) || 1} / {TRIAL_QUESTIONS_PER_CATEGORY}
              </p>
            </section>
          )}

          {isPreviewMode && state.status === 'ready' && state.question && (
            <section className="rounded-2xl border border-[#DDD4FF] bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                테스트 미리보기
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                저장 없이 질문과 결과 화면을 확인합니다. 1일 1질문 제한도 적용되지 않습니다.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-[#F3EEFF] px-3 py-1 font-medium text-[#5a4bb5]">
                  {state.question.id}
                </span>
                <span className="text-[#777777]">
                  {currentQuestionIndex >= 0 ? `${currentQuestionIndex + 1} / ${activeQuestions.length}` : ''}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {previousQuestion && (
                  <Link
                    href={`/pattern/${category}?preview=1&questionId=${previousQuestion.id}`}
                    className="rounded-full border border-[#DDD4FF] px-3 py-1.5 text-xs font-medium text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF]"
                  >
                    ← 이전 질문
                  </Link>
                )}
                {nextQuestion && (
                  <Link
                    href={`/pattern/${category}?preview=1&questionId=${nextQuestion.id}`}
                    className="rounded-full border border-[#DDD4FF] px-3 py-1.5 text-xs font-medium text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF]"
                  >
                    다음 질문 →
                  </Link>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeQuestions.map((question) => (
                  <Link
                    key={question.id}
                    href={`/pattern/${category}?preview=1&questionId=${question.id}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      question.id === state.question?.id
                        ? 'bg-[#8E7CFF] text-white'
                        : 'border border-[#DDD4FF] text-[#5a4bb5] hover:bg-[#F8F5FF]'
                    }`}
                  >
                    {question.id}
                  </Link>
                ))}
              </div>
            </section>
          )}

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

          {state.status === 'trialComplete' && (
            <div className="rounded-2xl border border-[#E8E2FF] bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold text-[#333333]">
                이 카테고리 체험을 모두 사용했어요
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                로그인하면 답변하신 패턴을 모아 상세한 무료분석을 제공해요
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/pattern"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#DDD4FF] bg-white px-5 py-3 text-sm font-semibold text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF]"
                >
                  다른 카테고리 체험하기
                </Link>
                <TrialLoginButton />
              </div>
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

          {state.status === 'ready' && state.question && (
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

              {(!activeResponse || isPreviewMode) && (
                <section className="flex flex-col gap-3">
                  {state.question.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option)}
                      disabled={saving}
                      className={`flex min-h-[120px] w-full flex-col justify-start rounded-3xl border px-6 py-5 text-left text-[15px] font-medium text-[#333333] shadow-sm transition-colors hover:border-[#D8CCFF] hover:bg-[#FAF8FF] disabled:cursor-not-allowed disabled:opacity-60 ${
                        selectedOptionId === option.id
                          ? 'border-[#CFC2FF] bg-[#F3EEFF]'
                          : 'border-[#E8E2FF] bg-white'
                      }`}
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

              {activeResponse?.display_snapshot && (
                <section
                  ref={resultCardRef}
                  className="rounded-2xl border border-[#E8E2FF] bg-white p-6 shadow-sm"
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#8E7CFF]">
                      {activeResponse.pattern_code}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-[#333333]">
                      {activeResponse.display_snapshot.interpretationTitle}
                    </h2>
                    {interpretationSections?.summary && (
                      <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                        {interpretationSections.summary}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 space-y-3">
                    {interpretationSections?.body && (
                      <div className="rounded-2xl bg-[#F8F5FF] px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                          해석
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#555555]">
                          {interpretationSections.body}
                        </p>
                      </div>
                    )}

                    {interpretationSections?.insight && (
                      <div className="rounded-2xl border border-[#E8E2FF] bg-white px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                          통찰
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#555555]">
                          {interpretationSections.insight}
                        </p>
                      </div>
                    )}

                    {interpretationSections?.question && (
                      <div className="rounded-2xl border border-[#DDD4FF] bg-[#F8F5FF] px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                          관찰 질문
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[#333333]">
                          {interpretationSections.question}
                        </p>
                      </div>
                    )}
                  </div>

                  {activeResponse.display_snapshot.interpretationPoints.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeResponse.display_snapshot.interpretationPoints.map((point) => (
                        <span
                          key={point}
                          className="inline-flex items-center whitespace-nowrap break-keep rounded-full bg-[#E8E2FF] px-4 py-2 text-[13px] font-medium text-[#5a4bb5]"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </>
          )}

          <div className="pt-1 text-center">
            {state.status === 'ready' && activeResponse ? (
              <div className="flex flex-col gap-3">
                {state.isTrial && (
                  <button
                    type="button"
                    onClick={handleTrialNext}
                    className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
                  >
                    다음 질문 →
                  </button>
                )}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-[#666666]">
                  <Link
                    href="/pattern"
                    className="transition-colors hover:text-[#5a4bb5]"
                  >
                    ← 패턴 돋보기로 돌아가기
                  </Link>
                  {!state.isTrial && (
                    <>
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
                        {sharing ? '이미지 생성 중...' : isPreviewMode ? '미리보기 카드 다운로드' : '결과 카드 다운로드'}
                      </button>
                    </>
                  )}
                </div>
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
  )
}
