'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { deleteRecordHybrid, loadRecords } from '@/lib/storage'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import type { ObservationRecord } from '@/lib/history-storage'

function parseJsonArray(val: string): string[] {
  try {
    if (typeof val !== 'string') return []
    if (val.startsWith('[')) {
      const parsed = JSON.parse(val) as unknown
      return Array.isArray(parsed) ? parsed.map(String) : []
    }
  } catch {
    /* ignore */
  }
  return []
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

export default function RecordDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string | undefined
  const { user } = useAuth()
  const [record, setRecord] = useState<ObservationRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }

    const load = async () => {
      if (!user?.id) {
        const records = await loadRecords(null)
        const found = records.find((r) => r.id === id)
        if (found) {
          setRecord(found)
          setLoading(false)
          return
        }
        setNotFound(true)
        setLoading(false)
        return
      }

      let { data, error } = await supabase
          .from('records')
          .select('*')
          .eq('id', id)
          .eq('pattern', 'manual_record')
          .maybeSingle()

        if (error || !data) {
          const fallback = await supabase
            .from('records')
            .select('*')
            .eq('id', id)
            .maybeSingle()
          if (!fallback.error && fallback.data) {
            const row = fallback.data as { situation_tags?: unknown; body_reaction_tags?: unknown; behavior_tags?: unknown }
            const hasManualStructure =
              Array.isArray(row.situation_tags) || Array.isArray(row.body_reaction_tags) || Array.isArray(row.behavior_tags)
            if (hasManualStructure) {
              data = fallback.data
              error = null
            }
          }
        }

        if (!error && data) {
          const row = data as {
            id: string
            created_at: string
            category: string
            content: string | null
            situation_tags?: string[] | null
            body_reaction_tags?: string[] | null
            behavior_tags?: string[] | null
            source_snapshot?: { mood?: string } | null
          }
          const situation = (row.situation_tags ?? []) as string[]
          const body = (row.body_reaction_tags ?? []) as string[]
          const behavior = (row.behavior_tags ?? []) as string[]
          const tagSummary = [situation.join(', '), body.join(', '), behavior.join(', ')]
            .filter(Boolean)
            .join(' · ')
          setRecord({
            id: row.id,
            date: row.created_at,
            resultType: 'QR',
            pattern: 'manual_record',
            sourceSnapshot: row.source_snapshot ?? null,
            answers: {
              q1: JSON.stringify(situation),
              q2: JSON.stringify(body),
              q3: JSON.stringify(behavior),
            },
            summary: tagSummary || (row.content ?? ''),
            memo: row.content ?? undefined,
          })
          setLoading(false)
          return
        }

      setNotFound(true)
      setLoading(false)
    }

    void load()
  }, [id, user?.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-8 flex items-center justify-center">
        <p className="text-[#555555]">불러오는 중...</p>
      </main>
    )
  }

  if (notFound || !record) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/history" className="text-sm text-[#555555] hover:text-[#333333]">
            ← 히스토리로
          </Link>
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#E8E2FF] p-8 text-center">
            <p className="text-[#555555]">기록을 찾을 수 없습니다.</p>
          </div>
        </div>
      </main>
    )
  }

  const situationTags = parseJsonArray(record.answers?.q1 ?? '')
  const bodyReactionTags = parseJsonArray(record.answers?.q2 ?? '')
  const behaviorTags = parseJsonArray(record.answers?.q3 ?? '')
  const hasTags = situationTags.length > 0 || bodyReactionTags.length > 0 || behaviorTags.length > 0
  const mood = (record.sourceSnapshot as { mood?: string } | null)?.mood

  const categoryLabel =
    record.pattern === 'manual_record'
      ? 'Manual Observation'
      : record.pattern
        ? `Stress Test (${record.pattern})`
        : record.resultType
          ? `Test (${record.resultType})`
          : 'Manual Observation'

  const handleDelete = async () => {
    if (!record || deleting) return
    if (!confirm('이 기록을 삭제하시겠습니까?')) return
    setDeleting(true)
    const ok = await deleteRecordHybrid(record.id, user?.id ?? null)
    if (ok) {
      toast.success('기록이 삭제되었습니다.')
      router.push('/history')
    } else {
      toast.error('삭제에 실패했습니다.')
    }
    setDeleting(false)
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/history"
          className="text-sm text-[#555555] hover:text-[#333333] transition-colors"
        >
          ← 히스토리로
        </Link>

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-[#E8E2FF] p-6">
          <h1 className="text-xl font-bold text-[#111111] mb-6">오늘의 관찰</h1>

          <section className="mb-6">
            <h2 className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">
              날짜
            </h2>
            <p className="text-sm text-[#333333]">{formatDate(record.date)}</p>
          </section>

          {mood && (
            <section className="mb-6">
              <h2 className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">
                기분
              </h2>
              <p className="text-sm text-[#333333]">{mood === 'clear' ? '맑음' : '흐림'}</p>
            </section>
          )}

          <section className="mb-6">
            <h2 className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">
              카테고리
            </h2>
            <p className="text-sm text-[#333333]">{categoryLabel}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">
              선택한 태그
            </h2>
            {hasTags ? (
              <div className="flex flex-wrap gap-2">
                {situationTags.length > 0 && (
                  <div className="w-full">
                    <span className="text-xs text-[#777777]">Situation: </span>
                    <span className="text-sm text-[#333333]">
                      {Array.isArray(situationTags) ? situationTags.join(', ') : ''}
                    </span>
                  </div>
                )}
                {bodyReactionTags.length > 0 && (
                  <div className="w-full">
                    <span className="text-xs text-[#777777]">Body reaction: </span>
                    <span className="text-sm text-[#333333]">
                      {Array.isArray(bodyReactionTags) ? bodyReactionTags.join(', ') : ''}
                    </span>
                  </div>
                )}
                {behaviorTags.length > 0 && (
                  <div className="w-full">
                    <span className="text-xs text-[#777777]">Behavior: </span>
                    <span className="text-sm text-[#333333]">
                      {Array.isArray(behaviorTags) ? behaviorTags.join(', ') : ''}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-[#777777]">선택된 태그 없음</p>
            )}
          </section>

          <section className="mb-6">
            <h2 className="text-xs font-semibold text-[#8E7CFF] uppercase tracking-wide mb-2">
              메모
            </h2>
            <p className="text-sm text-[#333333] whitespace-pre-wrap leading-relaxed">
              {record.memo?.trim() || ''}
            </p>
          </section>

          <div className="pt-4 border-t border-[#E8E2FF]">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              {deleting ? '삭제 중...' : '기록 삭제'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
