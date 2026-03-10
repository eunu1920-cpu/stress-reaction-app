'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { saveRecord } from '@/lib/save-record'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/login-modal'
import { hasManualRecordToday } from '@/lib/daily-limits'

const MAX_TAGS_PER_SECTION = 4

const SITUATION_TAGS = [
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

const BODY_REACTION_TAGS = [
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

const BEHAVIOR_TAGS = [
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

function CheckboxGrid({
  tags,
  selected,
  onChange,
}: {
  tags: string[]
  selected: string[]
  onChange: (value: string, checked: boolean) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
      {tags.map((tag) => (
        <label
          key={tag}
          className="flex items-center gap-2 cursor-pointer text-sm text-[#333333] hover:text-[#5a4bb5]"
        >
          <input
            type="checkbox"
            checked={selected.includes(tag)}
            onChange={(e) => onChange(tag, e.target.checked)}
            className="size-4 rounded border-[#E8E2FF] text-[#8E7CFF] focus:ring-[#8E7CFF]"
          />
          <span>{tag}</span>
        </label>
      ))}
    </div>
  )
}

export default function RecordPage() {
  const router = useRouter()
  const { user, isLoggedIn, login, isDemoMode } = useAuth()
  const [situationTags, setSituationTags] = useState<string[]>([])
  const [bodyReactionTags, setBodyReactionTags] = useState<string[]>([])
  const [behaviorTags, setBehaviorTags] = useState<string[]>([])
  const [memo, setMemo] = useState('')
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [alreadyRecordedToday, setAlreadyRecordedToday] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    hasManualRecordToday(user?.id ?? null).then((exists) => {
      if (!cancelled) setAlreadyRecordedToday(exists)
    })
    return () => { cancelled = true }
  }, [user?.id])

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

  const performSave = async (userId: string, demoMode?: boolean) => {
    const summary = [
      situationTags.join(', '),
      bodyReactionTags.join(', '),
      behaviorTags.join(', '),
    ]
      .filter(Boolean)
      .join(' · ')

    const ok = await saveRecord({
      userId: demoMode ?? isDemoMode ? undefined : userId,
      category: situationTags[0] ?? 'QR',
      pattern: 'manual_record',
      situationTags,
      bodyReactionTags,
      behaviorTags,
      content: memo.trim() || summary,
      q1: JSON.stringify(situationTags),
      q2: JSON.stringify(bodyReactionTags),
      q3: JSON.stringify(behaviorTags),
      summary,
      resultType: 'QR',
      memo: memo.trim() || undefined,
    })
    if (!ok) {
      if (demoMode ?? isDemoMode) {
        toast.error('데모 모드에서는 기록이 저장되지 않습니다. 로그인 후 다시 시도해주세요.')
      } else {
        setError('저장에 실패했습니다.')
        return
      }
    }
    router.push('/observe')
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

    if (!isLoggedIn || !user) {
      setLoginModalOpen(true)
      return
    }

    setSaving(true)
    setError(null)
    await performSave(user.id, isDemoMode)
    setSaving(false)
  }

  const handleLoginSuccess = async (email?: string) => {
    const result = await login(email)
    if (result && 'user' in result) {
      const existsToday = await hasManualRecordToday(result.user.id)
      if (existsToday) {
        toast.error('오늘 기록은 이미 작성되었습니다.')
        setLoginModalOpen(false)
        return
      }
      setError(null)
      await performSave(result.user.id, result.isDemo)
      setLoginModalOpen(false)
      router.push('/observe')
    } else if (result && 'emailSent' in result) {
      return { emailSent: true }
    } else if (result && 'error' in result) {
      return { error: result.error }
    }
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
          <h1 className="text-xl font-bold text-[#111111] mb-6">
            오늘 반응 기록
          </h1>

          {alreadyRecordedToday && (
            <div className="mb-6 p-4 rounded-xl bg-[#F0EDFF] border border-[#E8E2FF] text-sm text-[#5a4bb5]">
              오늘 기록은 이미 작성되었습니다.
            </div>
          )}

          {/* 1. Situation */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-3">
              Situation (최대 4개 선택)
            </label>
            <CheckboxGrid
              tags={SITUATION_TAGS}
              selected={situationTags}
              onChange={(value, checked) =>
                toggleTag(setSituationTags, value, checked, situationTags)
              }
            />
          </div>

          {/* 2. Body reaction */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-3">
              Body reaction (최대 4개 선택)
            </label>
            <CheckboxGrid
              tags={BODY_REACTION_TAGS}
              selected={bodyReactionTags}
              onChange={(value, checked) =>
                toggleTag(setBodyReactionTags, value, checked, bodyReactionTags)
              }
            />
          </div>

          {/* 3. Behavior */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-3">
              Behavior (최대 4개 선택)
            </label>
            <CheckboxGrid
              tags={BEHAVIOR_TAGS}
              selected={behaviorTags}
              onChange={(value, checked) =>
                toggleTag(setBehaviorTags, value, checked, behaviorTags)
              }
            />
          </div>

          {/* 4. Memo */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              추가 메모 (선택)
            </label>
            <textarea
              placeholder="상황이나 생각을 간단히 기록하세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-[#E8E2FF] px-4 py-3 text-sm placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8E7CFF] focus:border-transparent resize-none"
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          {/* 5. Save */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!hasSelection || saving || alreadyRecordedToday === true}
            className="w-full py-3.5 bg-[#8E7CFF] text-white rounded-2xl font-semibold hover:bg-[#7D6BEE] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? '저장 중...' : '기록 저장'}
          </button>
        </div>
      </div>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={handleLoginSuccess}
      />
    </main>
  )
}
