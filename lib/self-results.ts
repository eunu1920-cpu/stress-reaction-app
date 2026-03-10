// 자기 고민 테스트 결과 데이터 (플레이스홀더 - 추후 확장)

export type SelfResultItem = {
  oneLine: string
  trigger: string
  thinking: string
  multiLayer: string
}

export const selfResults: Record<string, SelfResultItem> = {
  C1: {
    oneLine: '자기 고민 테스트 C1 유형 (준비 중)',
    trigger: '준비 중입니다.',
    thinking: '준비 중입니다.',
    multiLayer: '준비 중입니다.',
  },
  C2: {
    oneLine: '자기 고민 테스트 C2 유형 (준비 중)',
    trigger: '준비 중입니다.',
    thinking: '준비 중입니다.',
    multiLayer: '준비 중입니다.',
  },
  C3: {
    oneLine: '자기 고민 테스트 C3 유형 (준비 중)',
    trigger: '준비 중입니다.',
    thinking: '준비 중입니다.',
    multiLayer: '준비 중입니다.',
  },
  QR: {
    oneLine: '오늘 반응 기록',
    trigger: '직접 기록한 반응입니다.',
    thinking: '상황과 반응을 기록해두었습니다.',
    multiLayer: '기록이 쌓이면 패턴 분석에 활용됩니다.',
  },
}
