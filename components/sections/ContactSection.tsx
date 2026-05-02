'use client'

import { useState } from 'react'
import { useLang } from '@/lib/i18n'

type Status = 'idle' | 'sending' | 'sent'

export default function ContactSection() {
  const { t } = useLang()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1600)
  }

  if (status === 'sent') {
    return (
      <div className="px-6 md:px-10 py-16 max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center gap-4">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: 48 }}>
          check_circle
        </span>
        <p className="font-mono text-sm text-on-surface">{t.contact.sent}</p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-[#0a0a0a] border border-[#1e1e1e] focus:border-primary/50 outline-none rounded-sm px-4 py-3 font-mono text-sm text-on-surface placeholder:text-outline/50 transition-colors'

  return (
    <div className="px-6 md:px-10 py-8 max-w-xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.contact.subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-mono text-xs text-outline mb-2 tracking-wider uppercase">
            {t.contact.name}
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={t.contact.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-outline mb-2 tracking-wider uppercase">
            {t.contact.email}
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={t.contact.emailPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-outline mb-2 tracking-wider uppercase">
            {t.contact.message}
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder={t.contact.messagePlaceholder}
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full font-mono text-sm py-3 px-6 bg-primary/10 border border-primary/40 text-primary hover:bg-primary/20 hover:border-primary/70 transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? t.contact.sending : t.contact.send}
        </button>
      </form>
    </div>
  )
}
