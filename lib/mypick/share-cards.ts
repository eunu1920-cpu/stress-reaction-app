import type { MyPickChoice } from '@/lib/mypick/types'

/** 인스타 피드 4:5 (1080×1350) — 게시용 PNG 기준 */
export const SHARE_CARD_WIDTH = 1080
export const SHARE_CARD_HEIGHT = 1350

export type MyPickShareCardContent = {
  patternLabel: string
  line1: string
  line2: string
}

const MAP: Record<string, MyPickShareCardContent> = {
  'mypick-01a': {
    patternLabel: 'S3 방향이탈형',
    line1: '요즘 미루던 걸',
    line2: '끊어내고 싶은 상태',
  },
  'mypick-01b': {
    patternLabel: 'S7 리듬이탈형',
    line1: '지금 흐름을',
    line2: '그대로 이어가고 싶은 상태',
  },
  'mypick-02a': {
    patternLabel: 'R2 직진표현형',
    line1: '관계를 내가',
    line2: '움직이고 싶은 상태',
  },
  'mypick-02b': {
    patternLabel: 'R7 관망관찰형',
    line1: '상대 반응을',
    line2: '지켜보고 싶은 상태',
  },
  'mypick-03a': {
    patternLabel: 'S2 누적폭발형',
    line1: '쌓인 걸',
    line2: '정리하고 싶은 상태',
  },
  'mypick-03b': {
    patternLabel: 'S5 방어고정형',
    line1: '이 감정을',
    line2: '조금 더 유지하고 싶은 상태',
  },
  'mypick-04a': {
    patternLabel: 'T1 생각확장형',
    line1: '익숙함에서',
    line2: '벗어나고 싶은 상태',
  },
  'mypick-04b': {
    patternLabel: 'S5 방어고정형',
    line1: '지금 상태를',
    line2: '유지하고 싶은 상태',
  },
  'mypick-05a': {
    patternLabel: 'T6 거리두기형',
    line1: '고민을',
    line2: '여기서 멈추고 싶은 상태',
  },
  'mypick-05b': {
    patternLabel: 'T5 반복고민형',
    line1: '고민을',
    line2: '조금 더 이어가고 싶은 상태',
  },
  'mypick-06a': {
    patternLabel: 'S3 방향이탈형',
    line1: '안정보다',
    line2: '변화를 선택하는 상태',
  },
  'mypick-06b': {
    patternLabel: 'S5 방어고정형',
    line1: '리스크를',
    line2: '피하고 싶은 상태',
  },
  'mypick-07a': {
    patternLabel: 'S7 리듬이탈형',
    line1: '지금 흐름을',
    line2: '계속 유지하고 싶은 상태',
  },
  'mypick-07b': {
    patternLabel: 'T4 구조정리형',
    line1: '흐름을 끊고',
    line2: '다시 정리하고 싶은 상태',
  },
  'mypick-08a': {
    patternLabel: 'R7 관망관찰형',
    line1: '판단을',
    line2: '외부에 맡기고 싶은 상태',
  },
  'mypick-08b': {
    patternLabel: 'R2 직진표현형',
    line1: '결정을',
    line2: '직접 내리고 싶은 상태',
  },
  'mypick-09a': {
    patternLabel: 'S3 방향이탈형',
    line1: '미루던 걸',
    line2: '끊어내려는 상태',
  },
  'mypick-09b': {
    patternLabel: 'T5 반복고민형',
    line1: '같은 패턴을',
    line2: '계속 반복하는 상태',
  },
  'mypick-10a': {
    patternLabel: 'R6 감정확산형',
    line1: '감정을',
    line2: '밖으로 꺼내고 싶은 상태',
  },
  'mypick-10b': {
    patternLabel: 'S5 방어고정형',
    line1: '감정을',
    line2: '안에 담아두는 상태',
  },
  'mypick-11a': {
    patternLabel: 'S6 집중과부하형',
    line1: '속도를',
    line2: '유지하고 싶은 상태',
  },
  'mypick-11b': {
    patternLabel: 'S4 처리지연형',
    line1: '흐름을',
    line2: '조금 늦추고 싶은 상태',
  },
  'mypick-12a': {
    patternLabel: 'T4 구조정리형',
    line1: '불확실성을',
    line2: '줄이고 싶은 상태',
  },
  'mypick-12b': {
    patternLabel: 'T6 거리두기형',
    line1: '확인 없이',
    line2: '받아들이는 상태',
  },
  'mypick-13a': {
    patternLabel: 'T4 구조정리형',
    line1: '흐름을 끊고',
    line2: '다시 구성하고 싶은 상태',
  },
  'mypick-13b': {
    patternLabel: 'S5 방어고정형',
    line1: '현재 상태를',
    line2: '그대로 유지하는 상태',
  },
  'mypick-14a': {
    patternLabel: 'S6 집중과부하형',
    line1: '에너지를',
    line2: '한 곳에 모으고 싶은 상태',
  },
  'mypick-14b': {
    patternLabel: 'S8 기력방전형',
    line1: '에너지를',
    line2: '아껴두고 싶은 상태',
  },
  'mypick-15a': {
    patternLabel: 'R3 즉각반응형',
    line1: '빠르게',
    line2: '반응하고 싶은 상태',
  },
  'mypick-15b': {
    patternLabel: 'T6 거리두기형',
    line1: '반응을',
    line2: '조금 미루고 싶은 상태',
  },
  'mypick-16a': {
    patternLabel: 'S7 리듬이탈형',
    line1: '지금 흐름을',
    line2: '계속 이어가고 싶은 상태',
  },
  'mypick-16b': {
    patternLabel: 'S8 기력방전형',
    line1: '여기서',
    line2: '멈추고 싶은 상태',
  },
  'mypick-17a': {
    patternLabel: 'R2 직진표현형',
    line1: '관계를',
    line2: '우선으로 두는 상태',
  },
  'mypick-17b': {
    patternLabel: 'T4 구조정리형',
    line1: '기준을',
    line2: '지키려는 상태',
  },
  'mypick-18a': {
    patternLabel: 'S8 기력방전형',
    line1: '지금 흐름을',
    line2: '멈추고 싶은 상태',
  },
  'mypick-18b': {
    patternLabel: 'S7 리듬이탈형',
    line1: '계속',
    line2: '이어가고 싶은 상태',
  },
  'mypick-19a': {
    patternLabel: 'R4 사고정리형',
    line1: '관계를',
    line2: '좁히고 싶은 상태',
  },
  'mypick-19b': {
    patternLabel: 'R8 안정유지형',
    line1: '관계를',
    line2: '유지하려는 상태',
  },
  'mypick-20a': {
    patternLabel: 'S3 방향이탈형',
    line1: '문제를',
    line2: '직접 마주하려는 상태',
  },
  'mypick-20b': {
    patternLabel: 'S5 방어고정형',
    line1: '부담을',
    line2: '피하고 싶은 상태',
  },
  'mypick-21a': {
    patternLabel: 'R8 안정유지형',
    line1: '연결을',
    line2: '이어가고 싶은 상태',
  },
  'mypick-21b': {
    patternLabel: 'R4 사고정리형',
    line1: '여기서',
    line2: '끊고 싶은 상태',
  },
  'mypick-22a': {
    patternLabel: 'T1 생각확장형',
    line1: '범위를',
    line2: '넓히고 싶은 상태',
  },
  'mypick-22b': {
    patternLabel: 'S8 기력방전형',
    line1: '부담을',
    line2: '줄이고 싶은 상태',
  },
  'mypick-23a': {
    patternLabel: 'T4 구조정리형',
    line1: '기록을',
    line2: '남기고 싶은 상태',
  },
  'mypick-23b': {
    patternLabel: 'T6 거리두기형',
    line1: '비우고',
    line2: '가고 싶은 상태',
  },
  'mypick-24a': {
    patternLabel: 'S6 집중과부하형',
    line1: '시간을 줄이고',
    line2: '빨리 끝내고 싶은 상태',
  },
  'mypick-24b': {
    patternLabel: 'S7 리듬이탈형',
    line1: '여유를',
    line2: '남기고 싶은 상태',
  },
  'mypick-25a': {
    patternLabel: 'R2 직진표현형',
    line1: '접근을',
    line2: '허용하고 싶은 상태',
  },
  'mypick-25b': {
    patternLabel: 'R5 거리조절형',
    line1: '경계를',
    line2: '세우고 싶은 상태',
  },
}

export function getMyPickShareCardKey(
  questionId: string,
  choice: MyPickChoice,
): string {
  return `${questionId.toLowerCase()}${choice.toLowerCase()}`
}

export function getMyPickShareCard(
  questionId: string,
  choice: MyPickChoice,
): MyPickShareCardContent | null {
  const key = getMyPickShareCardKey(questionId, choice)
  return MAP[key] ?? null
}
