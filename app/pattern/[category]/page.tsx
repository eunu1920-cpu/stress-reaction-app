'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Download, RotateCcw } from 'lucide-react'
import { LoginModal } from '@/components/login-modal'
import {
  getPatternLensQuestionById,
  getPatternLensQuestions,
  isPatternLensCategory,
} from '@/lib/pattern-lens/registry'
import {
  fetchQuestionResponse,
  getRandomPatternQuestion,
  savePatternLensResponse,
  savePatternLensResponseStandalone,
} from '@/lib/pattern-lens/storage'
import type { PatternLensResponseSnapshot } from '@/lib/pattern-lens/storage'
import type { PatternLensCategory, PatternLensOption, PatternLensQuestion } from '@/lib/pattern-lens/types'
import { useAuth } from '@/lib/auth-context'
import { saveData, loadRecords } from '@/lib/storage'
import { toBlob } from 'html-to-image'
import { toast } from 'sonner'
import { PatternFlowGuide, PatternFlowStepHint } from '@/components/pattern-flow-guide'
import { PatternInsightCollapsible } from '@/components/pattern-insight-collapsible'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { TimedSelectionOptions } from '@/components/timed-selection-options'
import { playSound } from '@/lib/play-sound'
import { getRandomTimeoutOption } from '@/lib/pattern-lens/timeout-interpretations'

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
        className="inline-flex items-center justify-center rounded-xl bg-[#8E7CFF] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
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
  | { status: 'trialComplete' }
  | {
      status: 'ready'
      assignmentId: string
      question: PatternLensQuestion
      existingResponse: PatternResponseLike | null
      isTrial?: boolean
      isRandomMode?: boolean
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
  const { user, isDemoMode } = useAuth()
  const categoryParam = String(params?.category ?? '')
  const [state, setState] = useState<LoadedState>({ status: 'loading' })
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [previewResponse, setPreviewResponse] = useState<PatternResponseLike | null>(null)
  const [patternComment, setPatternComment] = useState('')
  const [selectedResonantTags, setSelectedResonantTags] = useState<string[]>([])
  const [completedRecordsCount, setCompletedRecordsCount] = useState<number | null>(null)
  const [trialLoginInfoOpen, setTrialLoginInfoOpen] = useState(false)
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

    if (!user?.id || isDemoMode) {
      const anonymousId = getOrCreateAnonymousId()
      const answered = getTrialAnswered(anonymousId)[category] ?? []
      const unanswered = activeQuestions.filter((q) => !answered.includes(q.id))
      const nextQuestion = unanswered.length > 0
        ? unanswered[Math.floor(Math.random() * unanswered.length)]
        : undefined
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
    const load = async () => {
      const question = await getRandomPatternQuestion(user.id, category)
      if (cancelled) return
      if (!question) {
        setState({ status: 'empty' })
        return
      }
      setState({
        status: 'ready',
        assignmentId: 'random',
        question,
        existingResponse: null,
        isRandomMode: true,
      })
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [user?.id, isDemoMode, category, isPreviewMode, previewQuestion, previewQuestionId, activeQuestions])

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

    const result = state.isRandomMode
      ? await savePatternLensResponseStandalone({
          userId: user.id,
          category: state.question.category,
          question: state.question,
          option,
        })
      : await savePatternLensResponse({
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
      isRandomMode: state.isRandomMode,
    })
    setSaving(false)

    loadRecords(user.id).then((records) => {
      setCompletedRecordsCount(records.length)
      window.dispatchEvent(new CustomEvent('records-updated'))
    })
  }

  const trialQuestions = useMemo(
    () => (category ? getPatternLensQuestions(category) : []),
    [category]
  )
  const resultSoundPlayedRef = useRef(false)
  const [sessionResultCount, setSessionResultCount] = useState(0)
  const prevHadResponseRef = useRef(false)

  const handleTrialNext = useCallback(async () => {
    if (state.status !== 'ready' || !state.isTrial || !state.question || !category) return
    const option = selectedOptionId
      ? state.question.options.find((o) => o.id === selectedOptionId)
      : null
    const comment = patternComment.trim()
    const baseContent = option?.interpretation.body ?? ''
    const parts: string[] = []
    if (selectedResonantTags.length > 0)
      parts.push(`공감: ${selectedResonantTags.join(', ')}`)
    if (comment) parts.push(`댓글: ${comment}`)
    const contentWithComment =
      parts.length > 0 ? `${baseContent}\n\n${parts.join('\n\n')}` : baseContent
    if (option) {
      const snapshot = {
        scenario: state.question.scenario,
        prompt: state.question.prompt,
        selectedLabel: option.label,
        interpretationTitle: option.interpretation.title,
        interpretationSummary: option.interpretation.summary,
        interpretationBody: option.interpretation.body,
        interpretationInsight: option.interpretation.insight,
        reflectionQuestion: option.interpretation.reflectionQuestion,
        interpretationPoints: option.interpretation.points ?? [],
      }
      await saveData(
        {
          category,
          pattern: 'pattern_lens',
          sourceKind: 'pattern_lens',
          patternCode: option.patternCode,
          questionId: state.question.id,
          optionId: option.id,
          questionVersion: state.question.version,
          sourceSnapshot: snapshot,
          situationTags: [state.question.scenario],
          bodyReactionTags: [option.label],
          behaviorTags: [option.interpretation.title],
          content: contentWithComment,
          q1: JSON.stringify([state.question.scenario]),
          q2: JSON.stringify([option.label]),
          q3: JSON.stringify([option.interpretation.title]),
          summary: option.interpretation.summary,
          resultType: option.patternCode,
          memo: contentWithComment,
        },
        null
      )
      loadRecords(null).then((records) => {
        setCompletedRecordsCount(records.length)
        window.dispatchEvent(new CustomEvent('records-updated'))
      })
    }
    const anonymousId = getOrCreateAnonymousId()
    addTrialAnswered(anonymousId, category, state.question.id)
    const answered = getTrialAnswered(anonymousId)[category] ?? []
    const unanswered = trialQuestions.filter((q) => !answered.includes(q.id))
    const nextQuestion = unanswered.length > 0
      ? unanswered[Math.floor(Math.random() * unanswered.length)]
      : undefined
    setSelectedOptionId(null)
    setPreviewResponse(null)
    setPatternComment('')
    setSelectedResonantTags([])
    resultSoundPlayedRef.current = false
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
  }, [state.status, (state as { isTrial?: boolean }).isTrial, 'question' in state ? state.question : undefined, category, trialQuestions, selectedOptionId, patternComment, selectedResonantTags])

  const handleRandomNext = useCallback(async () => {
    if (state.status !== 'ready' || !state.isRandomMode || !user?.id || !category) return
    const hasComment =
      selectedResonantTags.length > 0 || patternComment.trim()
    if (hasComment && activeResponse && state.question) {
      const baseContent = activeResponse.display_snapshot?.interpretationBody?.trim() ?? ''
      const parts: string[] = []
      if (selectedResonantTags.length > 0)
        parts.push(`공감: ${selectedResonantTags.join(', ')}`)
      if (patternComment.trim()) parts.push(`댓글: ${patternComment.trim()}`)
      const append = parts.join('\n\n')
      const newContent = baseContent
        ? `${baseContent}\n\n${append}`
        : append
      const records = await loadRecords(user.id)
      const match = records.find(
        (r) =>
          r.sourceKind === 'pattern_lens' && r.questionId === state.question?.id
      )
      if (match) {
        const { updateRecordContent } = await import('@/lib/history-storage')
        await updateRecordContent(match.id, newContent)
      }
    }
    setState({ status: 'loading' })
    setSelectedOptionId(null)
    setPreviewResponse(null)
    setPatternComment('')
    setSelectedResonantTags([])
    resultSoundPlayedRef.current = false
    const question = await getRandomPatternQuestion(user.id, category)
    if (!question) {
      setState({ status: 'empty' })
      return
    }
    setState({
      status: 'ready',
      assignmentId: 'random',
      question,
      existingResponse: null,
      isRandomMode: true,
    })
  }, [state.status, (state as { isRandomMode?: boolean; question?: PatternLensQuestion }).isRandomMode, (state as { question?: PatternLensQuestion }).question, user?.id, category, patternComment, selectedResonantTags, activeResponse])

  useEffect(() => {
    if (
      state.status === 'ready' &&
      (state.isTrial || state.isRandomMode) &&
      activeResponse &&
      !isPreviewMode &&
      !resultSoundPlayedRef.current
    ) {
      resultSoundPlayedRef.current = true
      playSound('SOUND_04')
    }
  }, [state.status, (state as { isTrial?: boolean; isRandomMode?: boolean }).isTrial, (state as { isRandomMode?: boolean }).isRandomMode, activeResponse, isPreviewMode])

  useEffect(() => {
    const hasResponse = !!activeResponse && state.status === 'ready'
    if (hasResponse && !prevHadResponseRef.current) {
      setSessionResultCount((c) => c + 1)
    }
    prevHadResponseRef.current = hasResponse
  }, [activeResponse, state.status])

  useEffect(() => {
    if (state.status !== 'empty' && state.status !== 'trialComplete' && !(state.status === 'ready' && activeResponse)) {
      if (state.status !== 'ready') setCompletedRecordsCount(null)
      return
    }
    let cancelled = false
    loadRecords(user?.id ?? null).then((records) => {
      if (!cancelled) setCompletedRecordsCount(records.length)
    })
    return () => {
      cancelled = true
    }
  }, [state.status, user?.id, activeResponse])

  const handleDownloadResult = async () => {
    if (!resultCardRef.current || sharing || state.status !== 'ready' || !activeResponse) {
      return
    }

    setSharing(true)

    try {
      const cardEl = resultCardRef.current
      const w = Math.ceil(cardEl.getBoundingClientRect().width)
      const blob = await toBlob(cardEl, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        fontEmbedCSS: '',
        /** 캡처 시 flex·한글 줄바꿈이 비정상적으로 잘리는 경우 완화 */
        width: w > 0 ? w : undefined,
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
          <div className="mx-auto flex w-full max-w-md flex-col gap-3">
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

  const showResultFooter = state.status === 'ready' && !!activeResponse

  return (
      <main className={`min-h-screen bg-[#F5F3FA] px-4 py-10 ${showResultFooter ? 'pb-28' : ''}`}>
        <div className="mx-auto flex w-full max-w-md flex-col gap-3">
          <div className="text-center">
            <p className="text-sm font-medium text-[#8E7CFF]">{CATEGORY_LABELS[category]}</p>
            <h1 className="mt-2 text-2xl font-bold text-[#333333]">오늘의 관찰 질문</h1>
          </div>

          {!isPreviewMode && (
            <PatternFlowGuide
              activeStep={showResultFooter ? 4 : 3}
              defaultOpen={false}
              className="w-full"
            />
          )}

          {state.status === 'ready' && state.isTrial && state.question && category !== 'relation' && (
            <section className="rounded-2xl border border-[#E8E2FF] bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8E7CFF]">
                비회원 체험
              </p>
              <Collapsible open={trialLoginInfoOpen} onOpenChange={setTrialLoginInfoOpen}>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-sm leading-snug text-[#555555]">
                  <span>기록 없이 둘러보는 중이에요.</span>
                  <CollapsibleTrigger
                    type="button"
                    className="shrink-0 text-xs font-medium text-[#8E7CFF] underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[#8E7CFF] focus-visible:ring-offset-1"
                  >
                    {trialLoginInfoOpen ? '(접기)' : '(펼치기)'}
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-none">
                  <p className="mt-1.5 text-xs leading-relaxed text-[#666666]">
                    나중에 로그인하시면, 지금까지의 패턴이 모여 &apos;개인 히스토리&apos;와 누적된
                    &apos;당신의 패턴보고서&apos;를 보여드릴 수 있어요.
                  </p>
                </CollapsibleContent>
              </Collapsible>
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
              {completedRecordsCount !== null && completedRecordsCount >= 5 && (
                <p className="mt-3 text-sm font-medium text-[#8E7CFF]">
                  5개가 모였어요. 종합분석에서 패턴을 확인해보세요
                </p>
              )}
              <div className="mt-5 flex flex-col gap-3">
                {completedRecordsCount !== null && completedRecordsCount >= 5 && (
                  <Link
                    href="/analysis"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
                  >
                    종합분석 보기
                  </Link>
                )}
                <Link
                  href="/history"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#DDD4FF] bg-white px-5 py-3 text-sm font-semibold text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF]"
                >
                  내 히스토리 보기
                </Link>
                <Link
                  href="/pattern"
                  className="text-sm font-medium text-[#666666] transition-colors hover:text-[#5a4bb5]"
                >
                  ← 패턴 돋보기로 돌아가기
                </Link>
              </div>
            </div>
          )}

          {state.status === 'trialComplete' && (
            <div className="rounded-xl border border-[#E8E2FF] bg-white p-4 text-center shadow-sm">
              <p className="text-sm font-semibold text-[#333333]">
                이 장면에서의 관찰은 여기까지예요
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#555555]">
                로그인하시면, 지금까지의 패턴이 모여 다른 각도로 보여드릴 수 있어요.
              </p>
              {completedRecordsCount !== null && completedRecordsCount >= 5 && (
                <p className="mt-2 text-xs font-medium text-[#8E7CFF]">
                  5개가 모였어요. 종합분석에서 패턴을 확인해보세요
                </p>
              )}
              <div className="mt-3 flex flex-col gap-2">
                {completedRecordsCount !== null && completedRecordsCount >= 5 && (
                  <Link
                    href="/analysis"
                    className="inline-flex items-center justify-center rounded-xl bg-[#8E7CFF] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
                  >
                    종합분석 보기
                  </Link>
                )}
                <Link
                  href="/history"
                  className="inline-flex items-center justify-center rounded-xl border border-[#DDD4FF] bg-white px-4 py-2.5 text-xs font-semibold text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF]"
                >
                  내 히스토리 다시보기
                </Link>
                <div className="flex justify-center pt-0.5">
                  <TrialLoginButton />
                </div>
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
                <>
                  <div className="space-y-1 px-0.5">
                    <PatternFlowStepHint step={3}>
                      가장 가까운 답을 <strong className="font-semibold text-[#333333]">눌러서</strong>{' '}
                      골라요
                    </PatternFlowStepHint>
                    {state.isTrial && !isPreviewMode && (
                      <p className="text-xs leading-relaxed text-[#888888]">
                        30초 안에 고르지 않으면, 임의로 하나가 선택돼요.
                      </p>
                    )}
                  </div>
                  {state.isTrial && !isPreviewMode ? (
                    <TimedSelectionOptions
                      key={state.question.id}
                      options={state.question.options}
                      onSelect={(option) => {
                        setSelectedOptionId(option.id)
                        setPreviewResponse(buildPreviewResponse(state.question, option))
                      }}
                      onTimeout={() => getRandomTimeoutOption()}
                      enabled={!saving}
                    />
                  ) : (
                    <section className="flex flex-col gap-3">
                      {state.question.options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelect(option)}
                          disabled={saving}
                          className={`flex min-h-[120px] w-full flex-col justify-start rounded-3xl border-2 px-6 py-5 text-left text-[15px] font-medium text-[#333333] shadow-sm transition-all hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${
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
                </>
              )}

              {activeResponse?.display_snapshot && (
                <section
                  ref={resultCardRef}
                  className="result-capture-card rounded-2xl border border-[#E8E2FF] bg-white p-6 shadow-sm break-keep"
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-[#8E7CFF]">
                      {activeResponse.pattern_code}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-[#333333]">
                      {activeResponse.display_snapshot.interpretationTitle}
                    </h2>
                    {interpretationSections?.summary && (
                      <p className="mt-3 break-keep text-sm leading-relaxed text-[#555555]">
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
                        <p className="mt-2 break-keep text-sm leading-7 text-[#555555]">
                          {interpretationSections.body}
                        </p>
                      </div>
                    )}

                    {interpretationSections?.insight && (
                      <PatternInsightCollapsible
                        insight={interpretationSections.insight}
                        variant="compact"
                      />
                    )}

                    {interpretationSections?.question && (
                      <div className="rounded-2xl border border-[#DDD4FF] bg-[#F8F5FF] px-4 py-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                          관찰 질문
                        </p>
                        <p className="mt-2 break-keep text-sm leading-7 text-[#333333]">
                          {interpretationSections.question}
                        </p>
                      </div>
                    )}
                  </div>

                  {activeResponse.display_snapshot.interpretationPoints.length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs font-medium text-[#8E7CFF]">공감하는 태그 클릭</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {activeResponse.display_snapshot.interpretationPoints.map((point) => {
                          const isSelected = selectedResonantTags.includes(point)
                          return (
                            <button
                              key={point}
                              type="button"
                              onClick={() =>
                                setSelectedResonantTags((prev) =>
                                  prev.includes(point)
                                    ? prev.filter((p) => p !== point)
                                    : [...prev, point]
                                )
                              }
                              className={`inline-flex max-w-full shrink-0 whitespace-nowrap rounded-xl border px-3 py-2 text-sm transition-colors ${
                                isSelected
                                  ? 'border-[#8E7CFF] bg-[#F3EEFF] text-[#5a4bb5]'
                                  : 'border-[#E8E2FF] bg-white text-[#666666] hover:border-[#D8CCFF] hover:bg-[#F8F5FF]'
                              }`}
                            >
                              {point}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {activeResponse && !isPreviewMode && (
                <section className="rounded-2xl border border-[#E8E2FF] bg-white p-4 shadow-sm">
                  <PatternFlowStepHint step={4}>
                    해석을 보신 뒤, 공감 태그·한 줄을 남기면 패턴이 더 정확해져요
                  </PatternFlowStepHint>
                  <p className="mt-3 text-sm font-medium text-[#333333]">
                    한 줄 더 (선택이에요)
                  </p>
                  <p className="mt-0.5 text-xs text-[#888888]">
                    아래 보라색 「다음 질문」을 누르면 함께 저장돼요
                  </p>
                  <div className="mt-2">
                    <textarea
                      value={patternComment}
                      onChange={(e) => setPatternComment(e.target.value)}
                      placeholder="또는 직접 적기"
                      maxLength={300}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-[#E8E2FF] px-4 py-2.5 text-sm text-[#333333] placeholder:text-[#999999] focus:border-[#8E7CFF] focus:outline-none"
                    />
                    <p className="mt-1 text-right text-xs tabular-nums text-[#999999]">
                      {patternComment.length} / 300
                    </p>
                  </div>
                </section>
              )}

              {activeResponse && completedRecordsCount !== null && completedRecordsCount >= 5 && (
                <section className="rounded-2xl border border-[#E8E2FF] bg-[#F8F5FF] p-4 text-center">
                  <p className="text-sm font-medium text-[#8E7CFF]">
                    5개가 모였어요. 종합분석에서 패턴을 확인해보세요
                  </p>
                  <Link
                    href="/analysis"
                    className="mt-2 inline-block text-sm font-semibold text-[#5a4bb5] underline-offset-2 hover:underline"
                  >
                    종합분석 보기 →
                  </Link>
                </section>
              )}
              {activeResponse && sessionResultCount >= 2 && sessionResultCount % 2 === 0 && (
                <Link
                  href="/record"
                  className="block text-center text-xs text-[#8E7CFF] hover:underline"
                >
                  관찰 멈추고 지금 생각 남기기 →
                </Link>
              )}
            </>
          )}

          <div className="pt-1 text-center">
            {state.status === 'ready' && activeResponse && state.isTrial && !showResultFooter && (
              <button
                type="button"
                onClick={handleTrialNext}
                className="inline-flex items-center justify-center rounded-2xl bg-[#8E7CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
              >
                다음 질문 →
              </button>
            )}
            {!showResultFooter && (
              <Link
                href="/pattern"
                className="text-sm font-medium text-[#666666] transition-colors hover:text-[#5a4bb5]"
              >
                ← 패턴 돋보기로 돌아가기
              </Link>
            )}
          </div>

          {showResultFooter && (
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E2FF] bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
              <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
                <Link
                  href="/observe"
                  className="shrink-0 rounded-xl p-2.5 text-[#8E7CFF] transition-colors hover:bg-[#E8E2FF]"
                  title="관찰로 돌아가기"
                  aria-label="관찰로 돌아가기"
                >
                  <RotateCcw className="h-5 w-5" />
                </Link>
                {(state.isRandomMode || state.isTrial) && (
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <button
                      type="button"
                      onClick={state.isTrial ? handleTrialNext : handleRandomNext}
                      className="w-full rounded-xl bg-[#8E7CFF] px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-[#7D6BEE] active:scale-[0.98]"
                    >
                      다음 질문 →
                    </button>
                    <span className="text-center text-[10px] text-[#888888]">
                      저장 후 이어서 진행해요 · 5개 모이면 종합분석
                    </span>
                  </div>
                )}
                <Link
                  href="/record"
                  className="shrink-0 rounded-xl border border-[#8E7CFF] px-4 py-2.5 text-center text-sm font-semibold text-[#8E7CFF] transition-colors hover:bg-[#E8E2FF]"
                >
                  지금 반응
                </Link>
                <button
                  type="button"
                  onClick={handleDownloadResult}
                  disabled={sharing}
                  className="shrink-0 rounded-xl p-2.5 text-[#8E7CFF] transition-colors hover:bg-[#E8E2FF] disabled:cursor-not-allowed disabled:opacity-50"
                  title="내 패턴 저장하기"
                  aria-label="내 패턴 저장하기"
                >
                  {sharing ? (
                    <span className="text-xs">생성 중</span>
                  ) : (
                    <Download className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
  )
}
