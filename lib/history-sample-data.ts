import type { ObservationRecord } from '@/lib/history-storage'

/** 샘플용 히스토리 기록 (실제 데이터 아님) — UI 미리보기용 */
export const SAMPLE_HISTORY_RECORDS: ObservationRecord[] = [
  // ─── 2026년 4월 ───
  {
    id: 'sample-apr-01',
    date: '2026-04-06T23:50:00.000Z',
    category: 'stress',
    resultType: 'S4',
    pattern: 'S4',
    sourceKind: 'sample',
    answers: { q1: '월말이 다가올 때', q2: '', q3: '' },
    summary:
      '해야 할 일을 정리하려 하지만 시작이 늦어진다. - 처리지연형',
    memo: '댓글: 한해를 마무리 하는 글을 써보고, 다음해에 꼭 하고 싶은 한가지를 써본다.',
  },
  {
    id: 'sample-apr-02',
    date: '2026-04-06T23:40:00.000Z',
    category: 'stress',
    resultType: 'S3',
    pattern: 'S3',
    sourceKind: 'sample',
    answers: { q1: '자녀(친구)의 성적이나 진로 문제를 들었을 때', q2: '', q3: '' },
    summary:
      '여러 생각과 가능성을 동시에 떠올린다. - 방향이탈형',
    memo:
      '댓글: 공감: 기능성 탐색, 방향 사고 댓글: 친구의 성향에 맞는 도움이 되는 말과 정보를 찾아줄 것 같다.',
  },
  {
    id: 'sample-apr-03',
    date: '2026-04-06T23:30:00.000Z',
    category: 'stress',
    resultType: 'S1',
    pattern: 'S1',
    sourceKind: 'sample',
    answers: { q1: '경제적 부담으로 가족과 갈등이 생길 때', q2: '', q3: '' },
    summary:
      '작은 반응과 분위기에 민감해진다. - 감각과열형',
    memo:
      '댓글: 공감: 감각 감지, 분위기 읽기, 미묘한 변화 댓글: 조금은 위축되고, 분위기를 파악해서 갈등이 폭발하지 않게 하려고 한것 같다.',
  },
  {
    id: 'sample-apr-04',
    date: '2026-04-06T23:20:00.000Z',
    category: 'stress',
    resultType: 'S5',
    pattern: 'S5',
    sourceKind: 'sample',
    answers: { q1: '부모님이 당신의 삶에 지나치게 간섭할 때', q2: '', q3: '' },
    summary:
      '마음을 닫고 상황을 버티려 한다. - 방어고정형',
    memo:
      '댓글: 공감: 버티기, 안정성, 기준 유지 댓글: 내 인생인데 지나친 간섭은 참기 힘들지만, 최대한 갈등을 피해 버티면서 내가 하고자 하는 방향으로 뭔가를 한것 같다.',
  },
  {
    id: 'sample-apr-05',
    date: '2026-04-06T23:10:00.000Z',
    category: 'stress',
    resultType: 'S3',
    pattern: 'S3',
    sourceKind: 'sample',
    answers: { q1: '승진 경쟁에서 뒤처졌다고 느낄 때', q2: '', q3: '' },
    summary:
      '앞으로 어떻게 해야 할지 여러 방향을 생각한다. - 방향이탈형',
    memo:
      '댓글: 공감: 방향 사고, 기능성 탐색 댓글: 뭔가 이유가 있겠거니 생각하고 승진한 사람은 무엇을 잘하는지 파악하면서 내가 할 수 있는 것을 찾을 것이다.',
  },
  {
    id: 'sample-apr-06',
    date: '2026-04-06T23:00:00.000Z',
    category: 'relation',
    resultType: 'R2',
    pattern: 'R2',
    sourceKind: 'sample',
    answers: { q1: '중요한 약속에 늦어서 상대가 화를 낼 때', q2: '', q3: '' },
    summary:
      '내 입장을 직접 설명하며 상황을 풀려고 한다. - 직진 표현형',
    memo: '댓글: 공감: 대화 해결, 직접 설명, 입장 표현',
  },
  {
    id: 'sample-apr-07',
    date: '2026-04-06T22:50:00.000Z',
    category: 'relation',
    resultType: 'R4',
    pattern: 'R4',
    sourceKind: 'sample',
    answers: { q1: '친구가 약속을 반복적으로 어길 때', q2: '', q3: '' },
    summary:
      '왜 이런 상황이 생기는지 머릿속에서 정리하려 한다. - 사고 정리형',
    memo: '댓글: 공감: 논리 정리, 사실과 해석',
  },
  {
    id: 'sample-apr-08',
    date: '2026-04-06T22:40:00.000Z',
    category: 'relation',
    resultType: 'R3',
    pattern: 'R3',
    sourceKind: 'sample',
    answers: { q1: 'SNS에서 다른 사람과 자신을 비교할 때', q2: '', q3: '' },
    summary:
      '감정이 올라오며 마음이 흔들린다. - 즉각 반응형',
    memo: '댓글: 공감: 감정 상승, 즉각 반응',
  },
  {
    id: 'sample-apr-09',
    date: '2026-04-06T12:00:00.000Z',
    category: 'relation',
    resultType: 'R1',
    pattern: 'R1',
    sourceKind: 'sample',
    answers: { q1: '가족이 내 편이 아닌 것처럼 느껴질 때', q2: '', q3: '' },
    summary:
      '가족의 말이나 태도 속 작은 신호들을 계속 감지하며 의미를 찾는다. - 신호 감지형',
    memo: '',
  },
  {
    id: 'sample-apr-10',
    date: '2026-04-06T11:00:00.000Z',
    category: 'stress',
    resultType: 'S3',
    pattern: 'S3',
    sourceKind: 'sample',
    answers: {
      q1: '중요한 시험이나 자격증 결과를 기다리는 동안 불안할 때',
      q2: '',
      q3: '',
    },
    summary:
      '불안하지만 스스로 감정을 조절하며 기다리려고 한다. - 방향이탈형',
    memo:
      '댓글: 공감: 가능성 탐색, 흐름 흔들림, 방향 사고 댓글: 좀 긴장되서 전체를 잘 못본다. 실수도 생긴다.',
  },
  {
    id: 'sample-apr-11',
    date: '2026-04-06T10:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify(['관계 고민']),
      q2: JSON.stringify(['심장빠름', '핸드폰 회피']),
      q3: JSON.stringify([]),
    },
    summary: '관계 고민 · 심장빠름, 핸드폰 회피',
    memo:
      '가만히 있으니까 바보같다. 한말이 생각안난다. 집에오면 화가난다.',
  },
  {
    id: 'sample-apr-12',
    date: '2026-04-06T09:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify(['시간압박', '일 많음', '실수 걱정']),
      q2: JSON.stringify(['긴장', '어깨긴장', '숨답답', '과집중', '생각 반복']),
      q3: JSON.stringify([]),
    },
    summary:
      '시간압박, 일 많음, 실수 걱정 · 긴장, 어깨긴장, 숨답답, 과집중, 생각 반복',
    memo: '한 일이 많아서 순서를 못 잡고 허둥지둥한다',
  },
  {
    id: 'sample-apr-13',
    date: '2026-04-05T15:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify(['시간압박']),
      q2: JSON.stringify(['짜증', '피함']),
      q3: JSON.stringify([]),
    },
    summary: '시간압박 · 짜증, 피함',
    memo:
      '많이 힘들다. 시작은 있는데 끝이 없는 느낌이 치지게 된다.',
  },
  {
    id: 'sample-apr-14',
    date: '2026-04-05T14:00:00.000Z',
    category: 'stress',
    resultType: 'S5',
    pattern: 'S5',
    sourceKind: 'sample',
    answers: { q1: '스트레스 상황', q2: '', q3: '' },
    summary:
      '기존에 유지되던 기준이나 방식이 급격히 달라질 때 내부 긴장 반응이 상승하는 구조.',
    memo:
      '기존에 유지되던 기준이나 방식이 급격히 달라질 때 내부 긴장 반응이 상승하는 구조.',
  },
  {
    id: 'sample-apr-15',
    date: '2026-04-02T12:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify(['새로운 시도', '작은 성취']),
      q2: JSON.stringify([
        '잠 잘 잠',
        '마음이 놓임',
        '몸이 긍정적으로 반응',
        '계획 실천',
        '새로 배움',
        '칭찬·격려',
      ]),
      q3: JSON.stringify([]),
    },
    summary:
      '새로운 시도, 작은 성취 · 잠 잘 잠, 마음이 놓임, 몸이 긍정적으로 반응, 계획 실천, 새로 배움, 칭찬·격려',
    memo:
      '프로젝트 마감전에 브로셔를 해서 속이 시원하다. 동기분께 도움을 받은게 컸다. 어쨌든 뭔가 한시름 놓인다.',
  },
  {
    id: 'sample-apr-16',
    date: '2026-04-02T11:00:00.000Z',
    category: 'stress',
    resultType: 'S3',
    pattern: 'S3',
    sourceKind: 'sample',
    answers: { q1: '스트레스 상황', q2: '', q3: '' },
    summary: '수료식전이라 그런지 부담과 스트레스가 크다',
    memo: '수료식전이라 그런지 부담과 스트레스가 크다',
  },

  // ─── 2026년 3월 ───
  {
    id: 'sample-mar-01',
    date: '2026-03-31T23:00:00.000Z',
    category: 'inner',
    resultType: 'T1',
    pattern: 'T1',
    sourceKind: 'sample',
    answers: {
      q1: '다른 사람들이 나를 인정하지 않는 것 같을 때',
      q2: '',
      q3: '',
    },
    summary:
      '사실과 해석을 구분하며 상황을 차분히 살펴보려 한다. - 생각 확장형',
    memo: '댓글: 공감: 사실 확인, 기능성 탐색',
  },
  {
    id: 'sample-mar-02',
    date: '2026-03-31T22:00:00.000Z',
    category: 'relation',
    resultType: 'R7',
    pattern: 'R7',
    sourceKind: 'sample',
    answers: {
      q1: '내가 한 행동이 주변에 긍정적인 영향을 줄 때',
      q2: '',
      q3: '',
    },
    summary:
      '전체 맥락을 읽으며 상황을 관찰한다. - 관망 관찰형',
    memo: '댓글: 공감: 상황 읽기, 전체 맥락',
  },
  {
    id: 'sample-mar-03',
    date: '2026-03-31T12:00:00.000Z',
    category: 'relation',
    resultType: 'R4',
    pattern: 'R4',
    sourceKind: 'sample',
    answers: {
      q1: '팀 프로젝트에서 내 몫을 성실히 해냈을 때',
      q2: '',
      q3: '',
    },
    summary:
      '역할과 책임을 나누고 정리하며 협업을 이어간다. - 사고 정리형',
    memo: '',
  },
  {
    id: 'sample-mar-04',
    date: '2026-03-26T15:00:00.000Z',
    category: 'relation',
    resultType: 'R5',
    pattern: 'R5',
    sourceKind: 'sample',
    answers: {
      q1: '친구가 도움을 당연하게 여길 때',
      q2: '',
      q3: '',
    },
    summary:
      '거리를 조절하며 관계의 균형을 찾으려 한다. - 거리 조절형',
    memo:
      '댓글: 도움을 주는 것도 좋지만, 나를 소진시키지 않는 선에서 관계를 정리해보려 한다.',
  },
  {
    id: 'sample-mar-05',
    date: '2026-03-23T16:00:00.000Z',
    category: 'relation',
    resultType: 'R7',
    pattern: 'R7',
    sourceKind: 'sample',
    answers: {
      q1: '파트너와 가치관 차이가 드러날 때',
      q2: '',
      q3: '',
    },
    summary:
      '상황을 지켜보며 반응의 타이밍을 고른다. - 관망 관찰형',
    memo: '',
  },
  {
    id: 'sample-mar-06',
    date: '2026-03-23T14:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify([
        '시간압박',
        '일 많음',
        '예상치 못한 일',
        '멀티태스킹',
      ]),
      q2: JSON.stringify(['피로', '긴장', '에너지저하']),
      q3: JSON.stringify(['정리 시도', '생각 반복']),
    },
    summary:
      '시간압박, 일 많음, 예상치 못한 일, 멀티태스킹 · 피로, 긴장, 에너지저하 · 정리 시도, 생각 반복',
    memo: '주말인데도 피로가 풀리지 않는다.',
  },
  {
    id: 'sample-mar-07',
    date: '2026-03-21T12:00:00.000Z',
    category: 'inner',
    resultType: 'T2',
    pattern: 'T2',
    sourceKind: 'sample',
    answers: {
      q1: '“3일 결심”이 반복될 때',
      q2: '',
      q3: '',
    },
    summary:
      '왜 금방 포기하게 되는지 의미를 찾으려 한다. - 의미 탐색형',
    memo: '',
  },
  {
    id: 'sample-mar-08',
    date: '2026-03-20T12:00:00.000Z',
    category: 'stress',
    resultType: 'S3',
    pattern: 'S3',
    sourceKind: 'sample',
    answers: { q1: '승진 경쟁에서 뒤처졌다고 느낄 때', q2: '', q3: '' },
    summary:
      '앞으로 어떻게 해야 할지 여러 방향을 생각한다. - 방향이탈형',
    memo: '',
  },
  {
    id: 'sample-mar-09',
    date: '2026-03-17T15:00:00.000Z',
    category: 'stress',
    resultType: 'S6',
    pattern: 'S6',
    sourceKind: 'sample',
    answers: { q1: '스트레스 상황', q2: '', q3: '' },
    summary:
      '실수·오류·휴결이 발생했을 때 스트레스가 급격히 상승하는 유형.',
    memo:
      '실수·오류·휴결이 발생했을 때 스트레스가 급격히 상승하는 유형.',
  },
  {
    id: 'sample-mar-10',
    date: '2026-03-17T14:00:00.000Z',
    category: 'stress',
    resultType: 'S7',
    pattern: 'S7',
    sourceKind: 'sample',
    answers: {
      q1: '상사가 갑자기 일을 더 맡겼을 때 화가 납니다.',
      q2: '',
      q3: '',
    },
    summary:
      '평소 리듬이 깨지면서 집중 흐름이 흔들린다. - 리듬이탈형',
    memo: '',
  },
  {
    id: 'sample-mar-11',
    date: '2026-03-15T12:00:00.000Z',
    category: 'stress',
    resultType: 'S3',
    pattern: 'S3',
    sourceKind: 'sample',
    answers: {
      q1: '출근길에 지하철이나 버스가 늦을 때',
      q2: '',
      q3: '',
    },
    summary:
      '오늘 일정 다 꼬이겠네... 방향이 흐트러진 느낌이 든다. - 방향이탈형',
    memo: '',
  },
  {
    id: 'sample-mar-12',
    date: '2026-03-14T12:00:00.000Z',
    category: 'inner',
    resultType: 'T2',
    pattern: 'T2',
    sourceKind: 'sample',
    answers: {
      q1: '혼자 있을 때, 오늘 있었던 장면이 계속 떠오르며 머릿속에서 반복됨',
      q2: '',
      q3: '',
    },
    summary:
      '생각을 멈추고 싶지만 같은 장면이 계속 반복된다. - 반복 루프형',
    memo:
      '생각을 멈추고 싶어도 장면이나 감정이 반복 재생되는 경향이 있습니다. 피로가 쌓일수록 루프는 더 강해질 수 있습니다.',
  },
  {
    id: 'sample-mar-13',
    date: '2026-03-13T15:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify([
        '실수 걱정',
        '새로운 환경',
        '집중 방해',
        '갈등',
      ]),
      q2: JSON.stringify([
        '에너지저하',
        '숨답답',
        '속불편',
        '멍함',
        '말 줄임',
        '정리 시도',
        '생각 반복',
        '핸드폰 회피',
      ]),
      q3: JSON.stringify([]),
    },
    summary:
      '실수 걱정, 새로운 환경, 집중 방해, 갈등 · 에너지저하, 숨답답, 속불편, 멍함, 말 줄임, 정리 시도, 생각 반복, 핸드폰 회피',
    memo:
      '일이 많다 보니 이제는 무기력하고, 멍해지는거 같다. 어디서부터 다시 정돈해서 시작해야 할지 답답하기만 하다. 너무 멀리 크게 보지 말고, 천천히 쉬운거부터...',
  },
  {
    id: 'sample-mar-14',
    date: '2026-03-13T14:00:00.000Z',
    category: 'relation',
    resultType: 'R1',
    pattern: 'R1',
    sourceKind: 'sample',
    answers: {
      q1: '직장에서 동료가 내 아이디어를 회의에서 자기 것처럼 말했습니다.',
      q2: '',
      q3: '',
    },
    summary:
      '그 자리에서 바로 말한다. "그건 내가 먼저 이야기했던 아이디어인데요." - 직진 표현형',
    memo:
      '상황에서 느낀 감정을 바로 표현하는 경향이 있습니다. 자기 경계를 분명히 하는 장점이 있지만, 순간 감정이 앞서면 상대는 공격으로 받아들일 수도 있습니다.',
  },
  {
    id: 'sample-mar-15',
    date: '2026-03-12T16:00:00.000Z',
    category: 'inner',
    resultType: 'QR',
    pattern: 'manual_record',
    sourceKind: 'sample',
    answers: {
      q1: JSON.stringify(['사람 많음']),
      q2: JSON.stringify(['짜증', '휴식 찾음']),
      q3: JSON.stringify([]),
    },
    summary: '사람 많음 · 짜증, 휴식 찾음',
    memo: '사람 많음 · 짜증 · 휴식 찾음',
  },
  {
    id: 'sample-mar-16',
    date: '2026-03-12T15:00:00.000Z',
    category: 'stress',
    resultType: 'S2',
    pattern: 'S2',
    sourceKind: 'sample',
    answers: { q1: '스트레스 상황', q2: '', q3: '' },
    summary:
      '예상했던 흐름이 갑자기 깨질 때 스트레스가 급격히 상승하는 유형.',
    memo:
      '예상했던 흐름이 갑자기 깨질 때 스트레스가 급격히 상승하는 유형.',
  },
  {
    id: 'sample-mar-17',
    date: '2026-03-12T14:00:00.000Z',
    category: 'stress',
    resultType: 'S2',
    pattern: 'S2',
    sourceKind: 'sample',
    answers: { q1: '스트레스 상황', q2: '', q3: '' },
    summary: '-',
    memo: '',
  },
  {
    id: 'sample-mar-18',
    date: '2026-03-10T12:00:00.000Z',
    category: 'stress',
    resultType: 'S2',
    pattern: 'S2',
    sourceKind: 'sample',
    answers: { q1: '스트레스 상황', q2: '', q3: '' },
    summary:
      '스트레스를 받으면서 일하는데 일이 진척이 안된다.',
    memo:
      '스트레스를 받으면서 일을하는데 일이 진척이 안된다.',
  },
  {
    id: 'sample-mar-19',
    date: '2026-03-01T12:00:00.000Z',
    category: 'stress',
    resultType: 'S2',
    pattern: 'S2',
    sourceKind: 'sample',
    answers: {
      q1: '시작도 끝도 없이 업무가 쌓이고, 처리해야 할 일이 계속 늘어납니다.',
      q2: '',
      q3: '',
    },
    summary:
      '이게 왜 이렇게까지 쌓였지? 흐름이 어디서 꼬인 거지? · 누적폭발형',
    memo:
      '업무가 쌓이는 과정에서는 참고 넘기거나 당장 드러내지 않지만, 어느 시점이 지나면 압박을 한꺼번에 크게 체감하는 편입니다. 평소에는 문제를 크게 드러내지...',
  },
]
