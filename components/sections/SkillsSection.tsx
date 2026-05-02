'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { languages, tools, skills } from '@/lib/data'

type SkillFilter = 'All' | 'Design' | 'IT' | 'Marketing'

// ─── Languages sub-view ──────────────────────────────────────────────────────

function LanguagesView() {
  const { lang, t } = useLang()
  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.skills.languagesIntro}</p>
      <div className="space-y-6">
        {languages.map((l) => (
          <div key={l.name}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{l.flag}</span>
                <span className="font-mono text-sm text-on-surface">{l.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {l.cert && (
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-primary/30 text-primary/70 rounded-sm">
                    {l.cert}
                  </span>
                )}
                <span className="font-mono text-xs text-outline">
                  {lang === 'de' ? l.level.de : l.level.en}
                </span>
              </div>
            </div>
            <div className="h-px bg-[#1e1e1e] relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-primary origin-left rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: l.proficiency / 100 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tools sub-view ──────────────────────────────────────────────────────────

function ToolsView() {
  const { t } = useLang()
  const [filter, setFilter] = useState<SkillFilter>('All')
  const filters: SkillFilter[] = ['All', 'Design', 'IT', 'Marketing']

  const visible = tools.filter((s) => filter === 'All' || s.category === filter)

  function chipSize(size: 1 | 2 | 3) {
    if (size === 3) return 'text-sm px-4 py-2'
    if (size === 2) return 'text-xs px-3 py-1.5'
    return 'text-[11px] px-2.5 py-1'
  }

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-6">{t.skills.toolsIntro}</p>
      <div className="flex gap-2 flex-wrap mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-xs px-3 py-1 rounded-sm border transition-colors ${
              filter === f
                ? 'border-primary text-primary bg-primary/10'
                : 'border-[#2a2a2a] text-outline hover:border-outline hover:text-on-surface-variant'
            }`}
          >
            {f === 'All' ? t.skills.filterAll : f}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {visible.map((tool) => (
          <motion.span
            key={tool.name}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`font-mono border border-[#2a2a2a] text-on-surface-variant bg-surface-container rounded-sm hover:border-primary/40 hover:text-on-surface transition-colors ${chipSize(tool.size)}`}
          >
            {tool.name}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// ─── Skills sub-view ─────────────────────────────────────────────────────────

function SkillsView() {
  const { t } = useLang()
  const [filter, setFilter] = useState<SkillFilter>('All')
  const filters: SkillFilter[] = ['All', 'Design', 'IT', 'Marketing']

  const visible = skills.filter((s) => filter === 'All' || s.category === filter)

  function chipSize(size: 1 | 2 | 3) {
    if (size === 3) return 'text-sm px-4 py-2'
    if (size === 2) return 'text-xs px-3 py-1.5'
    return 'text-[11px] px-2.5 py-1'
  }

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-6">{t.skills.skillsIntro}</p>
      <div className="flex gap-2 flex-wrap mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono text-xs px-3 py-1 rounded-sm border transition-colors ${
              filter === f
                ? 'border-primary text-primary bg-primary/10'
                : 'border-[#2a2a2a] text-outline hover:border-outline hover:text-on-surface-variant'
            }`}
          >
            {f === 'All' ? t.skills.filterAll : f}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {visible.map((skill) => (
          <motion.span
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`font-mono border border-[#2a2a2a] text-on-surface-variant bg-surface-container rounded-sm hover:border-primary/40 hover:text-on-surface transition-colors ${chipSize(skill.size)}`}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

function OverviewView() {
  const { lang, t } = useLang()
  const { pushModal } = useModal()

  const cards = [
    {
      id: 'skills-languages',
      label: t.skills.languages,
      count: languages.length,
      desc: t.skills.languagesIntro,
      preview: languages.slice(0, 3).map((l) => `${l.flag} ${l.name}`),
    },
    {
      id: 'skills-tools',
      label: t.skills.tools,
      count: tools.length,
      desc: t.skills.toolsIntro,
      preview: tools.filter((t) => t.size === 3).slice(0, 4).map((t) => t.name),
    },
    {
      id: 'skills-skills',
      label: t.skills.skills,
      count: skills.length,
      desc: t.skills.skillsIntro,
      preview: skills.filter((s) => s.size === 3).slice(0, 4).map((s) => s.name),
    },
  ]

  const moreLabel = lang === 'de' ? 'Mehr Infos' : 'More information'

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.skills.subtitle}</p>
      <div className="grid gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border border-[#1e1e1e] rounded-sm p-5 hover:border-primary/30 hover:bg-surface-container transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                {card.label}
              </span>
              <span className="font-mono text-xs text-outline">{card.count}</span>
            </div>
            <p className="font-mono text-xs text-outline leading-relaxed mb-4">{card.desc}</p>

            {/* Preview chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {card.preview.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[11px] px-2.5 py-1 border border-[#252525] text-on-surface-variant bg-[#111316] rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* More information — bottom right */}
            <div className="flex justify-end">
              <button
                onClick={() => pushModal(card.id)}
                className="font-mono text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1"
              >
                {moreLabel}
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const { activeModal } = useModal()

  if (activeModal === 'skills-languages') return <LanguagesView />
  if (activeModal === 'skills-tools') return <ToolsView />
  if (activeModal === 'skills-skills') return <SkillsView />
  return <OverviewView />
}
