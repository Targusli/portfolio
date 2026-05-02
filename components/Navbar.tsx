'use client'

import { useState } from 'react'
import { useModal } from '@/lib/modal'
import { useLang } from '@/lib/i18n'

export default function Navbar() {
  const { openModal } = useModal()
  const { lang, setLang, t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'hobbies', label: t.nav.hobbies },
    { id: 'contact', label: t.nav.contact },
  ]

  function handleNavClick(id: string) {
    openModal(id)
    setMenuOpen(false)
  }

  function toggleLang() {
    setLang(lang === 'en' ? 'de' : 'en')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 h-14 bg-[#080808]/90 backdrop-blur-sm border-b border-[#1e1e1e]">
      <div className="flex items-center justify-between h-full px-6 md:px-10">
        {/* Logo */}
        <button
          onClick={() => {}}
          className="font-mono text-sm font-bold tracking-widest text-on-surface hover:text-primary transition-colors"
        >
          Noah Zuppiger
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => handleNavClick(id)}
                className="font-mono text-xs text-outline hover:text-on-surface transition-colors"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Lang toggle + mobile menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-mono text-xs text-outline hover:text-primary transition-colors tracking-widest"
          >
            {lang === 'en' ? 'DE' : 'EN'}
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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808] border-t border-[#1e1e1e] flex flex-col px-6 py-5 gap-5">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="text-left font-mono text-sm text-outline hover:text-on-surface transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
