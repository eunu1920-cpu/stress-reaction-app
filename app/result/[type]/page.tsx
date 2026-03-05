import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { resultData } from "@/lib/result-data"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

type Props = {
  params: { type: string }
}

const baseUrl = "https://stress-reaction-app-fn4y.vercel.app"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = params.type.toUpperCase()

  const imageUrl = `${baseUrl}/character-${type}.jpg`
  const pageUrl = `${baseUrl}/result/${type}`

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
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: "스트레스 반응 구조 카드",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "스트레스 반응 구조 테스트",
      description: "너도 해봐!",
      images: [imageUrl],
    },
  }
}

export default function ResultPage({ params }: Props) {
  const type = params.type.toUpperCase()
  const q2Data = resultData[type as keyof typeof resultData]

  if (!q2Data) {
    notFound()
  }

  const multiLayerBlocks = q2Data.multiLayer.split("\n\n")

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          당신의 스트레스 반응 구조
        </h1>

        <div className="bg-white rounded-[18px] shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">
            {q2Data.oneLine}
          </h2>

          <Accordion
            type="single"
            collapsible
            defaultValue="section-1"
          >
            <AccordionItem value="section-1">
              <AccordionTrigger>촉발 환경</AccordionTrigger>
              <AccordionContent>{q2Data.trigger}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-2">
              <AccordionTrigger>사고 반응 구조와 원인</AccordionTrigger>
              <AccordionContent>{q2Data.thinking}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-3">
              <AccordionTrigger>다층 해석</AccordionTrigger>
              <AccordionContent className="space-y-3">
                {multiLayerBlocks.map((block, i) => {
                  const parts = block.split(":")
                  return (
                    <p key={i} className="leading-relaxed">
                      <strong>{parts[0]}:</strong>{" "}
                      {parts.slice(1).join(":")}
                    </p>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <button className="px-6 py-3 bg-[#8E7CFF] text-white rounded-xl text-base font-medium hover:bg-[#7D6BEE] transition-colors">
              테스트 다시하기
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}