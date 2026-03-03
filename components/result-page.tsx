"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  resultData,
  bodyData,
  cognitionData,
  insightPools,
} from "@/lib/result-data";

interface ResultPageProps {
  q1Answer: string;
  q2Answer: string;
  q3Answer: string;
  onRestart?: () => void;
}

export function ResultPage({
  q1Answer,
  q2Answer,
  q3Answer,
  onRestart,
}: ResultPageProps) {
  const [openItem, setOpenItem] = useState("section-1");
  const [selectedInsight, setSelectedInsight] = useState<string>("");
  const [observationText, setObservationText] = useState<string>("");
  const [insightText, setInsightText] = useState<string>("");
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const q2Data = resultData[q2Answer as keyof typeof resultData];
  const q1Data = bodyData[q1Answer as keyof typeof bodyData];
  const q3Data = cognitionData[q3Answer as keyof typeof cognitionData];

  const type = String(q2Answer).toUpperCase();
  const cardImageSrc = `/character-${type}.jpg`;

  // 🔥 인사이트 랜덤
  useEffect(() => {
    const insights = insightPools[q2Answer as keyof typeof insightPools];
    if (insights && insights.length > 0) {
      const randomIndex = Math.floor(Math.random() * insights.length);
      const fullInsight = insights[randomIndex];
      setSelectedInsight(fullInsight);

      const parts = fullInsight.split("통찰:");
      if (parts.length === 2) {
        setObservationText(parts[0].replace("관찰:", "").trim());
        setInsightText(parts[1].trim());
      }
    }
  }, [q2Answer]);

  // 🔥 Kakao SDK init
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("516d94cf545525bb2d00a935ed4a583d");
      }
    }
  }, []);

  // 🔥 카카오 공유
  const shareKakao = () => {
    if (typeof window === "undefined") return;
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "스트레스 반응 구조 테스트",
        description: q2Data.oneLine,
        imageUrl: `https://stress-reaction-app-fn4y.vercel.app/character-${type}.jpg`,
        link: {
          mobileWebUrl: `https://stress-reaction-app-fn4y.vercel.app/result/${type}`,
          webUrl: `https://stress-reaction-app-fn4y.vercel.app/result/${type}`,
        },
      },
      buttons: [
        {
          title: "테스트 다시하기",
          link: {
            mobileWebUrl: `https://stress-reaction-app-fn4y.vercel.app/`,
            webUrl: `https://stress-reaction-app-fn4y.vercel.app/`,
          },
        },
      ],
    });
  };

  if (!q2Data || !q1Data || !q3Data) {
    return (
      <main className="min-h-screen bg-[#F5F3FA] flex items-center justify-center p-6">
        <p>데이터를 불러올 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          당신의 스트레스 반응 구조
        </h1>

        <div className="bg-white rounded-[18px] shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">{q2Data.oneLine}</h2>

            <div className="bg-[#E8E2FF] border-l-4 border-[#8E7CFF] rounded-2xl p-5 mb-6">
              <p className="font-bold text-sm mb-1">관찰</p>
              <p className="mb-3">{observationText}</p>
              <p className="font-bold text-sm mb-1">통찰</p>
              <p>{insightText}</p>
            </div>
          )}

          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
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
              <AccordionTrigger>신체 반응 구조와 원인</AccordionTrigger>
              <AccordionContent>{q1Data.structure}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-4">
              <AccordionTrigger>숨은 강점</AccordionTrigger>
              <AccordionContent>{q3Data.strength}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-5">
              <AccordionTrigger>인지 전략 제안</AccordionTrigger>
              <AccordionContent>{q3Data.strategy}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="section-6">
              <AccordionTrigger>다층 해석</AccordionTrigger>
              <AccordionContent>{q2Data.multiLayer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-8 py-3 bg-[#8E7CFF] text-white rounded-xl"
          >
            결과 공유 · 저장하기
          </button>
        </div>
      </div>

      {isShareOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            <button
              onClick={() => setIsShareOpen(false)}
              className="absolute top-3 right-3 text-xl"
            >
              ×
            </button>

            <h3 className="text-lg font-bold text-center mb-4">
              당신의 반응 구조 카드
            </h3>

            <img src={cardImageSrc} className="rounded-xl mb-4" />

            <button
              onClick={shareKakao}
              className="w-full py-3 bg-yellow-400 rounded-xl font-medium"
            >
              카카오로 공유하기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
