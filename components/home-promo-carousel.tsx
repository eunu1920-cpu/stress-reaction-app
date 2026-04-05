'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const SLIDES = [
  {
    id: '1',
    href: '/stress',
    image: '/images/home-carousel/home-carousel-01-identity.jpg',
    imageAlt:
      '집 소파에 앉아 스마트폰을 보며 잠시 멈춰 생각에 잠긴 사람의 일상 장면',
    question: '이게 뭔가요?',
    hook: "나도 몰랐던 나의 '반응 패턴'을 찾아주는 AI 거울입니다.",
    detail:
      "단순한 심리 테스트가 아닙니다. 일상적인 선택 속에서 반복되는 당신만의 독특한 반응 체계를 AI가 객관적으로 포착해내는 '자기 관찰 도구'입니다. 보이지 않던 내 마음의 지도를 그려준다고 생각하시면 돼요.",
  },
  {
    id: '2',
    href: '/pattern',
    image: '/images/home-carousel/home-carousel-02-accumulation.jpg',
    imageAlt: '창가나 책상에서 찻잔을 두고 잠시 멈춰 창밖을 바라보는 사람',
    question: '나랑 무슨 상관인가요?',
    hook: '반복되는 고민과 후회의 고리를 끊어낼 수 있습니다.',
    detail:
      '「왜 나는 매번 같은 상황에서 스트레스를 받을까?」라는 질문에 적용이 힘든 답이 아니라, 「당신의 반응패턴 구조」를 보여드립니다. 자신의 패턴을 알면 결정적인 순간에 감정에 휘둘리지 않고, 나에게 가장 이로운 선택을 할 수 있는 「주도권」을 갖게 됩니다.',
  },
  {
    id: '3',
    href: '/history',
    image: '/images/home-carousel/home-carousel-03-flow.jpg',
    imageAlt: '저녁 조명 아래 노트나 일기를 펼쳐 하루를 정리하는 차분한 순간',
    question: '하면 뭐가 나오나요?',
    hook: "당신만을 위한 「날카로운 분석 리포트」와 「행동 가이드」가 나옵니다.",
    detail:
      '흩어져 있던 당신의 기록들이 모여 하나의 「행동 지도」가 완성됩니다. AI가 당신의 데이터를 분석해 「당신은 이런 상황에서 이렇게 반응하는 경향이 있습니다」라는 날카로운 통찰과 함께, 삶의 질을 높여줄 구체적인 코칭 문장을 선물합니다.',
  },
  {
    id: '4',
    href: '/record',
    image: '/images/home-carousel/home-carousel-04-quick-pick.jpg',
    imageAlt: '대중교통이나 벤치에서 휴대폰을 보며 잠시 숨 고르는 사람의 모습',
    question: '믿어도 되나요?',
    hook: '데이터는 거짓말을 하지 않습니다. 당신의 기록이 증거입니다.',
    detail:
      'MyView는 추측하지 않습니다. 당신이 직접 참여한 수천 개의 이벤트와 평균 13분 이상의 깊은 몰입 데이터(GA4 기반)를 바탕으로 분석합니다. 당신이 직접 쌓아 올린 기록을 기반으로 하기에, 그 어떤 진단보다 당신을 가장 잘 대변합니다.',
  },
] as const

type Slide = (typeof SLIDES)[number]

function PromoSlideCard({ slide, sizes }: { slide: Slide; sizes: string }) {
  const detailId = React.useId()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E8E2FF] bg-white shadow-sm transition-shadow hover:border-[#DDD4FF] md:hover:shadow-md">
      <Link href={slide.href} className="block outline-none">
        <div className="relative aspect-[4/3] w-full bg-[#FAFAFA]">
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-300 md:group-hover:scale-[1.02]"
            sizes={sizes}
            unoptimized
          />
        </div>
      </Link>

      <div className="px-4 pb-5 pt-3 text-left md:pb-4">
        <p className="text-xs font-semibold text-[#8E7CFF]">{slide.question}</p>
        <p className="mt-1.5 text-base font-bold leading-snug text-[#222]">
          {slide.hook}
        </p>

        {/* 모바일: 단추 없이 텍스트만 — 양끝 정렬로 간격 */}
        <div className="mt-4 flex w-full items-center justify-between gap-4 md:hidden">
          <button
            type="button"
            className="shrink-0 text-xs font-semibold text-[#8E7CFF] underline underline-offset-2 decoration-[#8E7CFF]/50 touch-manipulation active:opacity-80"
            aria-expanded={mobileOpen}
            aria-controls={detailId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '접기' : '더보기'}
          </button>
          <Link
            href={slide.href}
            className="shrink-0 text-xs font-semibold text-[#8E7CFF] underline underline-offset-2 decoration-[#8E7CFF]/50 touch-manipulation active:opacity-80"
          >
            둘러보기 →
          </Link>
        </div>

        <p
          id={detailId}
          className={cn(
            'mt-3 rounded-xl border border-[#F0EDFF] bg-[#FAFAFA] px-3 py-3.5 text-xs leading-relaxed text-[#555] md:hidden',
            mobileOpen ? 'block' : 'hidden',
          )}
        >
          {slide.detail}
        </p>

        <p
          className="mt-2 hidden max-h-0 overflow-hidden text-xs leading-relaxed text-[#555] opacity-0 transition-[max-height,opacity,margin] duration-300 ease-out md:mt-0 md:block md:max-h-0 md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-[min(28rem,70vh)] md:group-hover:opacity-100"
        >
          {slide.detail}
        </p>

        <div className="mt-2 hidden md:block">
          <Link
            href={slide.href}
            className="inline-flex touch-manipulation items-center text-xs font-semibold text-[#8E7CFF] underline-offset-2 hover:underline"
          >
            둘러보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export function HomePromoCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start' }}
        className="w-full outline-none focus-visible:ring-2 focus-visible:ring-[#CFC2FF] focus-visible:ring-offset-2"
        tabIndex={0}
      >
        <CarouselContent className="-ml-3">
          {SLIDES.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="basis-[88%] pl-3 sm:basis-[85%] md:basis-[88%]"
            >
              <PromoSlideCard
                slide={slide}
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className="mt-4 flex items-center justify-center gap-5"
        role="group"
        aria-label="소개 슬라이드 넘기기"
      >
        <button
          type="button"
          aria-label="이전 슬라이드"
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8E2FF] bg-white text-[#333] shadow-sm transition',
            'hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.97]',
            'disabled:pointer-events-none disabled:opacity-35',
          )}
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <span className="min-w-[4.5ch] text-center text-xs tabular-nums text-[#666]">
          {current + 1} / {SLIDES.length}
        </span>
        <button
          type="button"
          aria-label="다음 슬라이드"
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8E2FF] bg-white text-[#333] shadow-sm transition',
            'hover:border-[#CFC2FF] hover:bg-[#FAF8FF] active:scale-[0.97]',
            'disabled:pointer-events-none disabled:opacity-35',
          )}
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
