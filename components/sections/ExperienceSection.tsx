'use client'

import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { timelineItems } from '@/lib/data'

type Filter = 'all' | 'work' | 'education'

export default function ExperienceSection() {
  const { lang, t } = useLang()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = timelineItems.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'work') return item.type === 'work'
    return item.type === 'education'
  })

  return (
    <div className="px-6 md:px-10 py-8 max-w-3xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-6">
        {t.experience.subtitle}
      </p>

      {/* Download buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {[
          { href: '/downloads/cv.pdf',          labelEn: 'CV',                       labelDe: 'Lebenslauf' },
          { href: '/downloads/zertifikate.pdf', labelEn: 'Certificates & Education', labelDe: 'Zertifikate & Ausbildungen' },
        ].map(({ href, labelEn, labelDe }) => (
          <a
            key={href}
            href={href}
            download
            className="inline-flex items-center justify-center gap-2 font-mono text-xs border border-[#2a2a2a] hover:border-primary/40 text-outline hover:text-primary px-4 py-2.5 rounded-sm transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>download</span>
            {lang === 'de' ? labelDe : labelEn}
          </a>
        ))}
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-10">
        {(['all', 'work', 'education'] as Filter[]).map((f) => {
          const label =
            f === 'all' ? t.experience.filterAll
            : f === 'work' ? t.experience.filterWork
            : t.experience.filterEdu
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-4 py-1.5 rounded-sm border transition-colors ${
                filter === f
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-[#2a2a2a] text-outline hover:border-outline hover:text-on-surface-variant'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1e1e1e]" />

        <div className="space-y-10 pl-8">
          {visible.map((item) => (
            <div key={item.id} className="relative">
              {/* Dot */}
              <div
                className={`absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                  item.type === 'work'
                    ? 'bg-primary/30 border-primary/70'
                    : 'bg-tertiary/30 border-tertiary/70'
                }`}
                style={{ marginLeft: -7 + 8 - 7 }}
              />
              <div
                className={`absolute border-l-2 pl-0 ${
                  item.type === 'work' ? 'border-primary/20' : 'border-tertiary/20'
                }`}
                style={{ left: -16, top: 0, bottom: 0 }}
              />

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-sm ${
                      item.type === 'work'
                        ? 'bg-primary/10 text-primary/80'
                        : 'bg-tertiary/10 text-tertiary/80'
                    }`}
                  >
                    {item.type === 'work'
                      ? t.experience.filterWork
                      : t.experience.filterEdu}
                  </span>
                  <span className="font-mono text-xs text-outline">{item.period}</span>
                </div>
                <h3 className="text-on-surface font-mono text-sm font-semibold mb-0.5">
                  {lang === 'de' ? item.title.de : item.title.en}
                </h3>
                <p className="font-mono text-xs text-on-surface-variant mb-3">
                  {lang === 'de' ? item.company.de : item.company.en}
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {lang === 'de' ? item.description.de : item.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
