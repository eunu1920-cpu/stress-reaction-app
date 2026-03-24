import { NextResponse } from 'next/server'
import OpenAI from 'openai'

type RecordInput = {
  date?: string
  situationTags?: string[]
  bodyReactionTags?: string[]
  behaviorTags?: string[]
  content?: string
  sourceKind?: string
}

function formatRecordsForPrompt(records: RecordInput[]): string {
  return records
    .map((r, i) => {
      const date = r.date ? new Date(r.date).toLocaleDateString('ko-KR') : ''
      const situation = (r.situationTags ?? []).filter(Boolean).join(', ') || '-'
      const bodyReaction = (r.bodyReactionTags ?? []).filter(Boolean).join(', ') || '-'
      const behavior = (r.behaviorTags ?? []).filter(Boolean).join(', ') || '-'
      const isManual = r.sourceKind === 'manual_record'
      const content = (r.content ?? '').trim() || (isManual ? '(내용 없음)' : '(태그 기반 응답)')
      const label = isManual ? '[직접 기록]' : '[질문 응답]'
      return `[기록 ${i + 1}] ${label} ${date}
상황 태그: ${situation}
몸 반응 태그: ${bodyReaction}
행동 태그: ${behavior}
기록 내용: ${content}`
    })
    .join('\n\n')
}

const STRESS_TYPES = `1 감각과열형: 자극 과밀 → 감각 과열
2 누적폭발형: 자극 누적 → 감정 점화 → 감정 폭발
3 방향이탈형: 압박 누적 → 탈선 행동
4 처리지연형: 정보 과다 → 정리 지연 → 실행 멈춤
5 방어고정형: 위협 감지 → 경계 강화
6 집중과부하형: 집중 고착 → 탈진
7 리듬이탈형: 속도 압박 → 리듬 붕괴
8 기력방전형: 책임 과중 → 에너지 소모`

const OBSERVATION_QUESTION_DIRECTIONS = `유형별 질문 방향:
- 감각과열형 → 자극 / 감각 과부하 질문
- 누적폭발형 → 감정 축적 질문
- 방향이탈형 → 회피 / 탈선 행동 질문
- 처리지연형 → 생각 과부하 / 정리 질문
- 방어고정형 → 경계 / 안전 질문
- 집중과부하형 → 몰입 / 탈진 질문
- 리듬이탈형 → 속도 / 리듬 질문
- 기력방전형 → 책임 / 에너지 질문

질문 예시 스타일:
"지금 느끼는 압박은 해야 할 일 때문인가 선택 때문인가?"
"나는 지금 몰입인가 과부하인가?"
"내가 붙잡고 있는 것은 책임인가 통제인가?"`

const ACTION_COACH_RULES = `[목표]
사용자가 "생각"이 아니라 "행동"을 하게 만드는 것

[출력 규칙]
- 반드시 1문장만 작성
- 설명 금지
- 감정 위로 금지
- 선택지 제공 금지
- 추상적인 표현 금지 (ex. 생각해보세요, 돌아보세요 금지)
- 반드시 "지금" 또는 "오늘" 포함
- 반드시 "시간 제한" 포함 (예: 3분, 5분, 지금 바로)
- 반드시 "행동 동사" 포함 (쓰기, 선택하기, 말하기 등)
- 10초 안에 이해되는 문장으로 작성

[행동 스타일]
- 작고 구체적일 것
- 실패해도 부담 없는 행동
- 즉시 시작 가능한 행동`

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const records: RecordInput[] = Array.isArray(body.records) ? body.records : []
    const previousAnalysis: string | undefined = typeof body.previousAnalysis === 'string' ? body.previousAnalysis : undefined

    const recordsText = formatRecordsForPrompt(records)

    const hasDirectContent = records.some(
      (r) =>
        r.sourceKind === 'manual_record' && (r.content ?? '').trim().length > 15
    )
    const insufficientRecordNotice = !hasDirectContent
      ? `

⚠️ 이 기록들은 질문에 대한 응답(태그) 위주이며, 사용자가 직접 작성한 기록 내용이 충분하지 않습니다.
다음 규칙을 반드시 적용하세요:
1. [현재 패턴] 바로 아래에 한 줄로 이 문구를 포함하세요: "기록이 충분하지 않아 해석 내용에는 사실과 차이가 있을 수 있습니다."
2. [관찰]과 [통찰]에서는 상황을 단정하지 말고 "~한 경우에는", "~했다면 ~일 수 있습니다" 등 가능성·조건으로 표현하세요. 질문 응답(태그)만으로는 맥락이 제한적이므로 추측을 사실처럼 서술하지 마세요.
3. 질문 문구·시나리오·태그 텍스트를 [관찰]에 그대로 인용·복사·나열하지 마세요. 태그 기반으로 추론한 가능성만 간단히 표현하세요.
4. [관찰]에서 구체적 사건·대상(건강, 야근, 자녀, 상사 등)을 나열하지 마세요. 질문 응답 기록만으로는 그런 사실을 알 수 없습니다. 반복되는 「압박의 축」(시간·관계·몸·책임 등)과 반응 패턴의 공통점만 쓰세요.
5. [패턴 돋보기]로 표시된 줄은 유형 코드 요약이므로, 그대로 반복하지 말고 구조 해석에만 활용하세요.`
      : ''

    const previousContext = previousAnalysis
      ? `

이전 분석 결과 (참고용, 패턴 변화·연속성을 고려하세요):
---
${previousAnalysis}
---
위 이전 분석을 참고하여, 새 기록에서 패턴이 어떻게 유지·변화했는지 반영하세요. 이전과 동일한 내용을 반복하지 말고, 새 기록에 드러난 변화나 지속성을 중심으로 작성하세요.`
      : ''

    const SYSTEM_PROMPT = `당신은 감정 분석 AI가 아니라 "행동 코치"입니다. 모든 답변은 반드시 자연스럽고 이해하기 쉬운 한국어로 작성하세요.

사용자의 자기관찰 기록을 분석하여 스트레스 반응 패턴을 판단하고, 패턴 유형을 기반으로 즉시 실행 가능한 행동 1가지를 제안해야 합니다.

기록 데이터에는 다음 정보가 포함됩니다.
- 상황 태그
- 몸 반응 태그
- 행동 태그
- 사용자가 작성한 기록 내용

[직접 기록]의 내용이 있으면 우선 반영하세요. [질문 응답]·[패턴 돋보기]는 태그·유형·몸·행동 축으로 구조를 추론하고, 긴 상황 문구를 다시 서술하지 마세요.

다음 8가지 스트레스 유형을 기준으로 판단하세요.

${STRESS_TYPES}

다음 형식으로 결과를 작성하세요.

[현재 패턴]
8가지 유형 중 가장 가까운 스트레스 유형을 선택하고, 유형 이름과 구조를 한 줄로 설명하세요.

[관찰]
최근 기록에서 **반복되는 반응 구조**(몸·생각·행동의 공통 축)를 정리하세요. 상황·사건을 나열하는 것이 아닙니다.
[직접 기록]에 사용자가 쓴 문장이 있으면 그 맥락을 우선 반영하세요.
[질문 응답]·[패턴 돋보기]는 태그·유형 요약만 참고하고, 질문지의 상황 설명·해석 본문을 [관찰]에 다시 쓰지 마세요.
구체적인 생활 사건(건강, 가족, 직장 등)은 사용자가 직접 기록에 쓴 경우에만 언급할 수 있습니다.
3~4문장 이내로 작성하세요.

[통찰]
이 패턴이 어떤 구조로 만들어지는지 설명하세요.
가능하면 다음과 같은 문장 구조를 활용하세요.
"~이 약한 것이 아니라 ~일 수 있습니다."
"~이 문제가 아니라 ~의 신호일 수 있습니다."
2~3문장 이내로 작성하세요.

[오늘의 관찰 질문]
위에서 판단한 스트레스 유형에 맞는 관찰 질문을 생성하세요.

${OBSERVATION_QUESTION_DIRECTIONS}

질문은 한 문장으로 작성하세요.

[오늘의 행동]
위에서 판단한 패턴 유형과 [관찰]의 상황 요약을 입력으로, 즉시 실행 가능한 행동 1가지를 제안하세요.

${ACTION_COACH_RULES}

[오늘의 행동] 출력 형식은 반드시 다음과 같이 작성하세요:
[오늘의 행동]
문장 1개

문장은 자연스러운 한국어로 작성하세요.
심리학 이론 설명 대신 기록에서 실제로 나타난 패턴 중심으로 분석하세요.`

    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `기록 데이터 (총 ${records.length}건):\n\n${recordsText}${insufficientRecordNotice}${previousContext}`,
        },
      ],
    })

    const text = completion.choices[0]?.message?.content?.trim() ?? ''
    return NextResponse.json({ analysis: text })
  } catch (err) {
    console.error('Analysis API error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Analysis failed' },
      { status: 500 }
    )
  }
}
