/**
 * 사운드 재생 유틸
 * public/sounds/ 에 SOUND_01.mp3 ~ SOUND_04.mp3 추가 시 재생됨
 * 파일 없으면 조용히 무시 (오류 미표시)
 */
const SOUND_PATHS = {
  SOUND_01: '/sounds/SOUND_01.mp3', // 선택 피드백
  SOUND_02: '/sounds/SOUND_02.mp3', // 자동 선택
  SOUND_03: '/sounds/SOUND_03.mp3', // 페이지 전환
  SOUND_04: '/sounds/SOUND_04.mp3', // 결과 화면 진입
} as const

export type SoundId = keyof typeof SOUND_PATHS

export function playSound(id: SoundId): void {
  if (typeof window === 'undefined') return
  try {
    const audio = new Audio(SOUND_PATHS[id])
    audio.onerror = () => {}
    audio.play().catch(() => {})
  } catch {
    // 무시
  }
}
