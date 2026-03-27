/**
 * 사용자가 로그아웃한 뒤에는 백그라운드 익명 세션(ensureAnonymousSession)을
 * 붙이지 않습니다. 로그인/회원가입을 다시 시도하면 플래그가 해제됩니다.
 */
export const EXPLICIT_LOGOUT_STORAGE_KEY = 'myview_explicit_logout'

export function setExplicitLogout(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) localStorage.setItem(EXPLICIT_LOGOUT_STORAGE_KEY, '1')
  else localStorage.removeItem(EXPLICIT_LOGOUT_STORAGE_KEY)
}

export function isExplicitLogout(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(EXPLICIT_LOGOUT_STORAGE_KEY) === '1'
}
