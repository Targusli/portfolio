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
      en: 'Higher professional education in Business IT, currently in progress. Topics: Business Process Management, IT foundations, project and portfolio management, data management and analysis, solution engineering, digital transformation, IT security and risk management, and intra- and entrepreneurship. The program includes a practical project and a final diploma thesis.',
      de: 'Höhere Fachschule Wirtschaftsinformatik, aktuell laufend. Themen: Business Process Management, IT-Grundlagen, Projekt- und Portfoliomanagement, Datenmanagement und Analyse, Solution Engineering, digitale Transformation, IT-Sicherheit und Risikomanagement sowie Intra- und Entrepreneurship. Beinhaltet eine Praxisarbeit und eine Diplomarbeit.',
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
  en: `My name is Noah, I'm 24 years old, and I live in Uster. I've always been fascinated by technology. Even during my apprenticeship as a Mediamatician, I gained insights into the world of IT at my training company, Cognizant. What appealed to me most was the interplay between processes and systems.

For the past four years, I've worked as a Marketing Manager at a telecommunications SME. My responsibilities included traditional marketing tasks as well as managing the webshop, automating processes, and implementing new tools. The technical side of the work is what I found most compelling. That's why I started studying in August 2024 to earn a degree in Business Informatics (HF) at HSO. I made that decision deliberately because I genuinely enjoy this field and want to help shape and deliver technical solutions.`,
  de: `Ich bin Noah, 24 Jahre alt und wohne in Uster. Technik hat mich schon immer fasziniert. Bereits während meiner Lehre zum Mediamatiker erhielt ich Einblicke in die IT-Welt bei der Lehrfirma Cognizant. Das Zusammenspiel der Prozesse und Systeme sprach mich am meisten an.

In den letzten vier Jahren war ich als Marketing Manager bei einem Telekommunikations-KMU tätig. Dabei waren klassische Marketingaufgaben meine Tätigkeit, jedoch auch das Betreuen des Webshops, Prozesse automatisieren und neue Tools implementieren. Der technische Aspekt sprach mich dabei am meisten an. Daher begann ich im August 2024 mit dem Studium zum Wirtschaftsinformatiker HF an der HSO. Diesen Schritt wählte ich bewusst, da ich meine Begeisterung dafür merke und technische Lösungen begleiten und mitgestalten möchte.`,
}

// ─── About Me ─────────────────────────────────────────────────────────────────

export interface AboutSection {
  title: { en: string; de: string }
  body: { en: string; de: string }
}

export interface AboutItem {
  id: string
  title: { en: string; de: string }
  subtitle: { en: string; de: string }
  body: { en: string; de: string }
  sections?: AboutSection[]
}

export const aboutItems: AboutItem[] = [
  {
    id: 'interests',
    title: { en: 'Interests', de: 'Interessen' },
    subtitle: { en: 'What I get up to outside of work', de: 'Was ich neben der Arbeit mache' },
    body: {
      en: `To take a break from screen time, I enjoy being outdoors. Whether it's hiking, fishing, working out, or spending time with friends and family, these activities give me the balance I need. My camera often comes along, as photography used to be a big hobby of mine and I still find it just as interesting.

What else really fascinates me is space and everything connected to it. How does time actually work? Is it the fourth dimension? What about space and mass? I enjoy thinking about questions like these from time to time.`,
      de: `Zur Abwechslung zu meiner Bildschirmzeit bin ich gerne draussen. Sei es beim Wandern, Fischen, im Fitness oder beim Unternehmen mit Kollegen und Familie. Das gibt mir den nötigen Ausgleich. Dabei begleitet mich ab und zu meine Kamera, da Fotografie schon früher ein grösseres Hobby von mir war und ich auch jetzt noch etwas Spannendes darin finde.

Was mich sonst so richtig fasziniert, ist das Weltall und alles was damit zusammenhängt. Wie funktioniert Zeit, ist sie die vierte Dimension, wie verhält es sich mit Raum und Masse? Mit solchen Fragen befasse ich mich ab und an gerne.`,
    },
  },
  {
    id: 'goals',
    title: { en: 'Goals', de: 'Ziele' },
    subtitle: { en: 'Where I am heading', de: 'Wohin ich mich entwickle' },
    body: { en: '', de: '' },
    sections: [
      {
        title: { en: 'Professional Goals', de: 'Berufliche Ziele' },
        body: {
          en: "My next goal is to earn a bachelor's degree in Business Informatics at ZHAW. A longer-term goal is to specialise in cybersecurity. More importantly, I want to work in a role where I can make a real difference, bring in my knowledge and skills, and keep growing.",
          de: 'Mein nächstes Ziel ist es, den Bachelor in Wirtschaftsinformatik an der ZHAW zu absolvieren. Ein langfristiges Ziel ist es, mich in Richtung Cybersecurity zu spezialisieren. Wichtiger ist jedoch, bis dahin in einer Rolle zu arbeiten, in der ich etwas bewegen kann, mein Wissen und Können einbringe und vorankomme.',
        },
      },
      {
        title: { en: 'Personal Goals', de: 'Private Ziele' },
        body: {
          en: "Perhaps the opportunity to live abroad will come up at some point. I'm learning Japanese for a reason. But before anything else, I'd visit the country and get to know the culture first. Another wish of mine is to build up enough freedom to make decisions based on conviction rather than necessity.",
          de: 'Vielleicht ergibt sich die Möglichkeit, in Zukunft im Ausland zu leben. Japanisch lerne ich natürlich aus einem Grund. Dafür würde ich das Land aber zuerst besuchen und die Kulturen kennenlernen. Ein weiterer Wunsch ist es, die Freiheit aufzubauen und Entscheidungen aus Überzeugung und nicht aus Notwendigkeit treffen zu können.',
        },
      },
    ],
  },
]

// ─── Skill Categories ─────────────────────────────────────────────────────────

export interface SkillEntry {
  de: string
  en: string
}

export interface SkillSection {
  type: 'tools' | 'skills'
  practical: SkillEntry[]
  basic: SkillEntry[]
}

export interface SkillCategory {
  id: string
  title: { en: string; de: string }
  sections: SkillSection[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: { en: 'Design & Creation', de: 'Design & Kreation' },
    sections: [
      {
        type: 'tools',
        practical: [
          { de: 'InDesign',      en: 'InDesign' },
          { de: 'Illustrator',   en: 'Illustrator' },
          { de: 'Photoshop',     en: 'Photoshop' },
          { de: 'After Effects', en: 'After Effects' },
          { de: 'Adobe XD',      en: 'Adobe XD' },
        ],
        basic: [],
      },
      {
        type: 'skills',
        practical: [
          { de: 'Layout',                   en: 'Layout' },
          { de: 'Wireframing & Prototyping', en: 'Wireframing & Prototyping' },
          { de: 'Fotografie',               en: 'Photography' },
          { de: 'Videoproduktion',          en: 'Video Production' },
          { de: 'Printproduktion',          en: 'Print Production' },
        ],
        basic: [],
      },
    ],
  },
  {
    id: 'marketing',
    title: { en: 'Marketing & Communication', de: 'Marketing & Kommunikation' },
    sections: [
      {
        type: 'tools',
        practical: [
          { de: 'Brevo',         en: 'Brevo' },
          { de: 'LinkedIn',      en: 'LinkedIn' },
          { de: 'Microsoft 365', en: 'Microsoft 365' },
        ],
        basic: [],
      },
      {
        type: 'skills',
        practical: [
          { de: 'Kampagnenmanagement', en: 'Campaign Management' },
          { de: 'Newsletter',          en: 'Newsletter' },
          { de: 'Content Strategie',   en: 'Content Strategy' },
          { de: 'UI/UX Design',        en: 'UI/UX Design' },
          { de: 'Agenturmanagement',   en: 'Agency Management' },
        ],
        basic: [
          { de: 'SEO', en: 'SEO' },
        ],
      },
    ],
  },
  {
    id: 'it',
    title: { en: 'IT & Systems', de: 'IT & Systeme' },
    sections: [
      {
        type: 'tools',
        practical: [
          { de: 'HTML & CSS',  en: 'HTML & CSS' },
          { de: 'OXID',        en: 'OXID' },
          { de: 'Jira',        en: 'Jira' },
          { de: 'Confluence',  en: 'Confluence' },
        ],
        basic: [
          { de: 'Git & GitHub', en: 'Git & GitHub' },
          { de: 'SQL',          en: 'SQL' },
        ],
      },
    ],
  },
  {
    id: 'automation',
    title: { en: 'Automation & AI', de: 'Automatisierung & AI' },
    sections: [
      {
        type: 'tools',
        practical: [
          { de: 'n8n',              en: 'n8n' },
          { de: 'Stable Diffusion', en: 'Stable Diffusion' },
          { de: 'LLMs',             en: 'LLMs' },
        ],
        basic: [],
      },
    ],
  },
  {
    id: 'management',
    title: { en: 'Management & Processes', de: 'Management & Prozesse' },
    sections: [
      {
        type: 'skills',
        practical: [
          { de: 'Projektmanagement',       en: 'Project Management' },
          { de: 'Prozessmodellierung',     en: 'Process Modelling' },
          { de: 'Eventorganisation',       en: 'Event Organisation' },
          { de: 'Technische Dokumentation',en: 'Technical Documentation' },
          { de: 'Gantt-Diagramm',          en: 'Gantt Chart' },
        ],
        basic: [
          { de: 'Scrum & Kanban', en: 'Scrum & Kanban' },
        ],
      },
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
