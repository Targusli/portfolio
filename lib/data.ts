export type TimelineType = 'work' | 'education'

export interface TimelineItem {
  id: string
  type: TimelineType
  period: string
  title: { en: string; de: string }
  company: { en: string; de: string }
  description: { en: string; de: string }
}

export interface Project {
  id: string
  index: string
  category: { en: string; de: string }
  title: string
  description: { en: string; de: string }
  tags: string[]
  href: string | null
  pending: boolean
}

export interface Language {
  name: string
  level: { en: string; de: string }
  proficiency: number
  cert: string | null
  flag: string
  type?: 'spoken' | 'programming'
}

export interface SkillItem {
  name: string
  category: 'Design' | 'IT' | 'Marketing'
  size: 1 | 2 | 3
}

export interface Hobby {
  id: string
  title: { en: string; de: string }
  emoji: string
  description: { en: string; de: string }
  detail: { en: string; de: string }
}

// ─── Experience ────────────────────────────────────────────────────────────────

export const timelineItems: TimelineItem[] = [
  // ── Most recent first ──────────────────────────────────────────────────────
  {
    id: 'hso',
    type: 'education',
    period: '2024 – 2027',
    title: { en: 'Dipl. Business IT Specialist HF', de: 'Dipl. Wirtschaftsinformatiker HF' },
    company: { en: 'HSO Wirtschaftsschule Schweiz', de: 'HSO Wirtschaftsschule Schweiz' },
    description: {
      en: 'Three-year higher professional education in Business IT, currently in progress. Year one covers business processes, IT foundations, project management and management basics. Year two adds data management, solution engineering and a practical project. Year three wraps up with digital transformation, IT security, IT management and a diploma thesis.',
      de: 'Dreijährige Ausbildung in Wirtschaftsinformatik, aktuell im Gange. Im ersten Jahr stehen Geschäftsprozesse, IT-Grundlagen, Projektmanagement und Management auf dem Programm. Das zweite Jahr ergänzt Datenmanagement, Solution Engineering und eine Praxisarbeit. Im dritten Jahr folgen digitale Transformation, IT-Sicherheit, IT-Management und die Diplomarbeit.',
    },
  },
  {
    id: 'marketing-manager',
    type: 'work',
    period: '2022 – Heute',
    title: { en: 'Marketing Manager', de: 'Marketing Manager' },
    company: { en: 'Netcom AG', de: 'Netcom AG' },
    description: {
      en: 'Handling webshop content and keeping it up to date. Creating mockups, running projects from brief to delivery, evaluating and rolling out new tools and processes. Also covers event and trade show planning, print materials, and internal and external communications.',
      de: 'Betreuung und Pflege der Webshop-Inhalte, Erstellen von Mockups, Abwicklung von Projekten, Evaluieren und Einführen diverser Applikationen und Prozesse, Messen- und Eventplanung, Printmedien, interne und externe Kommunikation.',
    },
  },
  {
    id: 'lehre-cognizant',
    type: 'work',
    period: '2019 – 2022',
    title: { en: 'Mediamatician Apprenticeship (EFZ)', de: 'Lehre zum Mediamatiker EFZ' },
    company: { en: 'Cognizant AG', de: 'Cognizant AG' },
    description: {
      en: 'Years two and three of the Mediamatician apprenticeship. Worked across different departments with hands-on experience in web, design, project coordination and digital communications.',
      de: 'Zweites und drittes Lehrjahr der Mediamatiker-Ausbildung. Einsatz in verschiedenen Bereichen mit praktischer Erfahrung in Web, Design, Projektkoordination und digitaler Kommunikation.',
    },
  },
  {
    id: 'bzz',
    type: 'education',
    period: '2018 – 2022',
    title: { en: 'Mediamatician EFZ', de: 'Mediamatiker EFZ' },
    company: { en: 'Vocational School BZZ Horgen', de: 'Berufsschule BZZ Horgen' },
    description: {
      en: 'Vocational school running alongside the Mediamatician apprenticeship. Core subjects: web technologies, design, communications, business administration and project management.',
      de: 'Berufsschule begleitend zur Mediamatiker-Lehre. Kernfächer: Webtechnologien, Design, Kommunikation, Betriebswirtschaft und Projektmanagement.',
    },
  },
  {
    id: 'basislehrjahr',
    type: 'work',
    period: '2018 – 2019',
    title: { en: 'Base Year — Mediamatician Apprenticeship', de: 'Basislehrjahr Mediamatiker EFZ' },
    company: { en: 'Zürcher Lehrbetriebsverband ICT', de: 'Zürcher Lehrbetriebsverband ICT' },
    description: {
      en: 'First year of the Mediamatician apprenticeship at the Zurich ICT training association. Foundations in IT, design, project management and business processes.',
      de: 'Erstes Lehrjahr der Mediamatiker-Ausbildung beim Zürcher Lehrbetriebsverband ICT. Grundlagen in IT, Design, Projektmanagement und Geschäftsprozessen.',
    },
  },
]

// ─── Skills ────────────────────────────────────────────────────────────────────

export const languages: Language[] = [
  { name: 'Deutsch', level: { en: 'Native', de: 'Muttersprache' }, proficiency: 100, cert: null, flag: '🇨🇭' },
  { name: 'English', level: { en: 'Fluent – C1', de: 'Fliessend – C1' }, proficiency: 90, cert: 'Cambridge C1 Advanced', flag: '🇬🇧' },
  { name: 'Français', level: { en: 'Basic – A2', de: 'Grundkenntnisse – A2' }, proficiency: 30, cert: null, flag: '🇫🇷' },
  { name: '日本語',    level: { en: 'Beginner – learning', de: 'Anfänger – am Lernen' }, proficiency: 10, cert: null, flag: '🇯🇵' },
  { name: 'HTML & CSS', level: { en: 'Practical experience', de: 'Praxiserfahrung' }, proficiency: 50, cert: null, flag: '<>', type: 'programming' },
  { name: 'Python',     level: { en: 'Beginner – learning', de: 'Anfänger – am Lernen' }, proficiency: 5, cert: null, flag: 'Py', type: 'programming' },
  { name: 'JavaScript', level: { en: 'Beginner – learning', de: 'Anfänger – am Lernen' }, proficiency: 5, cert: null, flag: 'JS', type: 'programming' },
]

export const tools: SkillItem[] = [
  { name: 'Figma', category: 'Design', size: 3 },
  { name: 'n8n', category: 'IT', size: 3 },
  { name: 'VS Code', category: 'IT', size: 3 },
  { name: 'Git / GitHub', category: 'IT', size: 3 },
  { name: 'Google Analytics', category: 'Marketing', size: 2 },
  { name: 'Notion', category: 'IT', size: 2 },
  { name: 'Vercel', category: 'IT', size: 2 },
  { name: 'Postman', category: 'IT', size: 2 },
  { name: 'Adobe CC', category: 'Design', size: 2 },
  { name: 'Slack', category: 'IT', size: 1 },
  { name: 'Jira', category: 'IT', size: 1 },
  { name: 'Mailchimp', category: 'Marketing', size: 1 },
]

export const skills: SkillItem[] = [
  { name: 'UI/UX Design', category: 'Design', size: 3 },
  { name: 'Frontend Development', category: 'IT', size: 3 },
  { name: 'SEO Optimisation', category: 'Marketing', size: 3 },
  { name: 'Workflow Automation', category: 'IT', size: 3 },
  { name: 'Design Systems', category: 'Design', size: 2 },
  { name: 'Prototyping', category: 'Design', size: 2 },
  { name: 'Content Strategy', category: 'Marketing', size: 2 },
  { name: 'Python', category: 'IT', size: 2 },
  { name: 'SQL', category: 'IT', size: 2 },
  { name: 'TypeScript', category: 'IT', size: 2 },
  { name: 'Requirements Engineering', category: 'IT', size: 1 },
  { name: 'Agile / Scrum', category: 'IT', size: 1 },
  { name: 'Brand Positioning', category: 'Marketing', size: 1 },
  { name: 'Campaign Management', category: 'Marketing', size: 1 },
  { name: 'Wireframing', category: 'Design', size: 1 },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'n8n',
    index: '01',
    category: { en: 'Automation', de: 'Automatisierung' },
    title: 'n8n Workflow Automation',
    description: {
      en: 'Built an automation setup using n8n to sync data between different tools and platforms — cutting down on manual work and keeping everything running without needing to touch it daily.',
      de: 'Automatisierungssetup mit n8n aufgebaut, das Daten zwischen verschiedenen Tools und Plattformen synchronisiert — weniger manuelle Arbeit, mehr Zuverlässigkeit.',
    },
    tags: ['n8n', 'API', 'Automation'],
    href: '#',
    pending: false,
  },
  {
    id: 'web',
    index: '02',
    category: { en: 'Web', de: 'Web' },
    title: 'Website Redesign',
    description: {
      en: 'Redesigned and rebuilt a company website from the ground up — turned mockups into a clean, fast Next.js and Tailwind setup that is easy to maintain and looks the part.',
      de: 'Unternehmens-Website von Grund auf neu designed und umgesetzt — aus Mockups wurde ein sauberes, schnelles Next.js- und Tailwind-Setup, das einfach zu pflegen ist.',
    },
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    href: '#',
    pending: false,
  },
  {
    id: 'ai',
    index: '03',
    category: { en: 'AI', de: 'AI' },
    title: 'AI Image Pipeline',
    description: {
      en: 'Set up a local Stable Diffusion pipeline to generate and process images in bulk — handy for producing marketing visuals without relying on stock photos or paid services.',
      de: 'Lokale Stable-Diffusion-Pipeline aufgesetzt, um Bilder in grösserem Umfang zu generieren — praktisch für Marketing-Visuals ohne Stockfotos oder externe Dienste.',
    },
    tags: ['Stable Diffusion', 'Python', 'AI'],
    href: '#',
    pending: false,
  },
  {
    id: 'pending',
    index: '04',
    category: { en: 'Pending', de: 'Ausstehend' },
    title: '[In Progress]',
    description: {
      en: 'Next project in the works — details coming soon.',
      de: 'Nächstes Projekt in Arbeit — Details folgen.',
    },
    tags: ['TBD'],
    href: null,
    pending: true,
  },
]

// ─── Bio ──────────────────────────────────────────────────────────────────────

export const bio = {
  en: `Based in Zürich, I work across marketing, design and IT. My background started with a Mediamatician apprenticeship — a broad, hands-on training covering web, design, communications and project work. Since 2022 I've been Marketing Manager at Netcom AG, handling everything from webshop content and mockups to running projects and rolling out new tools and processes.

Alongside work, I'm currently studying Business IT (Wirtschaftsinformatiker HF) at HSO — pushing further into the technical side of things. I like building things that actually work: automations, clean interfaces, systems that make everyday work a bit easier.`,
  de: `In Zürich tätig, arbeite ich an der Schnittstelle von Marketing, Design und IT. Meine Grundlage bildet die Lehre zum Mediamatiker EFZ — eine praxisnahe Ausbildung mit Web, Design, Kommunikation und Projektarbeit. Seit 2022 bin ich als Marketing Manager bei der Netcom AG tätig und kümmere mich um Webshop-Inhalte, Mockups, Projekte sowie die Einführung neuer Tools und Prozesse.

Nebenbei studiere ich aktuell Wirtschaftsinformatik HF an der HSO — denn ich möchte die technische Seite weiter vertiefen. Ich baue gerne Dinge, die wirklich funktionieren: Automatisierungen, klare Interfaces, Systeme, die den Alltag leichter machen.`,
}

// ─── About Me ─────────────────────────────────────────────────────────────────

export interface AboutItem {
  id: string
  title: { en: string; de: string }
  subtitle: { en: string; de: string }
  body: { en: string; de: string }
}

export const aboutItems: AboutItem[] = [
  {
    id: 'interests',
    title: { en: 'Interests', de: 'Interessen' },
    subtitle: { en: 'What I get up to outside of work', de: 'Was ich neben der Arbeit mache' },
    body: {
      en: 'Photography, travel, tech and music are the things that keep me busy outside of work. I like exploring cities and landscapes with a camera, tinkering with self-hosted services on my homelab, and playing guitar. I try to visit at least two new countries a year — Japan is definitely on the list.',
      de: 'Fotografie, Reisen, Technik und Musik sind meine Hauptbeschäftigungen neben der Arbeit. Ich erkunde Städte und Landschaften mit der Kamera, betreibe ein Homelab mit diversen Self-Hosted-Diensten und spiele Gitarre. Mindestens zwei neue Länder pro Jahr — Japan steht definitiv auf der Liste.',
    },
  },
  {
    id: 'goals',
    title: { en: 'Goals', de: 'Ziele' },
    subtitle: { en: 'Where I am heading', de: 'Wohin ich mich entwickle' },
    body: {
      en: "I want to build digital products that work well and look the part. My focus is on the space between design and technology — creating things that are solid under the hood but feel natural to use. Long term I'd like to combine automation, AI and good UX into tools that actually change how people work day to day.",
      de: 'Ich möchte digitale Produkte entwickeln, die gut funktionieren und gut aussehen. Mein Fokus liegt auf dem Bereich zwischen Design und Technologie — Dinge schaffen, die technisch solide sind, sich aber natürlich anfühlen. Langfristig möchte ich Automatisierung, KI und gute UX in Tools verbinden, die den Arbeitsalltag wirklich verändern.',
    },
  },
]

// ─── Skill Categories ─────────────────────────────────────────────────────────

export interface ToolEntry {
  name: string
  note?: { en: string; de: string }
  description: { en: string; de: string }
}

export interface SkillCategory {
  id: string
  title: { en: string; de: string }
  tools: ToolEntry[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: { en: 'Design', de: 'Design' },
    tools: [
      { name: 'Adobe CC',  description: { en: '[Placeholder]', de: '[Platzhalter]' } },
      { name: 'Adobe XD',  description: { en: '[Placeholder]', de: '[Platzhalter]' } },
    ],
  },
  {
    id: 'marketing',
    title: { en: 'Marketing', de: 'Marketing' },
    tools: [
      { name: 'LinkedIn', description: { en: '[Placeholder]', de: '[Platzhalter]' } },
    ],
  },
  {
    id: 'automation-it',
    title: { en: 'Automation & IT', de: 'Automatisierung & IT' },
    tools: [
      { name: 'n8n',        description: { en: '[Placeholder]', de: '[Platzhalter]' } },
      { name: 'VS Code',    description: { en: '[Placeholder]', de: '[Platzhalter]' } },
      { name: 'HTML / CSS', description: { en: '[Placeholder]', de: '[Platzhalter]' } },
      { name: 'Python', note: { en: '(currently learning)', de: '(am Lernen)' }, description: { en: '[Placeholder]', de: '[Platzhalter]' } },
    ],
  },
  {
    id: 'other',
    title: { en: 'Other', de: 'Sonstige' },
    tools: [
      { name: 'Stable Diffusion', note: { en: '(Local AI image generation)', de: '(Lokale KI-Bildgenerierung)' }, description: { en: '[Placeholder]', de: '[Platzhalter]' } },
      { name: 'Diverse LLMs',     description: { en: '[Placeholder]', de: '[Platzhalter]' } },
    ],
  },
]

// ─── Hobbies (kept for Interests sub-page) ────────────────────────────────────

export const hobbies: Hobby[] = [
  {
    id: 'photography',
    emoji: '📸',
    title: { en: 'Photography', de: 'Fotografie' },
    description: {
      en: 'Capturing moments through a lens — from street photography to landscapes.',
      de: 'Momente festhalten — von Street-Fotografie bis hin zu Landschaftsaufnahmen.',
    },
    detail: {
      en: 'Photography has been a creative outlet for years. I focus primarily on urban environments and natural landscapes, experimenting with light and composition. My go-to camera is a mirrorless system and I develop my own editing presets.',
      de: 'Fotografie ist seit Jahren ein kreatives Ventil. Der Fokus liegt auf urbanen Umgebungen und Naturlandschaften, mit Experimenten rund um Licht und Komposition. Ich bearbeite Bilder mit eigenen Presets.',
    },
  },
  {
    id: 'travel',
    emoji: '✈️',
    title: { en: 'Travel', de: 'Reisen' },
    description: {
      en: 'Exploring new cultures, cuisines and landscapes around the world.',
      de: 'Neue Kulturen, Küchen und Landschaften auf der ganzen Welt entdecken.',
    },
    detail: {
      en: 'Traveling broadens perspective in ways nothing else can. I try to visit at least two new countries per year, focusing on immersive local experiences rather than tourist routes. Japan is high on the list.',
      de: 'Reisen erweitert den Horizont wie kaum etwas anderes. Mindestens zwei neue Länder pro Jahr, mit Fokus auf lokale Erlebnisse abseits touristischer Routen. Japan steht ganz oben auf der Liste.',
    },
  },
  {
    id: 'tech',
    emoji: '🔧',
    title: { en: 'Technology', de: 'Technologie' },
    description: {
      en: 'Tinkering with hardware, self-hosting services and exploring new tech.',
      de: 'Hardware basteln, Self-Hosting und neue Technologien ausprobieren.',
    },
    detail: {
      en: 'Outside of work I run a homelab with various self-hosted services, experiment with microcontrollers and follow emerging tech closely. Currently building a smart home setup with local-first AI integrations.',
      de: 'Ausserhalb der Arbeit betreibe ich ein Homelab mit diversen Self-Hosted-Services, experimentiere mit Mikrocontrollern und verfolge neue Technologien. Aktuell entsteht ein Smart-Home-Setup mit lokal laufenden KI-Integrationen.',
    },
  },
  {
    id: 'music',
    emoji: '🎵',
    title: { en: 'Music', de: 'Musik' },
    description: {
      en: 'Playing guitar and exploring electronic music production.',
      de: 'Gitarre spielen und elektronische Musikproduktion erkunden.',
    },
    detail: {
      en: 'Music has always been a constant companion. I play acoustic and electric guitar and have been dabbling in electronic music production using Ableton Live. Genre-wise I lean towards ambient, post-rock and jazz.',
      de: 'Musik begleitet mich schon lange. Ich spiele Akustik- und E-Gitarre und produziere elektronische Musik in Ableton Live. Stilistisch tendiere ich zu Ambient, Post-Rock und Jazz.',
    },
  },
]
