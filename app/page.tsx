'use client'

import { useState } from 'react'
import { useModal } from '@/lib/modal'
import { useLang } from '@/lib/i18n'
import { projects, hobbies } from '@/lib/data'
import NodeGraph from '@/components/NodeGraph'
import Modal from '@/components/Modal'
import LoadingScreen from '@/components/LoadingScreen'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import HobbiesSection from '@/components/sections/HobbiesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const { activeModal, modalStack } = useModal()
  const { lang, t } = useLang()

  function getTitle(): string {
    if (!activeModal) return ''
    if (activeModal === 'experience') return t.experience.title
    if (activeModal === 'skills') return t.skills.title
    if (activeModal === 'skills-languages') return t.skills.languages
    if (activeModal === 'skills-tools') return t.skills.tools
    if (activeModal === 'skills-skills') return t.skills.skills
    if (activeModal === 'projects') return t.projects.title
    if (activeModal.startsWith('project-')) {
      const id = activeModal.replace('project-', '')
      return projects.find((p) => p.id === id)?.title ?? ''
    }
    if (activeModal === 'hobbies') return t.hobbies.title
    if (activeModal.startsWith('hobby-')) {
      const id = activeModal.replace('hobby-', '')
      const h = hobbies.find((h) => h.id === id)
      return h ? (lang === 'de' ? h.title.de : h.title.en) : ''
    }
    if (activeModal === 'contact') return t.contact.title
    return ''
  }

  function getContent() {
    if (!activeModal) return null
    if (activeModal === 'experience') return <ExperienceSection />
    if (activeModal.startsWith('skills')) return <SkillsSection />
    if (activeModal.startsWith('project')) return <ProjectsSection />
    if (activeModal.startsWith('hobby')) return <HobbiesSection />
    if (activeModal === 'contact') return <ContactSection />
    return null
  }

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />

      {/* Graph fades in after loading screen */}
      <div
        className="fixed inset-0 pt-14 transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <NodeGraph />
      </div>

      <Modal title={getTitle()} canGoBack={modalStack.length > 1}>
        {getContent()}
      </Modal>
    </>
  )
}
