/** 패턴 페이지·로그인 모달 등에서 비로그인 식별에 공통 사용 */
const PATTERN_ANONYMOUS_KEY = 'myview-pattern-anonymous-id'

export function getOrCreatePatternAnonymousId(): string | null {
  if (typeof window === 'undefined') return null

  const stored = window.localStorage.getItem(PATTERN_ANONYMOUS_KEY)
  if (stored) return stored

  const nextId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`

  window.localStorage.setItem(PATTERN_ANONYMOUS_KEY, nextId)
  return nextId
}
