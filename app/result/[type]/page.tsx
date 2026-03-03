import { Metadata } from "next"
import Link from "next/link"

type Props = {
  params: { type: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = params

  return {
    title: "스트레스 반응 구조 카드",
    description: "너의 스트레스 반응 유형을 확인해보세요.",
    openGraph: {
      title: "스트레스 반응 구조 테스트",
      description: "너도 해봐!",
      images: [
        {
          url: `https://stress-reaction-app-fn4y.vercel.app/character-${type}.jpg`,
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

export default function ResultPage({ params }: Props) {
  const { type } = params

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>당신의 스트레스 반응 구조</h1>

      <img
        src={`/character-${type}.jpg`}
        alt="결과 카드"
        style={{ width: "100%", maxWidth: "400px", margin: "20px auto" }}
      />

      <Link href="/">
        <button
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#6c5ce7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          테스트 시작하기
        </button>
      </Link>
    </div>
  )
}