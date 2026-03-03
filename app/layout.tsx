import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '스트레스 반응구조 확인',
  description: '스트레스 상황에서 당신은 어떻게 반응하나요?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}