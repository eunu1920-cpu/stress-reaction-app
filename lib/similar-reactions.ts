import { HOME_ACTIVITY_CURATED_META } from '@/lib/home-activity-curated'

export type SimilarReactionComment = {
  text: string
  type: string
}

/** 큐레이션 메타와 동일 풀 — 스트레스(S) 매칭 + 부족 시 T·R로 보충 */
export const SIMILAR_REACTION_COMMENTS: SimilarReactionComment[] =
  HOME_ACTIVITY_CURATED_META.map((row) => ({
    text: row.quote,
    type: row.code,
  }))

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * userType(예: S8)과 같은 type 우선 3개, 부족하면 다른 type에서 무작위 보충.
 * 반환은 문장 문자열만 (코드 노출 없음)
 */
export function pickSimilarReactions(
  userType: string,
  comments: SimilarReactionComment[],
): string[] {
  const t = userType.trim().toUpperCase()
  if (!t || comments.length === 0) return []

  const same = comments.filter((c) => c.type.toUpperCase() === t)
  const other = comments.filter((c) => c.type.toUpperCase() !== t)

  const sameShuffled = shuffle(same)
  const otherShuffled = shuffle(other)

  const out: string[] = []
  const seen = new Set<string>()

  for (const c of sameShuffled) {
    if (out.length >= 3) break
    if (seen.has(c.text)) continue
    seen.add(c.text)
    out.push(c.text)
  }

  for (const c of otherShuffled) {
    if (out.length >= 3) break
    if (seen.has(c.text)) continue
    seen.add(c.text)
    out.push(c.text)
  }

  const pool = shuffle(comments)
  let i = 0
  while (out.length < 3 && i < pool.length) {
    const txt = pool[i].text
    if (!seen.has(txt)) {
      seen.add(txt)
      out.push(txt)
    }
    i++
  }

  return out.slice(0, 3)
}
