// 관계 테스트 결과 데이터 (플레이스홀더 - 추후 확장)

export type RelationResultItem = {
  oneLine: string
  trigger: string
  thinking: string
  multiLayer: string
}

export const relationResults: Record<string, RelationResultItem> = {
  R1: {
    oneLine: '관계 테스트 R1 유형 (준비 중)',
    trigger: '준비 중입니다.',
    thinking: '준비 중입니다.',
    multiLayer: '준비 중입니다.',
  },
  R2: {
    oneLine: '관계 테스트 R2 유형 (준비 중)',
    trigger: '준비 중입니다.',
    thinking: '준비 중입니다.',
    multiLayer: '준비 중입니다.',
  },
}
