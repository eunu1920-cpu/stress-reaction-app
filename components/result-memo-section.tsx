"use client"

import { useState } from "react"
import Link from "next/link"
import { saveData } from "@/lib/storage"
import { useAuth } from "@/lib/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

/** 관계 상황 패턴 돋보기 (일반 플로우, 미리보기 모드 아님) */
export const PATTERN_LENS_RELATION_HREF = "/pattern/relation"

type Props = {
  resultType: string
  summary: string
}

export function ResultMemoSection({ resultType, summary }: Props) {
  const { user } = useAuth()
  const [memo, setMemo] = useState("")
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    await saveData(
      {
        category: "test",
        pattern: resultType,
        content: memo.trim() || summary,
        q1: "",
        q2: "",
        q3: "",
        summary,
        resultType,
        memo: memo.trim() || undefined,
      },
      user?.id ?? null
    )
    setMemo("")
    setSaved(true)
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-6">
      <h3 className="text-base font-semibold text-[#333333] mb-2">
        오늘 상황 기록하기
      </h3>
      <p className="text-sm text-[#555555] mb-4 leading-relaxed">
        오늘의 스트레스 상황을 한두 문장으로 기록해보세요. 이 기록이 쌓이면
        나의 스트레스 패턴을 AI가 분석할 수 있습니다.
      </p>
      <Textarea
        placeholder="최근 스트레스 상황을 한두 문장으로 기록해보세요."
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        className="min-h-[80px] resize-none border-[#E8E2FF] focus-visible:ring-[#8E7CFF]"
      />
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#8E7CFF] font-semibold text-white hover:bg-[#7D6BEE]"
        >
          메모 저장
        </Button>
        <Button
          type="button"
          asChild
          variant="outline"
          className="rounded-xl border-[#E8E2FF] bg-[#F5F3FA] font-semibold text-[#5a4bb5] hover:bg-[#EDE9F7]"
        >
          <Link href={PATTERN_LENS_RELATION_HREF}>패턴돋보기</Link>
        </Button>
      </div>
      {saved && (
        <p className="mt-4 text-sm text-[#555555] leading-relaxed">
          저장되었습니다. 기록은 히스토리에서 확인할 수 있습니다.
        </p>
      )}
    </section>
  )
}
