-- 사용자가 자신의 레코드 삭제 가능
create policy "Users can delete own records"
  on records for delete
  using (auth.uid() = user_id);
