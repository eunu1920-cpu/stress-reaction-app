import type { PatternLensInterpretation, PatternLensOption } from './types'

export const TIMEOUT_INTERPRETATIONS: PatternLensInterpretation[] = [
  {
    title: '멈춤 해석 1',
    summary: '생각이 계속 이어지며 결정을 미루는 상태일 수 있어요',
    body: '여러 가능성을 동시에 고려하면서 선택보다 사고 흐름이 계속 유지되는 흐름으로 보여요. 결정이 늦어지는 것이 아니라 이해를 더 확장하려는 과정일 수도 있습니다.',
    insight: '쉽게 결론 내리지 않는 신중한 사고의 면이 있어 보여요',
    reflectionQuestion: '지금 멈춘 이유는 더 알고 싶어서인가요, 아니면 결정이 어려워서인가요?',
    points: ['생각 반복', '가능성 탐색', '결정 지연'],
  },
  {
    title: '멈춤 해석 2',
    summary: '여러 방향을 동시에 떠올리며 선택이 유보된 것 같아요',
    body: '하나를 선택하기보다 여러 가능성을 동시에 떠올리며 사고가 확장되는 흐름이에요. 선택보다 탐색이 먼저 일어나는 경향이 있을 수 있어요.',
    insight: '다양한 가능성을 열어두는 확장형 사고를 가진 사람일 수 있어요',
    reflectionQuestion: '지금 선택을 미루고 있는 이유는 무엇인가요?',
    points: ['신중함', '사고 지속', '선택 유보'],
  },
  {
    title: '멈춤 해석 3',
    summary: '정리가 되지 않아 선택이 지연된 모습으로 보여요',
    body: '상황이나 기준이 명확해지기 전까지 결정을 보류하는 흐름인 것 같아요. 감정보다 구조와 기준을 먼저 세우려는 경향이 있어 보입니다.',
    insight: '혼란 속에서도 질서를 찾으려는 특성이 있을 수 있어요',
    reflectionQuestion: '지금 이 상황에서 가장 중요한 기준은 무엇인가요?',
    points: ['구조화', '기준 설정', '사고 정리'],
  },
  {
    title: '멈춤 해석 4',
    summary: '판단 기준이 부족해 선택을 잠시 멈춘 상태로 보입니다',
    body: '충분히 정리되지 않았다고 느낄 때 결정을 미루며 안정된 상태를 기다리는 흐름일 수 있어요.',
    insight: '준비된 상태에서 움직이려는 안정 지향의 면이 있어 보여요',
    reflectionQuestion: '지금 정리되지 않은 부분은 무엇인가요?',
    points: ['정리 욕구', '판단 기준', '안정 추구'],
  },
  {
    title: '멈춤 해석 5',
    summary: '선택보다 상황을 관찰하고 있는 것 같아요',
    body: '즉각적인 반응보다 흐름을 읽기 위해 한 걸음 물러나 있는 모습으로 보여요. 판단보다 관찰이 먼저 작동하는 경향이 있을 수 있어요.',
    insight: '상황의 흐름을 읽는 관찰력이 있는 사람일 수도 있어요',
    reflectionQuestion: '지금 더 보고 싶은 정보는 무엇인가요?',
    points: ['관찰', '거리 유지', '흐름 인식'],
  },
  {
    title: '멈춤 해석 6',
    summary: '결정을 미루고 더 많은 상황을 보고 있는 흐름이에요',
    body: '빠른 선택보다 충분한 정보를 확보하려는 흐름으로, 판단 전에 이해를 넓히려는 과정인 것 같아요.',
    insight: '서두르지 않고 상황을 읽는 신중한 판단력의 면이 있어 보입니다',
    reflectionQuestion: '지금 판단을 미루는 이유는 무엇인가요?',
    points: ['신중 관찰', '정보 수집', '판단 유보'],
  },
  {
    title: '멈춤 해석 7',
    summary: '선택보다 질문의 의미를 탐색하는 상태로 보여요',
    body: '행동보다 이 상황의 의미나 의도를 먼저 이해하려는 흐름일 수 있어요. 해석이 먼저 작동하는 경향이 있는 것 같아요.',
    insight: '겉보다 의미를 먼저 보는 특성이 있을 수 있어요',
    reflectionQuestion: '이 질문이 나에게 던지는 핵심은 무엇인가요?',
    points: ['의미 탐색', '내적 질문', '해석 중심'],
  },
  {
    title: '멈춤 해석 8',
    summary: '상황의 의미를 먼저 생각하며 선택이 늦어진 것 같아요',
    body: '선택보다 이 경험이 무엇을 의미하는지 스스로 해석하려는 흐름으로 보여요. 깊이 사고가 활성화된 상태일 수 있어요.',
    insight: '경험 속에서 의미를 찾는 사고를 가진 사람일 수도 있어요',
    reflectionQuestion: '지금 이 상황이 나에게 주는 메시지는 무엇인가요?',
    points: ['의미 해석', '자기 탐색', '깊이 사고'],
  },
]

export function getRandomTimeoutOption(): PatternLensOption {
  const picked =
    TIMEOUT_INTERPRETATIONS[
      Math.floor(Math.random() * TIMEOUT_INTERPRETATIONS.length)
    ]
  return {
    id: 'E',
    label: '잠깐 멈춘 상태',
    patternCode: 'AUTO',
    interpretation: picked,
  }
}
