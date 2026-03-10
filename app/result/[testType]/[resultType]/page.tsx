import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getResultData, type TestType } from "@/lib/result-registry"
import { ResultPage } from "@/components/result-page"

type Props = {
  params: Promise<{ testType: string; resultType: string }>
  searchParams?: Promise<{ q1?: string; q3?: string }>
}

const baseUrl = "https://stress-reaction-app-fn4y.vercel.app"

const VALID_TEST_TYPES = ["stress", "relation", "self"] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { testType, resultType } = await params
  const t = (testType || "").toLowerCase()
  const r = (resultType || "").toUpperCase()
  const pageUrl = t && r ? `${baseUrl}/result/${t}/${r}` : baseUrl
  const imageUrl = r ? `${baseUrl}/character-${r}.jpg` : undefined

  return {
    title: "스트레스 반응 구조 테스트",
    description: "너의 스트레스 반응 유형을 확인해보세요.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "스트레스 반응 구조 테스트",
      description: "너도 해봐!",
      url: pageUrl,
      siteName: "스트레스 반응 구조",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 800,
              height: 800,
              alt: "스트레스 반응 구조 카드",
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "스트레스 반응 구조 테스트",
      description: "너도 해봐!",
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ResultRoutePage({ params, searchParams }: Props) {
  const { testType: rawTest, resultType: rawResult } = await params
  const resolvedSearch = searchParams ? await searchParams : {}
  const q1Param = resolvedSearch?.q1
  const q3Param = resolvedSearch?.q3

  if (!rawTest || !rawResult) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <header className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
              당신의 스트레스 반응 구조
            </h1>
          </header>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2FF]/50 p-8 text-center">
            <p className="text-[#555555]">결과 타입을 확인할 수 없습니다.</p>
          </div>
          <div className="text-center">
            <Link href="/">
              <button className="px-6 py-3 bg-[#8E7CFF] text-white rounded-xl text-base font-semibold hover:bg-[#7D6BEE] transition-colors">
                테스트 다시하기
              </button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const testType = rawTest.toLowerCase()
  const resultType = rawResult.toUpperCase()

  if (!VALID_TEST_TYPES.includes(testType as (typeof VALID_TEST_TYPES)[number])) {
    notFound()
  }

  const data = getResultData(testType as TestType, resultType)
  if (!data) {
    notFound()
  }

  return (
    <ResultPage
      testType={testType as TestType}
      resultType={resultType}
      q2Answer={resultType}
      q1Answer={q1Param ?? ''}
      q3Answer={q3Param ?? ''}
    />
  )
}
