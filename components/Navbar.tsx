'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/skills', label: 'SKILLS' },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/contact', label: 'CONTACT' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-neutral-950 font-mono uppercase tracking-tighter text-xs border-b border-neutral-800 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center w-full px-6 md:px-10 py-5">
        <Link
          href="/"
          className="font-bold tracking-widest text-neutral-50 hover:text-blue-400 transition-colors duration-150"
        >
          NOAH ZUPPIGER
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  pathname === href
                    ? 'text-blue-400 border-b border-blue-400 pb-0.5'
                    : 'text-neutral-400 hover:text-blue-300 transition-colors duration-150 active:scale-95'
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block text-neutral-400 hover:text-blue-300 transition-colors duration-150 cursor-pointer select-none">
          DE/EN
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-neutral-50"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-800 flex flex-col px-6 py-4 gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? 'text-blue-400'
                  : 'text-neutral-400 hover:text-blue-300 transition-colors'
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="text-neutral-500 pt-2 border-t border-neutral-800">DE/EN</div>
        </div>
      )}
    </nav>
  )
}
