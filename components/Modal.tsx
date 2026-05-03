'use client'

import { Fragment, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useModal } from '@/lib/modal'
import { useLang, type Translations } from '@/lib/i18n'
import { projects, aboutItems } from '@/lib/data'

interface ModalProps {
  children: React.ReactNode
  title?: string
  canGoBack?: boolean
}

function resolveLabel(id: string, lang: 'en' | 'de', t: Translations): string {
  if (id === 'experience')           return t.experience.title
  if (id === 'experience-work')      return lang === 'de' ? 'Berufserfahrung' : 'Work'
  if (id === 'experience-education') return lang === 'de' ? 'Ausbildung' : 'Education'
  if (id === 'skills')               return t.skills.title
  if (id === 'skills-languages')     return t.skills.languages
  if (id === 'skills-tools')         return t.skills.tools
  if (id === 'projects')             return t.projects.title
  if (id.startsWith('project-')) {
    const pid = id.replace('project-', '')
    return projects.find((p) => p.id === pid)?.title ?? id
  }
  if (id === 'about')                return t.about.title
  if (id.startsWith('about-')) {
    const aid = id.replace('about-', '')
    const item = aboutItems.find((a) => a.id === aid)
    return item ? (lang === 'de' ? item.title.de : item.title.en) : id
  }
  if (id === 'contact') return lang === 'de' ? 'Kontakt' : 'Contact'
  return id
}

export default function Modal({ children, title, canGoBack }: ModalProps) {
  const { activeModal, modalStack, closeModal, popModal, openModal } = useModal()
  const { lang, t } = useLang()
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
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
          />

          {/* Modal panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-10 lg:inset-16 z-50 bg-[#0d0d0d] border border-primary/20 flex flex-col overflow-hidden rounded-sm"
            style={{
              boxShadow: '0 0 80px -15px rgba(74,127,193,0.25), 0 0 200px -60px rgba(74,127,193,0.15), inset 0 0 120px -70px rgba(74,127,193,0.06)',
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
              {/* Breadcrumbs */}
              {modalStack.length > 0 && (
                <div className="px-6 md:px-10 pt-5 flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={closeModal}
                    className="font-mono text-[11px] text-outline/60 hover:text-outline transition-colors"
                  >
                    {lang === 'de' ? 'Übersicht' : 'Overview'}
                  </button>
                  {modalStack.map((id, i) => {
                    const isLast = i === modalStack.length - 1
                    const label = resolveLabel(id, lang, t)
                    return (
                      <Fragment key={id}>
                        <span className="font-mono text-[11px] text-outline/30 select-none">/</span>
                        {isLast ? (
                          <span className="font-mono text-[11px] text-primary">{label}</span>
                        ) : (
                          <button
                            onClick={() => openModal(id)}
                            className="font-mono text-[11px] text-outline/60 hover:text-outline transition-colors"
                          >
                            {label}
                          </button>
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
