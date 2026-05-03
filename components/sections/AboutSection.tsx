'use client'

import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { aboutItems, bio } from '@/lib/data'

// ── Sub-page detail view ──────────────────────────────────────────────────────

function AboutDetail({ itemId }: { itemId: string }) {
  const { lang } = useLang()
  const { popModal } = useModal()
  const item = aboutItems.find((a) => a.id === itemId)
  if (!item) return null

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <button
        onClick={popModal}
        className="font-mono text-xs text-outline hover:text-primary transition-colors mb-6 flex items-center gap-1"
      >
        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_back</span>
        {lang === 'de' ? 'Zurück' : 'Back'}
      </button>

      <h2 className="font-mono text-2xl font-bold text-white mb-2">
        {lang === 'de' ? item.title.de : item.title.en}
      </h2>
      <p className="font-mono text-sm text-outline mb-8">
        {lang === 'de' ? item.subtitle.de : item.subtitle.en}
      </p>

      {/* Decorative image placeholder */}
      <div className="w-full h-44 mb-8 rounded-sm border border-[#1e1e1e] bg-surface-container flex items-center justify-center overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #a4c9ff 1px, transparent 1px), linear-gradient(to bottom, #a4c9ff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <span className="font-mono text-[11px] text-outline tracking-widest uppercase z-10">
          {lang === 'de' ? item.title.de : item.title.en}
        </span>
      </div>

      <p className="text-on-surface-variant leading-relaxed text-[15px] whitespace-pre-line">
        {lang === 'de' ? item.body.de : item.body.en}
      </p>
    </div>
  )
}

// ── CV-style overview ─────────────────────────────────────────────────────────

function OverviewView() {
  const { lang, t } = useLang()
  const { pushModal } = useModal()
  const [imgError, setImgError] = useState(false)

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">

      {/* ── Title ── */}
      <h2 className="font-mono text-2xl font-bold text-white mb-8">
        {lang === 'de' ? 'Über mich' : 'About Me'}
      </h2>

      {/* ── Photo + name header ── */}
      <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
        {/* Profile photo */}
        <div className="shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-sm border border-[#1e1e1e] bg-surface-container overflow-hidden relative">
          {!imgError ? (
            <img
              src="/images/noah.jpg"
              alt="Noah Zuppiger"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            // Placeholder until real photo is added to /public/images/noah.jpg
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="font-mono text-3xl font-bold text-outline/40 tracking-widest">NZ</span>
              <span className="font-mono text-[9px] text-outline/30 tracking-widest uppercase">Photo</span>
            </div>
          )}
        </div>

        {/* Name + role */}
        <div className="flex flex-col justify-center gap-2 pt-1">
          <h2 className="font-mono text-2xl font-bold text-white leading-tight">
            Noah Zuppiger
          </h2>
          <p className="font-mono text-sm text-primary/80">
            Marketing · Design · IT
          </p>
          <p className="font-mono text-xs text-outline flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>location_on</span>
            Zürich, Switzerland
          </p>
        </div>
      </div>

      {/* ── Bio text ── */}
      <p className="text-on-surface-variant leading-relaxed text-[15px] whitespace-pre-line mb-10">
        {lang === 'de' ? bio.de : bio.en}
      </p>

      {/* ── Divider ── */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-[#1e1e1e]" />
        <span className="font-mono text-xs text-outline tracking-widest uppercase">
          {lang === 'de' ? 'Mehr erfahren' : 'Explore'}
        </span>
        <div className="h-px flex-1 bg-[#1e1e1e]" />
      </div>

      {/* ── Sub-node links ── */}
      <div className="grid gap-3">
        {aboutItems.map((item) => (
          <button
            key={item.id}
            onClick={() => pushModal(`about-${item.id}`)}
            className="text-left border border-[#1e1e1e] rounded-sm p-4 hover:border-primary/30 hover:bg-surface-container transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors block mb-0.5">
                  {lang === 'de' ? item.title.de : item.title.en}
                </span>
                <span className="font-mono text-xs text-outline">
                  {lang === 'de' ? item.subtitle.de : item.subtitle.en}
                </span>
              </div>
              <span
                className="material-symbols-outlined text-outline group-hover:text-primary transition-colors shrink-0 ml-4"
                style={{ fontSize: 18 }}
              >
                arrow_forward
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const { activeModal } = useModal()

  if (activeModal?.startsWith('about-')) {
    return <AboutDetail itemId={activeModal.replace('about-', '')} />
  }

  return <OverviewView />
}
