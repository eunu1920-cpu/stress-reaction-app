import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

type Row = {
  created_at: string
  source_kind?: string | null
  pattern?: string | null
  content?: string | null
  situation_tags?: string[] | null
  body_reaction_tags?: string[] | null
  behavior_tags?: string[] | null
}

function ageLabel(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '방금'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  const d = Math.floor(h / 24)
  return `${d}일 전`
}

/**
 * 직접 기록(manual)만: 사용자가 고른 태그 조합.
 * 태그가 2개 미만이면 짧은 본문(한 줄 기록)만 사용.
 */
function lineFromManualRecord(row: Row): string | null {
  const s = [...(row.situation_tags ?? [])].slice(0, 2)
  const b = [...(row.body_reaction_tags ?? [])].slice(0, 2)
  const h = [...(row.behavior_tags ?? [])].slice(0, 2)
  const parts = [...s, ...b, ...h].filter(
    (t) => typeof t === 'string' && t.trim().length > 0,
  )
  if (parts.length >= 2) {
    const line = parts.slice(0, 5).join(' · ')
    if (line.length > 96) return `${line.slice(0, 93)}…`
    return line
  }
  const raw = (row.content ?? '').trim()
  if (raw.length < 4) return null
  if (raw.length > 96) return `${raw.slice(0, 93)}…`
  return raw
}

export async function GET() {
  if (!serviceRoleKey || !url) {
    return NextResponse.json({ items: [] }, { headers: { 'Cache-Control': 'no-store' } })
  }

  try {
    const admin = createClient(url, serviceRoleKey)
    /** 패턴돋보기·스트레스 테스트 등은 제외 — 직접 기록(태그·한 줄)만 */
    const { data, error } = await admin
      .from('records')
      .select(
        'created_at, source_kind, pattern, content, situation_tags, body_reaction_tags, behavior_tags',
      )
      .or('source_kind.eq.manual_record,pattern.eq.manual_record')
      .order('created_at', { ascending: false })
      .limit(80)

    if (error || !data?.length) {
      return NextResponse.json({ items: [] }, { headers: { 'Cache-Control': 'no-store' } })
    }

    const items: { text: string; age: string; source: 'service' }[] = []
    for (const raw of data) {
      const row = raw as Row
      const sk = row.source_kind ?? ''
      const pat = row.pattern ?? ''
      if (sk === 'pattern_lens' || pat === 'pattern_lens') continue
      if (sk !== 'manual_record' && pat !== 'manual_record') continue
      const text = lineFromManualRecord(row)
      if (!text) continue
      items.push({
        text,
        age: ageLabel(row.created_at),
        source: 'service',
      })
      if (items.length >= 10) break
    }

    return NextResponse.json(
      { items },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    )
  } catch {
    return NextResponse.json({ items: [] }, { headers: { 'Cache-Control': 'no-store' } })
  }
}
