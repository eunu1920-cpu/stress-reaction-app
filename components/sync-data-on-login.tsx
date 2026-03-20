'use client'

import { useSyncData } from '@/hooks/useSyncData'

export function SyncDataOnLogin() {
  useSyncData()
  return null
}
