'use client'

import { Fragment } from 'react'
import { useModal } from '@/lib/modal'
import { useLang, type Translations } from '@/lib/i18n'
import { projects, aboutItems } from '@/lib/data'

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
    const p = projects.find((pr) => pr.id === pid)
    return p ? (lang === 'de' ? p.title.de : p.title.en) : id
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

export default function Breadcrumbs({ className = '' }: { className?: string }) {
  const { modalStack, closeModal, openModal } = useModal()
  const { lang, t } = useLang()

  if (modalStack.length === 0) return null

  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
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
  )
}
