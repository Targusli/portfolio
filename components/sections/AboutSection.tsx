'use client'

import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { aboutItems } from '@/lib/data'

function AboutDetail({ itemId }: { itemId: string }) {
  const { lang } = useLang()
  const item = aboutItems.find((a) => a.id === itemId)
  if (!item) return null

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <h2 className="font-mono text-xl font-bold text-white mb-2">
        {lang === 'de' ? item.title.de : item.title.en}
      </h2>
      <p className="font-mono text-sm text-outline mb-8">
        {lang === 'de' ? item.subtitle.de : item.subtitle.en}
      </p>

      {/* Decorative placeholder image block */}
      <div className="w-full h-48 mb-8 rounded-sm border border-[#1e1e1e] bg-surface-container flex items-center justify-center overflow-hidden relative">
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

      <p className="text-on-surface-variant leading-relaxed text-[15px]">
        {lang === 'de' ? item.body.de : item.body.en}
      </p>
    </div>
  )
}

function OverviewView() {
  const { lang, t } = useLang()
  const { openModal } = useModal()

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.about.subtitle}</p>
      <div className="grid gap-4">
        {aboutItems.map((item) => (
          <button
            key={item.id}
            onClick={() => openModal(`about-${item.id}`)}
            className="text-left border border-[#1e1e1e] rounded-sm p-5 hover:border-primary/30 hover:bg-surface-container transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                {lang === 'de' ? item.title.de : item.title.en}
              </span>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors" style={{ fontSize: 16 }}>
                arrow_forward
              </span>
            </div>
            <p className="font-mono text-xs text-outline leading-relaxed">
              {lang === 'de' ? item.subtitle.de : item.subtitle.en}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { activeModal } = useModal()

  if (activeModal?.startsWith('about-')) {
    const itemId = activeModal.replace('about-', '')
    return <AboutDetail itemId={itemId} />
  }

  return <OverviewView />
}
