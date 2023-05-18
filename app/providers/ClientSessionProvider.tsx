'use client'

import { SessionProvider } from 'next-auth/react'

export interface ClientSessionProviderProps {
  children: React.ReactNode
}

export default function ClientSessionProvider({
  children,
}: ClientSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
