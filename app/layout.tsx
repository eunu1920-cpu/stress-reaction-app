import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { AppNav } from "@/components/app-nav";
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1EKMW12QYG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1EKMW12QYG');
          `}
        </Script>

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
          <AppNav />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
