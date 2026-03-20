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
]
