'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { saveData } from '@/lib/storage'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/login-modal'
import { hasManualRecordToday } from '@/lib/daily-limits'
import { supabase } from '@/lib/supabase'
import { showRecordSuccessToast } from '@/components/record-success-toast'

type SaveStatus = 'idle' | 'loading' | 'success' | 'error'

const MAX_TAGS_PER_SECTION = 4
const PENDING_RECORD_KEY = 'myview-pending-record'

type MoodType = 'cloudy' | 'clear'

type PendingRecordData = {
  situationTags: string[]
  bodyReactionTags: string[]
  behaviorTags: string[]
  memo: string
  mood?: MoodType
}

/** 흐림: 부담·긴장에 가까운 상황 위주 */
const SITUATION_TAGS_CLOUDY = [
  '시간압박',
  '일 많음',
  '사람 많음',
  '갈등',
  '예상치 못한 일',
  '선택해야 함',
  '평가 상황',
  '실수 걱정',
  '멀티태스킹',
  '집중 방해',
  '새로운 환경',
  '관계 고민',
]

/** 맑음: 여유·긍정적 맥락 위주 */
const SITUATION_TAGS_CLEAR = [
  '여유 있는 하루',
  '좋은 소식',
  '만남·대화',
  '일이 잘 풀림',
  '새로운 시도',
  '몰입할 일',
  '취미·휴식',
  '관계가 따뜻함',
  '감사한 일',
  '작은 성취',
  '안정적인 루틴',
  '몸과 마음 여유',
]

const BODY_REACTION_TAGS_CLOUDY = [
  '피로',
  '짜증',
  '긴장',
  '무기력',
  '멍함',
  '예민함',
  '두통',
  '어깨긴장',
  '속불편',
  '심장빠름',
  '숨답답',
  '에너지저하',
]

const BODY_REACTION_TAGS_CLEAR = [
  '편안함',
  '가벼움',
  '활력',
  '따뜻함',
  '잠 잘 잠',
  '식욕 좋음',
  '호흡 여유',
  '몸이 풀림',
  '집중 잘 됨',
  '마음이 놓임',
  '웃음이 남',
  '몸이 긍정적으로 반응',
]

const BEHAVIOR_TAGS_CLOUDY = [
  '말 줄임',
  '피함',
  '생각 반복',
  '과집중',
  '미루기',
  '정리 시도',
  '혼자 있음',
  '감정 폭발',
  '문제 해결',
  '휴식 찾음',
  '핸드폰 회피',
  '산책',
]

const BEHAVIOR_TAGS_CLEAR = [
  '사람과 나눔',
  '감사 표현',
  '기록·정리',
  '산책·움직임',
  '취미 시간',
  '칭찬·격려',
  '일찍 쉼',
  '계획 실천',
  '새로 배움',
  '도움 줌',
  '스스로에게 친절',
  '느긋하게 보냄',
]

function CheckboxGrid({
  tags,
  selected,
  onChange,
  onInteract,
  disabled,
}: {
  tags: string[]
  selected: string[]
  onChange: (value: string, checked: boolean) => void
  onInteract?: () => void
  disabled?: boolean
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled && onInteract) {
      e.preventDefault()
      onInteract()
    }
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
      {tags.map((tag) => (
        <label
          key={tag}
          onClick={handleClick}
          className="flex items-center gap-2 cursor-pointer text-sm text-[#333333] hover:text-[#5a4bb5]"
        >
          <input
            type="checkbox"
            checked={selected.includes(tag)}
            onChange={(e) => !disabled && onChange(tag, e.target.checked)}
            disabled={disabled}
            className="size-4 rounded border-[#E8E2FF] text-[#8E7CFF] focus:ring-[#8E7CFF]"
          />
          <span>{tag}</span>
        </label>
      ))}
    </div>
  )
}

const SUCCESS_DISPLAY_MS = 1500

export default function RecordPage() {
  const { user, isLoggedIn, login, isDemoMode } = useAuth()
  const [situationTags, setSituationTags] = useState<string[]>([])
  const [bodyReactionTags, setBodyReactionTags] = useState<string[]>([])
  const [behaviorTags, setBehaviorTags] = useState<string[]>([])
  const [memo, setMemo] = useState('')
  const [mood, setMood] = useState<MoodType>('cloudy')
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginModalSource, setLoginModalSource] = useState<'interact' | 'save' | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [alreadyRecordedToday, setAlreadyRecordedToday] = useState<boolean | null>(null)
  const [questionExpand, setQuestionExpand] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [questionSubmitting, setQuestionSubmitting] = useState(false)

  const situationTagOptions = useMemo(
    () => (mood === 'clear' ? SITUATION_TAGS_CLEAR : SITUATION_TAGS_CLOUDY),
    [mood]
  )
  const bodyTagOptions = useMemo(
    () => (mood === 'clear' ? BODY_REACTION_TAGS_CLEAR : BODY_REACTION_TAGS_CLOUDY),
    [mood]
  )
  const behaviorTagOptions = useMemo(
    () => (mood === 'clear' ? BEHAVIOR_TAGS_CLEAR : BEHAVIOR_TAGS_CLOUDY),
    [mood]
  )

  const handleMoodChange = useCallback(
    (next: MoodType) => {
      if (!isLoggedIn) return
      if (next === mood) return
      setMood(next)
      setSituationTags([])
      setBodyReactionTags([])
      setBehaviorTags([])
    },
    [isLoggedIn, mood]
  )

  useEffect(() => {
    let cancelled = false
    hasManualRecordToday(user?.id ?? null).then((exists) => {
      if (!cancelled) setAlreadyRecordedToday(exists)
    })
    return () => { cancelled = true }
  }, [user?.id])

  useEffect(() => {
    if (!user?.id || alreadyRecordedToday !== false) return
    try {
      const raw = sessionStorage.getItem(PENDING_RECORD_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as PendingRecordData
      if (!data || !Array.isArray(data.situationTags) || !Array.isArray(data.bodyReactionTags) || !Array.isArray(data.behaviorTags)) return
      const m: MoodType = data.mood === 'clear' ? 'clear' : 'cloudy'
      const sitPool = m === 'clear' ? SITUATION_TAGS_CLEAR : SITUATION_TAGS_CLOUDY
      const bodyPool = m === 'clear' ? BODY_REACTION_TAGS_CLEAR : BODY_REACTION_TAGS_CLOUDY
      const behPool = m === 'clear' ? BEHAVIOR_TAGS_CLEAR : BEHAVIOR_TAGS_CLOUDY
      const situationTagsSafe = (data.situationTags ?? []).filter((t) => sitPool.includes(t))
      const bodyTagsSafe = (data.bodyReactionTags ?? []).filter((t) => bodyPool.includes(t))
      const behaviorTagsSafe = (data.behaviorTags ?? []).filter((t) => behPool.includes(t))
      const safeData: PendingRecordData = {
        ...data,
        situationTags: situationTagsSafe,
        bodyReactionTags: bodyTagsSafe,
        behaviorTags: behaviorTagsSafe,
        mood: m,
      }
      sessionStorage.removeItem(PENDING_RECORD_KEY)
      setSituationTags(situationTagsSafe)
      setBodyReactionTags(bodyTagsSafe)
      setBehaviorTags(behaviorTagsSafe)
      setMemo(data.memo ?? '')
      setMood(m)
      setSaveStatus('loading')
      setError(null)
      void performSaveWithData(user.id, safeData, isDemoMode)
    } catch {
      sessionStorage.removeItem(PENDING_RECORD_KEY)
    }
  }, [user?.id, alreadyRecordedToday, isDemoMode])

  const toggleTag = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
    checked: boolean,
    currentSelected: string[]
  ) => {
    if (checked && currentSelected.length >= MAX_TAGS_PER_SECTION) {
      toast.error('최대 4개까지 선택할 수 있습니다.')
      return
    }
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    )
  }

  const performSaveWithData = async (
    userId: string | null,
    data: PendingRecordData,
    demoMode?: boolean
  ): Promise<boolean> => {
    const summary = [
      data.situationTags.join(', '),
      data.bodyReactionTags.join(', '),
      data.behaviorTags.join(', '),
    ]
      .filter(Boolean)
      .join(' · ')

    const effectiveUserId = demoMode ?? isDemoMode ? null : userId
    const ok = await saveData(
      {
        category: data.situationTags[0] ?? 'QR',
        pattern: 'manual_record',
        situationTags: data.situationTags,
        bodyReactionTags: data.bodyReactionTags,
        behaviorTags: data.behaviorTags,
        content: (data.memo ?? '').trim() || summary,
        q1: JSON.stringify(data.situationTags),
        q2: JSON.stringify(data.bodyReactionTags),
        q3: JSON.stringify(data.behaviorTags),
        summary,
        resultType: 'QR',
        memo: (data.memo ?? '').trim() || undefined,
        sourceSnapshot: { mood: data.mood ?? 'cloudy' },
      },
      effectiveUserId
    )
    if (!ok) {
      if (demoMode ?? isDemoMode) {
        toast.error('데모 모드에서는 기록이 저장되지 않습니다. 로그인 후 다시 시도해주세요.')
        setSaveStatus('idle')
      } else {
        setSaveStatus('error')
        setError('저장에 실패했어요. 다시 시도해 주세요')
      }
      return false
    }
    setAlreadyRecordedToday(true)
    setSaveStatus('success')
    showRecordSuccessToast()
    setTimeout(() => setSaveStatus('idle'), SUCCESS_DISPLAY_MS)
    return true
  }

  const performSave = async (userId: string | null, demoMode?: boolean) => {
    await performSaveWithData(
      userId,
      { situationTags, bodyReactionTags, behaviorTags, memo, mood },
      demoMode
    )
  }

  const hasSelection =
    situationTags.length > 0 ||
    bodyReactionTags.length > 0 ||
    behaviorTags.length > 0

  const handleSave = async () => {
    if (!hasSelection) return

    const existsToday = await hasManualRecordToday(user?.id ?? null)
    if (existsToday) {
      toast.error('오늘 기록은 이미 작성되었습니다.')
      return
    }

    setSaveStatus('loading')
    setError(null)
    await performSave(isLoggedIn && user ? user.id : null, isDemoMode)
  }

  const handleLoginSuccess = async (email?: string) => {
    const result = await login(email, { redirectTo: '/record' })
    if (result && 'user' in result) {
      if (loginModalSource === 'interact') {
        setLoginModalOpen(false)
        setLoginModalSource(null)
        return
      }
      const existsToday = await hasManualRecordToday(result.user.id)
      if (existsToday) {
        toast.error('오늘 기록은 이미 작성되었습니다.')
        setLoginModalOpen(false)
        setLoginModalSource(null)
        return
      }
      setLoginModalOpen(false)
      setLoginModalSource(null)
      setError(null)
      setSaveStatus('loading')
      await performSave(result.user.id, result.isDemo)
    } else if (result && 'emailSent' in result) {
      return { emailSent: true }
    } else if (result && 'error' in result) {
      return { error: result.error }
    }
  }

  const handleInteractRequireLogin = () => {
    setLoginModalSource('interact')
    setLoginModalOpen(true)
  }

  const handleQuestionSubmit = async () => {
    const text = questionText.trim()
    if (!text || !user?.id) return
    if (isDemoMode) {
      toast.error('데모 모드에서는 제출할 수 없습니다. 로그인 후 이용해주세요.')
      return
    }
    setQuestionSubmitting(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) {
        toast.error('로그인이 필요합니다.')
        setQuestionSubmitting(false)
        return
      }
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      const res = await fetch('/api/question-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content: text }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        toast.error(json?.error ?? '제출에 실패했습니다.')
        setQuestionSubmitting(false)
        return
      }
      toast.success('제출되었습니다. 관리자가 검토 후 편집해 드려요.')
      setQuestionText('')
      setQuestionExpand(false)
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        toast.error('제출 시간이 초과되었습니다. 네트워크를 확인 후 다시 시도해주세요.')
      } else {
        toast.error('제출에 실패했습니다.')
      }
    }
    setQuestionSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/observe"
            className="text-sm text-[#555555] hover:text-[#333333] transition-colors"
          >
            ← 관찰로
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF] p-6">
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap items-center gap-4">
              <h1 className="text-xl font-bold text-[#111111]">
                오늘 반응 기록
              </h1>
              <fieldset
                className="flex items-center gap-3"
                onClick={() => !isLoggedIn && handleInteractRequireLogin()}
              >
                <legend className="sr-only">오늘의 기분</legend>
                <label className="flex cursor-pointer items-center gap-1.5 text-sm text-[#555555]">
                  <input
                    type="radio"
                    name="mood"
                    value="cloudy"
                    checked={mood === 'cloudy'}
                    onChange={() => handleMoodChange('cloudy')}
                    disabled={!isLoggedIn}
                    className="size-3.5 border-[#E8E2FF] text-[#8E7CFF] focus:ring-[#8E7CFF]"
                  />
                  <span>흐림</span>
                </label>
                <label className="flex cursor-pointer items-center gap-1.5 text-sm text-[#555555]">
                  <input
                    type="radio"
                    name="mood"
                    value="clear"
                    checked={mood === 'clear'}
                    onChange={() => handleMoodChange('clear')}
                    disabled={!isLoggedIn}
                    className="size-3.5 border-[#E8E2FF] text-[#8E7CFF] focus:ring-[#8E7CFF]"
                  />
                  <span>맑음</span>
                </label>
              </fieldset>
            </div>
            <p className="text-xs leading-relaxed text-[#888888]">
              흐림·맑음에 맞는 태그가 달라요. 바꾸면 선택한 태그는 초기화돼요.
            </p>
          </div>

          {alreadyRecordedToday && (
            <div className="mb-6 p-4 rounded-xl bg-[#F0EDFF] border border-[#E8E2FF] text-sm text-[#5a4bb5]">
              오늘 기록은 이미 작성되었습니다.
            </div>
          )}

          {/* 1. Situation */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-3">
              Situation (최대 4개 선택)
              <span className="ml-1.5 font-normal text-[#888888]">
                · {mood === 'clear' ? '맑음' : '흐림'}
              </span>
            </label>
            <CheckboxGrid
              tags={situationTagOptions}
              key={`sit-${mood}`}
              selected={situationTags}
              onChange={(value, checked) =>
                toggleTag(setSituationTags, value, checked, situationTags)
              }
              onInteract={handleInteractRequireLogin}
              disabled={!isLoggedIn}
            />
          </div>

          {/* 2. Body reaction */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-3">
              Body reaction (최대 4개 선택)
              <span className="ml-1.5 font-normal text-[#888888]">
                · {mood === 'clear' ? '맑음' : '흐림'}
              </span>
            </label>
            <CheckboxGrid
              tags={bodyTagOptions}
              key={`body-${mood}`}
              selected={bodyReactionTags}
              onChange={(value, checked) =>
                toggleTag(setBodyReactionTags, value, checked, bodyReactionTags)
              }
              onInteract={handleInteractRequireLogin}
              disabled={!isLoggedIn}
            />
          </div>

          {/* 3. Behavior */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-3">
              Behavior (최대 4개 선택)
              <span className="ml-1.5 font-normal text-[#888888]">
                · {mood === 'clear' ? '맑음' : '흐림'}
              </span>
            </label>
            <CheckboxGrid
              tags={behaviorTagOptions}
              key={`beh-${mood}`}
              selected={behaviorTags}
              onChange={(value, checked) =>
                toggleTag(setBehaviorTags, value, checked, behaviorTags)
              }
              onInteract={handleInteractRequireLogin}
              disabled={!isLoggedIn}
            />
          </div>

          {/* 4. Memo */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              추가 메모 (선택)
            </label>
            <textarea
              placeholder={`오늘 떠오른 상황이나 생각을 간단히 기록해보세요.

예)
어제 있었던 일이 계속 떠올랐다
오늘 일이 많아 긴장했다
앞으로 결과가 걱정된다`}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              onFocus={() => !isLoggedIn && handleInteractRequireLogin()}
              readOnly={!isLoggedIn}
              rows={6}
              className="w-full rounded-xl border border-[#E8E2FF] px-4 py-3 text-sm placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8E7CFF] focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600">{error}</p>
          )}

          {/* 5. Save */}
          <button
            type="button"
            onClick={handleSave}
            disabled={
              !hasSelection ||
              saveStatus === 'loading' ||
              saveStatus === 'success' ||
              alreadyRecordedToday === true
            }
            className="w-full py-3.5 bg-[#8E7CFF] text-white rounded-2xl font-semibold hover:bg-[#7D6BEE] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saveStatus === 'loading'
              ? '저장 중...'
              : saveStatus === 'success'
                ? '✔ 기록 완료'
                : '오늘 반응 기록하기'}
          </button>
          <p className="mt-3 text-center text-xs text-[#999999]">
            기록이 쌓이면 나의 반응 패턴을 분석할 수 있습니다.
          </p>

          {/* 상황→질문 나눠보기 */}
          <div className="mt-6 rounded-xl border border-[#E8E2FF] bg-[#FAF8FF] p-4">
            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  handleInteractRequireLogin()
                  return
                }
                setQuestionExpand((v) => !v)
              }}
              className="w-full text-left"
            >
              <p className="text-sm font-medium text-[#5a4bb5]">
                내 상황을 질문으로 바꾸고, 다른 사용자와 나눠보세요!
              </p>
              <p className="mt-0.5 text-xs text-[#777777]">
                형식은 자유입니다. 관리자가 따로 편집해드려요.
              </p>
            </button>
            {questionExpand && isLoggedIn && (
              <div className="mt-4 space-y-3">
                <textarea
                  placeholder="상황이나 고민을 자유롭게 적어주세요. 질문 형태로 바꿔도 좋고, 그대로 적어도 괜찮아요."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-[#E8E2FF] px-4 py-3 text-sm placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8E7CFF] focus:border-transparent resize-none"
                />
                <button
                  type="button"
                  onClick={handleQuestionSubmit}
                  disabled={!questionText.trim() || questionSubmitting}
                  className="w-full rounded-xl border border-[#DDD4FF] bg-white px-4 py-2.5 text-sm font-semibold text-[#5a4bb5] hover:bg-[#F8F5FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {questionSubmitting ? '제출 중...' : '나눠보기'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={(open) => {
          setLoginModalOpen(open)
          if (!open) setLoginModalSource(null)
        }}
        onLogin={handleLoginSuccess}
        variant={loginModalSource === 'interact' ? 'record' : 'save'}
      />
    </main>
  )
}
