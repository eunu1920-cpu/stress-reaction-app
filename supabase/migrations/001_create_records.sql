-- records 테이블 생성
create table if not exists records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id),
  category text not null,
  pattern text not null,
  content text,
  created_at timestamptz default now()
);

-- RLS 활성화
alter table records enable row level security;

-- 로그인한 사용자만 자신의 레코드 삽입
create policy "Users can insert own records"
  on records for insert
  with check (auth.uid() = user_id);

-- 로그인한 사용자만 자신의 레코드 조회
create policy "Users can read own records"
  on records for select
  using (auth.uid() = user_id);
