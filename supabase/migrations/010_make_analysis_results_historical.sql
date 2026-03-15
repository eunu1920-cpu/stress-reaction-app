-- AI 분석 결과를 회차별로 누적 저장하도록 변경
alter table analysis_results drop constraint if exists analysis_results_user_id_key;

create index if not exists analysis_results_user_id_created_at_idx
  on analysis_results (user_id, created_at desc);
