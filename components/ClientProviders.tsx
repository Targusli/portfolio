'use client'

import { LangProvider } from '@/lib/i18n'
import { ModalProvider } from '@/lib/modal'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ModalProvider>{children}</ModalProvider>
    </LangProvider>
  )
}
