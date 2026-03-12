-- 패턴 돋보기 메타데이터 저장용 컬럼 추가
alter table records add column if not exists source_kind text;
alter table records add column if not exists pattern_code text;
alter table records add column if not exists question_id text;
alter table records add column if not exists option_id text;
alter table records add column if not exists question_version int;
alter table records add column if not exists source_snapshot jsonb default '{}'::jsonb;
