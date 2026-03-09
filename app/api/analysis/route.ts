import { NextResponse } from 'next/server'
import OpenAI from 'openai'

type RecordInput = {
  date?: string
  situationTags?: string[]
  bodyReactionTags?: string[]
  behaviorTags?: string[]
  content?: string
}

function formatRecordsForPrompt(records: RecordInput[]): string {
  return records
    .map((r, i) => {
      const date = r.date ? new Date(r.date).toLocaleDateString('ko-KR') : ''
      const situation = (r.situationTags ?? []).filter(Boolean).join(', ') || '-'
      const bodyReaction = (r.bodyReactionTags ?? []).filter(Boolean).join(', ') || '-'
      const behavior = (r.behaviorTags ?? []).filter(Boolean).join(', ') || '-'
      const content = (r.content ?? '').trim() || '(내용 없음)'
      return `[기록 ${i + 1}] ${date}
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

    const previousContext = previousAnalysis
      ? `

이전 분석 결과 (참고용, 패턴 변화·연속성을 고려하세요):
---
${previousAnalysis}
---
위 이전 분석을 참고하여, 새 기록에서 패턴이 어떻게 유지·변화했는지 반영하세요. 이전과 동일한 내용을 반복하지 말고, 새 기록에 드러난 변화나 지속성을 중심으로 작성하세요.`
      : ''

    const SYSTEM_PROMPT = `당신은 사용자의 자기관찰 기록을 분석하는 분석가입니다. 모든 답변은 반드시 자연스럽고 이해하기 쉬운 한국어로 작성하세요.

사용자의 자기관찰 기록을 분석하여 스트레스 반응 패턴을 판단하세요.

기록 데이터에는 다음 정보가 포함됩니다.
- 상황 태그
- 몸 반응 태그
- 행동 태그
- 사용자가 작성한 기록 내용

태그만 요약하지 말고 기록 내용과 태그를 함께 참고하여 사용자의 스트레스 반응 구조를 분석하세요.

다음 8가지 스트레스 유형을 기준으로 판단하세요.

${STRESS_TYPES}

다음 형식으로 결과를 작성하세요.

[현재 패턴]
8가지 유형 중 가장 가까운 스트레스 유형을 선택하고, 유형 이름과 구조를 한 줄로 설명하세요.

[관찰]
최근 기록에서 반복되는 상황, 몸 반응, 행동 패턴을 정리하세요.
태그뿐 아니라 사용자가 작성한 기록 내용의 맥락도 함께 반영하세요.
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

문장은 자연스러운 한국어로 작성하세요.
심리학 이론 설명 대신 기록에서 실제로 나타난 패턴 중심으로 분석하세요.`

    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `기록 데이터 (총 ${records.length}건):\n\n${recordsText}${previousContext}`,
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
