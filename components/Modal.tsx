'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useModal } from '@/lib/modal'
import { useLang } from '@/lib/i18n'

interface ModalProps {
  children: React.ReactNode
  title?: string
  canGoBack?: boolean
}

export default function Modal({ children, title, canGoBack }: ModalProps) {
  const { activeModal, closeModal, popModal } = useModal()
  const { t } = useLang()
  const isOpen = !!activeModal

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (canGoBack) popModal()
        else closeModal()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeModal, popModal, canGoBack])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-40 bg-black/82 backdrop-blur-md"
          />

          {/* Modal panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-6 md:inset-14 lg:inset-20 z-50 bg-[#0d0d0d] border border-primary/25 flex flex-col overflow-hidden rounded-sm"
            style={{
              boxShadow: [
                '0 0 0 1px rgba(74,127,193,0.08)',
                '0 0 60px -5px rgba(74,127,193,0.35)',
                '0 0 140px -20px rgba(74,127,193,0.22)',
                '0 0 280px -50px rgba(74,127,193,0.15)',
                'inset 0 0 100px -50px rgba(74,127,193,0.08)',
              ].join(', '),
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#1e1e1e] shrink-0">
              <div className="flex items-center gap-4">
                {canGoBack && (
                  <button
                    onClick={popModal}
                    className="font-mono text-xs text-outline hover:text-primary transition-colors"
                  >
                    {t.common.back}
                  </button>
                )}
                {title && (
                  <span className="font-mono text-xs tracking-widest text-on-surface-variant uppercase">
                    {title}
                  </span>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-outline hover:text-on-surface transition-colors"
                aria-label={t.common.close}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-grow overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
