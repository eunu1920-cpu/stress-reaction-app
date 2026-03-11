import Link from 'next/link'

export default function ObservePage() {
  return (
    <main className="min-h-screen bg-[#F5F3FA] px-4 py-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">
            지금 나를 관찰합니다
          </h1>
        </header>

        <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-7 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#333333]">
            스트레스 반응 테스트
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#555555]">
            간단한 질문으로 스트레스 반응 패턴을 확인합니다.
          </p>

          <Link
            href="/stress"
            className="mt-5 inline-flex w-full max-w-sm items-center justify-center rounded-2xl bg-[#8E7CFF] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#7D6BEE]"
          >
            테스트 시작
          </Link>
        </section>

        <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-7 text-center shadow-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[#333333]">
              MyView
            </h2>
            <p className="text-sm leading-relaxed text-[#555555]">
              기록하면 패턴이 쌓입니다.
            </p>
          </div>

          <Link
            href="/record"
            className="mt-5 inline-flex w-full max-w-sm items-center justify-center rounded-2xl border border-[#DCCFFF] bg-[#F0EBFF] px-8 py-4 text-base font-semibold text-[#5a4bb5] transition-colors hover:bg-[#E8E2FF] hover:border-[#CBB8FF]"
          >
            반응 바로 기록하기
          </Link>
        </section>

        <section className="rounded-2xl border border-[#E8E2FF] bg-white px-6 py-7 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#333333]">
            패턴 돋보기 <span aria-hidden="true">🔎</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#555555]">
            질문을 통해 반응 패턴을 살펴봅니다.
          </p>

          <Link
            href="/pattern"
            className="mt-5 inline-flex w-full max-w-sm items-center justify-center rounded-2xl border border-[#DCCFFF] bg-white px-8 py-4 text-base font-semibold text-[#5a4bb5] transition-colors hover:bg-[#F8F5FF] hover:border-[#CBB8FF]"
          >
            질문 시작
          </Link>
        </section>
      </div>
    </main>
  )
}
