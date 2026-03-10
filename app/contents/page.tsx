'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ComingSoonPage } from '@/components/coming-soon-page'

const VALID_SRC_VALUES = new Set(['A', 'B', 'C'])

function isValidSrc(src: string | null): boolean {
  if (!src || typeof src !== 'string' || src.trim() === '') return false
  return VALID_SRC_VALUES.has(src.trim())
}

function ContentsPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    const src = searchParams.get('src')
    if (!isValidSrc(src)) {
      setIsValid(false)
      const timer = setTimeout(() => {
        router.push('/')
      }, 2000)
      return () => clearTimeout(timer)
    }
    setIsValid(true)
  }, [searchParams, router])

  if (isValid === false) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <p className="text-center text-[#555555] text-base">
          Invalid link. Redirecting to home.
        </p>
      </main>
    )
  }

  if (isValid === null) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <p className="text-center text-[#555555]">Loading...</p>
      </main>
    )
  }

  return <ComingSoonPage />
}

export default function ContentsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
          <p className="text-center text-[#555555]">Loading...</p>
        </main>
      }
    >
      <ContentsPageInner />
    </Suspense>
  )
}
