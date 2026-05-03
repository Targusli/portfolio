'use client'

import { useState } from 'react'
import { useModal } from '@/lib/modal'
import { useLang } from '@/lib/i18n'
import { projects, aboutItems } from '@/lib/data'
import NodeGraph from '@/components/NodeGraph'
import Modal from '@/components/Modal'
import LoadingScreen from '@/components/LoadingScreen'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'

// ── Mobile overview card grid ────────────────────────────────────────────────

function MobileOverview() {
  const { openModal } = useModal()
  const { lang } = useLang()

  const cards = [
    { id: 'about',      label: lang === 'de' ? 'Über mich'     : 'About Me' },
    { id: 'experience', label: lang === 'de' ? 'Erfahrung'     : 'Experience' },
    { id: 'skills',     label: lang === 'de' ? 'Skills & Tools': 'Skills & Tools' },
    { id: 'projects',   label: lang === 'de' ? 'Arbeiten'      : 'Projects' },
  ]

  return (
    <div className="flex flex-col px-4 py-6 gap-4">
      <p className="text-center font-mono text-sm text-outline py-2">
        Marketing · Design · IT — Zürich
      </p>
      <div className="grid grid-cols-2 gap-4">
        {cards.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => openModal(id)}
            className="bg-[#0d0d0d] border border-[#1e1e1e] border-l-2 border-l-[#1b3a6b] p-5 flex justify-between items-center hover:border-l-primary transition-colors group text-left"
          >
            <span className="font-mono text-sm font-bold text-on-surface uppercase tracking-widest group-hover:text-primary transition-colors">
              {label}
            </span>
            <span className="text-outline font-mono group-hover:text-primary transition-colors">→</span>
          </button>
        ))}
      </div>
      {/* Contact — full width */}
      <button
        onClick={() => openModal('contact')}
        className="bg-[#0d0d0d] border border-[#1e1e1e] border-l-2 border-l-[#1b3a6b] p-5 flex justify-between items-center hover:border-l-primary transition-colors group"
      >
        <span className="font-mono text-sm font-bold text-on-surface uppercase tracking-widest group-hover:text-primary transition-colors">
          {lang === 'de' ? 'Kontakt' : 'Contact'}
        </span>
        <span className="text-outline font-mono group-hover:text-primary transition-colors">→</span>
      </button>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const { activeModal, modalStack } = useModal()
  const { lang, t } = useLang()

  function getTitle(): string {
    if (!activeModal) return ''
    if (activeModal === 'experience') return t.experience.title
    if (activeModal === 'skills')     return t.skills.title
    if (activeModal === 'skills-languages') return t.skills.languages
    if (activeModal === 'skills-tools')     return t.skills.tools
    if (activeModal === 'skills-skills')    return t.skills.skills
    if (activeModal === 'projects')   return t.projects.title
    if (activeModal.startsWith('project-')) {
      const id = activeModal.replace('project-', '')
      return projects.find((p) => p.id === id)?.title ?? ''
    }
    if (activeModal === 'about') return t.about.title
    if (activeModal.startsWith('about-')) {
      const id = activeModal.replace('about-', '')
      const a = aboutItems.find((a) => a.id === id)
      return a ? (lang === 'de' ? a.title.de : a.title.en) : ''
    }
    if (activeModal === 'contact') return t.contact.title
    return ''
  }

  function getContent() {
    if (!activeModal) return null
    if (activeModal === 'experience') return <ExperienceSection />
    if (activeModal.startsWith('skills'))  return <SkillsSection />
    if (activeModal === 'projects' || activeModal.startsWith('project-')) return <ProjectsSection />
    if (activeModal === 'about' || activeModal.startsWith('about-'))      return <AboutSection />
    if (activeModal === 'contact') return <ContactSection />
    return null
  }

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />

      {/* Desktop: full-screen node graph */}
      <div
        className="hidden md:block fixed inset-0 pt-14 transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <NodeGraph />
      </div>

      {/* Mobile: card grid overview */}
      <div
        className="md:hidden pt-14 transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <MobileOverview />
      </div>

      <Modal title={getTitle()} canGoBack={modalStack.length > 1}>
        {getContent()}
      </Modal>
    </>
  )
}
