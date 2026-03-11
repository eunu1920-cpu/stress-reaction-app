-- 비로그인 클릭도 저장할 수 있도록 구조 확장
alter table if exists pattern_interest_clicks
  alter column user_id drop not null;

alter table if exists pattern_interest_clicks
  add column if not exists anonymous_id text;

alter table if exists pattern_interest_clicks
  drop constraint if exists pattern_interest_clicks_user_or_anon_check;

alter table if exists pattern_interest_clicks
  add constraint pattern_interest_clicks_user_or_anon_check
  check (user_id is not null or anonymous_id is not null);

-- 기존 insert 정책 제거 후 공개 insert 허용 정책 재정의
drop policy if exists "Users can insert own pattern interest clicks"
  on pattern_interest_clicks;

create policy "Public can insert pattern interest clicks"
  on pattern_interest_clicks for insert
  to anon, authenticated
  with check (
    (auth.uid() is not null and auth.uid() = user_id)
    or
    (user_id is null and anonymous_id is not null)
  );

-- 내부 집계 확인용 view
create or replace view pattern_interest_click_summary as
select
  button_type,
  count(*)::bigint as click_count,
  count(distinct user_id)::bigint as logged_in_user_count,
  count(distinct anonymous_id)::bigint as anonymous_user_count,
  max(clicked_at) as last_clicked_at
from pattern_interest_clicks
group by button_type
order by click_count desc, button_type;

create or replace view pattern_interest_click_daily_summary as
select
  date(clicked_at) as click_date,
  button_type,
  count(*)::bigint as click_count
from pattern_interest_clicks
group by date(clicked_at), button_type
order by click_date desc, button_type;
