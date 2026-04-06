-- =====================================================================
-- 같은 날·같은 본문 중복 records 정리 (수동 실행)
-- Supabase Dashboard → SQL Editor 에서 postgres 권한으로 실행.
--
-- 규칙 (한 그룹당 1행만 유지):
--   - user_id 동일
--   - created_at 을 Asia/Seoul 기준으로 같은 "날짜"
--   - pattern 동일
--   - TRIM(content) 동일 (NULL·공백은 '' 로 묶음)
-- 유지: 그룹 안에서 created_at 이 가장 이른 행(같으면 id 오름차순).
-- =====================================================================

-- (선택) 삭제 대상 미리보기
-- SELECT id, user_id, pattern, content, created_at
-- FROM records
-- WHERE id IN (
--   SELECT id FROM (
--     SELECT id,
--       ROW_NUMBER() OVER (
--         PARTITION BY
--           user_id,
--           (timezone('Asia/Seoul', created_at))::date,
--           pattern,
--           COALESCE(TRIM(content), '')
--         ORDER BY created_at ASC NULLS LAST, id ASC
--       ) AS rn
--     FROM records
--   ) sub
--   WHERE rn > 1
-- )
-- ORDER BY created_at;

DELETE FROM records
WHERE id IN (
  SELECT id FROM (
    SELECT id,
      ROW_NUMBER() OVER (
        PARTITION BY
          user_id,
          (timezone('Asia/Seoul', created_at))::date,
          pattern,
          COALESCE(TRIM(content), '')
        ORDER BY created_at ASC NULLS LAST, id ASC
      ) AS rn
    FROM records
  ) sub
  WHERE rn > 1
);
