import type { PatternLensQuestion } from '@/lib/pattern-lens/types'

export const relationQuestions: PatternLensQuestion[] = [
  {
    id: 'relation_001',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '직장에서 동료가 내 아이디어를 회의에서 자기 것처럼 말했습니다.',
    prompt: '이 상황에서 나는 어떤 반응에 더 가까운가요?',
    options: [
      {
        id: 'A',
        label: '그 자리에서 바로 말한다. “그건 내가 먼저 이야기했던 아이디어인데요.”',
        patternCode: 'R1',
        interpretation: {
          title: '즉각 표현형',
          summary: '느낀 감정을 바로 표현하는 경향이 있습니다.',
          body: '상황에서 느낀 감정을 바로 표현하는 경향이 있습니다. 자기 경계를 분명히 하는 장점이 있지만, 순간 감정이 앞서면 상대는 공격으로 받아들일 수도 있습니다.',
          points: ['경계 인식이 빠름', '즉각 대응', '관계 긴장 가능'],
        },
      },
      {
        id: 'B',
        label: '아무 말도 하지 않는다. 속으로는 기분이 나쁘지만 넘어간다.',
        patternCode: 'R2',
        interpretation: {
          title: '내부 축적형',
          summary: '표현보다 안에서 감정을 정리하는 경향이 있습니다.',
          body: '바로 표현하기보다 감정을 안에서 정리하는 경향이 있습니다. 관계를 깨지 않으려는 성향이 강하지만, 감정이 쌓이면 뒤늦게 크게 반응할 수 있습니다.',
          points: ['관계 유지 우선', '감정 축적', '늦은 폭발 가능'],
        },
      },
      {
        id: 'C',
        label: '회의에서는 말하지 않고 나중에 따로 이야기한다.',
        patternCode: 'R1',
        interpretation: {
          title: '조정형',
          summary: '상황을 유지하면서 문제를 해결하려는 경향이 있습니다.',
          body: '공개된 자리에서는 흐름을 유지하고 개인적으로 해결하려는 경향이 있습니다. 관계를 크게 흔들지 않으면서 문제를 풀려는 전략형 반응입니다.',
          points: ['상황 조절', '관계 관리', '문제 해결 지향'],
        },
      },
      {
        id: 'D',
        label: '별로 신경 쓰지 않는다. 아이디어는 공유될 수도 있다고 생각한다.',
        patternCode: 'R2',
        interpretation: {
          title: '거리두기형',
          summary: '한 발 떨어져 상황을 보는 경향이 있습니다.',
          body: '상황을 개인 공격으로 받아들이지 않고 한 걸음 떨어져 보는 경향이 있습니다. 감정 소모는 적지만 반복되면 자신의 기여가 가려질 가능성도 있습니다.',
          points: ['감정 거리', '갈등 회피', '에너지 절약'],
        },
      },
    ],
  },
]
