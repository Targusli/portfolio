'use client'

import { useState, useRef, useEffect } from 'react'
import { useModal } from '@/lib/modal'
import { useLang } from '@/lib/i18n'

interface SubItem {
  id: string
  label: string
  action: () => void
}

export default function Navbar() {
  const { openModal, replaceStack } = useModal()
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen]         = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  function openDrop(id: string) {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setOpenDropdown(id)
  }

  function scheduleDrop() {
    closeTimer.current = setTimeout(() => { setOpenDropdown(null); closeTimer.current = null }, 200)
  }

  function close() { setMenuOpen(false); setOpenDropdown(null) }

  const subItems: Record<string, SubItem[]> = {
    about: [
      { id: 'interests', label: lang === 'de' ? 'Interessen'      : 'Interests',  action: () => { replaceStack(['about', 'about-interests']); close() } },
      { id: 'goals',     label: lang === 'de' ? 'Ziele'           : 'Goals',      action: () => { replaceStack(['about', 'about-goals']); close() } },
    ],
    experience: [
      { id: 'work', label: lang === 'de' ? 'Berufserfahrung' : 'Work',      action: () => { replaceStack(['experience', 'experience-work']); close() } },
      { id: 'edu',  label: lang === 'de' ? 'Ausbildung'      : 'Education', action: () => { replaceStack(['experience', 'experience-education']); close() } },
    ],
    skills: [
      { id: 'languages', label: lang === 'de' ? 'Sprachen' : 'Languages',   action: () => { replaceStack(['skills', 'skills-languages']); close() } },
      { id: 'tools',     label: 'Skills & Tools',                            action: () => { replaceStack(['skills', 'skills-tools']); close() } },
    ],
    projects: [
      { id: 'trading',   label: 'Trading',                                        action: () => { replaceStack(['projects', 'project-trading']); close() } },
      { id: 'potential', label: lang === 'de' ? 'Potenzial' : 'Analysis',        action: () => { replaceStack(['projects', 'project-potential']); close() } },
      { id: 'dam',       label: 'DAM',                                            action: () => { replaceStack(['projects', 'project-dam']); close() } },
      { id: 'portfolio', label: 'Portfolio',                                      action: () => { replaceStack(['projects', 'project-portfolio']); close() } },
      { id: 'shorts',    label: 'Shorts',                                         action: () => { replaceStack(['projects', 'project-shorts']); close() } },
      { id: 'pending',   label: 'In Progress',                                    action: () => { replaceStack(['projects', 'project-pending']); close() } },
    ],
    contact: [],
  }

  const navItems = [
    { id: 'about',      label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills',     label: t.nav.skills },
    { id: 'projects',   label: t.nav.projects },
    { id: 'contact',    label: t.nav.contact },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 h-14 bg-[#080808]/90 backdrop-blur-sm border-b border-[#1e1e1e]">
      <div className="relative flex items-center justify-between h-full px-6 md:px-10">

        {/* Logo */}
        <button
          onClick={() => {}}
          className="font-mono text-sm font-bold tracking-widest text-white hover:text-primary transition-colors relative z-10"
        >
          Noah Zuppiger
        </button>

        {/* Desktop nav — centered */}
        <ul className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navItems.map(({ id, label }) => {
            const subs = subItems[id] ?? []
            return (
              <li
                key={id}
                className="relative"
                onMouseEnter={() => openDrop(id)}
                onMouseLeave={scheduleDrop}
              >
                <button
                  onClick={() => { openModal(id); close() }}
                  className="font-mono text-sm font-semibold text-white/70 hover:text-white transition-colors tracking-wide flex items-center gap-0.5 py-2"
                >
                  {label}
                  {subs.length > 0 && (
                    <span className="material-symbols-outlined text-outline/50" style={{ fontSize: 15 }}>
                      keyboard_arrow_down
                    </span>
                  )}
                </button>

                {/* Invisible bridge over the gap so cursor doesn't leave li */}
                {openDropdown === id && subs.length > 0 && (
                  <div className="absolute top-full left-0 right-0 h-2" />
                )}

                {/* Dropdown */}
                {openDropdown === id && subs.length > 0 && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-[#0d0d0d] border border-[#2a2a2a] rounded-sm shadow-lg min-w-[168px] overflow-hidden z-50"
                    onMouseEnter={() => openDrop(id)}
                    onMouseLeave={scheduleDrop}
                  >
                    {subs.slice(0, 6).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={sub.action}
                        className="w-full text-left px-4 py-2.5 font-mono text-xs text-outline hover:text-on-surface hover:bg-[#161616] transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {/* Right — lang toggle + hamburger */}
        <div className="flex items-center gap-4 relative z-10">
          <button
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className="font-mono text-sm font-semibold px-4 py-2 text-on-surface-variant hover:text-primary transition-all rounded-sm tracking-wide"
            style={{
              border: '1px solid rgba(74,127,193,0.35)',
              boxShadow: '0 0 10px -2px rgba(74,127,193,0.25), inset 0 0 12px -6px rgba(74,127,193,0.10)',
            }}
          >
            {lang === 'en' ? 'Deutsch' : 'English'}
          </button>

          <button
            className="md:hidden text-on-surface-variant hover:text-on-surface transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808] border-t border-[#1e1e1e] flex flex-col px-6 py-4">
          {navItems.map(({ id, label }) => {
            const subs = subItems[id] ?? []
            return (
              <div key={id}>
                <button
                  onClick={() => { openModal(id); close() }}
                  className="w-full text-left py-3 font-mono text-sm text-white/70 hover:text-white transition-colors"
                >
                  {label}
                </button>
                {subs.length > 0 && (
                  <div className="pl-4 pb-1 flex flex-col">
                    {subs.slice(0, 6).map((sub) => (
                      <button
                        key={sub.id}
                        onClick={sub.action}
                        className="w-full text-left py-2 font-mono text-xs text-outline hover:text-on-surface transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </nav>
  )
}
