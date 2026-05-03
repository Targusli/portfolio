'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { languages, skillCategories } from '@/lib/data'
import Breadcrumbs from '@/components/Breadcrumbs'

// ─── Languages sub-view ──────────────────────────────────────────────────────

function LanguagesView() {
  const { lang, t } = useLang()

  const spoken      = languages.filter((l) => l.type !== 'programming')
  const programming = languages.filter((l) => l.type === 'programming')

  function Bar({ proficiency }: { proficiency: number }) {
    return (
      <div className="relative h-0.5 bg-[#1e1e1e] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: proficiency / 100 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    )
  }

  function LangRow({ l }: { l: typeof languages[number] }) {
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-lg font-mono leading-none w-7 text-center">{l.flag}</span>
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
        <Bar proficiency={l.proficiency} />
      </div>
    )
  }

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <Breadcrumbs className="mb-6" />
      <h2 className="font-mono text-2xl font-bold text-white mb-8">{t.skills.languages}</h2>

      <div className="space-y-5">
        {spoken.map((l) => <LangRow key={l.name} l={l} />)}

        {programming.length > 0 && (
          <>
            <div className="flex items-center gap-4 pt-3 pb-1">
              <div className="h-px flex-1 bg-[#1e1e1e]" />
              <span className="font-mono text-[10px] text-outline tracking-widest uppercase">
                {lang === 'de' ? 'Programmiersprachen' : 'Programming Languages'}
              </span>
              <div className="h-px flex-1 bg-[#1e1e1e]" />
            </div>
            {programming.map((l) => <LangRow key={l.name} l={l} />)}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Skills & Tools categorized view ─────────────────────────────────────────

function SkillsToolsView() {
  const { lang, t } = useLang()

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <Breadcrumbs className="mb-6" />
      <h2 className="font-mono text-2xl font-bold text-white mb-3">{t.skills.tools}</h2>
      <p className="font-mono text-sm text-on-surface-variant mb-10">{t.skills.toolsIntro}</p>

      <div className="space-y-8">
        {skillCategories.map((cat) => (
          <div key={cat.id}>
            <h3 className="font-mono text-xs text-outline tracking-widest uppercase mb-3 flex items-center gap-3">
              {lang === 'de' ? cat.title.de : cat.title.en}
              <span className="flex-1 h-px bg-[#1e1e1e]" />
            </h3>
            <div className="space-y-2">
              {cat.tools.map((tool) => (
                <div key={tool.name} className="border border-[#1e1e1e] rounded-sm px-4 py-3">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-mono text-sm text-on-surface">{tool.name}</span>
                    {tool.note && (
                      <span className="font-mono text-[11px] text-outline">
                        {lang === 'de' ? tool.note.de : tool.note.en}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-outline leading-relaxed">
                    {lang === 'de' ? tool.description.de : tool.description.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Overview ────────────────────────────────────────────────────────────────

function OverviewView() {
  const { lang, t } = useLang()
  const { pushModal } = useModal()
  const moreLabel = lang === 'de' ? 'Mehr Infos' : 'More information'

  const cards = [
    {
      id: 'skills-languages',
      label: t.skills.languages,
      desc: t.skills.languagesIntro,
      preview: languages.filter((l) => l.type !== 'programming').slice(0, 3).map((l) => `${l.flag} ${l.name}`),
    },
    {
      id: 'skills-tools',
      label: t.skills.tools,
      desc: t.skills.toolsIntro,
      preview: skillCategories.map((c) => (lang === 'de' ? c.title.de : c.title.en)),
    },
  ]

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <Breadcrumbs className="mb-6" />
      <h2 className="font-mono text-2xl font-bold text-white mb-3">{t.skills.title}</h2>
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.skills.subtitle}</p>
      <div className="grid gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="border border-[#1e1e1e] rounded-sm p-5 hover:border-primary/30 hover:bg-surface-container transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => pushModal(card.id)}
                className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors text-left"
              >
                {card.label}
              </button>
            </div>
            <p className="font-mono text-xs text-outline leading-relaxed mb-4">{card.desc}</p>
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
            <div className="flex justify-end">
              <button
                onClick={() => pushModal(card.id)}
                className="font-mono text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1"
              >
                {moreLabel}
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
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
  if (activeModal === 'skills-tools')     return <SkillsToolsView />
  return <OverviewView />
}
