import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { LayoutShell } from "@/components/layout-shell";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "스트레스 반응구조 확인",
  description: "스트레스 상황에서 당신은 어떻게 반응하나요?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* Google Analytics - localhost(개발)에서는 렌더링 안 함 */}
        {process.env.NEXT_PUBLIC_GA_ID &&
          process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                (function() {
                  if (typeof window === 'undefined') return;
                  if (window.location.hostname === 'localhost') return;
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                })();
              `}
            </Script>
          </>
        )}

        {/* 🔥 카카오 SDK 추가 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="afterInteractive"
        />

        {/* 🔥 카카오 초기화 */}
        <Script id="kakao-init" strategy="afterInteractive">
          {`
            if (window.Kakao && !window.Kakao.isInitialized()) {
              window.Kakao.init("516d94cf545525bb2d00a935ed4a583d");
            }
          `}
        </Script>
      </head>

      <body className="font-sans antialiased">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
