import type { PatternLensQuestion } from '@/lib/pattern-lens/types'

export const selfQuestions: PatternLensQuestion[] = [
  {
    id: 'self_001',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '혼자 있을 때, 오늘 있었던 장면이 계속 떠오르며 머릿속에서 반복됩니다.',
    prompt: '이럴 때 나는 어떤 흐름에 더 가까운가요?',
    options: [
      {
        id: 'A',
        label: '왜 그렇게 됐는지 계속 분석하고 정리하려고 한다.',
        patternCode: 'T1',
        interpretation: {
          title: '분석 고정형',
          summary: '이해하려고 파고들수록 생각이 오래 머무는 경향이 있습니다.',
          body: '문제를 이해하고 정리하려는 힘이 강하지만, 생각의 고리가 길어지면 감정 회복보다 분석 자체에 머무를 수 있습니다.',
          points: ['의미 찾기', '생각 지속', '정리 욕구'],
        },
      },
      {
        id: 'B',
        label: '생각을 멈추고 싶지만 같은 장면이 계속 반복된다.',
        patternCode: 'T2',
        interpretation: {
          title: '반복 루프형',
          summary: '머리로 끊으려 해도 같은 생각이 되돌아오는 경향이 있습니다.',
          body: '생각을 멈추고 싶어도 장면이나 감정이 반복 재생되는 경향이 있습니다. 피로가 쌓일수록 루프는 더 강해질 수 있습니다.',
          points: ['반복 재생', '멈춤 어려움', '정신 피로'],
        },
      },
      {
        id: 'C',
        label: '잠깐 다른 일로 돌리며 생각과 거리를 두려고 한다.',
        patternCode: 'T3',
        interpretation: {
          title: '전환 시도형',
          summary: '생각을 다른 방향으로 돌려 균형을 찾으려는 경향이 있습니다.',
          body: '감정에 완전히 빠지기보다 다른 행동이나 주제로 주의를 옮겨 스스로 균형을 찾으려는 경향이 있습니다. 회복에는 도움이 되지만, 충분한 정리가 안 남을 수 있습니다.',
          points: ['주의 전환', '균형 회복', '정리 부족 가능'],
        },
      },
      {
        id: 'D',
        label: '그냥 두고 지나가길 기다린다. 깊게 건드리고 싶지 않다.',
        patternCode: 'T4',
        interpretation: {
          title: '거리 유지형',
          summary: '생각을 깊게 붙잡지 않고 지나가게 두려는 경향이 있습니다.',
          body: '감정과 생각을 깊이 파고들기보다 자연히 지나가길 기다리는 경향이 있습니다. 에너지를 지키는 데는 도움이 되지만, 반복되는 주제는 계속 남을 수 있습니다.',
          points: ['에너지 보호', '깊은 개입 회피', '잔존 가능성'],
        },
      },
    ],
  },
]
