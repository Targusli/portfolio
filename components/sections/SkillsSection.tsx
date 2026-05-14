'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { languages, skillCategories } from '@/lib/data'
import Breadcrumbs from '@/components/Breadcrumbs'

// ─── Languages sub-view ──────────────────────────────────────────────────────

function LanguagesView() {
  const { lang, t } = useLang()

  const spoken = languages.filter((l) => l.type !== 'programming')

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
            <span className="font-mono text-lg leading-none w-7 text-center">{l.flag}</span>
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
      </div>
    </div>
  )
}

// ─── Skills & Tools categorized view ─────────────────────────────────────────

function SkillsToolsView() {
  const { lang, t } = useLang()

  const programming = languages.filter((l) => l.type === 'programming')

  const practicalLabel = lang === 'de' ? 'Praxiserfahrung' : 'Practical Experience'
  const basicLabel     = lang === 'de' ? 'Grundkenntnisse' : 'Basic Knowledge'

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

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <Breadcrumbs className="mb-6" />
      <h2 className="font-mono text-2xl font-bold text-white mb-3">{t.skills.tools}</h2>
      <p className="font-mono text-sm text-on-surface-variant mb-6">{t.skills.toolsIntro}</p>

      {/* Legend */}
      <div className="flex gap-3 mb-10">
        <div className="px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/10">
          <span className="font-mono text-xs text-primary">{practicalLabel}</span>
        </div>
        <div className="px-3 py-1.5 rounded-sm border border-amber-500/30 bg-amber-500/10">
          <span className="font-mono text-xs text-amber-500">{basicLabel}</span>
        </div>
      </div>

      {/* ── Programming languages ── */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-[#1e1e1e]" />
          <span className="font-mono text-[10px] text-outline tracking-widest uppercase">
            {lang === 'de' ? 'Programmiersprachen' : 'Programming Languages'}
          </span>
          <div className="h-px flex-1 bg-[#1e1e1e]" />
        </div>

        <div className="space-y-5">
          {programming.map((l) => (
            <div key={l.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-outline/70 w-7 text-center leading-none">{l.flag}</span>
                  <span className="font-mono text-sm text-on-surface">{l.name}</span>
                </div>
                <span className="font-mono text-xs text-outline">
                  {lang === 'de' ? l.level.de : l.level.en}
                </span>
              </div>
              <Bar proficiency={l.proficiency} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Skill categories ── */}
      <div className="space-y-12">
        {skillCategories.map((cat) => {
          const toolsSecs     = cat.sections.filter((s) => s.type === 'tools')
          const skillsSecs    = cat.sections.filter((s) => s.type === 'skills')
          const toolsPractical = toolsSecs.flatMap((s) => s.practical)
          const toolsBasic     = toolsSecs.flatMap((s) => s.basic)
          const skillsPractical = skillsSecs.flatMap((s) => s.practical)
          const skillsBasic     = skillsSecs.flatMap((s) => s.basic)
          const hasTools  = toolsPractical.length + toolsBasic.length > 0
          const hasSkills = skillsPractical.length + skillsBasic.length > 0

          return (
            <div key={cat.id}>
              {/* Category title with line */}
              <div className="flex items-center gap-4 mb-5">
                <h3 className="font-mono text-base font-semibold text-on-surface">
                  {lang === 'de' ? cat.title.de : cat.title.en}
                </h3>
                <div className="h-px flex-1 bg-[#1e1e1e]" />
              </div>

              <div className="space-y-4">
                {/* Tools box */}
                {hasTools && (
                  <div>
                    <span className="font-mono text-[10px] text-outline tracking-widest uppercase mb-2 block">
                      Tools
                    </span>
                    <div className="border border-[#1e1e1e] rounded-sm p-4">
                      <div className="flex flex-wrap gap-2">
                        {toolsPractical.map((item) => (
                          <span
                            key={item.de}
                            className="font-mono text-xs px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/10 text-primary"
                          >
                            {lang === 'de' ? item.de : item.en}
                          </span>
                        ))}
                        {toolsBasic.map((item) => (
                          <span
                            key={item.de}
                            className="font-mono text-xs px-3 py-1.5 rounded-sm border border-amber-500/30 bg-amber-500/10 text-amber-500"
                          >
                            {lang === 'de' ? item.de : item.en}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills box */}
                {hasSkills && (
                  <div>
                    <span className="font-mono text-[10px] text-outline tracking-widest uppercase mb-2 block">
                      Skills
                    </span>
                    <div className="border border-[#1e1e1e] rounded-sm p-4">
                      <div className="flex flex-wrap gap-2">
                        {skillsPractical.map((item) => (
                          <span
                            key={item.de}
                            className="font-mono text-xs px-3 py-1.5 rounded-sm border border-primary/30 bg-primary/10 text-primary"
                          >
                            {lang === 'de' ? item.de : item.en}
                          </span>
                        ))}
                        {skillsBasic.map((item) => (
                          <span
                            key={item.de}
                            className="font-mono text-xs px-3 py-1.5 rounded-sm border border-amber-500/30 bg-amber-500/10 text-amber-500"
                          >
                            {lang === 'de' ? item.de : item.en}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
          <button
            key={card.id}
            onClick={() => pushModal(card.id)}
            className="text-left border border-[#1e1e1e] rounded-sm p-5 hover:border-primary/30 hover:bg-surface-container transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                {card.label}
              </span>
              <span
                className="material-symbols-outlined text-outline group-hover:text-primary transition-colors"
                style={{ fontSize: 18 }}
              >
                arrow_forward
              </span>
            </div>
            <p className="font-mono text-xs text-outline leading-relaxed mb-4">{card.desc}</p>
            <div className="flex flex-wrap gap-2">
              {card.preview.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[11px] px-2.5 py-1 border border-[#252525] text-on-surface-variant bg-[#111316] rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </button>
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
