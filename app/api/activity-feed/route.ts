import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

type Row = {
  created_at: string
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
 * 사생활 보호: 본문·메모 없이 태그만 조합 (미리 정의된 짧은 라벨들).
 * 태그가 너무 적으면 해당 행은 스킵.
 */
function lineFromTagsOnly(row: Row): string | null {
  const s = [...(row.situation_tags ?? [])].slice(0, 2)
  const b = [...(row.body_reaction_tags ?? [])].slice(0, 2)
  const h = [...(row.behavior_tags ?? [])].slice(0, 2)
  const parts = [...s, ...b, ...h].filter(
    (t) => typeof t === 'string' && t.trim().length > 0,
  )
  if (parts.length < 2) return null
  const line = parts.slice(0, 5).join(' · ')
  if (line.length > 96) return `${line.slice(0, 93)}…`
  return line
}

export async function GET() {
  if (!serviceRoleKey || !url) {
    return NextResponse.json({ items: [] }, { headers: { 'Cache-Control': 'no-store' } })
  }

  try {
    const admin = createClient(url, serviceRoleKey)
    const { data, error } = await admin
      .from('records')
      .select('created_at, situation_tags, body_reaction_tags, behavior_tags')
      .order('created_at', { ascending: false })
      .limit(40)

    if (error || !data?.length) {
      return NextResponse.json({ items: [] }, { headers: { 'Cache-Control': 'no-store' } })
    }

    const items: { text: string; age: string; source: 'service' }[] = []
    for (const raw of data) {
      const row = raw as Row
      const text = lineFromTagsOnly(row)
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
