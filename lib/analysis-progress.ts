export const ANALYSIS_BATCH_SIZE = 5

export function getAnalysisProgress(recordsCount: number, recordsAtLastAnalysis: number | null) {
  const safeRecordsCount = Math.max(0, recordsCount)
  const hasStoredAnalysis =
    typeof recordsAtLastAnalysis === 'number' && Number.isFinite(recordsAtLastAnalysis)

  const newRecordsSinceLast = hasStoredAnalysis
    ? Math.max(0, safeRecordsCount - (recordsAtLastAnalysis ?? 0))
    : safeRecordsCount

  const progressCount = Math.min(newRecordsSinceLast, ANALYSIS_BATCH_SIZE)
  const recordsNeeded = Math.max(0, ANALYSIS_BATCH_SIZE - newRecordsSinceLast)
  const hasEnoughForFirst = safeRecordsCount >= ANALYSIS_BATCH_SIZE
  const canGenerateNext = recordsNeeded === 0

  return {
    progressCount,
    recordsNeeded,
    newRecordsSinceLast,
    hasEnoughForFirst,
    canGenerateNext,
  }
}
