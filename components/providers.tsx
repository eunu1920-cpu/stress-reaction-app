'use client'

import { AuthProvider } from '@/lib/auth-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { KakaoInAppBrowserModal } from '@/components/kakao-inapp-browser-modal'
import { SyncDataOnLogin } from '@/components/sync-data-on-login'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <SyncDataOnLogin />
        {children}
        <KakaoInAppBrowserModal />
        <Toaster richColors position="bottom-center" />
      </AuthProvider>
    </ThemeProvider>
  )
}
