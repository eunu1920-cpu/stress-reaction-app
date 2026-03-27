-- 패턴 돋보기 관심 클릭: 로그인 버튼(구글/이메일) 유형 추가
alter table pattern_interest_clicks
  drop constraint if exists pattern_interest_clicks_button_type_check;

alter table pattern_interest_clicks
  add constraint pattern_interest_clicks_button_type_check
  check (
    button_type in (
      'stress',
      'relation',
      'self',
      'login_google',
      'login_email'
    )
  );
