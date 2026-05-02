'use client'

import { useState, type FormEvent } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  const inputClass =
    'w-full bg-[#080808] border border-[#1e1e1e] text-on-surface font-mono-data text-mono-data p-3 focus:outline-none focus:border-[#4a7fc1] transition-colors rounded-none'

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="mb-12">
          <h1 className="font-h1 text-h1 text-on-surface mb-6">CONTACT</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Have a project in mind, want to collaborate, or just want to say hi? Feel free to reach
            out — I try to respond within one business day.
          </p>
        </div>

        {sent ? (
          <div className="border border-[#1e1e1e] border-l-2 border-l-[#4a7fc1] p-6">
            <p className="font-mono-data text-mono-data text-primary mb-1">// MESSAGE SENT</p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Thanks for reaching out. I&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="name"
                className="block font-label-caps text-label-caps text-on-surface-variant mb-2"
              >
                NAME
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="JANE DOE"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-label-caps text-label-caps text-on-surface-variant mb-2"
              >
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="JANE@EXAMPLE.COM"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-label-caps text-label-caps text-on-surface-variant mb-2"
              >
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="HOW CAN I HELP YOU?"
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b3a6b] text-on-surface font-label-caps text-label-caps py-4 px-6 border border-[#1e1e1e] hover:bg-[#294678] disabled:opacity-50 transition-colors duration-150 flex justify-center items-center rounded-[2px]"
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        )}

        {/* Social link */}
        <div className="mt-12 border-t border-[#1e1e1e] pt-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-on-surface hover:text-[#4a7fc1] font-label-caps text-label-caps transition-colors group"
          >
            LINKEDIN
            <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </main>
  )
}
