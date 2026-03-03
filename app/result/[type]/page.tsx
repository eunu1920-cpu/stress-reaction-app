import { Metadata } from "next"
import Link from "next/link"

type Props = {
  params: { type: string }
}

const baseUrl = "https://stress-reaction-app-fn4y.vercel.app"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = params

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
  const { type } = params

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        당신의 스트레스 반응 구조
      </h1>

      <img
        src={`/character-${type}.jpg`}
        alt="결과 카드"
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "30px auto",
          borderRadius: "16px",
        }}
      />

      <p style={{ marginTop: "20px", color: "#666" }}>
        친구에게 공유해서 같이 해보세요 🙂
      </p>

      <Link href="/">
        <button
          style={{
            marginTop: "24px",
            padding: "14px 24px",
            background: "#8E7CFF",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          테스트 시작하기
        </button>
      </Link>
    </div>
  )
}