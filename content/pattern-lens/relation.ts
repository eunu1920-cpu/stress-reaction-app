import type { PatternLensQuestion } from '@/lib/pattern-lens/types'

export const relationQuestions: PatternLensQuestion[] = [
  {
    id: 'relation_001',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '친구가 약속을 반복적으로 어길 때',
    prompt: '당신은 어떻게 반응하나요?',
    options: [
      {
        id: 'A',
        label: '작은 신호와 말투까지 계속 신경 쓰이기 시작한다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '상대의 태도와 변화에 민감하게 반응하며 관계의 미묘한 신호를 빠르게 감지한다.',
          body: '',
          insight:
            '당신의 강점은 관계의 변화를 빠르게 알아차리는 감각이다. 다만 그 신호가 과하게 커질 수 있다.',
          reflectionQuestion:
            '지금 내가 느끼는 신호는 사실인가요, 아니면 해석일까요?',
          points: ['관계 신호', '미묘한 변화 감지', '해석 구분'],
        },
      },
      {
        id: 'B',
        label: '왜 이런 상황이 생기는지 머릿속에서 정리하려 한다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '감정보다 상황을 먼저 이해하려 하며 관계에서 일어난 일을 논리적으로 정리하려 한다.',
          body: '',
          insight:
            '당신은 관계를 감정이 아니라 구조로 이해하는 사람이다. 정리가 끝나면 감정도 안정된다.',
          reflectionQuestion:
            '이 상황에서 사실과 해석을 나누면 무엇이 남나요?',
          points: ['상황 분석', '논리 정리', '사실과 해석'],
        },
      },
      {
        id: 'C',
        label: '겉으로는 크게 반응하지 않고 상황을 관찰한다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '갈등 상황에서도 감정을 크게 흔들기보다 관계의 안정성을 유지하려는 경향이 있다.',
          body: '',
          insight:
            '당신은 관계의 균형을 지키는 힘이 있다. 다만 너무 오래 참고 있을 수도 있다.',
          reflectionQuestion:
            '지금 내가 유지하려는 관계의 기준은 무엇인가요?',
          points: ['관계 안정', '감정 절제', '기준 유지'],
        },
      },
      {
        id: 'D',
        label: '잠시 거리를 두며 관계의 균형을 조절하려 한다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '관계에서 불편함이 생기면 감정을 바로 표현하기보다 거리를 조절하며 균형을 찾으려 한다.',
          body: '',
          insight:
            '당신은 관계의 밀도와 거리를 조절할 줄 아는 사람이다. 이는 관계를 오래 유지하는 힘이 된다.',
          reflectionQuestion:
            '지금 이 관계에서 내가 원하는 적절한 거리는 어느 정도인가요?',
          points: ['거리 조절', '관계 균형', '밀도 조정'],
        },
      },
    ],
  },
  {
    id: 'relation_002',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '연인과 가치관 차이를 느낄 때',
    prompt: '당신은 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '감정이 깊어지며 관계에 더 몰입하게 된다.',
        patternCode: 'R6',
        interpretation: {
          title: '과몰입형',
          summary:
            '관계에서 갈등이 생기면 감정과 생각이 깊어지며 상대에게 더 몰입하는 경향이 있다.',
          body: '',
          insight:
            '당신은 관계에 깊이 들어가는 사람이다. 다만 몰입이 커질수록 자신을 잊을 수 있다.',
          reflectionQuestion:
            '지금 이 관계에서 나는 무엇을 지키고 싶나요?',
          points: ['관계 몰입', '감정 심화', '자기 인식'],
        },
      },
      {
        id: 'B',
        label: '솔직하게 생각을 표현하고 싶어진다.',
        patternCode: 'R2',
        interpretation: {
          title: '직진 표현형',
          summary:
            '가치관 차이가 느껴지면 솔직하게 생각을 표현하려는 경향이 강하다.',
          body: '',
          insight:
            '당신은 관계에서 숨기지 않고 표현하는 힘이 있다. 이는 관계를 명확하게 만든다.',
          reflectionQuestion:
            '지금 내가 말하려는 핵심 생각은 무엇인가요?',
          points: ['솔직 표현', '관계 명확화', '핵심 생각'],
        },
      },
      {
        id: 'C',
        label: '바로 반응하며 자신의 입장을 드러낸다.',
        patternCode: 'R3',
        interpretation: {
          title: '즉각 반응형',
          summary:
            '감정이나 생각이 올라오면 바로 반응하며 상황에 빠르게 대응한다.',
          body: '',
          insight:
            '당신은 관계에서 즉각적인 진정성을 보이는 사람이다. 다만 반응 속도가 빠를 수 있다.',
          reflectionQuestion:
            '지금의 반응은 감정인가요, 선택인가요?',
          points: ['즉각 반응', '진정성 표현', '반응 속도'],
        },
      },
      {
        id: 'D',
        label: '상대의 태도와 상황을 조용히 관찰한다.',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '갈등 상황에서 바로 개입하기보다 상황을 지켜보며 흐름을 파악하려 한다.',
          body: '',
          insight:
            '당신은 관계의 흐름을 읽는 관찰력을 가지고 있다. 이는 성급한 판단을 줄여준다.',
          reflectionQuestion:
            '지금 이 관계의 흐름은 어디로 가고 있나요?',
          points: ['상황 관찰', '흐름 파악', '판단 유보'],
        },
      },
    ],
  },
  {
    id: 'relation_003',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '직장 동료가 당신을 배제하는 듯한 행동을 할 때',
    prompt: '당신은 어떻게 느끼나요?',
    options: [
      {
        id: 'A',
        label: '상황을 분석하며 왜 이런 일이 생겼는지 생각한다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '감정보다 상황의 원인과 구조를 먼저 이해하려 한다.',
          body: '',
          insight:
            '당신은 관계를 분석적으로 이해하는 힘이 있다. 이는 불필요한 오해를 줄여준다.',
          reflectionQuestion:
            '지금 상황에서 사실로 확인된 것은 무엇인가요?',
          points: ['상황 분석', '원인 탐색', '사실 확인'],
        },
      },
      {
        id: 'B',
        label: '마음을 닫고 관계 거리를 조절하려 한다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '관계에서 불편함이 생기면 감정보다 거리를 조절하며 균형을 찾으려 한다.',
          body: '',
          insight:
            '당신은 관계의 밀도를 스스로 조절할 줄 아는 사람이다.',
          reflectionQuestion:
            '지금 이 관계에서 내가 지키고 싶은 경계는 무엇인가요?',
          points: ['거리 조절', '관계 균형', '경계 설정'],
        },
      },
      {
        id: 'C',
        label: '겉으로는 반응하지 않고 상황을 지켜본다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '갈등 상황에서도 감정을 크게 드러내지 않고 관계의 안정성을 유지하려 한다.',
          body: '',
          insight:
            '당신은 관계의 균형을 지키는 사람이다. 다만 자신의 감정을 뒤로 미룰 수 있다.',
          reflectionQuestion:
            '지금 내 감정은 무엇이라고 말하고 있나요?',
          points: ['감정 절제', '관계 안정', '자기 감정 인식'],
        },
      },
      {
        id: 'D',
        label: '작은 신호와 분위기에 민감하게 반응한다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '상대의 태도나 분위기의 변화를 빠르게 감지하며 상황을 민감하게 느낀다.',
          body: '',
          insight:
            '당신은 관계의 미묘한 신호를 빠르게 알아차리는 감각을 가지고 있다. 다만 그 신호가 과하게 해석될 수도 있다.',
          reflectionQuestion:
            '지금 내가 느끼는 신호는 사실인가요, 아니면 해석일까요?',
          points: ['관계 신호', '분위기 감지', '해석 구분'],
        },
      },
    ],
  },
  {
    id: 'relation_004',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: 'SNS에서 다른 사람과 자신을 비교할 때',
    prompt: '어떤 감정이 드나요?',
    options: [
      {
        id: 'A',
        label: '관계의 흐름과 사람들의 반응을 조용히 관찰한다.',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '상황을 바로 판단하기보다 흐름을 관찰하며 전체 분위기를 살핀다.',
          body: '',
          insight:
            '당신은 상황을 한 걸음 떨어져 보는 힘이 있다. 이는 감정의 과열을 줄인다.',
          reflectionQuestion:
            '지금 내가 보고 있는 것은 현실인가요, 장면인가요?',
          points: ['상황 관찰', '흐름 파악', '감정 거리두기'],
        },
      },
      {
        id: 'B',
        label: '감정이 올라오며 마음이 흔들린다.',
        patternCode: 'R3',
        interpretation: {
          title: '즉각 반응형',
          summary:
            '자극을 받으면 감정이 빠르게 올라오며 즉각적으로 반응하는 경향이 있다.',
          body: '',
          insight:
            '당신은 감정에 진정하게 반응하는 사람이다. 다만 반응 속도가 빠르면 감정의 파도가 커질 수 있다.',
          reflectionQuestion:
            '지금 올라온 감정은 무엇 때문인가요?',
          points: ['감정 상승', '즉각 반응', '감정 인식'],
        },
      },
      {
        id: 'C',
        label: '스스로를 돌아보며 의미를 생각한다.',
        patternCode: 'R2',
        interpretation: {
          title: '직진 표현형',
          summary:
            '비교 상황에서 자신의 생각과 감정을 정리하며 의미를 찾으려 한다.',
          body: '',
          insight:
            '당신은 경험을 통해 스스로를 이해하려는 사람이다. 생각을 정리하면 감정도 정리된다.',
          reflectionQuestion:
            '지금 내가 느낀 감정의 이유는 무엇인가요?',
          points: ['자기 성찰', '의미 탐색', '감정 이해'],
        },
      },
      {
        id: 'D',
        label: '상황에 더 깊이 몰입하며 감정이 커진다.',
        patternCode: 'R6',
        interpretation: {
          title: '과몰입형',
          summary:
            '비교 상황에서 감정이 깊어지며 상황에 더 몰입하는 경향이 있다.',
          body: '',
          insight:
            '당신은 감정에 깊이 들어가는 사람이다. 다만 몰입이 커질수록 자신을 잊을 수 있다.',
          reflectionQuestion:
            '지금 이 감정 속에서 내가 지키고 싶은 것은 무엇인가요?',
          points: ['감정 몰입', '비교 반응', '자기 인식'],
        },
      },
    ],
  },
  {
    id: 'relation_005',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '모임에서 억지로 분위기를 맞춰야 할 때',
    prompt: '당신은 어떻게 행동하나요?',
    options: [
      {
        id: 'A',
        label: '주변 분위기와 사람들의 반응에 민감하게 맞춘다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '모임에서 분위기와 사람들의 반응을 빠르게 감지하며 자연스럽게 맞추려 한다.',
          body: '',
          insight:
            '당신은 관계의 흐름을 읽는 감각이 뛰어나다. 다만 피로가 쌓일 수 있다.',
          reflectionQuestion:
            '지금 나는 분위기를 맞추고 있나요, 나를 잃고 있나요?',
          points: ['분위기 감지', '관계 흐름', '감정 피로'],
        },
      },
      {
        id: 'B',
        label: '겉으로는 맞추지만 속으로는 거리를 둔다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '겉으로는 분위기에 맞추지만 내부적으로는 감정 균형을 유지하려 한다.',
          body: '',
          insight:
            '당신은 관계 속에서도 자신의 중심을 지키는 힘이 있다.',
          reflectionQuestion:
            '지금 내가 편안함을 느끼는 지점은 어디인가요?',
          points: ['감정 균형', '내부 안정', '자기 중심'],
        },
      },
      {
        id: 'C',
        label: '상황을 관찰하며 필요한 만큼만 반응한다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '모임 상황에서도 감정보다 상황을 이해하며 적절한 반응을 선택하려 한다.',
          body: '',
          insight:
            '당신은 관계를 구조적으로 이해하는 사람이다.',
          reflectionQuestion:
            '지금 이 상황의 핵심 흐름은 무엇인가요?',
          points: ['상황 이해', '반응 선택', '관계 구조'],
        },
      },
      {
        id: 'D',
        label: '관계의 거리를 조절하며 자신을 지키려 한다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '불편한 상황에서는 스스로의 경계를 지키며 관계의 거리를 조절하려 한다.',
          body: '',
          insight:
            '당신은 관계에서 자신을 보호하는 방법을 알고 있다.',
          reflectionQuestion:
            '지금 이 모임에서 내가 지키고 싶은 경계는 무엇인가요?',
          points: ['관계 경계', '거리 조절', '자기 보호'],
        },
      },
    ],
  },
]
