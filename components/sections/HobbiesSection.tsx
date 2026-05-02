'use client'

import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { hobbies } from '@/lib/data'

function HobbyDetail({ hobbyId }: { hobbyId: string }) {
  const { lang } = useLang()
  const hobby = hobbies.find((h) => h.id === hobbyId)
  if (!hobby) return null

  return (
    <div className="px-6 md:px-10 py-8 max-w-xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl">{hobby.emoji}</span>
        <h2 className="font-mono text-lg text-on-surface">
          {lang === 'de' ? hobby.title.de : hobby.title.en}
        </h2>
      </div>
      <p className="text-on-surface-variant leading-relaxed">
        {lang === 'de' ? hobby.detail.de : hobby.detail.en}
      </p>
    </div>
  )
}

function OverviewView() {
  const { lang, t } = useLang()
  const { openModal } = useModal()

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.hobbies.subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hobbies.map((hobby) => (
          <button
            key={hobby.id}
            onClick={() => openModal(`hobby-${hobby.id}`)}
            className="text-left border border-[#1e1e1e] rounded-sm p-5 hover:border-primary/30 hover:bg-surface-container transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{hobby.emoji}</span>
              <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                {lang === 'de' ? hobby.title.de : hobby.title.en}
              </span>
            </div>
            <p className="font-mono text-xs text-outline leading-relaxed line-clamp-2">
              {lang === 'de' ? hobby.description.de : hobby.description.en}
            </p>
            <span className="inline-block mt-3 font-mono text-[10px] text-primary/60 group-hover:text-primary/90 transition-colors">
              {t.hobbies.viewMore} →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function HobbiesSection() {
  const { activeModal } = useModal()

  if (activeModal?.startsWith('hobby-')) {
    const hobbyId = activeModal.replace('hobby-', '')
    return <HobbyDetail hobbyId={hobbyId} />
  }

  return <OverviewView />
}
