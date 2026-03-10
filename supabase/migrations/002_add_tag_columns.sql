-- 배열 컬럼 추가
alter table records add column if not exists situation_tags jsonb default '[]';
alter table records add column if not exists body_reaction_tags jsonb default '[]';
alter table records add column if not exists behavior_tags jsonb default '[]';
