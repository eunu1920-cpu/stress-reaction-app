import type { PatternLensQuestion } from '@/lib/pattern-lens/types'

export const stressQuestions: PatternLensQuestion[] = [
  {
    id: 'stress_001',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '시작도 끝도 없다. 업무가 쌓일 때',
    prompt: '당신은 가장 먼저 어떤 생각을 하나요?',
    options: [
      {
        id: 'A',
        label: '리듬이 완전히 깨졌다... 어디서부터 다시 잡아야 하지?',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '일이 갑자기 몰리면 업무 자체보다 일상의 리듬이 깨진 느낌을 먼저 감지한다. 흐름이 무너지면 집중력과 에너지가 같이 떨어지는 경향이 있다.',
          body: '',
          insight:
            '당신에게 중요한 것은 업무량이 아니라 리듬의 회복이다. 리듬이 돌아오면 처리 속도도 자연히 회복된다.',
          reflectionQuestion:
            '지금 해야 할 일보다 먼저 내 리듬을 다시 만드는 작은 행동은 무엇인가요?',
          points: ['리듬의 회복', '집중력 저하', '흐름 복구'],
        },
      },
      {
        id: 'B',
        label: '지금 당장 해야 하는데 왜 이렇게 시작이 안 되지?',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '해야 할 일이 많은 걸 알지만 시작 타이밍이 늦어지며 일이 더 쌓이는 패턴이 생긴다. 마음속 부담은 계속 커지지만 행동 전환이 늦어질 수 있다.',
          body: '',
          insight:
            '당신에게 필요한 것은 의지 강화보다 첫 행동의 문턱을 낮추는 것이다. 아주 작은 시작이 흐름을 바꾼다.',
          reflectionQuestion:
            '지금 할 일을 3분 안에 시작할 수 있는 가장 작은 행동은 무엇인가요?',
          points: ['시작 문턱', '행동 전환', '작은 시작'],
        },
      },
      {
        id: 'C',
        label: '이게 왜 이렇게까지 쌓였지? 흐름이 어디서 꼬인 거지?',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '일이 쌓이는 과정에서는 참고 넘기다가 어느 순간 한꺼번에 압박을 느끼는 패턴이 나타난다. 평소에는 문제를 크게 드러내지 않는 경향이 있다.',
          body: '',
          insight:
            '당신은 감정이 없는 것이 아니라 늦게 반응하는 구조일 가능성이 있다. 작은 신호를 더 일찍 인식하면 폭발을 줄일 수 있다.',
          reflectionQuestion:
            '일이 쌓이기 전에 나타나는 작은 경고 신호는 무엇이었나요?',
          points: ['누적 압박', '늦은 감정 반응', '경고 신호'],
        },
      },
      {
        id: 'D',
        label: '일단 막아야 한다. 더 쌓이지 않게 방어부터 해야겠다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '일이 몰리면 먼저 마음이 닫히며 버티기 모드로 들어간다. 새로운 시도보다 현재 상태를 유지하려는 경향이 강해진다.',
          body: '',
          insight:
            '당신의 강점은 쉽게 무너지지 않는 안정성이다. 다만 방어가 길어지면 흐름이 막힐 수 있다.',
          reflectionQuestion:
            '지금 상황에서 딱 하나만 바꿀 수 있다면 무엇을 바꾸고 싶나요?',
          points: ['버티기 모드', '안정성', '변화의 시작'],
        },
      },
    ],
  },
  {
    id: 'stress_002',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '준비되지 않았다. 성과 평가가 다가올 때',
    prompt: '당신은 무엇을 가장 먼저 하나요?',
    options: [
      {
        id: 'A',
        label: '작은 실수나 부족한 부분이 계속 눈에 들어오고 신경이 예민해진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '평가 상황이 다가오면 작은 실수나 부족한 부분이 크게 느껴지고 감각이 예민해진다. 주변의 반응이나 분위기도 평소보다 강하게 인식된다.',
          body: '',
          insight:
            '당신은 상황을 민감하게 감지하는 사람이다. 다만 그 감각이 과열되면 실제보다 문제를 더 크게 느낄 수 있다.',
          reflectionQuestion:
            '지금 걱정하는 것 중 실제로 준비가 필요한 것은 무엇인가요?',
          points: [],
        },
      },
      {
        id: 'B',
        label: '평소의 리듬이 깨지고 무엇부터 해야 할지 흐름이 흔들린다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '평가가 가까워질수록 평소의 일과 흐름이 흔들리고 리듬이 깨진 느낌을 먼저 받는다. 집중보다 방향을 잃는 느낌이 생길 수 있다.',
          body: '',
          insight:
            '당신에게 중요한 것은 능력이 아니라 리듬이다. 리듬이 돌아오면 생각과 행동도 함께 정리된다.',
          reflectionQuestion:
            '지금 흐름을 다시 잡기 위해 가장 작은 정리 행동은 무엇인가요?',
          points: [],
        },
      },
      {
        id: 'C',
        label: '준비해야 한다는 걸 알지만 행동이 늦어지고 미루게 된다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '해야 할 것을 알고 있지만 시작 타이밍이 늦어지며 준비가 계속 뒤로 밀리는 패턴이 나타난다. 마음속 부담은 커지지만 행동 전환이 느릴 수 있다.',
          body: '',
          insight:
            '당신에게 필요한 것은 의지 강화보다 시작 문턱을 낮추는 것이다. 작은 시작이 전체 흐름을 바꾼다.',
          reflectionQuestion:
            '지금 당장 5분 안에 할 수 있는 준비 행동은 무엇인가요?',
          points: [],
        },
      },
      {
        id: 'D',
        label: '지나온 일들을 하나씩 떠올리며 내가 무엇을 했는지 정리하려 한다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '평가 상황이 오면 지금의 능력보다 그동안 해온 일들이 잘 떠오르지 않거나 정리가 안 되는 느낌을 받을 수 있다. 순간적으로 공백처럼 느껴질 수 있다.',
          body: '',
          insight:
            '당신은 경험이 없는 것이 아니라 정리되지 않은 상태일 가능성이 높다. 기억은 정리될 때 힘을 가진다.',
          reflectionQuestion:
            '지난 기간 동안 했던 일 중 지금 떠오르는 한 가지는 무엇인가요?',
          points: [],
        },
      },
    ],
  },
  {
    id: 'stress_003',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '출근길에 지하철이나 버스가 늦을 때',
    prompt: '당신은 어떤 반응을 보이나요?',
    options: [
      {
        id: 'A',
        label: '오늘 일정 다 꼬이겠네... 방향이 흐트러진 느낌이 든다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '예상한 흐름이 깨질 때 가장 먼저 방향 감각이 흔들린다. 계획이 어긋나면 마음이 잠시 떠 있는 느낌이 들 수 있다.',
          body: '',
          insight:
            '당신은 방향을 잡을 때 안정되는 사람이다. 흐름을 다시 잡으면 감정도 함께 정리된다.',
          reflectionQuestion:
            '지금 상황에서 다시 잡을 수 있는 가장 작은 계획은 무엇인가요?',
          points: ['방향 감각', '계획 흐름', '작은 계획'],
        },
      },
      {
        id: 'B',
        label: '왜 이러지? 상황을 버티며 마음을 닫고 대응한다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '예상치 못한 상황이 생기면 감정을 드러내기보다 스스로 방어하며 버티려는 반응이 나타난다.',
          body: '',
          insight:
            '당신은 쉽게 흔들리지 않는 안정성을 가지고 있다. 다만 오래 버티면 마음이 굳어질 수 있다.',
          reflectionQuestion:
            '지금 이 상황에서 조금 더 편해지기 위해 무엇을 풀어볼 수 있을까요?',
          points: ['버티기 반응', '안정성', '감정 방어'],
        },
      },
      {
        id: 'C',
        label: '아... 머리가 멍하다. 순간적으로 생각이 잘 이어지지 않는다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '갑작스러운 상황에서 순간적으로 머리가 멍해지거나 생각 흐름이 끊기는 느낌이 나타날 수 있다.',
          body: '',
          insight:
            '이는 능력의 문제가 아니라 순간적인 정보 과부하일 수 있다. 잠깐의 정리가 회복을 돕는다.',
          reflectionQuestion:
            '지금 해야 할 일을 한 문장으로 정리하면 무엇인가요?',
          points: ['정보 과부하', '생각 단절', '간단한 정리'],
        },
      },
      {
        id: 'D',
        label: '주변 상황과 소음, 사람들의 반응까지 신경이 예민해진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '주변 자극과 분위기를 빠르게 감지하며 감각이 예민하게 반응한다. 작은 변화도 크게 느껴질 수 있다.',
          body: '',
          insight:
            '당신의 감각은 상황을 빠르게 파악하는 능력이다. 다만 과열되면 피로가 커질 수 있다.',
          reflectionQuestion:
            '지금 나에게 가장 강하게 들어오는 자극은 무엇인가요?',
          points: ['감각 민감', '빠른 상황 인식', '자극 인식'],
        },
      },
    ],
  },
  {
    id: 'stress_004',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '상사가 갑자기 일을 더 맡겼을 때 화가 납니다.',
    prompt: '당신은 어떻게 대응하나요?',
    options: [
      {
        id: 'A',
        label: '쌓여 있던 감정이 올라오며 순간적으로 강하게 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '평소에는 참고 넘어가지만 어느 순간 감정이 한꺼번에 올라오는 패턴이 나타난다.',
          body: '',
          insight:
            '당신은 감정을 억누르는 사람이 아니라 늦게 반응하는 사람일 수 있다. 작은 신호를 먼저 인식하는 것이 중요하다.',
          reflectionQuestion:
            '이 상황에서 쌓여 있던 감정의 시작은 언제였나요?',
          points: ['감정 누적', '늦은 반응', '감정 신호 인식'],
        },
      },
      {
        id: 'B',
        label: '겉으로는 받아들이지만 행동이 늦어지고 마음이 무거워진다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '해야 할 일을 알지만 시작이 늦어지며 부담이 계속 커지는 패턴이 나타날 수 있다.',
          body: '',
          insight:
            '당신에게 필요한 것은 의지보다 시작의 문턱을 낮추는 것이다. 작은 행동이 흐름을 바꾼다.',
          reflectionQuestion:
            '지금 바로 시작할 수 있는 가장 작은 행동은 무엇인가요?',
          points: ['시작 지연', '부담 증가', '작은 시작'],
        },
      },
      {
        id: 'C',
        label: '해야 한다는 생각에 오히려 더 몰입하며 과하게 집중한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '압박 상황에서 오히려 과하게 집중하며 스스로에게 더 많은 부담을 줄 수 있다.',
          body: '',
          insight:
            '당신의 강점은 몰입이다. 다만 몰입이 길어지면 피로가 쌓일 수 있다.',
          reflectionQuestion:
            '지금 몰입을 유지하면서도 숨을 고를 수 있는 방법은 무엇인가요?',
          points: ['몰입 강화', '압박 집중', '피로 누적'],
        },
      },
      {
        id: 'D',
        label: '평소 리듬이 깨지면서 집중 흐름이 흔들린다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '갑작스러운 변화가 생기면 일의 양보다 일상의 리듬이 깨진 느낌이 먼저 온다.',
          body: '',
          insight:
            '당신은 리듬이 맞을 때 가장 안정적으로 움직인다. 흐름을 다시 잡는 것이 중요하다.',
          reflectionQuestion:
            '지금 흐름을 다시 만들기 위해 무엇을 먼저 정리할 수 있을까요?',
          points: ['리듬 붕괴', '집중 흐름', '구조 재정리'],
        },
      },
    ],
  },
  {
    id: 'stress_005',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '퇴근 후에도 업무 지시가 들어올 때',
    prompt: '당신은 어떤 기분이 드나요?',
    options: [
      {
        id: 'A',
        label: '마음이 닫히며 더 이상 에너지를 쓰기 싫다는 느낌이 든다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '예상하지 못한 요구가 들어오면 마음을 닫고 방어적인 상태로 들어가기 쉽다.',
          body: '',
          insight:
            '당신은 쉽게 무너지지 않는 안정성을 가진 사람이다. 다만 방어가 길어지면 에너지가 막힐 수 있다.',
          reflectionQuestion:
            '지금 상황에서 내가 지키고 싶은 기준은 무엇인가요?',
          points: ['방어 반응', '에너지 보호', '기준 설정'],
        },
      },
      {
        id: 'B',
        label: '계획했던 흐름이 깨지며 하루의 방향이 흔들린다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '하루의 계획이나 흐름이 깨질 때 방향 감각이 흔들리며 집중이 분산될 수 있다.',
          body: '',
          insight:
            '당신은 방향이 정리될 때 안정된다. 흐름을 다시 잡는 작은 기준이 도움이 된다.',
          reflectionQuestion:
            '지금 상황에서 오늘의 우선순위는 무엇인가요?',
          points: ['방향 흔들림', '흐름 붕괴', '우선순위 정리'],
        },
      },
      {
        id: 'C',
        label: '작은 알림에도 신경이 곤두서며 예민해진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '알림이나 상황 변화에 감각이 빠르게 반응하며 피로가 크게 느껴질 수 있다.',
          body: '',
          insight:
            '당신의 감각은 상황을 빠르게 인식하는 능력이다. 다만 과열되면 에너지가 빨리 소모된다.',
          reflectionQuestion:
            '지금 나에게 가장 강하게 들어오는 감각 자극은 무엇인가요?',
          points: ['감각 민감', '자극 과열', '에너지 소모'],
        },
      },
      {
        id: 'D',
        label: '순간적으로 머리가 멍해지며 생각이 멈춘 느낌이 든다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '갑작스러운 요구 앞에서 순간적으로 생각 흐름이 멈추거나 공백처럼 느껴질 수 있다.',
          body: '',
          insight:
            '당신은 능력이 부족한 것이 아니라 정보가 정리되지 않은 상태일 수 있다. 정리가 회복을 돕는다.',
          reflectionQuestion:
            '지금 해야 할 일을 한 문장으로 정리하면 무엇인가요?',
          points: ['기력 저하', '사고 멈춤', '정보 정리'],
        },
      },
    ],
  },
  {
    id: 'stress_006',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '동료와 의견이 충돌할 때',
    prompt: '당신은 어떻게 행동하나요?',
    options: [
      {
        id: 'A',
        label: '상황을 정리하고 논리적으로 설명하려 한다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '갈등 상황에서 바로 감정적으로 반응하기보다 상황을 정리하고 이해하려 한다.',
          body: '',
          insight:
            '당신은 상황을 정리하며 대응하는 사람이다. 다만 행동이 늦어질 수 있다.',
          reflectionQuestion:
            '지금 이 상황에서 내가 먼저 정리해야 할 사실은 무엇인가요?',
          points: ['상황 정리', '논리 설명', '대응 지연'],
        },
      },
      {
        id: 'B',
        label: '감정이 올라오며 즉각적으로 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '의견 충돌 상황에서 감정이 갑자기 올라오며 강하게 반응할 수 있다.',
          body: '',
          insight:
            '당신은 감정을 억누르기보다 순간적으로 표현하는 경향이 있다.',
          reflectionQuestion:
            '지금 올라온 감정의 시작은 어디였나요?',
          points: ['감정 상승', '즉각 반응', '감정 시작점'],
        },
      },
      {
        id: 'C',
        label: '흐름을 잠시 지켜보며 상황을 관찰한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '갈등 상황이 생기면 흐름이 깨진 느낌을 받으며 상황을 잠시 관찰하려 한다.',
          body: '',
          insight:
            '당신은 상황의 흐름을 읽으려는 사람이다.',
          reflectionQuestion:
            '지금 이 갈등의 흐름은 어디에서 시작됐나요?',
          points: ['흐름 관찰', '갈등 리듬', '상황 인식'],
        },
      },
      {
        id: 'D',
        label: '깊이 몰입하며 내 의견을 더 강하게 설명하려 한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '갈등 상황에서 더 깊이 몰입하며 자신의 의견을 강하게 설명하려 한다.',
          body: '',
          insight:
            '당신의 강점은 몰입이다. 다만 과도한 집중이 피로를 만들 수 있다.',
          reflectionQuestion:
            '지금 내가 지키려는 핵심 생각은 무엇인가요?',
          points: ['의견 몰입', '강한 설명', '집중 피로'],
        },
      },
    ],
  },
]
