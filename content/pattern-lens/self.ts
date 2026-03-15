import type { PatternLensQuestion } from '@/lib/pattern-lens/types'

export const selfQuestions: PatternLensQuestion[] = [
  {
    id: 'self_001',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '온라인에서 악플이나 부정적 댓글을 받았을 때',
    prompt: '당신은 어떻게 느끼나요?',
    options: [
      {
        id: 'A',
        label: '계속 그 댓글이 머릿속에 남아 마음이 깊게 흔들린다.',
        patternCode: 'T6',
        interpretation: {
          title: '거리 두기형',
          summary:
            '부정적인 반응을 받으면 감정에 바로 휩쓸리기보다 마음을 잠시 떨어뜨려 상황을 바라보려 한다.',
          body: '',
          insight:
            '당신은 감정 속에서도 자신을 지키려는 균형 감각을 가진 사람이다.',
          reflectionQuestion:
            '지금 이 상황에서 내가 지키고 싶은 중심은 무엇인가요?',
          points: ['감정 거리', '균형 감각', '자기 중심'],
        },
      },
      {
        id: 'B',
        label: '왜 그런 말을 했는지 이유와 맥락을 생각하게 된다.',
        patternCode: 'T3',
        interpretation: {
          title: '감정 연결형',
          summary:
            '상대의 말과 감정을 연결해 이해하려 하며 상황의 감정적 맥락을 생각한다.',
          body: '',
          insight:
            '당신은 관계와 감정의 흐름을 이해하려는 공감 능력이 강하다.',
          reflectionQuestion:
            '지금 느끼는 감정의 이름은 무엇인가요?',
          points: ['감정 이해', '공감 능력', '맥락 탐색'],
        },
      },
      {
        id: 'C',
        label: '상황을 잠시 떨어져서 바라보며 흐름을 관찰한다.',
        patternCode: 'T7',
        interpretation: {
          title: '직관 포착형',
          summary:
            '상황을 바로 판단하기보다 한 걸음 물러나 흐름을 관찰하며 전체 맥락을 보려 한다.',
          body: '',
          insight:
            '당신은 상황의 본질을 빠르게 읽는 직관을 가지고 있다.',
          reflectionQuestion:
            '지금 이 상황의 핵심은 무엇이라고 느껴지나요?',
          points: ['흐름 관찰', '직관 인식', '핵심 파악'],
        },
      },
      {
        id: 'D',
        label: '그 말의 의미가 무엇인지 스스로 해석하려 한다.',
        patternCode: 'T2',
        interpretation: {
          title: '의미 탐색형',
          summary:
            '부정적인 상황에서도 그 말의 의미나 이유를 스스로 해석하며 이해하려 한다.',
          body: '',
          insight:
            '당신은 사건 속에서 의미를 찾는 사람이다. 이는 성장의 단서가 된다.',
          reflectionQuestion:
            '이 경험이 나에게 던지는 질문은 무엇인가요?',
          points: ['의미 탐색', '자기 해석', '성장 단서'],
        },
      },
    ],
  },
  {
    id: 'self_002',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '새로운 사람을 만나는 자리에 초대받았을 때',
    prompt: '당신은 어떤 기분이 드나요?',
    options: [
      {
        id: 'A',
        label: '주변 분위기와 사람들의 반응이 먼저 신경 쓰인다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '새로운 상황에서 다양한 생각과 가능성이 동시에 떠오르며 머릿속이 빠르게 움직인다.',
          body: '',
          insight:
            '당신은 상황을 넓게 바라보는 사고 확장 능력이 있다.',
          reflectionQuestion:
            '지금 떠오르는 생각 중 가장 중요한 것은 무엇인가요?',
          points: ['사고 확장', '가능성 탐색', '생각 흐름'],
        },
      },
      {
        id: 'B',
        label: '상황을 머릿속에서 정리하며 준비하려 한다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '새로운 상황에서도 먼저 구조와 흐름을 정리하려는 경향이 있다.',
          body: '',
          insight:
            '당신은 복잡한 상황에서도 정리 능력을 발휘하는 사람이다.',
          reflectionQuestion:
            '지금 상황에서 내가 준비해야 할 한 가지는 무엇인가요?',
          points: ['구조 정리', '준비 사고', '상황 이해'],
        },
      },
      {
        id: 'C',
        label: '새로운 사람과의 만남을 균형 있게 바라보려 한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 정리형',
          summary:
            '낯선 상황에서도 감정과 생각을 균형 있게 유지하려 한다.',
          body: '',
          insight:
            '당신은 안정적으로 상황을 바라보는 균형 감각을 가지고 있다.',
          reflectionQuestion:
            '지금 나에게 편안한 균형은 어떤 상태인가요?',
          points: ['균형 유지', '감정 안정', '상황 조율'],
        },
      },
      {
        id: 'D',
        label: '상황의 의미나 관계의 방향을 생각한다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '새로운 관계 상황에서 여러 가능성을 계속 생각하며 마음속에서 고민이 이어질 수 있다.',
          body: '',
          insight:
            '당신은 상황을 깊이 고민하는 사람이다. 다만 생각이 길어질 수 있다.',
          reflectionQuestion:
            '지금 내가 가장 고민하고 있는 생각은 무엇인가요?',
          points: ['깊은 고민', '의미 탐색', '생각 반복'],
        },
      },
    ],
  },
  {
    id: 'self_003',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '중요한 발표나 면접을 앞두고 있을 때',
    prompt: '당신은 무엇을 하나요?',
    options: [
      {
        id: 'A',
        label: '머릿속에서 여러 생각과 가능성을 계속 떠올린다.',
        patternCode: 'T3',
        interpretation: {
          title: '감정 연결형',
          summary:
            '발표나 면접 상황에서 감정과 생각을 연결하며 상황을 이해하려 한다.',
          body: '',
          insight:
            '당신은 감정과 사고를 함께 활용하는 사람이다.',
          reflectionQuestion:
            '지금 느끼는 감정은 무엇인가요?',
          points: ['감정 인식', '사고 연결', '상황 이해'],
        },
      },
      {
        id: 'B',
        label: '상황을 직관적으로 파악하려 한다.',
        patternCode: 'T7',
        interpretation: {
          title: '직관 포착형',
          summary:
            '상황의 핵심을 빠르게 파악하며 직관적으로 대응하려 한다.',
          body: '',
          insight:
            '당신은 순간적으로 본질을 보는 능력이 있다.',
          reflectionQuestion:
            '지금 이 상황의 핵심 포인트는 무엇인가요?',
          points: ['직관 인식', '핵심 파악', '상황 이해'],
        },
      },
      {
        id: 'C',
        label: '의미와 이유를 계속 생각한다.',
        patternCode: 'T2',
        interpretation: {
          title: '의미 탐색형',
          summary:
            '발표나 면접 상황에서도 그 의미와 이유를 생각하며 스스로를 이해하려 한다.',
          body: '',
          insight:
            '당신은 경험 속에서 의미를 찾는 사람이다.',
          reflectionQuestion:
            '이 경험이 나에게 어떤 의미가 있나요?',
          points: ['의미 탐색', '자기 이해', '경험 해석'],
        },
      },
      {
        id: 'D',
        label: '감정과 생각을 연결하며 준비한다.',
        patternCode: 'T6',
        interpretation: {
          title: '거리 두기형',
          summary:
            '긴장 상황에서도 감정에 휩쓸리지 않도록 스스로 거리를 두려 한다.',
          body: '',
          insight:
            '당신은 감정 속에서도 중심을 유지하려는 힘이 있다.',
          reflectionQuestion:
            '지금 나에게 필요한 안정 방법은 무엇인가요?',
          points: ['감정 조절', '중심 유지', '자기 안정'],
        },
      },
    ],
  },
  {
    id: 'self_004',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '주변 사람들이 당신을 인정하지 않는다고 느낄 때',
    prompt: '당신은 어떻게 반응하나요?',
    options: [
      {
        id: 'A',
        label: '마음을 닫고 스스로를 보호하려 한다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '인정받지 못한다고 느끼면 마음속에서 생각이 계속 반복되며 고민이 깊어질 수 있다.',
          body: '',
          insight:
            '당신은 상황을 깊이 생각하는 사람이다.',
          reflectionQuestion:
            '지금 반복되고 있는 생각은 무엇인가요?',
          points: ['반복 사고', '깊은 고민', '자기 인식'],
        },
      },
      {
        id: 'B',
        label: '감정을 정리하며 스스로 균형을 찾으려 한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 정리형',
          summary:
            '감정이 올라와도 스스로 균형을 찾으며 상황을 정리하려 한다.',
          body: '',
          insight:
            '당신은 감정 속에서도 균형을 유지하려는 힘이 있다.',
          reflectionQuestion:
            '지금 나에게 필요한 균형은 무엇인가요?',
          points: ['감정 균형', '자기 조절', '상황 정리'],
        },
      },
      {
        id: 'C',
        label: '주변 분위기와 반응을 계속 신경 쓰게 된다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '주변 반응을 여러 방향으로 생각하며 다양한 가능성을 떠올린다.',
          body: '',
          insight:
            '당신은 상황을 넓게 바라보는 사고 확장 능력이 있다.',
          reflectionQuestion:
            '지금 떠오르는 생각 중 사실에 가까운 것은 무엇인가요?',
          points: ['사고 확장', '가능성 탐색', '사실 확인'],
        },
      },
      {
        id: 'D',
        label: '상황을 구조적으로 이해하려 한다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '감정보다 상황의 구조와 흐름을 이해하려 한다.',
          body: '',
          insight:
            '당신은 상황을 정리하는 능력이 강하다.',
          reflectionQuestion:
            '지금 이 상황의 구조를 한 문장으로 정리하면 무엇인가요?',
          points: ['구조 이해', '상황 분석', '정리 능력'],
        },
      },
    ],
  },
  {
    id: 'self_005',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '혼자 있고 싶을 때 누군가 계속 연락할 경우',
    prompt: '당신은 어떤 감정을 느끼나요?',
    options: [
      {
        id: 'A',
        label: '잠시 떨어져 혼자 생각할 시간이 필요하다고 느낀다.',
        patternCode: 'T7',
        interpretation: {
          title: '직관 포착형',
          summary:
            '혼자만의 시간이 필요할 때 상황을 직관적으로 파악하며 거리 두기를 시도한다.',
          body: '',
          insight:
            '당신은 자신의 상태를 빠르게 알아차리는 사람이다.',
          reflectionQuestion:
            '지금 나에게 필요한 공간은 어떤 모습인가요?',
          points: ['자기 인식', '거리 두기', '개인 공간'],
        },
      },
      {
        id: 'B',
        label: '왜 이런 상황이 생겼는지 의미를 생각한다.',
        patternCode: 'T2',
        interpretation: {
          title: '의미 탐색형',
          summary:
            '상황 속에서 의미와 이유를 생각하며 관계의 맥락을 이해하려 한다.',
          body: '',
          insight:
            '당신은 경험 속에서 의미를 찾는 사고를 가진 사람이다.',
          reflectionQuestion:
            '지금 이 상황이 나에게 알려주는 것은 무엇인가요?',
          points: ['의미 탐색', '상황 이해', '관계 맥락'],
        },
      },
      {
        id: 'C',
        label: '감정이 깊어지며 관계와 상황을 계속 생각한다.',
        patternCode: 'T6',
        interpretation: {
          title: '거리 두기형',
          summary:
            '감정이 깊어질 때 스스로 거리를 두며 상황을 정리하려 한다.',
          body: '',
          insight:
            '당신은 감정 속에서도 중심을 지키려는 힘이 있다.',
          reflectionQuestion:
            '지금 내가 지키고 싶은 경계는 무엇인가요?',
          points: ['감정 조절', '중심 유지', '경계 설정'],
        },
      },
      {
        id: 'D',
        label: '여러 생각이 동시에 떠오르며 머릿속이 복잡해진다.',
        patternCode: 'T3',
        interpretation: {
          title: '감정 연결형',
          summary:
            '관계와 감정이 연결되며 생각이 계속 이어질 수 있다.',
          body: '',
          insight:
            '당신은 감정과 관계를 깊이 연결해 이해하는 사람이다.',
          reflectionQuestion:
            '지금 내가 느끼는 감정은 무엇인가요?',
          points: ['감정 연결', '관계 이해', '생각 흐름'],
        },
      },
    ],
  },
]
