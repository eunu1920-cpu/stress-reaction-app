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
            '리듬이 깨진 그 순간, 당신이 찾는 건 일의 양이 아니라 흐름을 되찾을 빈칸인 듯해요.',
          reflectionQuestion:
            '지금 해야 할 일보다 먼저, 리듬을 되찾을 작은 빈칸은 어디에 있을까요?',
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
            '시작이 안 되는 건 의지가 약해서가 아니라, 첫 걸음의 문이 너무 크게 열려 있기 때문일지도 몰라요.',
          reflectionQuestion:
            '시작의 문이 너무 크게 느껴진 적은 언제였나요?',
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
            '쌓였다가 한꺼번에 터지는 건 무감각이 아니라, 스스로를 지키려다 늦게 반응한 생존의 리듬인 것 같아요.',
          reflectionQuestion:
            '그 순간까지 참았던 건, 괜찮아서였나요 아니면 말할 타이밍을 몰라서였나요?',
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
            '막아야 한다는 그 생각 자체가, 당신이 지금까지 버텨온 힘을 보여줘요. 다만 방어가 길어지면 새로운 것도 받아들이기 어려워질 수 있어요.',
          reflectionQuestion:
            '방어할 때, 지키려는 것과 바꾸는 것 중 무엇이 더 두렵나요?',
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
            '작은 실수가 크게 보이는 건, 당신이 안전해지고 싶다는 가장 뜨거운 증거예요.',
          reflectionQuestion:
            '지금 걱정하는 것 중, 불안이 키운 것은 무엇인가요?',
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
            '평가가 다가올수록 리듬이 흔들리는 건, 능력이 부족해서가 아니라 당신이 리듬으로 살아가는 사람이기 때문일지도 몰라요.',
          reflectionQuestion:
            '리듬이 깨졌다고 느낀 건, 흐름이 무너진 걸까요 아니면 방향을 잃은 느낌일까요?',
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
            '알지만 미루는 건 게으름이 아니라, 시작의 문이 너무 무거워서일 수 있어요. 작은 틈만 열리면 흐름이 달라질 수 있어요.',
          reflectionQuestion:
            '준비해야 한다는 걸 알면서도 미루는 동안, 마음은 어디에 머물러 있었나요?',
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
            '떠오르지 않는 건 경험이 없어서가 아니라, 아직 지도에 그려지지 않은 빈칸처럼 머물러 있을 수 있어요.',
          reflectionQuestion:
            '공백처럼 느껴질 때, 그 빈칸은 정말 비어 있을까요?',
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
            '방향이 흐트러진 느낌은, 당신이 계획이라는 지도로 세상을 읽는 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '지하철이 늦은 건 문제인가요, 아니면 계획이 어긋난 게 더 불안한 건가요?',
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
            '마음을 닫고 버티는 건 무감각이 아니라, 스스로를 지키려는 가장 단단한 방식이에요.',
          reflectionQuestion:
            '버티는 동안, 그 안에서 풀어도 되는 것은 없었나요?',
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
            '머리가 멍한 건 부족함이 아니라, 정보가 한꺼번에 들어와 잠시 멈춰 선 상태일 수 있어요.',
          reflectionQuestion:
            '생각이 끊겼다고 느낀 순간, 정말 아무것도 없었나요 아니면 너무 많아서였나요?',
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
            '주변까지 신경 쓰이는 건 약함이 아니라, 세상을 예민하게 읽는 감각을 가진 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '그 자극이 크게 느껴지는 건, 자극이 강해서일까요 아니면 지금 예민해진 때문일까요?',
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
            '한꺼번에 올라온 감정은 억눌렀던 게 아니라, 늦게 도착한 편지처럼 이제야 터진 것일 수 있어요.',
          reflectionQuestion:
            '화가 난 건 지금 이 일 때문인가요, 아니면 그동안 쌓인 것이 마침내 말을 찾은 건가요?',
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
            '겉으로 받아들이지만 행동이 늦어지는 건, 마음이 무거워진 그 무게가 먼저 내려앉아 있기 때문일지도 몰라요.',
          reflectionQuestion:
            '받아들였다고 했을 때, 정말 받아들인 건가요 아니면 말하지 않기로 한 건가요?',
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
            '해야 한다는 생각에 더 몰입하는 건, 당신이 일과 하나가 될 때 가장 살아 있다는 걸 보여줘요. 다만 몰입이 길어지면 피로가 쌓일 수 있어요.',
          reflectionQuestion:
            '멈추는 게 더 두려운 건 아닐까요?',
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
            '갑작스러운 일이 리듬을 깨는 건, 당신이 흐름 속에서 가장 살아 있는 사람이기 때문인 듯해요.',
          reflectionQuestion:
            '리듬이 깨졌다고 느낀 건, 일의 양 때문일까요 예상했던 흐름 때문일까요?',
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
            '마음을 닫는 건 무례가 아니라, 더 이상 에너지를 쓰지 않겠다는 경계를 세운 거예요.',
          reflectionQuestion:
            '그 경계 너머로 들어오는 게 두렵나요?',
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
            '계획했던 흐름이 깨질 때 방향이 흔들리는 건, 당신이 지도 위에서 살아가는 사람이기 때문일지도 몰라요.',
          reflectionQuestion:
            '지금 가장 필요한 건 일의 정리인가요, 방향의 회복인가요?',
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
            '작은 알림에도 신경이 곤두서는 건, 경계선을 잘 지키는 사람이라는 걸 알게 해줘요. 다만 경계가 너무 가까우면 쉴 틈이 없어요.',
          reflectionQuestion:
            '퇴근 후에도 경계를 내려놓지 못한 건 아닐까요?',
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
            '머리가 멍한 건 부족함이 아니라, 갑자기 들어온 요구가 아직 자리를 찾지 못한 상태예요.',
          reflectionQuestion:
            '생각이 멈춘 느낌, 정말 비어 있었나요?',
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
            '상황을 정리하고 논리로 설명하려는 건, 감정보다 구조가 더 안전한 곳이기 때문인 듯해요.',
          reflectionQuestion:
            '정리하는 동안, 그 안에 있던 감정은 어떤 자리에 있었나요?',
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
            '즉각 반응하는 건 참을 줄 모르는 게 아니라, 감정이 말할 타이밍을 아는 사람이기 때문일지도 몰라요.',
          reflectionQuestion:
            '그 감정은 지금 이 충돌에서 시작된 건가요, 아니면 예전부터 기다리고 있던 말인가요?',
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
            '흐름을 지켜보며 관찰하는 건 무관심이 아니라, 리듬이 깨진 그 자리에서 다시 읽으려는 시선인 듯해요.',
          reflectionQuestion:
            '관찰할 때, 당신은 그 갈등의 안에 있었나요 밖에 있었나요?',
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
            '깊이 몰입해 의견을 설명하는 건, 그 생각이 당신에게 얼마나 중요한지 보여줘요.',
          reflectionQuestion:
            '지키려는 건 그 의견인가요, 아니면 그 의견을 말할 수 있는 나인가요?',
          points: ['의견 몰입', '강한 설명', '집중 피로'],
        },
      },
    ],
  },
  {
    id: 'stress_007',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '승진 경쟁에서 뒤처졌다고 느낄 때',
    prompt: '당신은 가장 먼저 무엇을 하나요?',
    options: [
      {
        id: 'A',
        label: '앞으로 어떻게 해야 할지 여러 방향을 생각한다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '경쟁 상황에서 여러 가능성을 동시에 생각하며 방향이 흔들릴 수 있다.',
          body: '',
          insight:
            '여러 방향을 생각하는 건, 당신이 상황을 넓게 바라보는 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '방향이 흔들릴 때, 가장 먼저 잡고 싶은 건 무엇인가요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'B',
        label: '마음을 닫고 상황을 버티려 한다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '경쟁 상황에서 마음을 닫고 버티며 스스로를 보호하려 한다.',
          body: '',
          insight:
            '마음을 닫고 버티는 건 무감각이 아니라, 스스로를 지키려는 가장 단단한 방식이에요.',
          reflectionQuestion:
            '버티는 동안, 그 안에서 풀어도 되는 것은 없었나요?',
          points: ['방어', '버티기', '안정성'],
        },
      },
      {
        id: 'C',
        label: '상황을 분석하며 정리하려 한다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '상황을 분석하고 정리하려 하지만 행동이 늦어질 수 있다.',
          body: '',
          insight:
            '상황을 정리하려는 건, 당신이 구조 속에서 안전감을 찾는 사람이라는 걸 알게 해줘요.',
          reflectionQuestion:
            '정리하는 동안, 그 안에 있던 감정은 어떤 자리에 있었나요?',
          points: ['상황 분석', '정리', '대응 지연'],
        },
      },
      {
        id: 'D',
        label: '잠시 생각이 멈추거나 공백처럼 느껴진다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '경쟁 상황에서 순간적으로 생각 흐름이 멈추는 느낌이 나타날 수 있다.',
          body: '',
          insight:
            '생각이 멈추는 건 부족함이 아니라, 정보가 한꺼번에 들어와 잠시 멈춰 선 상태일 수 있어요.',
          reflectionQuestion:
            '공백처럼 느껴질 때, 그 빈칸은 정말 비어 있을까요?',
          points: ['생각 멈춤', '정보 과부하', '정리 필요'],
        },
      },
    ],
  },
  {
    id: 'stress_008',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '회의 중 의견을 무시당했을 때',
    prompt: '당신은 어떻게 반응하나요?',
    options: [
      {
        id: 'A',
        label: '작은 반응이나 분위기까지 예민하게 느껴진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '회의 분위기와 사람들의 반응을 민감하게 감지한다.',
          body: '',
          insight:
            '상황의 미묘한 변화를 빠르게 느끼는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 느낀 신호는 어떤 순간에서 시작됐나요?',
          points: ['감각 감지', '분위기 읽기', '미묘한 변화'],
        },
      },
      {
        id: 'B',
        label: '상황에 더 몰입하며 내 생각을 설명하려 한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '무시당했다고 느끼면 더 몰입하며 자신의 의견을 설명하려 한다.',
          body: '',
          insight:
            '몰입을 통해 상황을 돌파하려는 힘이 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 전달하려는 핵심 메시지는 무엇인가요?',
          points: ['몰입', '설명 시도', '상황 돌파'],
        },
      },
      {
        id: 'C',
        label: '상황의 흐름을 지켜보며 관찰한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '상황 흐름이 어긋났다고 느끼며 잠시 흐름을 지켜본다.',
          body: '',
          insight:
            '상황의 흐름을 읽는 능력이 있을지도 모른다.',
          reflectionQuestion:
            '지금 회의의 흐름은 어디로 가고 있나요?',
          points: ['흐름 관찰', '리듬 인식', '판단 유보'],
        },
      },
      {
        id: 'D',
        label: '감정이 올라오며 즉각적으로 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정이 올라오며 즉각적으로 반응하거나 말이 튀어나올 수 있다.',
          body: '',
          insight:
            '감정을 숨기기보다 표현하는 경향일지도 모른다.',
          reflectionQuestion:
            '지금 올라온 감정의 이름은 무엇인가요?',
          points: ['즉각 반응', '감정 표현', '누적 폭발'],
        },
      },
    ],
  },
  {
    id: 'stress_009',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '월말이 다가올 때',
    prompt: '가장 크게 떠오르는 걱정은 무엇인가요?',
    options: [
      {
        id: 'A',
        label: '지금 상태를 버티고 유지해야 한다는 생각이 든다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '압박 상황에서 마음을 닫고 버티려는 경향이 있다.',
          body: '',
          insight:
            '쉽게 무너지지 않는 안정성을 가진 사람일지도 모른다.',
          reflectionQuestion:
            '지금 내가 지키고 싶은 기준은 무엇인가요?',
          points: ['버티기', '안정성', '기준 유지'],
        },
      },
      {
        id: 'B',
        label: '갑자기 머리가 멍해지며 생각이 정리되지 않는다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '압박이 커지면 순간적으로 생각 흐름이 멈추는 느낌이 생길 수 있다.',
          body: '',
          insight:
            '정리가 필요할 때 잠시 멈추는 패턴일지도 모른다.',
          reflectionQuestion:
            '지금 상황을 한 문장으로 정리하면 무엇인가요?',
          points: ['생각 멈춤', '정리 필요', '정보 과부하'],
        },
      },
      {
        id: 'C',
        label: '해야 할 일을 정리하려 하지만 시작이 늦어진다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '해야 할 일을 알지만 시작이 늦어질 수 있다.',
          body: '',
          insight:
            '필요한 것은 작은 시작일 뿐이다.',
          reflectionQuestion:
            '지금 바로 할 수 있는 가장 작은 행동은 무엇인가요?',
          points: ['시작 지연', '작은 시작', '행동 전환'],
        },
      },
      {
        id: 'D',
        label: '주변 상황과 반응이 예민하게 느껴진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '상황 압박 속에서 주변 자극과 반응이 더 크게 느껴질 수 있다.',
          body: '',
          insight:
            '상황 변화를 빠르게 감지하는 감각을 가지고 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 가장 강하게 느끼는 자극은 무엇인가요?',
          points: ['감각 과열', '자극 감지', '압박 반응'],
        },
      },
    ],
  },
  {
    id: 'stress_010',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '자녀(친구)의 성적이나 진로 문제를 들었을 때',
    prompt: '당신은 어떻게 반응하나요?',
    options: [
      {
        id: 'A',
        label: '감정이 올라오며 바로 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정이 올라오며 즉각적인 반응이 나타날 수 있다.',
          body: '',
          insight:
            '감정을 숨기기보다 표현하는 경향일지도 모른다.',
          reflectionQuestion:
            '지금 올라온 감정은 무엇인가요?',
          points: ['즉각 반응', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'B',
        label: '상황에 깊이 몰입하며 해결 방법을 찾으려 한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제를 해결하려고 깊이 몰입하며 여러 방법을 찾으려 한다.',
          body: '',
          insight:
            '문제 해결에 강한 몰입을 보이는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 해결하려는 핵심 문제는 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'C',
        label: '상황 흐름을 보며 관찰하려 한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '상황 흐름이 흔들리는 느낌을 받으며 잠시 관찰하려 한다.',
          body: '',
          insight:
            '상황의 흐름을 읽는 사람인 듯하다.',
          reflectionQuestion:
            '지금 이 문제의 흐름은 어디로 가고 있나요?',
          points: ['흐름 관찰', '리듬 인식', '판단 유보'],
        },
      },
      {
        id: 'D',
        label: '여러 생각과 가능성을 동시에 떠올린다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '여러 생각과 가능성이 동시에 떠오르며 방향이 흔들릴 수 있다.',
          body: '',
          insight:
            '상황을 넓게 바라보는 사고를 가지고 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 가장 중요하게 생각하는 방향은 무엇인가요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
    ],
  },
  {
    id: 'stress_011',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '배우자와 집안일 분담 문제로 갈등이 생길 때',
    prompt: '당신은 어떻게 대처하나요?',
    options: [
      {
        id: 'A',
        label: '여러 생각이 동시에 떠오르며 상황의 방향을 고민한다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '갈등 상황에서 여러 생각이 동시에 떠오르며 무엇부터 해야 할지 방향이 흔들릴 수 있다.',
          body: '',
          insight:
            '상황을 넓게 바라보는 사고를 가지고 있을지도 모른다.',
          reflectionQuestion:
            '지금 이 갈등에서 내가 먼저 정해야 할 방향은 무엇인가요?',
          points: ['방향 사고', '갈등 고민', '흐름 흔들림'],
        },
      },
      {
        id: 'B',
        label: '상황을 정리하려 하지만 행동이 늦어질 수 있다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '상황을 이해하고 정리하려 하지만 행동으로 옮기는 타이밍이 늦어질 수 있다.',
          body: '',
          insight:
            '필요한 것은 작은 시작일 뿐이다.',
          reflectionQuestion:
            '지금 이 문제에서 내가 할 수 있는 가장 작은 행동은 무엇인가요?',
          points: ['시작 지연', '작은 시작', '행동 전환'],
        },
      },
      {
        id: 'C',
        label: '분위기와 상대의 말투에 민감하게 반응한다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '갈등 상황에서 말투, 표정, 분위기 등 작은 신호에 민감하게 반응한다.',
          body: '',
          insight:
            '상황의 미묘한 변화를 빠르게 감지하는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 느낀 신호는 어떤 순간에서 시작됐나요?',
          points: ['감각 감지', '분위기 읽기', '미묘한 변화'],
        },
      },
      {
        id: 'D',
        label: '순간적으로 머리가 멍해지며 생각이 정리되지 않는다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '갈등이 갑자기 커지면 순간적으로 생각 흐름이 멈추는 느낌이 나타날 수 있다.',
          body: '',
          insight:
            '정보가 많아질 때 잠시 정리가 필요한 사람일지도 모른다.',
          reflectionQuestion:
            '지금 상황을 한 문장으로 정리하면 무엇인가요?',
          points: ['생각 멈춤', '정리 필요', '정보 과부하'],
        },
      },
    ],
  },
  {
    id: 'stress_012',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '가족 중 누군가 아플 때',
    prompt: '당신은 어떤 감정을 가장 크게 느끼나요?',
    options: [
      {
        id: 'A',
        label: '해결 방법을 찾으려 깊이 몰입한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제를 해결하려는 마음이 커지며 상황에 깊이 몰입한다.',
          body: '',
          insight:
            '문제 해결에 강한 몰입을 보이는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 해결하려는 핵심 문제는 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'B',
        label: '상황을 버티며 마음을 닫으려 한다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '상황이 힘들수록 마음을 닫고 버티려는 반응이 나타난다.',
          body: '',
          insight:
            '쉽게 무너지지 않는 안정성을 가진 사람일지도 모른다.',
          reflectionQuestion:
            '지금 내가 지키고 싶은 기준은 무엇인가요?',
          points: ['버티기', '안정성', '기준 유지'],
        },
      },
      {
        id: 'C',
        label: '감정이 올라오며 바로 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정이 올라오며 걱정이나 불안이 강하게 표현될 수 있다.',
          body: '',
          insight:
            '감정을 숨기기보다 표현하는 경향일지도 모른다.',
          reflectionQuestion:
            '지금 올라온 감정의 이름은 무엇인가요?',
          points: ['즉각 반응', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'D',
        label: '상황의 흐름을 지켜보며 관찰한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '가족의 건강 문제로 일상의 흐름이 깨진 느낌을 받을 수 있다.',
          body: '',
          insight:
            '상황의 흐름을 중요하게 느끼는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내 일상의 리듬을 다시 만들기 위해 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
    ],
  },
  {
    id: 'stress_013',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '부모님이 당신의 삶에 지나치게 간섭할 때',
    prompt: '당신은 어떻게 반응하나요?',
    options: [
      {
        id: 'A',
        label: '순간적으로 머리가 멍해지며 생각이 정리되지 않는다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '간섭 상황에서 순간적으로 생각이 정리되지 않거나 대응이 멈출 수 있다.',
          body: '',
          insight:
            '정리가 필요한 순간 잠시 멈추는 패턴일지도 모른다.',
          reflectionQuestion:
            '지금 내가 가장 먼저 정리해야 할 생각은 무엇인가요?',
          points: ['생각 멈춤', '정리 필요', '정보 과부하'],
        },
      },
      {
        id: 'B',
        label: '작은 말과 행동에도 예민하게 반응한다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '상대의 말투나 행동에 민감하게 반응하며 감각이 과열될 수 있다.',
          body: '',
          insight:
            '관계의 미묘한 변화를 빠르게 감지하는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 가장 강하게 느낀 신호는 무엇인가요?',
          points: ['감각 감지', '분위기 읽기', '미묘한 변화'],
        },
      },
      {
        id: 'C',
        label: '마음을 닫고 상황을 버티려 한다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '반복되는 간섭 속에서 마음을 닫고 버티는 반응이 나타날 수 있다.',
          body: '',
          insight:
            '쉽게 흔들리지 않는 안정성을 가진 사람일지도 모른다.',
          reflectionQuestion:
            '지금 내가 지키고 싶은 경계는 무엇인가요?',
          points: ['버티기', '안정성', '기준 유지'],
        },
      },
      {
        id: 'D',
        label: '상황을 정리하고 이해하려 한다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '상황을 이해하고 정리하려 하지만 행동 전환이 늦어질 수 있다.',
          body: '',
          insight:
            '필요한 것은 작은 행동의 시작일 뿐이다.',
          reflectionQuestion:
            '지금 내가 표현해야 할 한 가지 생각은 무엇인가요?',
          points: ['시작 지연', '작은 시작', '행동 전환'],
        },
      },
    ],
  },
  {
    id: 'stress_014',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '자녀가 반항적인 태도를 보일 때',
    prompt: '당신은 어떤 행동을 하나요?',
    options: [
      {
        id: 'A',
        label: '상황의 흐름을 지켜보며 관찰한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '상황의 흐름이 어긋났다고 느끼며 잠시 관찰하려 한다.',
          body: '',
          insight:
            '상황의 흐름을 읽는 능력이 있을지도 모른다.',
          reflectionQuestion:
            '지금 이 상황의 흐름은 어디에서 시작됐나요?',
          points: ['흐름 관찰', '리듬 인식', '판단 유보'],
        },
      },
      {
        id: 'B',
        label: '감정이 올라오며 즉각적으로 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정이 올라오며 바로 반응하거나 말이 튀어나올 수 있다.',
          body: '',
          insight:
            '감정을 숨기기보다 표현하는 경향일지도 모른다.',
          reflectionQuestion:
            '지금 올라온 감정의 이름은 무엇인가요?',
          points: ['즉각 반응', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'C',
        label: '여러 가능성을 생각하며 방향을 고민한다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '여러 생각과 가능성이 동시에 떠오르며 방향이 흔들릴 수 있다.',
          body: '',
          insight:
            '상황을 넓게 바라보는 사고를 가지고 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 먼저 정해야 할 방향은 무엇인가요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'D',
        label: '문제 해결을 위해 깊이 몰입한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제를 해결하려는 마음이 커지며 상황에 깊이 몰입한다.',
          body: '',
          insight:
            '해결 중심 사고를 가진 사람인 듯하다.',
          reflectionQuestion:
            '지금 내가 해결하려는 핵심 문제는 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
    ],
  },
  {
    id: 'stress_015',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '경제적 부담으로 가족과 갈등이 생길 때',
    prompt: '당신은 어떻게 대처하나요?',
    options: [
      {
        id: 'A',
        label: '상황을 정리하고 이해하려 한다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '상황을 분석하고 이해하려 하지만 행동이 늦어질 수 있다.',
          body: '',
          insight:
            '문제를 정리하는 능력이 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 정리해야 할 사실은 무엇인가요?',
          points: ['상황 분석', '정리', '대응 지연'],
        },
      },
      {
        id: 'B',
        label: '순간적으로 머리가 멍해지며 생각이 멈춘다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '부담이 커질수록 생각 흐름이 멈추는 느낌이 나타날 수 있다.',
          body: '',
          insight:
            '잠시 멈춰 정리하는 시간이 필요한 사람일지도 모른다.',
          reflectionQuestion:
            '지금 상황을 한 문장으로 정리하면 무엇인가요?',
          points: ['생각 멈춤', '정리 필요', '정보 과부하'],
        },
      },
      {
        id: 'C',
        label: '마음을 닫고 상황을 버티려 한다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '갈등 상황에서 마음을 닫고 버티려는 반응이 나타날 수 있다.',
          body: '',
          insight:
            '쉽게 무너지지 않는 안정성을 가진 사람일지도 모른다.',
          reflectionQuestion:
            '지금 내가 지키고 싶은 기준은 무엇인가요?',
          points: ['버티기', '안정성', '기준 유지'],
        },
      },
      {
        id: 'D',
        label: '작은 반응과 분위기에 민감해진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '갈등 상황에서 분위기와 말투 등 작은 신호에 민감하게 반응한다.',
          body: '',
          insight:
            '상황 변화를 빠르게 감지하는 감각을 가지고 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 가장 강하게 느낀 신호는 무엇인가요?',
          points: ['감각 감지', '분위기 읽기', '미묘한 변화'],
        },
      },
    ],
  },
  {
    id: 'stress_016',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '가족 모임에서 의견 차이가 생길 때',
    prompt: '당신은 어떤 태도를 취하나요?',
    options: [
      {
        id: 'A',
        label: '감정이 올라오며 바로 반응한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '갈등 상황에서 감정이 올라오며 즉각적인 반응이 나타날 수 있다.',
          body: '',
          insight:
            '감정을 숨기기보다 표현하는 사람인 것 같다.',
          reflectionQuestion:
            '지금 올라온 감정은 무엇인가요?',
          points: ['즉각 반응', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'B',
        label: '여러 생각과 가능성을 떠올린다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '여러 가능성을 동시에 생각하며 방향이 흔들릴 수 있다.',
          body: '',
          insight:
            '상황을 넓게 바라보는 사고를 가지고 있을지도 모른다.',
          reflectionQuestion:
            '지금 내가 먼저 정해야 할 방향은 무엇인가요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'C',
        label: '상황 흐름을 관찰하며 지켜본다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '갈등 상황에서 흐름을 관찰하며 상황을 이해하려 한다.',
          body: '',
          insight:
            '상황의 흐름을 읽는 능력이 있을지도 모른다.',
          reflectionQuestion:
            '지금 이 모임의 흐름은 어디로 가고 있나요?',
          points: ['흐름 관찰', '리듬 인식', '판단 유보'],
        },
      },
      {
        id: 'D',
        label: '문제 해결을 위해 깊이 몰입한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제 해결을 위해 깊이 몰입하며 상황을 정리하려 한다.',
          body: '',
          insight:
            '해결 중심의 사고를 가진 사람인 듯하다.',
          reflectionQuestion:
            '지금 내가 해결하려는 핵심 문제는 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
    ],
  },
  {
    id: 'stress_017',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '너무 아파서 식욕도 없고 소화도 안 된다. 가족은 빨리 회복하려면 밥을 먹으라고 할 때',
    prompt: '당신의 감정은?',
    options: [
      {
        id: 'A',
        label: '몸의 감각이 예민해지고 자극이 크게 느껴진다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '몸 상태가 나쁠 때 감각 자극과 주변 반응이 크게 느껴진다.',
          body: '',
          insight:
            '몸과 환경의 신호를 민감하게 감지하는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내 몸이 보내는 가장 강한 신호는 무엇인가요?',
          points: ['감각 감지', '자극 과열', '몸 신호'],
        },
      },
      {
        id: 'B',
        label: '상황의 흐름이 깨진 느낌을 받는다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '몸이 아플 때 일상의 리듬이 깨진 느낌이 크게 나타난다.',
          body: '',
          insight:
            '일상의 흐름과 리듬에 영향을 많이 받는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내 몸의 리듬을 회복하려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'C',
        label: '상황을 이해하려 하지만 행동이 늦어진다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '몸 상태를 이해하지만 행동으로 전환하는 속도가 늦어질 수 있다.',
          body: '',
          insight:
            '필요한 것은 작은 회복 행동일 뿐이다.',
          reflectionQuestion:
            '지금 내가 할 수 있는 가장 작은 회복 행동은 무엇인가요?',
          points: ['시작 지연', '작은 시작', '행동 전환'],
        },
      },
      {
        id: 'D',
        label: '머리가 멍해지며 생각이 정리되지 않는다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '몸이 힘들 때 생각 흐름이 멈추거나 멍한 상태가 나타날 수 있다.',
          body: '',
          insight:
            '과부하 상황에서 잠시 멈춰 정리가 필요한 사람일지도 모른다.',
          reflectionQuestion:
            '지금 내가 가장 먼저 회복해야 할 것은 무엇인가요?',
          points: ['생각 멈춤', '정리 필요', '정보 과부하'],
        },
      },
    ],
  },
  {
    id: 'stress_018',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '하는 일이 없는 것 같은데 바쁜 것이 이상하다',
    prompt: '상황을 바꾸기 위해 당신이 가장 먼저 하는 것은?',
    options: [
      {
        id: 'A',
        label: '감정이 올라오며 바로 행동하려 한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '상황이 답답할 때 감정이 올라오며 행동이 빨라질 수 있다.',
          body: '',
          insight:
            '에너지 반응이 빠른 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 가장 답답하게 느끼는 부분은 무엇인가요?',
          points: ['즉각 반응', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'B',
        label: '상황을 정리하려 한다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '상황을 이해하려 하지만 행동이 늦어질 수 있다.',
          body: '',
          insight:
            '필요한 것은 작은 실행일 뿐이다.',
          reflectionQuestion:
            '지금 내가 정리해야 할 일은 무엇인가요?',
          points: ['상황 분석', '정리', '대응 지연'],
        },
      },
      {
        id: 'C',
        label: '문제 해결에 몰입한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제 해결을 위해 한 가지 일에 깊이 몰입한다.',
          body: '',
          insight:
            '몰입을 통해 상황을 바꾸는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 집중해야 할 핵심 문제는 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'D',
        label: '상황 흐름을 관찰한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '일의 흐름이 맞지 않는 느낌을 크게 느낀다.',
          body: '',
          insight:
            '일의 리듬과 흐름을 중요하게 느끼는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내 일의 흐름을 바꾸려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '판단 유보'],
        },
      },
    ],
  },
  {
    id: 'stress_019',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '최근 이유 없이 무기력한 기분이 들 때',
    prompt: '당신은 보통 어떤 반응을 보이나요?',
    options: [
      {
        id: 'A',
        label: '감정이 쌓이며 갑자기 무기력이 커진다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정이 쌓이다가 갑자기 무기력으로 나타난다.',
          body: '',
          insight:
            '감정은 축적형으로 나타날지도 모른다.',
          reflectionQuestion:
            '지금 쌓여 있는 감정은 무엇인가요?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'B',
        label: '문제를 해결하려 과하게 몰입한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '무기력할수록 일을 통해 해결하려 한다.',
          body: '',
          insight:
            '행동으로 감정을 해결하려는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내가 너무 과하게 책임지고 있는 일은 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'C',
        label: '일상의 리듬이 흐트러진 느낌이 든다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '생활 리듬이 깨지며 무기력함을 느낀다.',
          body: '',
          insight:
            '리듬과 흐름에 영향을 받는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내 일상 리듬을 회복하려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'D',
        label: '방향을 잃은 느낌이 든다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '무엇을 해야 할지 방향이 흐려진 느낌을 받는다.',
          body: '',
          insight:
            '방향이 분명할 때 에너지가 생기는 사람인 듯하다.',
          reflectionQuestion:
            '지금 내가 다시 정해야 할 방향은 무엇인가요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
    ],
  },
  {
    id: 'stress_020',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '야근이 잦아져서 건강이 나빠지고 있다는 걸 느낄 때',
    prompt: '당신은 보통 어떤 반응을 보이나요?',
    options: [
      {
        id: 'A',
        label: '생활 리듬이 깨진 느낌이 들며 피로가 커진다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '생활 리듬이 깨지면서 에너지 흐름이 무너진다.',
          body: '',
          insight:
            '리듬이 안정될 때 가장 힘이 나는 사람인 듯하다.',
          reflectionQuestion:
            '지금 내 리듬을 다시 회복하려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'B',
        label: '감정이 쌓이다가 갑자기 지치고 무기력해진다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정과 피로가 쌓이다가 한 번에 무너진다.',
          body: '',
          insight:
            '스트레스는 축적형으로 나타나는 경향일지도 모른다.',
          reflectionQuestion:
            '최근 내가 쌓아두고 넘기지 못한 감정은 무엇일까요?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'C',
        label: '무엇을 해야 할지 방향이 흐려진 느낌이 든다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '일이 많아질수록 방향 감각이 흐려진다.',
          body: '',
          insight:
            '목표와 방향이 분명할 때 에너지가 생기는 듯하다.',
          reflectionQuestion:
            '지금 내가 다시 정해야 할 우선순위는 무엇일까요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'D',
        label: '문제를 해결하려 더 일을 붙잡게 된다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '스트레스를 해결하기 위해 더 일에 몰입한다.',
          body: '',
          insight:
            '행동으로 문제를 해결하려는 경향이 강할지도 모른다.',
          reflectionQuestion:
            '나는 지금 문제를 해결하는 걸까, 과하게 버티는 걸까?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
    ],
  },
  {
    id: 'stress_021',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '혼자 여행이나 외출을 했는데 예상치 못한 문제가 생겼을 때',
    prompt: '당신은 어떤 반응을 보이나요?',
    options: [
      {
        id: 'A',
        label: '예상이 깨지며 일상의 리듬이 흐트러진 느낌이 든다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '예상이 깨지면 생활 리듬이 흔들린다.',
          body: '',
          insight:
            '안정된 흐름 속에서 힘을 발휘하는 사람인 듯하다.',
          reflectionQuestion:
            '지금 내 리듬을 다시 찾으려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'B',
        label: '무엇을 해야 할지 순간적으로 방향이 흐려진다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '예상치 못한 상황에서 방향 감각이 흐려진다.',
          body: '',
          insight:
            '방향이 분명할 때 에너지가 생기는 사람인 듯하다.',
          reflectionQuestion:
            '지금 내가 다시 정해야 할 다음 행동은 무엇일까요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'C',
        label: '불안이나 감정이 서서히 쌓이기 시작한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '불안이나 감정이 쌓이다가 크게 나타난다.',
          body: '',
          insight:
            '스트레스는 축적형으로 나타나는 경향일지도 모른다.',
          reflectionQuestion:
            '지금 내 감정은 언제부터 쌓이기 시작했을까요?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'D',
        label: '문제를 해결하려 행동에 더 집중하게 된다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제를 해결하기 위해 행동과 집중을 높인다.',
          body: '',
          insight:
            '행동을 통해 상황을 돌파하려는 사람인 것 같다.',
          reflectionQuestion:
            '나는 지금 해결하려는 걸까, 과하게 몰입하고 있는 걸까?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
    ],
  },
  {
    id: 'stress_022',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '모르는 사람 앞에서 실수를 크게 해서 창피할 때',
    prompt: '당신은 보통 어떤 반응을 보이나요?',
    options: [
      {
        id: 'A',
        label: '당황하면서 무엇을 어떻게 해야 할지 순간적으로 방향을 잃는다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '예상치 못한 상황에서 순간적으로 방향 감각이 흐려진다.',
          body: '',
          insight:
            '상황의 흐름이 분명할 때 안정감을 느끼는 듯하다.',
          reflectionQuestion:
            '지금 내가 다시 잡아야 할 다음 행동은 무엇일까요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'B',
        label: '이후 하루 종일 리듬이 깨진 느낌이 들고 마음이 불편하다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '사건 이후 일상의 리듬이 흔들리며 감정이 오래 남는다.',
          body: '',
          insight:
            '심리 리듬이 환경 영향을 많이 받는 사람인 것 같다.',
          reflectionQuestion:
            '지금 내 리듬을 회복하려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'C',
        label: '겉으로는 괜찮은 척하지만 속에서 감정이 계속 쌓인다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정을 바로 표현하기보다 내부에 축적한다.',
          body: '',
          insight:
            '스트레스는 쌓이다가 크게 나타나는 경향일지도 모른다.',
          reflectionQuestion:
            '지금 내 안에 쌓인 감정은 무엇일까요?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'D',
        label: '같은 실수를 하지 않으려고 더 집중하고 행동을 통제한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '실수를 보완하기 위해 행동과 집중을 더 높인다.',
          body: '',
          insight:
            '문제를 행동으로 해결하려는 성향이 강할지도 모른다.',
          reflectionQuestion:
            '나는 지금 해결하려는 걸까, 과하게 몰입하고 있을까?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
    ],
  },
  {
    id: 'stress_023',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '경제적으로 여유가 없어 원하는 것을 포기해야 할 때',
    prompt: '당신은 어떤 반응을 보이나요?',
    options: [
      {
        id: 'A',
        label: '더 노력하고 해결 방법을 찾으려고 집중한다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '문제 해결을 위해 행동과 집중을 높인다.',
          body: '',
          insight:
            '행동 중심 해결형일 뿐인 듯하다.',
          reflectionQuestion:
            '나는 지금 해결하려는 걸까, 버티는 걸까?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'B',
        label: '무엇을 먼저 해야 할지 방향이 흐려진다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '상황에서 방향 감각이 흐려진다.',
          body: '',
          insight:
            '목표가 분명할 때 힘이 나는 듯하다.',
          reflectionQuestion:
            '지금 다시 정해야 할 우선순위는 무엇일까요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
      {
        id: 'C',
        label: '생활 리듬과 에너지가 흔들리는 느낌이 든다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '상황이 리듬과 에너지 흐름을 흔든다.',
          body: '',
          insight:
            '당신은 생활 리듬에 영향을 많이 받는다.',
          reflectionQuestion:
            '내 리듬을 회복하려면 무엇이 필요할까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'D',
        label: '마음속에 답답함과 감정이 쌓인다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정을 내부에 쌓는다.',
          body: '',
          insight:
            '스트레스가 축적되어 나타나는 듯하다.',
          reflectionQuestion:
            '지금 내 감정은 언제부터 쌓였을까요?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
    ],
  },
  {
    id: 'stress_024',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '친구가 내 비밀을 다른 사람에게 말했을 때',
    prompt: '이 상황에서 당신의 스트레스 반응은 어떤 쪽에 가까운가요?',
    options: [
      {
        id: 'A',
        label: '그 친구와의 관계 거리를 다시 생각하며 방어적으로 변한다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '상처를 보호하기 위해 관계 거리를 두려 한다.',
          body: '',
          insight:
            '신뢰가 깨질 때 자기 보호가 먼저 작동하는 듯하다.',
          reflectionQuestion:
            '이 관계에서 내가 지켜야 할 경계는 무엇인가요?',
          points: ['버티기', '안정성', '기준 유지'],
        },
      },
      {
        id: 'B',
        label: '충격을 받아 기억이 흐려지거나 감정이 멍해진다.',
        patternCode: 'S8',
        interpretation: {
          title: '기력방전형',
          summary:
            '충격 상황에서 감정이나 기억이 일시적으로 멈춘다.',
          body: '',
          insight:
            '강한 스트레스에서 뇌가 과부하를 차단하는 반응일 수 있다.',
          reflectionQuestion:
            '지금 내 몸과 감정은 어떤 상태인가요?',
          points: ['생각 멈춤', '정리 필요', '정보 과부하'],
        },
      },
      {
        id: 'C',
        label: '순간적으로 화가 올라오며 바로 반응하거나 따지게 된다.',
        patternCode: 'S1',
        interpretation: {
          title: '감각과열형',
          summary:
            '즉각적인 감정 반응이 먼저 나온다.',
          body: '',
          insight:
            '정의감과 분노 반응이 빠른 유형인 듯하다.',
          reflectionQuestion:
            '지금 이 반응이 상황을 해결하는 방향일까요?',
          points: ['감각 감지', '분위기 읽기', '미묘한 변화'],
        },
      },
      {
        id: 'D',
        label: '이 일을 반복해서 떠올리며 계속 생각하게 된다.',
        patternCode: 'S4',
        interpretation: {
          title: '처리지연형',
          summary:
            '사건을 계속 떠올리며 뒤늦게 감정이 커진다.',
          body: '',
          insight:
            '감정 처리 시간이 길어지는 유형인 듯하다.',
          reflectionQuestion:
            '이 일을 다시 떠올릴 때 무엇이 가장 마음에 남나요?',
          points: ['상황 분석', '정리', '대응 지연'],
        },
      },
    ],
  },
  {
    id: 'stress_025',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '중요한 시험이나 자격증 결과를 기다리는 동안 불안할 때',
    prompt: '이 상황에서 당신의 스트레스 반응은 어떤 쪽에 가까운가요?',
    options: [
      {
        id: 'A',
        label: '계속 결과를 생각하며 집중이 과하게 몰린다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '결과에 몰입하면서 일상 리듬이 흔들린다.',
          body: '',
          insight:
            '불확실성 상황에서 사고가 집중되는 듯하다.',
          reflectionQuestion:
            '지금 내 일상 리듬은 유지되고 있는가요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
      {
        id: 'B',
        label: '지금 할 수 있는 다른 일을 하며 마음을 안정시키려 한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정을 억누르며 버티다가 나중에 터질 수 있다.',
          body: '',
          insight:
            '감정을 표현하지 않고 쌓아두는 경향이 있을지도 모른다.',
          reflectionQuestion:
            '지금 내 불안을 어디에서 풀고 있나요?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'C',
        label: '계속 다른 가능성을 생각하며 불안한 상상을 하게 된다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '다양한 가능성을 상상하며 사고가 과부하된다.',
          body: '',
          insight:
            '통제할 수 없는 상황에서 사고가 과도해지는 듯하다.',
          reflectionQuestion:
            '지금 내가 통제할 수 있는 것은 무엇인가요?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'D',
        label: '불안하지만 스스로 감정을 조절하며 기다리려고 한다.',
        patternCode: 'S3',
        interpretation: {
          title: '방향이탈형',
          summary:
            '불안하지만 감정을 관리하며 기다리려 한다.',
          body: '',
          insight:
            '감정 균형을 유지하려는 자기조절형인 듯하다.',
          reflectionQuestion:
            '이 시간을 나는 어떻게 활용할 수 있을까요?',
          points: ['방향 사고', '가능성 탐색', '흐름 흔들림'],
        },
      },
    ],
  },
  {
    id: 'stress_026',
    category: 'stress',
    version: 1,
    status: 'active',
    scenario: '무언가 계획이 실패했고 원인도 찾았지만, 해결할 체력이 남아있지 않을 때',
    prompt: '이 상황에서 당신의 스트레스 반응은 어떤 모습에 가까운가요?',
    options: [
      {
        id: 'A',
        label: '에너지가 떨어지면서 아무것도 하지 못하고 멍해지는 느낌이 든다.',
        patternCode: 'S6',
        interpretation: {
          title: '집중과부하형',
          summary:
            '에너지 고갈과 함께 사고 기능이 일시적으로 멈춘다.',
          body: '',
          insight:
            '노력과 피로가 동시에 누적될 때 나타나는 반응이다.',
          reflectionQuestion:
            '지금 나에게 필요한 것은 해결일까, 회복일까?',
          points: ['몰입', '해결 시도', '문제 집중'],
        },
      },
      {
        id: 'B',
        label: '문제를 계속 떠올리며 왜 이런 일이 반복되는지 생각이 멈추지 않는다.',
        patternCode: 'S5',
        interpretation: {
          title: '방어고정형',
          summary:
            '문제를 계속 생각하며 스스로를 방어하려 한다.',
          body: '',
          insight:
            '실패 상황에서 자기 평가가 강하게 작동한다.',
          reflectionQuestion:
            '이 상황을 내가 과하게 책임지고 있지는 않을까요?',
          points: ['버티기', '안정성', '기준 유지'],
        },
      },
      {
        id: 'C',
        label: '일단 잠시 멈추고 쉬면서 상황을 다시 생각하려 한다.',
        patternCode: 'S2',
        interpretation: {
          title: '누적폭발형',
          summary:
            '감정을 잠시 눌러두고 회복 시간을 가지려 한다.',
          body: '',
          insight:
            '휴식이 있어야 다시 움직일 수 있는 유형이다.',
          reflectionQuestion:
            '지금 멈추는 것이 실패일까, 회복일까?',
          points: ['누적 압박', '감정 표현', '누적 폭발'],
        },
      },
      {
        id: 'D',
        label: '생활 리듬이 무너지며 집중이나 일상 흐름이 흔들리기 시작한다.',
        patternCode: 'S7',
        interpretation: {
          title: '리듬이탈형',
          summary:
            '스트레스가 생활 리듬과 집중력을 무너뜨린다.',
          body: '',
          insight:
            '리듬이 무너지면 문제보다 피로가 더 커질 수 있다.',
          reflectionQuestion:
            '지금 내 일상 리듬 중 가장 먼저 회복해야 할 것은 무엇일까요?',
          points: ['흐름 관찰', '리듬 인식', '일상 복구'],
        },
      },
    ],
  },
]
