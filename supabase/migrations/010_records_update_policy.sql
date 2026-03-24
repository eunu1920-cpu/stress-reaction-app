-- 본인 레코드 수정 (익명·일반 로그인 공통)
create policy "Users can update own records"
  on records for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
