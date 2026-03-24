import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보 및 이용 안내 | MyView',
  description: '마이뷰 개인정보 및 이용 안내',
}

const CONTACT_EMAIL = 'eunu1920@gmail.com'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-8 pb-16 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-[#8E7CFF] hover:underline"
        >
          ← 홈으로
        </Link>

        <article className="rounded-2xl border border-[#E8E2FF] bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-xl font-bold text-[#333333] sm:text-2xl">
            개인정보 및 이용 안내
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#555555]">
            마이뷰(MyView)는 실험·운영 단계의 서비스입니다. 아래는 현재 데이터가
            어떻게 쓰이는지 알기 쉽게 정리한 내용입니다.
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-base font-semibold text-[#333333]">
              1. 수집될 수 있는 정보
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#555555]">
              <li>
                <strong className="font-medium text-[#333333]">로그인 시:</strong>{' '}
                계정 식별을 위한 정보(예: 이메일 등, 가입 방식에 따라 다를 수
                있음)
              </li>
              <li>
                <strong className="font-medium text-[#333333]">서비스 이용 시:</strong>{' '}
                관찰·기록·테스트 결과, AI 분석 결과 등 이용 내용
              </li>
              <li>
                <strong className="font-medium text-[#333333]">비로그인 시:</strong>{' '}
                기록·관찰 결과는 서비스 제공을 위해{' '}
                <strong className="font-medium text-[#333333]">
                  Supabase 익명 계정
                </strong>
                으로 저장될 수 있습니다. 익명 로그인을 사용할 수 없는 환경에서는
                이 기기(브라우저) 안에만 남을 수 있습니다.
              </li>
              <li>
                <strong className="font-medium text-[#333333]">접속·이용 통계:</strong>{' '}
                어떤 화면이 열리는지 등 익명에 가까운 형태의 통계가 수집될 수
                있습니다.
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-base font-semibold text-[#333333]">
              2. 이용 목적
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#555555]">
              <li>서비스 제공 및 기능 유지</li>
              <li>
                AI 분석·기록 기능이 의도대로 동작하는지 확인
              </li>
              <li>
                어떤 주제에 관심이 있는지 전체적인 이용 경향 파악 (개인을 특정하기
                위한 목적은 아님)
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-base font-semibold text-[#333333]">
              3. 맡기거나 연동하는 서비스
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#555555]">
              <li>
                <strong className="font-medium text-[#333333]">Supabase:</strong>{' '}
                데이터 저장, 로그인 등 인프라
              </li>
              <li>
                <strong className="font-medium text-[#333333]">
                  Google Analytics:
                </strong>{' '}
                방문·화면 이용 통계 (연동된 경우)
              </li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-base font-semibold text-[#333333]">4. 기타</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#555555]">
              <li>
                수집한 정보를 광고사 등 제3자에게 판매하거나 그런 목적으로
                제공하지 않습니다.
              </li>
              <li>서비스가 커지면 이 안내는 수정될 수 있습니다.</li>
            </ul>
          </section>

          <section className="mt-8 rounded-xl border border-[#E8E2FF] bg-[#F8F5FF] p-4">
            <h2 className="text-base font-semibold text-[#333333]">문의</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#555555]">
              개인정보 관련 문의는 아래 이메일로 연락해 주세요.
            </p>
            <p className="mt-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-medium text-[#8E7CFF] underline-offset-2 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
