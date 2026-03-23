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
            '댓글이 머릿속에 남아 흔들리는 건, 감정 속에서도 중심을 찾으려는 시선을 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '지키려는 중심은 나인가요, 그 댓글에 흔들리지 않는 나인가요?',
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
            '왜 그런 말을 했는지 이유와 맥락을 생각하는 건, 감정을 끝이 아닌 질문으로 바꾸는 방식이에요.',
          reflectionQuestion:
            '이유를 찾는 건 그 말을 이해하려는 건가요, 그 말이 던진 상처를 다루려는 건가요?',
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
            '잠시 떨어져 흐름을 관찰하는 건, 상황을 한 걸음 물러나 보는 시선을 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '관찰할 때, 당신은 그 상황의 안에 있었나요 밖에 있었나요?',
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
            '그 말의 의미를 스스로 해석하려는 건, 사건을 끝이 아닌 질문으로 바꾸는 방식이에요. 그 빈칸이 성장의 지도가 될 수 있어요.',
          reflectionQuestion:
            '의미를 찾는 건 그 말을 이해하려는 건가요, 그 말을 넘어서려는 건가요?',
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
            '주변 분위기와 반응이 먼저 신경 쓰이는 건, 상황을 여러 각도에서 읽는 사고를 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '떠오르는 생각 중, 불안이 만든 것은 무엇인가요?',
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
            '머릿속에서 정리하며 준비하는 건, 상황을 지도 위에서 읽어 불안을 줄이려는 방식이에요.',
          reflectionQuestion:
            '준비하는 건 만남을 위한 건가요, 준비되지 않은 나를 숨기기 위한 건가요?',
          points: ['구조 정리', '준비 사고', '상황 이해'],
        },
      },
      {
        id: 'C',
        label: '새로운 사람과의 만남을 균형 있게 바라보려 한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '낯선 상황에서도 감정과 생각을 균형 있게 유지하려 한다.',
          body: '',
          insight:
            '균형 있게 바라보는 건, 감정과 생각 사이에 적당한 거리를 두는 방식이에요. 그 거리감이 안정을 만들어요.',
          reflectionQuestion:
            '편안한 균형은 자연스러운 건가요, 아니면 흔들리지 않으려 노력한 결과인가요?',
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
            '의미나 방향을 계속 생각하는 건, 상황을 깊이 읽으려는 시선이에요. 다만 그 시선이 너무 오래 머물면 갈림길에 서 있을 수 있어요.',
          reflectionQuestion:
            '고민하는 건 선택을 위한 건가요, 선택을 미루기 위한 건가요?',
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
            '여러 생각과 가능성이 떠오르는 건, 감정과 사고가 함께 움직인다는 걸 알게 해줘요. 그 연결이 상황을 읽게 해요.',
          reflectionQuestion:
            '떠오르는 생각은 준비를 위한 건가요, 불안이 만든 상상인가요?',
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
            '직관적으로 파악하려는 건, 상황의 본질을 빠르게 읽는 시선을 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '파악한 핵심은 실제일까요, 불안이 좁혀준 시선일까요?',
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
            '의미와 이유를 계속 생각하는 건, 경험을 끝이 아닌 질문으로 바꾸는 방식이에요.',
          reflectionQuestion:
            '의미를 찾는 건 이 경험을 이해하려는 건가요, 이 경험을 넘어서려는 건가요?',
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
            '감정과 생각을 연결하며 준비하는 건, 긴장 속에서도 중심을 잡으려는 방식이에요.',
          reflectionQuestion:
            '필요한 안정은 감정을 가라앉히는 건가요, 감정과 함께 있을 수 있는 자리인가요?',
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
            '마음을 닫고 보호하려는 건, 인정받지 못한다는 생각이 계속 반복되는 그 무게를 견디려는 방식이에요.',
          reflectionQuestion:
            '반복되는 생각은 사실인가요, 상처가 반복해서 재생하는 건가요?',
          points: ['반복 사고', '깊은 고민', '자기 인식'],
        },
      },
      {
        id: 'B',
        label: '감정을 정리하며 스스로 균형을 찾으려 한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '감정이 올라와도 스스로 균형을 찾으며 상황을 정리하려 한다.',
          body: '',
          insight:
            '감정을 정리하며 균형을 찾는 건, 흔들리는 속에서도 중심을 잡으려는 방식이에요.',
          reflectionQuestion:
            '필요한 균형은 감정을 줄이는 건가요, 감정과 함께 있을 수 있는 거리인가요?',
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
            '주변 분위기와 반응을 신경 쓰는 건, 상황을 여러 각도에서 읽는 사고를 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '떠오르는 생각 중, 인정받지 못할까 봐 만든 것은 무엇인가요?',
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
            '상황을 구조적으로 이해하려는 건, 감정보다 지도가 더 안전한 곳이기 때문이에요.',
          reflectionQuestion:
            '구조를 정리하는 동안, 서운함은 어떤 자리에 있었나요?',
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
            '혼자 생각할 시간이 필요하다고 느끼는 건, 자신의 상태를 알아차리는 감각을 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '필요한 공간은 혼자이기 위한 건가요, 연락에 응해야 한다는 부담에서 벗어나기 위한 건가요?',
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
            '왜 이런 상황이 생겼는지 의미를 생각하는 건, 경험을 끝이 아닌 질문으로 바꾸는 방식이에요.',
          reflectionQuestion:
            '의미를 찾는 건 이 상황을 이해하려는 건가요, 아니면 이 상황을 정당화하려는 건가요?',
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
            '감정이 깊어질 때 거리를 두는 건, 관계 속에서도 중심을 지키려는 방식이에요.',
          reflectionQuestion:
            '지키려는 경계는 나를 위한 건가요, 상대를 밀어내기 위한 건가요?',
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
            '여러 생각이 동시에 떠오르는 건, 감정과 관계가 깊이 연결되어 있다는 걸 알게 해줘요. 그 연결이 복잡함을 만드는 것일 수도 있어요.',
          reflectionQuestion:
            '복잡해진 건 생각이 많아서인가요, 말하지 못한 감정이 쌓여서인가요?',
          points: ['감정 연결', '관계 이해', '생각 흐름'],
        },
      },
    ],
  },
  {
    id: 'self_006',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '하루를 온종일 일만 하는 것 같은데 끝이 없고 수입도 불만족스럽지만 계속 일한다.',
    prompt: '당신의 주된 감정은 무엇인가?',
    options: [
      {
        id: 'A',
        label: '방향이 흔들리는 느낌이 든다.',
        patternCode: 'T3',
        interpretation: {
          title: '감정 연결형',
          summary:
            '일과 감정이 연결되며 심리적 피로가 커질 수 있다.',
          body: '',
          insight:
            '당신은 감정과 생각이 함께 움직이는 사고 구조를 가지고 있다.',
          reflectionQuestion:
            '지금 내가 느끼는 감정의 시작은 어디인가요?',
          points: ['감정 연결', '방향 감각', '심리적 피로'],
        },
      },
      {
        id: 'B',
        label: '계속 같은 생각을 반복한다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '같은 문제를 계속 생각하며 사고가 반복될 수 있다.',
          body: '',
          insight:
            '당신은 문제를 깊이 생각하는 사고를 가진 사람이다.',
          reflectionQuestion:
            '지금 반복되는 생각의 핵심 주제는 무엇인가요?',
          points: ['반복 사고', '깊은 고민', '핵심 주제'],
        },
      },
      {
        id: 'C',
        label: '머리가 비어 있는 느낌이 든다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '상황을 전체적으로 정리하려는 생각이 나타난다.',
          body: '',
          insight:
            '당신은 상황을 균형 있게 바라보려는 사고를 가지고 있다.',
          reflectionQuestion:
            '지금 내가 다시 정리해야 할 기준은 무엇인가요?',
          points: ['상황 정리', '균형 시선', '기준 재설정'],
        },
      },
      {
        id: 'D',
        label: '감각적 피로가 크게 느껴진다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '일 상황 속에서 다양한 생각이 동시에 떠오를 수 있다.',
          body: '',
          insight:
            '당신은 생각 확장이 빠른 사고 구조를 가지고 있다.',
          reflectionQuestion:
            '지금 떠오르는 생각 중 가장 중요한 것은 무엇인가요?',
          points: ['생각 확장', '감각적 피로', '핵심 파악'],
        },
      },
    ],
  },
  {
    id: 'self_007',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '자꾸 작심삼일이 반복될 때',
    prompt: '당신은 보통 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '계획을 다시 정리하고 구조를 바꿔보려 한다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '목표나 계획이 무너질 때 다시 구조를 정리하려 한다.',
          body: '',
          insight:
            '당신은 실패보다 시스템을 수정하는 방식으로 문제를 바라본다.',
          reflectionQuestion:
            '지금 내가 다시 정리해야 할 구조는 무엇인가요?',
          points: ['구조 정리', '시스템 수정', '계획 재설계'],
        },
      },
      {
        id: 'B',
        label: '왜 이런 일이 반복되는지 의미를 생각한다.',
        patternCode: 'T2',
        interpretation: {
          title: '의미 탐색형',
          summary:
            '반복되는 실패의 이유와 의미를 찾으려 한다.',
          body: '',
          insight:
            '당신은 행동보다 이해를 통해 변화를 만들려는 사람이다.',
          reflectionQuestion:
            '이 반복이 나에게 알려주는 메시지는 무엇일까요?',
          points: ['의미 탐색', '이해 지향', '변화 시도'],
        },
      },
      {
        id: 'C',
        label: '흐름을 잠시 지켜보며 느낌을 살핀다.',
        patternCode: 'T7',
        interpretation: {
          title: '직관 포착형',
          summary:
            '상황을 바로 분석하기보다 흐름과 느낌을 관찰한다.',
          body: '',
          insight:
            '당신은 생각보다 감각과 직관으로 상황을 파악한다.',
          reflectionQuestion:
            '지금 내 감각이 알려주는 신호는 무엇인가요?',
          points: ['흐름 관찰', '직관 파악', '감각 신호'],
        },
      },
      {
        id: 'D',
        label: '스스로에게 거리를 두며 상황을 바라본다.',
        patternCode: 'T6',
        interpretation: {
          title: '거리 두기형',
          summary:
            '자신과 상황 사이 거리를 두며 객관적으로 바라본다.',
          body: '',
          insight:
            '당신은 감정에 휘둘리기보다 한 걸음 물러나 생각한다.',
          reflectionQuestion:
            '지금 내가 잠시 내려놓아야 할 생각은 무엇인가요?',
          points: ['거리 두기', '객관적 시선', '생각 정리'],
        },
      },
    ],
  },
  {
    id: 'self_008',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '갑자기 나에게 책임과 의무가 많다는 생각이 들 때',
    prompt: '당신은 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '감정과 생각이 연결되며 부담을 느낀다.',
        patternCode: 'T3',
        interpretation: {
          title: '감정 연결형',
          summary:
            '책임에 대한 생각이 감정과 연결되며 무게가 커진다.',
          body: '',
          insight:
            '당신은 책임을 감정적으로 깊이 받아들이는 사람이다.',
          reflectionQuestion:
            '지금 내 감정과 연결된 책임은 무엇인가요?',
          points: ['감정 연결', '책임 부담', '심리적 무게'],
        },
      },
      {
        id: 'B',
        label: '같은 생각을 계속 반복하며 고민한다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '책임과 의무에 대한 생각이 머릿속에서 계속 반복된다.',
          body: '',
          insight:
            '당신은 문제를 쉽게 넘기지 않는 깊은 사고를 가진 사람이다.',
          reflectionQuestion:
            '지금 반복되는 생각의 핵심은 무엇인가요?',
          points: ['반복 사고', '깊은 고민', '핵심 파악'],
        },
      },
      {
        id: 'C',
        label: '상황을 정리하며 해야 할 일을 구조화한다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '해야 할 일을 정리하며 현실적으로 대응하려 한다.',
          body: '',
          insight:
            '당신은 책임을 관리 가능한 구조로 바꾸려는 사람이다.',
          reflectionQuestion:
            '지금 내가 먼저 정리해야 할 일은 무엇인가요?',
          points: ['구조 정리', '일 목록화', '현실적 대응'],
        },
      },
      {
        id: 'D',
        label: '전체 상황을 균형 있게 정리하려 한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '전체 상황을 바라보며 책임의 균형을 맞추려 한다.',
          body: '',
          insight:
            '당신은 감정과 현실 사이 균형을 찾는 사고를 한다.',
          reflectionQuestion:
            '지금 내가 균형을 맞춰야 할 부분은 무엇인가요?',
          points: ['균형 정리', '책임 조율', '감정과 현실'],
        },
      },
    ],
  },
  {
    id: 'self_009',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '내가 잘하는 것도 없고 무엇을 좋아하는지도 모르겠다고 느낄 때',
    prompt: '어떤 생각이 드나요?',
    options: [
      {
        id: 'A',
        label: '새로운 가능성을 계속 떠올린다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '현재보다 다양한 가능성을 계속 떠올린다.',
          body: '',
          insight:
            '당신은 아직 방향이 정해지지 않았을 뿐 가능성을 많이 보는 사람이다.',
          reflectionQuestion:
            '지금 떠오르는 가능성 중 가장 끌리는 것은 무엇인가요?',
          points: ['가능성 탐색', '생각 확장', '방향 찾기'],
        },
      },
      {
        id: 'B',
        label: '자신과 상황 사이 거리를 두고 바라본다.',
        patternCode: 'T6',
        interpretation: {
          title: '거리 두기형',
          summary:
            '자신을 객관적으로 바라보며 상황을 분석하려 한다.',
          body: '',
          insight:
            '당신은 감정에 빠지기보다 한 걸음 떨어져 생각한다.',
          reflectionQuestion:
            '지금 나를 너무 엄격하게 평가하고 있지는 않나요?',
          points: ['객관적 시선', '거리 두기', '자기 평가'],
        },
      },
      {
        id: 'C',
        label: '내 감각과 직관을 관찰한다.',
        patternCode: 'T7',
        interpretation: {
          title: '직관 포착형',
          summary:
            '논리보다 느낌과 감각을 통해 방향을 찾으려 한다.',
          body: '',
          insight:
            '당신은 자신의 감각을 통해 길을 발견하는 사람이다.',
          reflectionQuestion:
            '지금 내 감각이 좋아한다고 말하는 것은 무엇인가요?',
          points: ['감각 관찰', '직관 탐색', '방향 발견'],
        },
      },
      {
        id: 'D',
        label: '내가 원하는 삶의 의미를 생각한다.',
        patternCode: 'T2',
        interpretation: {
          title: '의미 탐색형',
          summary:
            '내가 무엇을 위해 살고 싶은지 의미를 찾으려 한다.',
          body: '',
          insight:
            '당신은 삶의 방향을 의미 중심으로 찾는다.',
          reflectionQuestion:
            '지금 내가 진짜 중요하게 생각하는 가치는 무엇인가요?',
          points: ['의미 탐색', '가치 발견', '삶의 방향'],
        },
      },
    ],
  },
  {
    id: 'self_010',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '나에게 딱 맞는 직업을 찾고 싶다고 느낄 때',
    prompt: '당신은 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '여러 가능성을 고민하며 계속 생각한다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '직업 문제를 계속 고민하며 답을 찾으려 한다.',
          body: '',
          insight:
            '당신은 삶의 방향을 쉽게 결정하지 않는 깊은 사고형이다.',
          reflectionQuestion:
            '지금 내가 반복해서 떠올리는 직업 방향은 무엇인가요?',
          points: ['깊은 고민', '방향 탐색', '결정 유보'],
        },
      },
      {
        id: 'B',
        label: '내 삶 전체의 균형을 생각한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '일, 삶, 가치의 균형 속에서 직업을 바라본다.',
          body: '',
          insight:
            '당신은 직업을 단순한 일이 아닌 삶의 구조로 본다.',
          reflectionQuestion:
            '내가 원하는 삶의 균형은 무엇인가요?',
          points: ['삶의 균형', '가치 조율', '구조적 시선'],
        },
      },
      {
        id: 'C',
        label: '현실적인 계획을 정리한다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '현실 조건을 정리하며 직업 방향을 찾는다.',
          body: '',
          insight:
            '당신은 실행 가능한 계획을 중요하게 생각한다.',
          reflectionQuestion:
            '지금 내가 만들 수 있는 가장 현실적인 계획은 무엇인가요?',
          points: ['현실 정리', '계획 수립', '실행 가능성'],
        },
      },
      {
        id: 'D',
        label: '새로운 가능성을 탐색한다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '다양한 가능성을 떠올리며 새로운 길을 탐색한다.',
          body: '',
          insight:
            '당신은 틀에 갇히지 않는 사고를 가진 사람이다.',
          reflectionQuestion:
            '내가 아직 시도해보지 않은 가능성은 무엇인가요?',
          points: ['가능성 탐색', '새로운 길', '생각 확장'],
        },
      },
    ],
  },
  {
    id: 'self_011',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '주변 사람들이 다 잘 나가는 것 같아 상대적으로 초라하게 느껴질 때',
    prompt: '당신은 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '내 상황을 분석하며 무엇이 다른지 정리해 본다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '상황을 분석하고 구조적으로 이해하려 한다.',
          body: '',
          insight:
            '당신은 감정보다 구조로 상황을 이해하는 사람이다.',
          reflectionQuestion:
            '내가 지금 비교하고 있는 기준은 무엇일까?',
          points: ['상황 분석', '구조적 이해', '비교 기준'],
        },
      },
      {
        id: 'B',
        label: '내가 무엇을 잘못했는지 계속 고민하게 된다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '문제의 원인을 계속 생각하며 고민을 반복한다.',
          body: '',
          insight:
            '당신은 문제를 깊이 파고드는 사고 패턴을 가지고 있다.',
          reflectionQuestion:
            '이 고민은 해결로 가고 있을까, 반복되고 있을까?',
          points: ['반복 고민', '원인 탐색', '사고 패턴'],
        },
      },
      {
        id: 'C',
        label: '여러 상황을 균형 있게 생각하려 한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '상황을 한쪽으로 판단하지 않고 균형 있게 보려 한다.',
          body: '',
          insight:
            '당신은 다양한 관점을 동시에 고려하는 사고를 가진다.',
          reflectionQuestion:
            '지금 내가 놓치고 있는 관점은 무엇일까?',
          points: ['균형 시선', '다양한 관점', '판단 유보'],
        },
      },
      {
        id: 'D',
        label: '새로운 방향이나 가능성을 떠올린다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '상황 속에서 새로운 가능성과 방향을 떠올린다.',
          body: '',
          insight:
            '당신은 생각 확장을 통해 길을 찾는 사람이다.',
          reflectionQuestion:
            '지금 이 상황에서 새롭게 시도할 수 있는 것은 무엇일까?',
          points: ['가능성 탐색', '생각 확장', '새로운 시도'],
        },
      },
    ],
  },
  {
    id: 'self_012',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '오랫동안 노력했는데 성과가 거의 없는 것처럼 느껴질 때',
    prompt: '당신은 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '다른 방향이나 가능성을 다시 떠올린다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각 확장형',
          summary:
            '한 상황에서 다양한 가능성을 떠올린다.',
          body: '',
          insight:
            '당신은 생각 확장을 통해 새로운 길을 찾는 사람이다.',
          reflectionQuestion:
            '지금 다른 방향을 시도할 수 있을까?',
          points: ['가능성 탐색', '방향 전환', '생각 확장'],
        },
      },
      {
        id: 'B',
        label: '상황을 균형 있게 보며 의미를 다시 정리한다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '상황을 다양한 관점에서 균형 있게 바라본다.',
          body: '',
          insight:
            '당신은 전체 흐름을 이해하려는 사고를 가진다.',
          reflectionQuestion:
            '지금 내가 놓치고 있는 의미는 무엇일까?',
          points: ['균형 시선', '의미 재정리', '전체 흐름'],
        },
      },
      {
        id: 'C',
        label: '지금까지의 과정과 구조를 분석해 본다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조 정리형',
          summary:
            '과정과 구조를 분석하며 원인을 찾는다.',
          body: '',
          insight:
            '당신은 체계적으로 문제를 이해하려는 사람이다.',
          reflectionQuestion:
            '이 과정에서 무엇이 가장 중요한 요소였을까?',
          points: ['과정 분석', '구조 이해', '원인 탐색'],
        },
      },
      {
        id: 'D',
        label: '내가 무엇을 놓쳤는지 계속 고민하게 된다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복 고민형',
          summary:
            '문제 원인을 계속 생각하며 고민한다.',
          body: '',
          insight:
            '당신은 문제를 깊게 탐구하는 사고 패턴을 가지고 있다.',
          reflectionQuestion:
            '지금 이 고민은 해결로 가고 있을까?',
          points: ['반복 고민', '원인 탐색', '해결 탐색'],
        },
      },
    ],
  },
  {
    id: 'self_013',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '팀 프로젝트나 공동 작업에서 내가 맡은 역할을 잘 해냈을 때',
    prompt: '그때 당신에게 가장 크게 느껴지는 감정은 무엇인가요?',
    options: [
      {
        id: 'A',
        label: '팀의 흐름이 잘 맞춰진 것 같아 뿌듯하다.',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '상황의 흐름을 관찰하며 전체가 잘 맞춰진 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계와 상황의 흐름을 읽는 능력이 강하다.',
          reflectionQuestion:
            '지금 느끼는 뿌듯함은 내 역할 때문인가요, 팀의 흐름 때문인가요?',
          points: ['흐름 관찰', '상황 읽기', '팀 감각'],
        },
      },
      {
        id: 'B',
        label: '내가 한 일이 어떤 기여를 했는지 정리된다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '자신의 역할과 기여를 구조적으로 정리하며 이해한다.',
          body: '',
          insight:
            '당신은 감정보다 구조로 상황을 이해하는 사람이다.',
          reflectionQuestion:
            '지금 내 기여를 정리할 때, 감정은 어떤 자리에 있었나요?',
          points: ['기여 정리', '구조적 이해', '역할 인식'],
        },
      },
      {
        id: 'C',
        label: '자신 있게 잘 해냈다고 느낀다.',
        patternCode: 'R2',
        interpretation: {
          title: '직진 표현형',
          summary:
            '자신의 성과를 직접적으로 인정하고 표현한다.',
          body: '',
          insight:
            '당신은 자신의 능력을 분명히 인식하는 사람이다.',
          reflectionQuestion:
            '지금 그 자신감은 나에게서 온 건가요, 상대의 반응에서 온 건가요?',
          points: ['자신감', '직접 인정', '성과 인식'],
        },
      },
      {
        id: 'D',
        label: '적당한 거리에서 기여한 것 같다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '관계 속에서 적절한 거리를 유지하며 기여한 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계 균형을 중요하게 생각하는 사람이다.',
          reflectionQuestion:
            '지금 유지한 거리가 나를 위한 건가요, 팀을 위한 건가요?',
          points: ['거리 감각', '관계 균형', '기여 방식'],
        },
      },
    ],
  },
  {
    id: 'self_014',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '상사나 동료가 "덕분에 일이 잘 됐다"고 말해 줄 때',
    prompt: '그 말을 들었을 때 당신은 어떤 생각이 가장 먼저 떠오르나요?',
    options: [
      {
        id: 'A',
        label: '그 말의 진심이나 분위기를 살핀다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '상대의 말과 태도 속 의미를 민감하게 읽는다.',
          body: '',
          insight:
            '당신은 관계 속 미묘한 신호를 빠르게 감지하는 사람이다.',
          reflectionQuestion:
            '지금 느낀 진심은 사실일까요, 해석일까요?',
          points: ['신호 감지', '분위기 읽기', '의미 파악'],
        },
      },
      {
        id: 'B',
        label: '상황이 잘 풀린 것 같다.',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '상황의 흐름을 관찰하며 전체가 잘 맞춰진 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계와 상황의 흐름을 읽는 능력이 강하다.',
          reflectionQuestion:
            '지금 그 말이 주는 의미는 무엇인가요?',
          points: ['흐름 관찰', '상황 읽기', '전체 맥락'],
        },
      },
      {
        id: 'C',
        label: '내가 한 일이 어떤 역할을 했는지 정리된다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '자신의 기여를 구조적으로 정리하며 이해한다.',
          body: '',
          insight:
            '당신은 감정보다 구조로 상황을 이해하는 사람이다.',
          reflectionQuestion:
            '그 말을 들을 때, 가장 먼저 떠오른 것은 감정인가요 생각인가요?',
          points: ['기여 정리', '역할 인식', '사고 정리'],
        },
      },
      {
        id: 'D',
        label: '관계가 유지되는 것 같아 안심된다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '관계의 안정성이 유지되는 것을 중요하게 느낀다.',
          body: '',
          insight:
            '당신은 관계 안정이 깨지는 것을 특히 불편하게 느낀다.',
          reflectionQuestion:
            '지금 그 안심은 관계 때문인가요, 인정받았다는 느낌 때문인가요?',
          points: ['관계 안정', '안심감', '유지 욕구'],
        },
      },
    ],
  },
  {
    id: 'self_015',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '누군가 고민을 털어놓았고 내가 도움이 되는 조언을 해줬을 때',
    prompt: '상대가 고마워할 때 당신은 어떤 감정을 느끼나요?',
    options: [
      {
        id: 'A',
        label: '즉각적으로 뿌듯함이 올라온다.',
        patternCode: 'R3',
        interpretation: {
          title: '즉각 반응형',
          summary:
            '상대의 반응에 빠르게 감정적으로 반응한다.',
          body: '',
          insight:
            '당신은 관계 변화에 즉각 반응하는 에너지가 있다.',
          reflectionQuestion:
            '지금 그 뿌듯함은 상대 때문인가요, 나의 기여 때문인가요?',
          points: ['즉각 반응', '뿌듯함', '감정 상승'],
        },
      },
      {
        id: 'B',
        label: '적당한 거리를 유지한 것 같다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '관계 속에서 적절한 거리를 유지한 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계 균형을 중요하게 생각하는 사람이다.',
          reflectionQuestion:
            '지금 그 거리가 상대를 위한 건가요, 나를 지키기 위한 건가요?',
          points: ['거리 유지', '관계 균형', '적절한 도움'],
        },
      },
      {
        id: 'C',
        label: '관계가 안정적으로 유지되는 것 같다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '관계의 안정성이 유지되는 것을 중요하게 느낀다.',
          body: '',
          insight:
            '당신은 관계 안정을 중요하게 생각한다.',
          reflectionQuestion:
            '지금 느끼는 안정은 관계 때문인가요, 도움이 됐다는 확인 때문인가요?',
          points: ['관계 안정', '안심감', '균형 유지'],
        },
      },
      {
        id: 'D',
        label: '상대의 감정 변화를 민감하게 느낀다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '상대의 감정과 반응을 민감하게 읽는다.',
          body: '',
          insight:
            '당신은 관계 속 미묘한 신호를 빠르게 감지하는 사람이다.',
          reflectionQuestion:
            '지금 상대의 고마움을 어떻게 읽었나요?',
          points: ['신호 감지', '감정 읽기', '상대 반응'],
        },
      },
    ],
  },
  {
    id: 'self_016',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '대화나 갈등 상황에서 내가 분위기를 잘 풀어냈을 때',
    prompt: '그 순간 당신은 스스로를 어떻게 느끼나요?',
    options: [
      {
        id: 'A',
        label: '자신 있게 잘 풀어냈다고 느낀다.',
        patternCode: 'R2',
        interpretation: {
          title: '직진 표현형',
          summary:
            '자신의 능력을 직접적으로 인정하고 표현한다.',
          body: '',
          insight:
            '당신은 자신의 표현력을 분명히 인식하는 사람이다.',
          reflectionQuestion:
            '지금 그 자신감은 상황을 풀어낸 것 때문인가요, 관계가 유지된 것 때문인가요?',
          points: ['자신감', '표현력', '직접 인정'],
        },
      },
      {
        id: 'B',
        label: '상황이 어떻게 풀렸는지 정리된다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '상황의 구조를 정리하며 이해한다.',
          body: '',
          insight:
            '당신은 감정보다 구조로 상황을 이해하는 사람이다.',
          reflectionQuestion:
            '정리하는 동안, 그 순간의 감정은 어떤 자리에 있었나요?',
          points: ['상황 정리', '구조적 이해', '과정 분석'],
        },
      },
      {
        id: 'C',
        label: '관계에 깊이 관여한 것 같다.',
        patternCode: 'R6',
        interpretation: {
          title: '과몰입형',
          summary:
            '관계 상황에 감정적으로 깊이 관여한 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계를 매우 중요하게 여긴다.',
          reflectionQuestion:
            '지금 그 관여는 관계를 위한 건가요, 나의 역할을 확인하기 위한 건가요?',
          points: ['관계 몰입', '깊은 관여', '역할 확인'],
        },
      },
      {
        id: 'D',
        label: '상황의 흐름이 잘 맞춰진 것 같다.',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '상황의 흐름을 관찰하며 전체가 잘 맞춰진 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계와 상황의 흐름을 읽는 능력이 강하다.',
          reflectionQuestion:
            '지금 느끼는 만족은 내 역할 때문인가요, 흐름 때문인가요?',
          points: ['흐름 관찰', '상황 읽기', '맥락 파악'],
        },
      },
    ],
  },
  {
    id: 'self_017',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '누군가 나에게 도움을 요청했고 내가 문제를 해결해 주었을 때',
    prompt: '그 경험이 당신에게 어떤 의미로 느껴지나요?',
    options: [
      {
        id: 'A',
        label: '적당한 거리에서 도움을 준 것 같다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '관계 속에서 적절한 거리를 유지하며 도움을 준 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계 균형을 중요하게 생각하는 사람이다.',
          reflectionQuestion:
            '지금 그 거리가 상대를 위한 건가요, 나를 지키기 위한 건가요?',
          points: ['거리 유지', '관계 균형', '도움 방식'],
        },
      },
      {
        id: 'B',
        label: '즉각적으로 뿌듯함이 올라온다.',
        patternCode: 'R3',
        interpretation: {
          title: '즉각 반응형',
          summary:
            '상대의 반응에 빠르게 감정적으로 반응한다.',
          body: '',
          insight:
            '당신은 관계 변화에 즉각 반응하는 에너지가 있다.',
          reflectionQuestion:
            '지금 그 뿌듯함은 문제 해결 때문인가요, 상대의 반응 때문인가요?',
          points: ['즉각 반응', '뿌듯함', '성취감'],
        },
      },
      {
        id: 'C',
        label: '상대의 필요를 잘 읽은 것 같다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '상대의 필요와 신호를 민감하게 읽은 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계 속 미묘한 신호를 빠르게 감지하는 사람이다.',
          reflectionQuestion:
            '지금 읽은 필요는 상대가 보낸 걸까요, 내가 추측한 걸까요?',
          points: ['신호 감지', '필요 읽기', '공감 능력'],
        },
      },
      {
        id: 'D',
        label: '관계가 안정적으로 유지된 것 같다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '관계의 안정성이 유지되는 것을 중요하게 느낀다.',
          body: '',
          insight:
            '당신은 관계 안정을 중요하게 생각한다.',
          reflectionQuestion:
            '지금 그 안정은 도움이 됐기 때문인가요, 관계가 유지됐기 때문인가요?',
          points: ['관계 안정', '안심감', '유지 욕구'],
        },
      },
    ],
  },
  {
    id: 'self_018',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '내가 한 행동이나 말이 다른 사람에게 긍정적인 영향을 주었을 때',
    prompt: '그 사실을 알게 되었을 때 어떤 생각이 드나요?',
    options: [
      {
        id: 'A',
        label: '내 행동이 어떤 영향을 줬는지 정리된다.',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '자신의 행동과 그 영향을 구조적으로 정리하며 이해한다.',
          body: '',
          insight:
            '당신은 감정보다 구조로 상황을 이해하는 사람이다.',
          reflectionQuestion:
            '정리할 때, 가장 중요하게 느낀 부분은 무엇인가요?',
          points: ['영향 정리', '구조적 이해', '인과 파악'],
        },
      },
      {
        id: 'B',
        label: '자신 있게 잘한 것 같다.',
        patternCode: 'R2',
        interpretation: {
          title: '직진 표현형',
          summary:
            '자신의 행동을 직접적으로 인정하고 표현한다.',
          body: '',
          insight:
            '당신은 자신의 영향력을 분명히 인식하는 사람이다.',
          reflectionQuestion:
            '지금 그 자신감은 영향 때문인가요, 인정받았다는 느낌 때문인가요?',
          points: ['자신감', '직접 인정', '영향력 인식'],
        },
      },
      {
        id: 'C',
        label: '상황이 잘 풀린 것 같다.',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '상황의 흐름을 관찰하며 전체가 잘 맞춰진 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계와 상황의 흐름을 읽는 능력이 강하다.',
          reflectionQuestion:
            '지금 그 만족은 내 행동 때문인가요, 전체 흐름 때문인가요?',
          points: ['흐름 관찰', '상황 읽기', '전체 맥락'],
        },
      },
      {
        id: 'D',
        label: '관계에 깊이 기여한 것 같다.',
        patternCode: 'R6',
        interpretation: {
          title: '과몰입형',
          summary:
            '관계에 감정적으로 깊이 기여한 것을 느낀다.',
          body: '',
          insight:
            '당신은 관계를 매우 중요하게 여긴다.',
          reflectionQuestion:
            '지금 그 기여감은 상대를 위한 건가요, 나의 역할을 확인하기 위한 건가요?',
          points: ['관계 몰입', '깊은 기여', '역할 확인'],
        },
      },
    ],
  },
  {
    id: 'self_019',
    category: 'self',
    version: 1,
    status: 'active',
    scenario: '모임에서 혼자만 대화에 끼지 못하고 소외감을 느낄 때',
    prompt: '이 상황에서 당신의 생각 흐름은 어느 쪽에 가까운가요?',
    options: [
      {
        id: 'A',
        label: '내가 왜 이런 자리에 잘 어울리지 못하는지 스스로 이유를 찾기 시작한다.',
        patternCode: 'T1',
        interpretation: {
          title: '생각확장형',
          summary:
            '상황을 자기 사고 확장의 계기로 바꾸는 경향이 있다.',
          body: '',
          insight:
            '이 유형은 외부 상황을 자기 이해의 소재로 활용한다.',
          reflectionQuestion:
            '지금 이 경험이 나에게 알려주는 것은 무엇일까요?',
          points: ['사고 확장', '자기 이해', '상황 반복'],
        },
      },
      {
        id: 'B',
        label: '지금 상황을 정리하며 내가 어떻게 행동하면 좋을지 판단하려 한다.',
        patternCode: 'T4',
        interpretation: {
          title: '구조정리형',
          summary:
            '감정보다 상황 구조를 파악하고 해결 전략을 찾는다.',
          body: '',
          insight:
            '관계 상황을 문제 해결 과제로 보는 경향이 있다.',
          reflectionQuestion:
            '지금 상황에서 내가 선택할 수 있는 행동은 무엇인가요?',
          points: ['구조 파악', '해결 전략', '행동 선택'],
        },
      },
      {
        id: 'C',
        label: '사람들의 분위기와 감정 흐름을 읽으며 내가 들어갈 타이밍을 살핀다.',
        patternCode: 'T8',
        interpretation: {
          title: '균형 관점형',
          summary:
            '감정과 분위기를 동시에 보며 균형을 찾으려 한다.',
          body: '',
          insight:
            '이 유형은 집단 흐름을 읽는 능력이 강하다.',
          reflectionQuestion:
            '지금 이 자리의 분위기는 어떤 흐름으로 움직이고 있을까요?',
          points: ['분위기 읽기', '흐름 감지', '타이밍'],
        },
      },
      {
        id: 'D',
        label: '내가 왜 이런 감정을 느끼는지 계속 곱씹으며 생각이 반복된다.',
        patternCode: 'T5',
        interpretation: {
          title: '반복고민형',
          summary:
            '감정과 생각이 반복되며 자기평가로 이어진다.',
          body: '',
          insight:
            '이 유형은 상황보다 자기 내부 평가에 집중하기 쉽다.',
          reflectionQuestion:
            '지금 내가 반복해서 떠올리는 생각은 사실인가 해석인가요?',
          points: ['반복 사고', '자기평가', '내부 집중'],
        },
      },
    ],
  },
]
