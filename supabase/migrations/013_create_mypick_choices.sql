-- MyPick: 급한 순간 A/B 선택 집계(비율만 활용, 긴 히스토리 불필요)
create table if not exists mypick_choices (
  id uuid default gen_random_uuid() primary key,
  question_id text not null,
  choice text not null check (choice in ('a', 'b')),
  anonymous_id text,
  created_at timestamptz default now()
);

create index if not exists mypick_choices_question_id_idx
  on mypick_choices (question_id);

alter table mypick_choices enable row level security;

create policy "Public can insert mypick choices"
  on mypick_choices for insert
  to anon, authenticated
  with check (true);

create policy "Public can read mypick choices for aggregates"
  on mypick_choices for select
  to anon, authenticated
  using (true);
