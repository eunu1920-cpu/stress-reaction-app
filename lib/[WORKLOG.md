2026-03-05 작업
목표
설문 완료 후 /result/Sx 라우팅 구조 만들기
현재 구조
app/page.tsx → 설문 (Q1,Q2,Q3)
app/result/[type]/page.tsx → 결과 페이지
lib/result-data.ts → S1~S8 결과 데이터
history 저장 localStorage 사용
오늘 한 작업
설문 완료 시 router.push(/result/${type}) 적용
history 저장 로직 추가
카카오 공유 기능 추가
현재 문제
ResultPage 컴포넌트 방식과 URL params 방식이 섞임
/result/[type] 페이지에서 props 기반 코드가 들어가 충돌 발생
내일 할 일
app/result/[type]/page.tsx 구조 정리
params.type → resultData[type] 렌더
ResultPage UI 컴포넌트 분리
history 카드 → /result/{type} 이동 확인