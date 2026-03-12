import type { PatternLensQuestion } from '@/lib/pattern-lens/types'

export const stressQuestions: PatternLensQuestion[] = [
  {
    id: 'stress_001',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '예상보다 일이 길어지고, 동시에 여러 요청이 들어오고 있습니다.',
    prompt: '이럴 때 나는 어떤 반응에 더 가까운가요?',
    options: [
      {
        id: 'A',
        label: '일단 속도를 올려 한꺼번에 처리하려고 몰아붙인다.',
        patternCode: 'S6',
        interpretation: {
          title: '과집중형',
          summary: '긴장이 올라올수록 더 몰입해서 버티는 경향이 있습니다.',
          body: '압박이 커질수록 더 집중해서 상황을 통제하려는 경향이 있습니다. 단기적으로는 효율적이지만, 몸의 신호를 놓치면 소진으로 이어질 수 있습니다.',
          points: ['몰입으로 버팀', '통제 욕구', '소진 위험'],
        },
      },
      {
        id: 'B',
        label: '무엇부터 해야 할지 멈칫하고 머리가 하얘진다.',
        patternCode: 'S4',
        interpretation: {
          title: '머리멈춤형',
          summary: '압박이 높아질수록 판단이 느려지는 경향이 있습니다.',
          body: '해야 할 일이 많아질수록 우선순위를 잡기 어려워지고 잠시 멈춰버리는 경향이 있습니다. 부담이 커질수록 시작 자체가 더 어려워질 수 있습니다.',
          points: ['판단 지연', '시작 어려움', '압박 취약'],
        },
      },
      {
        id: 'C',
        label: '한 가지라도 끝내려고 주변 자극을 차단하고 고정적으로 대응한다.',
        patternCode: 'S5',
        interpretation: {
          title: '고정방어형',
          summary: '변수를 줄이고 안전한 방식으로 버티려는 경향이 있습니다.',
          body: '예상 밖 상황이 늘어날수록 움직임을 줄이고 익숙한 방식으로 대응하려는 경향이 있습니다. 안정감은 있지만 유연성이 떨어질 수 있습니다.',
          points: ['안전 우선', '변수 축소', '유연성 저하'],
        },
      },
      {
        id: 'D',
        label: '잠깐 자리를 벗어나거나 다른 행동을 하며 긴장을 흩뜨린다.',
        patternCode: 'S3',
        interpretation: {
          title: '즉흥탈선형',
          summary: '긴장이 높아지면 흐름을 끊어 숨 돌릴 틈을 만드는 경향이 있습니다.',
          body: '압박이 높아질수록 지금 하던 흐름을 잠시 벗어나 긴장을 낮추려는 경향이 있습니다. 회복에는 도움이 되지만, 반복되면 집중 흐름이 자주 끊길 수 있습니다.',
          points: ['긴장 분산', '흐름 이탈', '회복 시도'],
        },
      },
    ],
  },
]
