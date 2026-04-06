'use client'

import * as React from 'react'
import {
  pickSimilarReactions,
  SIMILAR_REACTION_COMMENTS,
} from '@/lib/similar-reactions'

/** 스트레스 결과(S1~S8) 전용 — 새로고침·재진입 시마다 문장 조합 랜덤 */
export function SimilarReactionsBlock({ userType }: { userType: string }) {
  const [lines, setLines] = React.useState<string[]>([])

  React.useEffect(() => {
    setLines(pickSimilarReactions(userType, SIMILAR_REACTION_COMMENTS))
  }, [userType])

  if (lines.length === 0) return null

  return (
    <section
      className="rounded-2xl border border-[#E8E2FF]/50 bg-white p-6 shadow-sm"
      aria-label="비슷한 사람들의 반응"
    >
      <h2 className="mb-4 text-base font-semibold text-[#333333]">
        비슷한 사람들의 반응
      </h2>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <p
            key={`${line}-${i}`}
            className="text-sm leading-relaxed text-[#555555]"
          >
            &ldquo;{line}&rdquo;
          </p>
        ))}
      </div>
    </section>
  )
}
