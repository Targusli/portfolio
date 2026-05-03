'use client'

import { useLang } from '@/lib/i18n'

const DOWNLOAD_ITEMS = [
  { href: '/downloads/cv.pdf',            labelEn: 'CV',                          labelDe: 'Lebenslauf' },
  { href: '/downloads/zertifikate.pdf',   labelEn: 'Certificates & Education',    labelDe: 'Zertifikate & Ausbildungen' },
]

export default function ContactSection() {
  const { lang } = useLang()

  return (
    <div className="px-6 md:px-10 py-8 max-w-xl mx-auto w-full">

      {/* Tagline */}
      <p className="font-mono text-sm text-on-surface-variant mb-10">
        {lang === 'de' ? 'Offen für Möglichkeiten.' : 'Open to opportunities.'}
      </p>

      {/* Contact boxes */}
      <div className="flex flex-col gap-3 mb-10">

        {/* Email */}
        <a
          href="mailto:noah.zuppiger@gmail.com"
          className="flex items-center gap-4 border border-[#1e1e1e] hover:border-primary/30 hover:bg-surface-container rounded-sm px-5 py-4 transition-all group"
        >
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" style={{ fontSize: 20 }}>
            mail
          </span>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] text-outline tracking-widest uppercase mb-0.5">Email</span>
            <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors truncate">
              noah.zuppiger@gmail.com
            </span>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors ml-auto shrink-0" style={{ fontSize: 16 }}>
            arrow_outward
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/noah-zuppiger/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border border-[#1e1e1e] hover:border-primary/30 hover:bg-surface-container rounded-sm px-5 py-4 transition-all group"
        >
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" style={{ fontSize: 20 }}>
            open_in_new
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-outline tracking-widest uppercase mb-0.5">LinkedIn</span>
            <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
              noah-zuppiger
            </span>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors ml-auto shrink-0" style={{ fontSize: 16 }}>
            arrow_outward
          </span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Targusli"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border border-[#1e1e1e] hover:border-primary/30 hover:bg-surface-container rounded-sm px-5 py-4 transition-all group"
        >
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" style={{ fontSize: 20 }}>
            code
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-outline tracking-widest uppercase mb-0.5">GitHub</span>
            <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
              Targusli
            </span>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors ml-auto shrink-0" style={{ fontSize: 16 }}>
            arrow_outward
          </span>
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-[#1e1e1e]" />
        <span className="font-mono text-[10px] text-outline tracking-widest uppercase">
          {lang === 'de' ? 'Downloads' : 'Downloads'}
        </span>
        <div className="h-px flex-1 bg-[#1e1e1e]" />
      </div>

      {/* Download buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {DOWNLOAD_ITEMS.map(({ href, labelEn, labelDe }) => (
          <a
            key={href}
            href={href}
            download
            className="flex-1 flex items-center justify-center gap-2 font-mono text-xs border border-[#2a2a2a] hover:border-primary/40 text-outline hover:text-primary px-4 py-3 rounded-sm transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
            {lang === 'de' ? labelDe : labelEn}
          </a>
        ))}
      </div>
    </div>
  )
}
