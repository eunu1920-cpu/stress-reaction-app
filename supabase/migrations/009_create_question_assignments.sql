-- 패턴 돋보기 1일 1질문 배정/상태 관리
create table if not exists question_assignments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id),
  category text not null check (category in ('stress', 'relation', 'self')),
  question_id text not null,
  assigned_date date not null,
  status text not null default 'assigned'
    check (status in ('assigned', 'opened', 'answered', 'skipped', 'expired')),
  opened_at timestamptz,
  answered_at timestamptz,
  response_id uuid references question_responses(id),
  retry_count int not null default 0,
  created_at timestamptz default now(),
  unique(user_id, category, assigned_date)
);

alter table question_assignments enable row level security;

create policy "Users can read own question assignments"
  on question_assignments for select
  using (auth.uid() = user_id);

create policy "Users can insert own question assignments"
  on question_assignments for insert
  with check (auth.uid() = user_id);

create policy "Users can update own question assignments"
  on question_assignments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
