import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '지금 내 상태, 빠르게 확인해보기',
  description: '요즘 어디에 더 신경 쓰이고 있나요?',
  openGraph: {
    title: '지금 내 상태, 빠르게 확인해보기',
    description: '요즘 어디에 더 신경 쓰이고 있나요?',
    url: '/promo',
    siteName: 'MyView',
    type: 'website',
  },
}

export default function PromoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
