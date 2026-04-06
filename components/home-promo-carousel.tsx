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
    href: '/record',
    image: '/images/home-carousel/home-carousel-01-record.jpg',
    imageAlt:
      '책상에 앉아 머리를 짚고, 머릿속이 복잡한 듯한 사람. 노트와 스마트폰·포스트잇이 있는 책상',
    question: '① 기록',
    hook: '건드렸을 때,\n나는 어떻게 반응했나요?',
    subtitle:
      '생각 말고\n그 순간 내 반응을 한 줄로 남겨보세요',
    detail:
      '나중엔\n“아 나는 이런 데서 흔들리는구나”\n보이기 시작합니다',
  },
  {
    id: '2',
    href: '/pattern',
    image: '/images/home-carousel/home-carousel-02-accumulation.jpg',
    imageAlt: '창가나 책상에서 찻잔을 두고 잠시 멈춰 창밖을 바라보는 사람',
    question: '② 패턴돋보기',
    hook: '좋은 말은 알겠는데\n왜 나한테는 안 될까요?',
    subtitle:
      '와닿는 질문 하나를 고르면\n오늘의 관찰이 시작됩니다',
    detail: '정답 찾는 게 아니라\n나를 이해하는 연습입니다',
  },
  {
    id: '3',
    href: '/history',
    image: '/images/home-carousel/home-carousel-03-flow.jpg',
    imageAlt: '저녁 조명 아래 노트나 일기를 펼쳐 하루를 정리하는 차분한 순간',
    question: '③ 히스토리',
    hook: '나는 왜\n항상 비슷한 데서 흔들릴까요?',
    subtitle:
      '지나온 기록이 모이면\n내 반응 패턴이 보입니다',
    detail:
      '“아, 나는 여기서 자주 반응하는구나”\n처음으로 보이기 시작합니다',
  },
  {
    id: '4',
    href: '/analysis',
    image: '/images/home-carousel/home-carousel-04-quick-pick.jpg',
    imageAlt:
      '복잡하게 얽힌 실타래 사이에서 한 가닥 실을 차분히 정리하는 사람',
    question: '④ 분석',
    hook: '생각은 계속 바뀌지만\n반응은 반복됩니다',
    subtitle: '반응이 정리되면\n지금까지의 내가 보입니다',
    detail: '나를 이해하는 순간\n관계도, 선택도 달라집니다',
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
        <p className="mt-1.5 whitespace-pre-line text-base font-bold leading-snug text-[#222]">
          {slide.hook}
        </p>
        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#555555]">
          {slide.subtitle}
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
            'mt-3 whitespace-pre-line rounded-xl border border-[#F0EDFF] bg-[#FAFAFA] px-3 py-3.5 text-xs leading-relaxed text-[#555] md:hidden',
            mobileOpen ? 'block' : 'hidden',
          )}
        >
          {slide.detail}
        </p>

        <p
          className="mt-2 hidden max-h-0 overflow-hidden whitespace-pre-line text-xs leading-relaxed text-[#555] opacity-0 transition-[max-height,opacity,margin] duration-300 ease-out md:mt-0 md:block md:max-h-0 md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-[min(28rem,70vh)] md:group-hover:opacity-100"
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
