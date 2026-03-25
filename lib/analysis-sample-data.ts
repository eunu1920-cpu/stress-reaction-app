/** 레이더 차트 예시 (비로그인·익명·데모용, 실제 기록 아님) */
const S_SUBJECTS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] as const
const R_SUBJECTS = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'] as const
const T_SUBJECTS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'] as const

const SAMPLE_STRESS_VALUES = [2, 1, 3, 2, 1, 2, 1, 1]
const SAMPLE_RELATION_VALUES = [1, 2, 1, 3, 2, 1, 2, 1]
const SAMPLE_INNER_VALUES = [1, 1, 2, 2, 3, 1, 1, 2]

export const SAMPLE_RADAR_STRESS = S_SUBJECTS.map((subject, i) => ({
  subject,
  value: SAMPLE_STRESS_VALUES[i] ?? 1,
}))

export const SAMPLE_RADAR_RELATION = R_SUBJECTS.map((subject, i) => ({
  subject,
  value: SAMPLE_RELATION_VALUES[i] ?? 1,
}))

export const SAMPLE_RADAR_INNER = T_SUBJECTS.map((subject, i) => ({
  subject,
  value: SAMPLE_INNER_VALUES[i] ?? 1,
}))

/** AI 분석 샘플 (실제 분석 아님) */
export const SAMPLE_ANALYSIS = `[현재 패턴]
8가지 유형 중 가장 가까운 스트레스 유형은 '집중과부하형'입니다. 이 구조는 과도한 정보 처리와 멀티태스킹으로 인한 집중 고착이 지속되며, 결국 몸과 마음의 탈진으로 이어지는 경향을 보입니다.

[관찰]
최근 기록에서 사용자는 수많은 요청과 시간 압박 속에서 느끼는 피로와 불안함이 두드러집니다. 몸의 반응으로는 두통과 어깨 긴장, 예민함이 나타나며, 특히 생각이 반복되거나 정보를 정리하려는 시도가 있지만 그 효과는 미비한 모습입니다. 또한, 주변 자극을 차단하려는 경향이 보이며, 과중한 업무에서 오는 스트레스가 누적되고 있는 상황입니다.

[통찰]
이 패턴은 단순한 집중의 문제라기보다는 정보와 자극의 과중에서 비롯된 문제일 수 있습니다. 사용자가 정리하고자 하는 욕구가 있긴 하지만, 이는 정작 감정 회복보다는 반복적인 분석에 매몰되고 있다는 신호일 수 있습니다. 이러한 상황에서 피로와 불안이 지속적으로 쌓이는 것은 자연스러운 반응입니다.

[오늘의 관찰 질문]
"지금 나에게 필요한 것은 명확한 선택인가, 아니면 잠시 멈춤과 재정리가 필요한가?"`
