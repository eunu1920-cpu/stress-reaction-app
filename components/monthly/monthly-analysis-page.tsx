'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { loadRecords } from '@/lib/storage'
import { useAuth } from '@/lib/auth-context'
import { LoginModal } from '@/components/login-modal'
import { MonthSelector } from '@/components/monthly/month-selector'
import { InsightCard } from '@/components/monthly/insight-card'
import { LockedSection } from '@/components/monthly/locked-section'
import {
  buildMonthlyInsight,
  groupRecordsByMonth,
  recentMonthKeys,
  formatMonthLabel,
} from '@/lib/monthly-analysis'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function MonthlyAnalysisPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, login, isDemoMode } = useAuth()
  const isLoggedIn = Boolean(user?.email?.trim()) && !isDemoMode

  const [records, setRecords] = useState<Awaited<ReturnType<typeof loadRecords>> | null>(null)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [flowMoreModalOpen, setFlowMoreModalOpen] = useState(false)

  const monthKeys = useMemo(() => recentMonthKeys(3), [])
  const defaultMonth = monthKeys[0] ?? ''
  const paramMonth = searchParams.get('month') ?? ''
  const selectedMonth = monthKeys.includes(paramMonth) ? paramMonth : defaultMonth

  useEffect(() => {
    void loadRecords(user?.id ?? null).then(setRecords)
  }, [user?.id])

  const byMonth = useMemo(() => {
    if (!records) return new Map()
    return groupRecordsByMonth(records)
  }, [records])

  const insight = useMemo(() => {
    const key = (selectedMonth || monthKeys[0]) ?? ''
    const list = byMonth.get(key) ?? []
    return buildMonthlyInsight(key, list)
  }, [byMonth, selectedMonth, monthKeys])

  const monthOptions = useMemo(
    () => monthKeys.map((key) => ({ key, label: formatMonthLabel(key) })),
    [monthKeys],
  )

  const setMonth = (key: string) => {
    router.replace(`/monthly?month=${encodeURIComponent(key)}`, { scroll: false })
  }

  const openFlowMore = () => {
    if (isLoggedIn) {
      router.push('/analysis')
      return
    }
    setFlowMoreModalOpen(true)
  }

  const openDetailCta = () => {
    if (isLoggedIn) {
      router.push('/analysis')
      return
    }
    setLoginModalOpen(true)
  }

  const handleLogin = async (email?: string) => {
    const result = await login(email, {
      redirectTo: `/monthly?month=${encodeURIComponent(selectedMonth)}`,
    })
    if (result && 'user' in result) {
      setLoginModalOpen(false)
      setFlowMoreModalOpen(false)
    }
    if (result && 'emailSent' in result) {
      return { emailSent: true }
    }
    if (result && 'error' in result) {
      return { error: result.error }
    }
  }

  const topTypesText =
    insight.topTypes.length > 0
      ? insight.topTypes.map((t) => `${t.label}`).join(' · ')
      : '아직 유형이 모이지 않았어요. 기록·테스트를 이어가면 보여요.'

  const lockedLines = isLoggedIn ? insight.lockedLinesFull : insight.lockedPreviewLines

  return (
    <main className="min-h-[calc(100dvh-3.5rem)] bg-[#F5F3FA] px-4 pb-28 pt-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        {/* [1] 상단 */}
        <header className="text-center">
          <h1 className="text-xl font-bold leading-snug text-[#333333]">
            이번 달 내 흐름
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#666666]">
            기록이 쌓이면 흐름이 보입니다
          </p>
        </header>

        {/* [2] 월 선택 */}
        <MonthSelector
          months={monthOptions}
          selected={selectedMonth}
          onSelect={setMonth}
        />

        {records === null && (
          <p className="text-center text-xs text-[#888888]">기록을 불러오는 중…</p>
        )}

        {/* [3] 무료 카드 */}
        <div className="flex flex-col gap-4">
          <InsightCard title="이번 달 핵심 패턴">
            {insight.corePatternLine}
          </InsightCard>
          <InsightCard title="많이 나타난 반응">
            {topTypesText}
          </InsightCard>
          <InsightCard title="이런 순간 있었죠?">
            <ul className="list-inside list-disc space-y-1.5 text-[#333333]">
              {insight.empathyLines.map((line, i) => (
                <li key={i} className="marker:text-[#8E7CFF]">
                  {line}
                </li>
              ))}
            </ul>
          </InsightCard>
          <InsightCard title="한번 생각해보세요">{insight.question}</InsightCard>
        </div>

        {/* [4] 흐름 & 선택 */}
        <div className="flex flex-col gap-4">
          <InsightCard title="지금 흐름">{insight.flowArrows}</InsightCard>
          <InsightCard title="다음 선택">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-[#8E7CFF]" aria-hidden>
                  ·
                </span>
                <span>{insight.nextChoices[0]}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8E7CFF]" aria-hidden>
                  ·
                </span>
                <span>{insight.nextChoices[1]}</span>
              </li>
            </ul>
          </InsightCard>

          <button
            type="button"
            onClick={openFlowMore}
            className="w-full rounded-2xl border border-[#E8E2FF] bg-white py-3.5 text-sm font-semibold text-[#333333] shadow-sm transition-colors hover:bg-[#FAFAFA] active:scale-[0.99]"
          >
            지금 흐름 더 보기
          </button>
        </div>

        {/* [5] 잠금 */}
        <LockedSection lines={lockedLines} unlocked={isLoggedIn} />

        {/* [6] CTA */}
        <button
          type="button"
          onClick={openDetailCta}
          className="w-full rounded-2xl bg-[#8E7CFF] py-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#7D6BEE] active:scale-[0.99]"
        >
          내 흐름 자세히 보기
        </button>

        <p className="text-center text-xs text-[#999999]">
          <Link href="/history" className="text-[#8E7CFF] underline-offset-2 hover:underline">
            히스토리로 돌아가기
          </Link>
        </p>
      </div>

      <Dialog open={flowMoreModalOpen} onOpenChange={setFlowMoreModalOpen}>
        <DialogContent className="max-w-[min(100%,22rem)] rounded-2xl border-[#E8E2FF] bg-white">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-[#333333]">
              전체 흐름
            </DialogTitle>
            <DialogDescription className="text-left text-sm leading-relaxed text-[#555555]">
              이 흐름은 기록이 쌓일수록 더 정확해집니다.
              <br />
              <br />
              로그인 후 전체 흐름을 확인할 수 있어요.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              type="button"
              className="w-full rounded-xl bg-[#8E7CFF] font-semibold text-white hover:bg-[#7D6BEE]"
              onClick={() => {
                setFlowMoreModalOpen(false)
                setLoginModalOpen(true)
              }}
            >
              로그인하고 이어보기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={handleLogin}
        variant="access"
      />
    </main>
  )
}
