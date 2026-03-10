'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ComingSoonPage } from '@/components/coming-soon-page'

function isValidSrc(src: string | null): boolean {
  if (!src || typeof src !== 'string' || src.trim() === '') return false
  try {
    const url = new URL(src)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export default function ContentsPage() {
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
