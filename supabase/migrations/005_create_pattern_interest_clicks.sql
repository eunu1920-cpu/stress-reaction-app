-- 패턴 돋보기 관심 클릭 기록 저장
create table if not exists pattern_interest_clicks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id),
  button_type text not null check (button_type in ('stress', 'relation', 'self')),
  clicked_at timestamptz default now()
);

-- RLS 활성화
alter table pattern_interest_clicks enable row level security;

-- 본인 클릭만 조회
create policy "Users can read own pattern interest clicks"
  on pattern_interest_clicks for select
  using (auth.uid() = user_id);

-- 로그인 사용자의 본인 클릭만 저장
create policy "Users can insert own pattern interest clicks"
  on pattern_interest_clicks for insert
  with check (auth.uid() = user_id);
