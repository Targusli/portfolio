'use client'

import { createContext, useContext, useState } from 'react'

export type Lang = 'en' | 'de'

const translations = {
  en: {
    loading: {
      commands: [
        '> git add .',
        '> git commit -m "portfolio v1.0 – go live"',
        '> git push origin main',
        '> Vercel: build complete ✓',
        '> Deployed. Live at noahzuppiger.com',
      ],
      label: 'Deploying',
    },
    nav: {
      experience: 'Experience',
      skills: 'Skills & Tools',
      projects: 'Projects',
      hobbies: 'Hobbies',
      contact: 'Contact',
    },
    experience: {
      title: 'Experience',
      subtitle: 'Professional timeline & academic background',
      filterAll: 'All',
      filterWork: 'Work',
      filterEdu: 'Education',
      work: 'Work History',
      education: 'Education',
    },
    skills: {
      title: 'Skills & Tools',
      subtitle: 'An overview of capabilities, tools and languages',
      languages: 'Languages',
      tools: 'Tools',
      skills: 'Skills',
      languagesIntro: 'Natural languages I speak and write.',
      toolsIntro: 'Software and platforms I work with daily.',
      skillsIntro: 'Technical and creative competencies.',
      filterAll: 'All',
      filterMarketing: 'Marketing',
      filterIT: 'IT',
      filterDesign: 'Design',
      back: '← Back to overview',
      nativeLevel: 'Native',
      learning: 'Currently learning',
    },
    projects: {
      title: 'Projects',
      subtitle: 'A selection of recent technical work',
      back: '← Back to Projects',
      pending: 'In Progress',
      viewProject: 'View Project',
    },
    hobbies: {
      title: 'Hobbies',
      subtitle: 'What I enjoy outside of work',
      back: '← Back',
      viewMore: 'Explore',
    },
    contact: {
      title: 'Contact',
      subtitle: "Have a project in mind? Let's talk.",
      name: 'Name',
      email: 'Email',
      message: 'Message',
      namePlaceholder: 'Jane Doe',
      emailPlaceholder: 'jane@example.com',
      messagePlaceholder: 'How can I help you?',
      send: 'Send Message',
      sending: 'Sending...',
      sent: "Message sent — I'll be in touch shortly.",
    },
    common: {
      close: 'Close',
      back: '← Back',
      pending: 'Pending',
    },
  },
  de: {
    loading: {
      commands: [
        '> git add .',
        '> git commit -m "portfolio v1.0 – live gehen"',
        '> git push origin main',
        '> Vercel: Build abgeschlossen ✓',
        '> Deployed. Live auf noahzuppiger.com',
      ],
      label: 'Deployment läuft',
    },
    nav: {
      experience: 'Berufserfahrung',
      skills: 'Skills & Tools',
      projects: 'Arbeiten',
      hobbies: 'Hobbies',
      contact: 'Kontakt',
    },
    experience: {
      title: 'Berufserfahrung',
      subtitle: 'Beruflicher Werdegang & akademischer Hintergrund',
      filterAll: 'Alle',
      filterWork: 'Berufserfahrung',
      filterEdu: 'Ausbildung',
      work: 'Berufserfahrung',
      education: 'Ausbildungen',
    },
    skills: {
      title: 'Skills & Tools',
      subtitle: 'Übersicht über Fähigkeiten, Tools und Sprachen',
      languages: 'Sprachen',
      tools: 'Tools',
      skills: 'Skills',
      languagesIntro: 'Sprachen, die ich spreche und schreibe.',
      toolsIntro: 'Software und Plattformen, mit denen ich täglich arbeite.',
      skillsIntro: 'Technische und kreative Kompetenzen.',
      filterAll: 'Alle',
      filterMarketing: 'Marketing',
      filterIT: 'IT',
      filterDesign: 'Design',
      back: '← Zurück zur Übersicht',
      nativeLevel: 'Muttersprache',
      learning: 'Aktuell am Lernen',
    },
    projects: {
      title: 'Arbeiten',
      subtitle: 'Eine Auswahl aktueller technischer Projekte',
      back: '← Zurück zu den Arbeiten',
      pending: 'In Arbeit',
      viewProject: 'Projekt ansehen',
    },
    hobbies: {
      title: 'Hobbies',
      subtitle: 'Was ich ausserhalb der Arbeit mache',
      back: '← Zurück',
      viewMore: 'Mehr erfahren',
    },
    contact: {
      title: 'Kontakt',
      subtitle: 'Hast du ein Projekt im Kopf? Lass uns reden.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      namePlaceholder: 'Max Mustermann',
      emailPlaceholder: 'max@beispiel.de',
      messagePlaceholder: 'Wie kann ich helfen?',
      send: 'Nachricht senden',
      sending: 'Wird gesendet...',
      sent: 'Nachricht gesendet – ich melde mich bald.',
    },
    common: {
      close: 'Schliessen',
      back: '← Zurück',
      pending: 'Ausstehend',
    },
  },
}

export type Translations = typeof translations.en

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
