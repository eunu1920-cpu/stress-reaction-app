/**
 * 홈 상단 티커용 큐레이션 (실제 반응 문장 정리)
 * 유형 코드·라벨은 메타만 보관; 티커에는 quote(문장)만 씀.
 *
 * 라벨 기준: app/analysis/page.tsx SUBJECT_LABELS 대신
 * 스트레스 8유형 한글명(api/analysis STRESS_TYPES), INNER_LABELS, RELATION_LABELS
 */

export type HomeActivityLine = {
  text: string
  age: string
}

/** 큐레이션 원본 (코드는 유지, 라벨만 서비스 공식명으로 통일) */
export const HOME_ACTIVITY_CURATED_META: {
  quote: string
  code: string
  label: string
}[] = [
  { quote: '참다가 결국 터졌어요', code: 'S2', label: '누적폭발형' },
  { quote: '그냥 아무 말도 안 하고 넘겼어요', code: 'S5', label: '방어고정형' },
  { quote: '계속 생각만 하다가 아무것도 못 했어요', code: 'S4', label: '처리지연형' },
  { quote: '혼자 있는 게 제일 편해요 요즘은', code: 'S8', label: '기력방전형' },
  { quote: '그 상황에서 왜 그랬는지 계속 되짚게 돼요', code: 'T2', label: '의미 탐색형' },
  { quote: '그냥 바로 말해버렸어요. 참기 힘들어서', code: 'R1', label: '신호 감지형' },
  {
    quote: '괜히 내가 이상한 건가 싶어서 계속 고민했어요',
    code: 'T5',
    label: '반복 고민형',
  },
  { quote: '그때는 아무 생각 없이 행동했어요', code: 'S3', label: '방향이탈형' },
  { quote: '말하면 싸울 것 같아서 그냥 참고 넘겼어요', code: 'R4', label: '사고 정리형' },
  {
    quote: '혼자서 계속 시뮬레이션 돌려봤어요 머릿속에서',
    code: 'T4',
    label: '구조 정리형',
  },
  { quote: '그냥 피했어요. 상황 자체를', code: 'S7', label: '리듬이탈형' },
  { quote: '감정이 확 올라와서 바로 반응했어요', code: 'S1', label: '감각과열형' },
  {
    quote: '나중에 생각해보니 내가 너무 과했던 것 같아요',
    code: 'T8',
    label: '균형 관점형',
  },
  { quote: '상대 입장도 이해하려고 계속 생각했어요', code: 'R2', label: '직진 표현형' },
  { quote: '그냥 내가 맞다고 생각해서 밀고 갔어요', code: 'R6', label: '과몰입형' },
  { quote: '아무것도 하기 싫고 그냥 멍했어요', code: 'S8', label: '기력방전형' },
  { quote: '혼자 정리 좀 하고 싶어서 연락 안 했어요', code: 'R7', label: '관망 관찰형' },
  {
    quote: '왜 이런 상황이 반복되는지 계속 생각하게 돼요',
    code: 'T2',
    label: '의미 탐색형',
  },
  { quote: '그냥 일단 행동부터 했어요 생각보다 먼저', code: 'S3', label: '방향이탈형' },
  {
    quote: '계속 마음에 걸려서 하루 종일 신경 쓰였어요',
    code: 'T5',
    label: '반복 고민형',
  },
  {
    quote: '진짜 저 상황까지 가는 거면 이미 끝난 거 아닌가',
    code: 'T8',
    label: '균형 관점형',
  },
  { quote: '저걸 참고 사는 게 더 이상한 것 같음', code: 'T2', label: '의미 탐색형' },
  { quote: '말로만 듣던 상황이 현실에 있다는 게 충격임', code: 'S1', label: '감각과열형' },
  { quote: '옆에서 보는 사람도 숨 막힐 듯', code: 'S6', label: '집중과부하형' },
  { quote: '저걸 겪고도 버틴 게 더 대단함', code: 'T8', label: '균형 관점형' },
  { quote: '이혼 응원하게 되는 건 처음이다', code: 'R3', label: '즉각 반응형' },
  { quote: '그 상황이면 도망치는 게 맞다 진짜', code: 'R1', label: '신호 감지형' },
  { quote: '사람이 저렇게까지 되면 말이 안 통함', code: 'T6', label: '거리 두기형' },
  {
    quote: '괜히 설득하려다가 더 상처받는 경우 많음',
    code: 'T5',
    label: '반복 고민형',
  },
  { quote: '결국엔 내가 살아야 한다는 생각 들더라', code: 'T2', label: '의미 탐색형' },
  { quote: '버티는 게 아니라 소모되는 느낌일 듯', code: 'S8', label: '기력방전형' },
  { quote: '저런 관계 계속 있으면 사람이 망가짐', code: 'S2', label: '누적폭발형' },
  { quote: '처음엔 이해하려고 했는데 나중엔 포기함', code: 'T6', label: '거리 두기형' },
  {
    quote: '사람 바뀌길 기대하는 게 제일 위험함',
    code: 'T8',
    label: '균형 관점형',
  },
  { quote: '결정 늦었어도 잘한 선택 같음', code: 'T8', label: '균형 관점형' },
  { quote: '남들이 뭐라 해도 본인이 겪은 게 진짜임', code: 'R3', label: '즉각 반응형' },
  {
    quote: '그 상황 벗어난 것만으로도 이미 성공임',
    code: 'T2',
    label: '의미 탐색형',
  },
  {
    quote: '이제라도 편하게 살았으면 좋겠다 진짜',
    code: 'S7',
    label: '리듬이탈형',
  },
  { quote: '얼굴 편해졌다는 말 들으면 다 끝난 거지', code: 'T2', label: '의미 탐색형' },
  {
    quote: '진짜 사람은 환경 바뀌면 표정부터 달라짐',
    code: 'T8',
    label: '균형 관점형',
  },
]

const AGES = [
  '방금',
  '2분 전',
  '3분 전',
  '5분 전',
  '10분 전',
  '15분 전',
  '30분 전',
  '1시간 전',
] as const

export const HOME_ACTIVITY_CURATED: HomeActivityLine[] =
  HOME_ACTIVITY_CURATED_META.map((row, i) => ({
    text: row.quote,
    age: AGES[i % AGES.length],
  }))
