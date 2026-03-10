-- AI 분석 결과 저장 테이블 (사용자당 최신 1건 유지)
create table if not exists analysis_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) unique,
  record_count int not null,
  analysis text not null,
  period_start timestamptz not null,
  period_end timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS 활성화
alter table analysis_results enable row level security;

-- 본인 분석만 조회
create policy "Users can read own analysis"
  on analysis_results for select
  using (auth.uid() = user_id);

-- 본인 분석만 삽입
create policy "Users can insert own analysis"
  on analysis_results for insert
  with check (auth.uid() = user_id);

-- 본인 분석만 수정 (upsert용)
create policy "Users can update own analysis"
  on analysis_results for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
