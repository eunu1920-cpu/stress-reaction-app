-- 사용자가 제출한 상황→질문 (관리자 편집 후 공유용)
create table if not exists user_question_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table user_question_submissions enable row level security;

-- 로그인 사용자 본인 제출만 조회
create policy "Users can read own submissions"
  on user_question_submissions for select
  using (auth.uid() = user_id);

-- 로그인 사용자만 제출
create policy "Users can insert own submissions"
  on user_question_submissions for insert
  with check (auth.uid() = user_id);
