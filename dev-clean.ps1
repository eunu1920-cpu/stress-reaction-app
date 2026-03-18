# 개발 서버 클린 실행 스크립트
# 1. 기존 Node/Next 프로세스 종료
# 2. .next 캐시 삭제
# 3. 개발 서버 실행

Write-Host "기존 프로세스 확인 중..." -ForegroundColor Yellow
$ports = @(3000, 3001)
foreach ($port in $ports) {
    $conn = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($conn) {
        $pid = $conn.OwningProcess | Select-Object -First 1
        if ($pid) {
            Write-Host "포트 $port 사용 중 (PID: $pid) - 종료합니다" -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }
    }
}

Write-Host ".next 캐시 삭제 중..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "개발 서버 시작 (첫 로딩에 1~2분 걸릴 수 있습니다)..." -ForegroundColor Green
npm run dev
