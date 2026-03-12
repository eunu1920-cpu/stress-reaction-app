-- 패턴 돋보기 질문 응답 저장
create table if not exists question_responses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id),
  question_id text not null,
  category text not null check (category in ('stress', 'relation', 'self')),
  option_id text not null,
  pattern_code text not null,
  question_version int not null default 1,
  display_snapshot jsonb not null default '{}'::jsonb,
  is_retry boolean not null default false,
  original_response_id uuid references question_responses(id),
  answered_at timestamptz default now()
);

alter table question_responses enable row level security;

create policy "Users can read own question responses"
  on question_responses for select
  using (auth.uid() = user_id);

create policy "Users can insert own question responses"
  on question_responses for insert
  with check (auth.uid() = user_id);
