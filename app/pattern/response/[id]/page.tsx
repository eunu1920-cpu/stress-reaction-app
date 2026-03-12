'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { RequireAuth } from '@/components/require-auth'

type Snapshot = {
  scenario?: string
  prompt?: string
  selectedLabel?: string
  interpretationTitle?: string
  interpretationSummary?: string
  interpretationBody?: string
  interpretationPoints?: string[]
}

type PatternResponseRecord = {
  created_at: string
  category: string
  pattern_code: string | null
  source_snapshot: Snapshot | null
}

function formatDate(dateString: string) {
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return dateString
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

const CATEGORY_LABELS: Record<string, string> = {
  stress: '상황스트레스',
  relation: '관계 상황',
  self: '개인 상황',
}

export default function PatternResponseDetailPage() {
  const params = useParams()
  const id = params?.id as string | undefined
  const [record, setRecord] = useState<PatternResponseRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    let cancelled = false
    const load = async () => {
      const { data, error } = await supabase
        .from('records')
        .select('created_at, category, pattern_code, source_snapshot')
        .eq('id', id)
        .eq('source_kind', 'pattern_lens')
        .maybeSingle()

      if (!cancelled) {
        if (!error && data) setRecord(data as PatternResponseRecord)
        setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <RequireAuth>
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/history"
            className="text-sm text-[#555555] transition-colors hover:text-[#333333]"
          >
            ← 히스토리로
          </Link>

          {loading ? (
            <div className="mt-6 rounded-2xl border border-[#E8E2FF] bg-white p-8 text-center shadow-sm">
              <p className="text-[#555555]">불러오는 중...</p>
            </div>
          ) : !record ? (
            <div className="mt-6 rounded-2xl border border-[#E8E2FF] bg-white p-8 text-center shadow-sm">
              <p className="text-[#555555]">기록을 찾을 수 없습니다.</p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#E8E2FF] bg-white p-6 shadow-sm">
              <h1 className="mb-6 text-xl font-bold text-[#111111]">패턴 돋보기 기록</h1>

              <section className="mb-6">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                  날짜
                </h2>
                <p className="text-sm text-[#333333]">{formatDate(record.created_at)}</p>
              </section>

              <section className="mb-6">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                  카테고리
                </h2>
                <p className="text-sm text-[#333333]">
                  {CATEGORY_LABELS[record.category] ?? record.category}
                </p>
              </section>

              {record.source_snapshot?.scenario && (
                <section className="mb-6">
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                    상황
                  </h2>
                  <p className="text-sm leading-relaxed text-[#333333]">
                    {record.source_snapshot.scenario}
                  </p>
                </section>
              )}

              {record.source_snapshot?.prompt && (
                <section className="mb-6">
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                    질문
                  </h2>
                  <p className="text-sm leading-relaxed text-[#333333]">
                    {record.source_snapshot.prompt}
                  </p>
                </section>
              )}

              {record.source_snapshot?.selectedLabel && (
                <section className="mb-6">
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                    선택
                  </h2>
                  <p className="text-sm leading-relaxed text-[#333333]">
                    {record.source_snapshot.selectedLabel}
                  </p>
                </section>
              )}

              <section className="mb-6 rounded-2xl bg-[#F8F5FF] p-5">
                <p className="text-sm font-semibold text-[#8E7CFF]">
                  {record.pattern_code ?? '-'}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-[#333333]">
                  {record.source_snapshot?.interpretationTitle ?? '패턴 해석'}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                  {record.source_snapshot?.interpretationSummary ?? ''}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#333333]">
                  {record.source_snapshot?.interpretationBody ?? ''}
                </p>
              </section>

              {(record.source_snapshot?.interpretationPoints?.length ?? 0) > 0 && (
                <section>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8E7CFF]">
                    패턴 포인트
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {record.source_snapshot?.interpretationPoints?.map((point) => (
                      <span
                        key={point}
                        className="rounded-full bg-[#E8E2FF] px-3 py-1 text-xs font-medium text-[#5a4bb5]"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
    </RequireAuth>
  )
}
