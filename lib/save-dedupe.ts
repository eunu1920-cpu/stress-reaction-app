import type { SaveRecordParams } from '@/lib/save-record'

/** 짧은 시간 내 동일 저장 요청(React Strict Mode 이중 effect 등)을 걸러냄 */
const CLAIM_MS = 12_000
const claimTimes = new Map<string, number>()

function pruneClaims(): void {
  const now = Date.now()
  for (const [k, t] of claimTimes) {
    if (now - t > CLAIM_MS) claimTimes.delete(k)
  }
}

export function buildSaveFingerprint(params: SaveRecordParams): string {
  const c = (params.content ?? params.memo ?? params.summary ?? '').trim()
  return [
    params.category,
    params.pattern,
    params.resultType ?? '',
    c,
    params.q1 ?? '',
    params.q2 ?? '',
    params.q3 ?? '',
    params.questionId ?? '',
    params.optionId ?? '',
    String(params.questionVersion ?? ''),
  ].join('\x1e')
}

/** true면 이번 호출이 저장을 진행해도 됨. false면 직전과 동일한 요청으로 간주해 스킵 */
export function claimSaveFingerprint(fingerprint: string): boolean {
  pruneClaims()
  if (claimTimes.has(fingerprint)) return false
  claimTimes.set(fingerprint, Date.now())
  return true
}

export function releaseSaveFingerprint(fingerprint: string): void {
  claimTimes.delete(fingerprint)
}
