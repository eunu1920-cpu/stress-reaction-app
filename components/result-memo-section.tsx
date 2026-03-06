"use client"

import { useState } from "react"
import { createRecord, appendHistory } from "@/lib/history-storage"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Props = {
  resultType: string
  summary: string
}

export function ResultMemoSection({ resultType, summary }: Props) {
  const [memo, setMemo] = useState("")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    const record = createRecord({
      q1: "",
      q2: "",
      q3: "",
      summary,
      resultType,
      memo: memo.trim() || undefined,
    })
    appendHistory(record)
    setSaved(true)
  }

  return (
    <section className="mt-6">
      <h3 className="text-lg font-semibold mb-3">오늘 상황 기록하기</h3>
      <Textarea
        placeholder="최근 스트레스 상황을 한두 문장으로 기록해보세요."
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        className="min-h-[80px] resize-none"
      />
      <div className="mt-3">
        <Button
          type="button"
          onClick={handleSave}
          className="bg-[#8E7CFF] hover:bg-[#7D6BEE] text-white"
        >
          메모 저장
        </Button>
      </div>
      {saved && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          메모가 저장되었습니다.
          <br />
          기록이 쌓이면 추후 AI 패턴 분석 기능을 이용할 수 있어요.
        </p>
      )}
    </section>
  )
}
