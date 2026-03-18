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
            '작은 신호까지 신경 쓰이는 건, 관계를 예민하게 읽는 감각을 가진 사람이라는 걸 알게 해줘요. 다만 그 감각이 과열되면 해석이 사실보다 커질 수 있어요.',
          reflectionQuestion:
            '지금 느끼는 신호, 상대가 보낸 걸까요 내가 읽어낸 걸까요?',
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
            '머릿속에서 정리하려는 건, 관계를 감정이 아닌 지도 위에서 읽는 방식이에요. 정리가 끝나면 감정도 자리를 찾을 수 있어요.',
          reflectionQuestion:
            '정리하는 동안, 감정은 어떤 자리에 있었나요?',
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
            '겉으로 크게 반응하지 않는 건 무관심이 아니라, 관계의 균형을 지키려는 가장 조심스러운 방식이에요.',
          reflectionQuestion:
            '유지하려는 건 관계인가요, 그 관계 안에서의 나의 자리인가요?',
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
            '거리를 두며 균형을 조절하는 건, 관계를 오래 이어가려는 방식이에요. 그 거리감이 때로는 관계를 살려둬요.',
          reflectionQuestion:
            '원하는 거리는 상대를 위한 건가요, 나를 지키기 위한 건가요?',
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
            '갈등이 생길수록 더 몰입하는 건, 관계를 가장 깊은 곳에서 살아가려는 시선이에요. 다만 몰입이 커지면 자신을 잊을 수 있어요.',
          reflectionQuestion:
            '이 관계에서 지키고 싶은 건 상대인가요, 이 관계 속의 나인가요?',
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
            '솔직하게 표현하고 싶어지는 건, 관계를 흐리지 않고 명확한 선으로 그리려는 시선이에요.',
          reflectionQuestion:
            '말하려는 건 생각인가요, 아니면 그 생각을 말할 수 있는 관계인가요?',
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
            '바로 반응하는 건 성급함이 아니라, 감정이 말할 타이밍을 아는 사람이기 때문일지도 몰라요.',
          reflectionQuestion:
            '지금의 반응은 그 순간의 감정인가요, 아니면 예전부터 쌓여 오던 말인가요?',
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
            '조용히 관찰하는 건 무관심이 아니라, 관계의 흐름을 읽어내려는 시선이에요. 그 거리감이 성급한 판단을 막아줘요.',
          reflectionQuestion:
            '관찰할 때, 당신은 그 흐름의 안에 있었나요 밖에 있었나요?',
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
            '상황을 분석하는 건 감정을 피하는 게 아니라, 관계를 지도 위에서 읽어 오해를 줄이려는 방식이에요.',
          reflectionQuestion:
            '분석하는 동안, 서운함은 어떤 자리에 있었나요?',
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
            '마음을 닫고 거리를 조절하는 건 무례가 아니라, 관계를 지키려는 가장 조심스러운 방식이에요.',
          reflectionQuestion:
            '지키려는 경계는 상대를 위한 건가요, 나를 위한 건가요?',
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
            '겉으로 반응하지 않고 지켜보는 건 무감각이 아니라, 관계의 균형을 지키려는 선택이에요. 다만 그동안 감정은 뒤로 밀려 있을 수 있어요.',
          reflectionQuestion:
            '지켜보는 동안, 감정은 어디에 있었나요?',
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
            '작은 신호와 분위기에 민감한 건, 관계를 예민하게 읽는 감각을 가진 사람이라는 걸 알게 해줘요. 다만 그 감각이 과열되면 해석이 사실보다 커질 수 있어요.',
          reflectionQuestion:
            '느끼는 신호, 배제당할까 봐 읽어낸 건 아닐까요?',
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
            '흐름을 조용히 관찰하는 건 무감각이 아니라, 한 걸음 물러나 보는 시선이 감정의 과열을 식혀주기 때문이에요.',
          reflectionQuestion:
            '지금 보고 있는 건 그들의 삶인가요, 아니면 비교라는 창문 너머의 장면인가요?',
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
            '감정이 올라오며 마음이 흔들리는 건, 비교라는 자극에 진정하게 반응하는 증거예요. 다만 그 파도가 너무 크면 자신이 가라앉을 수 있어요.',
          reflectionQuestion:
            '올라온 감정은 비교 때문일까요, 비교가 건드린 다른 무엇 때문일까요?',
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
            '스스로를 돌아보며 의미를 생각하는 건, 비교를 끝이 아닌 질문으로 바꾸는 방식이에요.',
          reflectionQuestion:
            '의미를 찾는 건 그 감정을 이해하려는 건가요, 아니면 그 감정을 넘어서려는 건가요?',
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
            '비교 상황에 더 깊이 몰입하는 건, 감정이 말할 곳을 찾은 거예요. 다만 그 속에 너무 깊이 들어가면 자신의 자리가 보이지 않을 수 있어요.',
          reflectionQuestion:
            '이 감정 속에서 지키고 싶은 건 무엇인가요, 아니면 이 감정에서 벗어나고 싶은 건가요?',
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
            '분위기와 반응에 민감하게 맞추는 건, 관계의 흐름을 읽는 감각을 가진 사람이라는 걸 알게 해줘요. 다만 그 감각이 너무 오래 켜져 있으면 피로가 쌓일 수 있어요.',
          reflectionQuestion:
            '분위기를 맞추지 않으면 무너질까 봐인가요?',
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
            '겉으로 맞추지만 속으로 거리를 두는 건, 관계 속에서도 자신의 중심을 지키려는 방식이에요.',
          reflectionQuestion:
            '편안함을 느끼는 지점은 어디인가요?',
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
            '상황을 관찰하며 필요한 만큼만 반응하는 건, 관계를 감정이 아닌 구조로 읽는 방식이에요.',
          reflectionQuestion:
            '필요한 만큼만 반응한다는 건, 감정을 쓰지 않으려는 만큼은 아닐까요?',
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
            '거리를 조절하며 자신을 지키는 건, 관계에서 스스로를 보호하는 방법을 아는 거예요.',
          reflectionQuestion:
            '억지로 맞추는 게 두려워서인가요?',
          points: ['관계 경계', '거리 조절', '자기 보호'],
        },
      },
    ],
  },
  {
    id: 'relation_006',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '친구가 정보를 얘기해준다. 정보가 잘못된 것 같을 때',
    prompt: '당신은 어떻게 반응하나요?',
    options: [
      {
        id: 'A',
        label: '그 말 틀린 거 같은데... 일단 더 들어보고 말할까 말까 한다',
        patternCode: 'R7',
        interpretation: {
          title: '관망 관찰형',
          summary:
            '상대의 말을 바로 반박하기보다 먼저 상황과 맥락을 관찰한다.',
          body: '',
          insight:
            '말을 멈추고 상황을 읽는 순간, 관계는 조금 더 살아난다. 그 순간 말하지 않는 것도 선택이다.',
          reflectionQuestion:
            '그 정보가 틀렸다고 느낀 순간, 가장 먼저 든 생각은 무엇이었나요?',
          points: ['상황 관찰', '흐름 파악', '판단 유보'],
        },
      },
      {
        id: 'B',
        label: '그게 진짜야? 출처 어디서 봤어? 하고 확인부터 한다',
        patternCode: 'R4',
        interpretation: {
          title: '사고 정리형',
          summary:
            '감정이나 관계보다 사실과 논리를 먼저 정리하려 한다.',
          body: '',
          insight:
            '감정보다 사실을 먼저 정리하는 건, 관계를 해치지 않으려는 방식이다. 그 관성이 때로는 관계를 지키기도 한다.',
          reflectionQuestion:
            '그 말을 들을 때, 사실과 감정 중 무엇이 먼저 반응했나요?',
          points: ['상황 분석', '논리 정리', '사실 확인'],
        },
      },
      {
        id: 'C',
        label: '그거 아냐, 이건 맞아 하고 바로 말한다',
        patternCode: 'R2',
        interpretation: {
          title: '직진 표현형',
          summary:
            '잘못된 정보라 느끼면 바로 수정하려는 행동이 나타난다.',
          body: '',
          insight:
            '바로 말하는 건 무례가 아니라, 문제를 바로잡으려는 몸이 먼저 움직인 것이다. 그 속도가 관계에선 때로 날카롭게 느껴질 수 있다.',
          reflectionQuestion:
            '그 순간 말하지 않았다면, 무엇이 달라졌을까요?',
          points: ['솔직 표현', '즉각 반응', '감정 시작점'],
        },
      },
      {
        id: 'D',
        label: '관계 망가질까 봐 조심스럽게, 그게... 사실은 좀 다른데 하고 말한다',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '관계의 분위기와 상대 감정을 고려해 표현 강도를 조절한다.',
          body: '',
          insight:
            '관계 분위기를 먼저 읽고 말의 강도를 조절하는 건, 관계를 지키려는 선택이다. 그 거리감이 때로는 관계를 오래 이어가게 한다.',
          reflectionQuestion:
            '그 말을 할 때, 가장 신경 쓴 것은 사실이었나요, 관계였나요?',
          points: ['거리 조절', '관계 균형', '표현 조절'],
        },
      },
    ],
  },
  {
    id: 'relation_007',
    category: 'relation',
    version: 1,
    status: 'active',
    scenario: '연인 또는 배우자와 별거 아닌 걸로 다퉜다. 나는 상대의 잘못인 것 같지만 화해하고 싶다.',
    prompt: '당신은 어떤 행동을 하는가?',
    options: [
      {
        id: 'A',
        label: '거리를 두며 상황을 지켜본다.',
        patternCode: 'R5',
        interpretation: {
          title: '거리 조절형',
          summary:
            '다시 가까워질 때 무너지지 않도록 잠시 각자의 자리를 비워두는 태도이다.',
          body: '',
          insight:
            '멀어지는 것이 아니라, 서로가 견딜 수 있는 적당한 거리를 다시 설계하는 중이다.',
          reflectionQuestion:
            '지금의 침묵은 화해를 위한 준비인가요, 아니면 나를 지키기 위한 성벽인가요?',
          points: ['거리 조절', '관계 균형', '침묵의 의미'],
        },
      },
      {
        id: 'B',
        label: '먼저 대화를 시도한다.',
        patternCode: 'R3',
        interpretation: {
          title: '즉각 반응형',
          summary:
            '갈등의 무게보다 관계의 온도가 식어가는 것을 더 경계하는 모습이다.',
          body: '',
          insight:
            '어긋난 순간을 방치하기보다, 먼저 손을 내밀어 관계의 리듬을 되찾으려 한다.',
          reflectionQuestion:
            '지금 건네려는 말은 상대에게 닿으려는 마음인가요, 아니면 불안함을 덜어내려는 서두름인가요?',
          points: ['즉각 반응', '관계 회복', '대화 시도'],
        },
      },
      {
        id: 'C',
        label: '상대 감정을 먼저 살핀다.',
        patternCode: 'R1',
        interpretation: {
          title: '신호 감지형',
          summary:
            '나의 옳고 그름보다 상대의 마음이 머무는 자리를 먼저 읽어내려 한다.',
          body: '',
          insight:
            '관계를 장소가 아닌 사람의 상태로 기억하며, 상대의 날씨를 먼저 살핀다.',
          reflectionQuestion:
            '상대의 기분을 살피는 동안, 정작 위로받아야 할 당신의 마음은 어디에 서 있나요?',
          points: ['신호 감지', '상대 감정', '자기 감정 인식'],
        },
      },
      {
        id: 'D',
        label: '상황을 정리하고 생각한다.',
        patternCode: 'R8',
        interpretation: {
          title: '안정 유지형',
          summary:
            '감정의 소모 속에서도 관계의 구조가 흔들리지 않게 중심을 잡으려 한다.',
          body: '',
          insight:
            '화해를 감정의 교환이 아니라, 일상의 리듬이 깨지지 않게 지도를 다시 살피는 일로 여긴다.',
          reflectionQuestion:
            '상황을 모두 정리하고 나면, 그 안에 남은 서운함이라는 감정도 머물 곳이 있을까요?',
          points: ['안정 유지', '상황 정리', '감정의 자리'],
        },
      },
    ],
  },
]
