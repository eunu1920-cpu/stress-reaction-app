"use client"

import { useState } from "react"
import { saveRecord } from "@/lib/save-record"
import { useAuth } from "@/lib/auth-context"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Props = {
  resultType: string
  summary: string
}

export function ResultMemoSection({ resultType, summary }: Props) {
  const { user } = useAuth()
  const [memo, setMemo] = useState("")
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    if (!user?.id) return
    await saveRecord({
      userId: user.id,
      category: "test",
      pattern: resultType,
      content: memo.trim() || summary,
      q1: "",
      q2: "",
      q3: "",
      summary,
      resultType,
      memo: memo.trim() || undefined,
    })
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
      <div className="mt-4">
        <Button
          type="button"
          onClick={handleSave}
          className="bg-[#8E7CFF] hover:bg-[#7D6BEE] text-white font-semibold rounded-xl"
        >
          메모 저장
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
