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
  {
    id: 'systems-analyst',
    type: 'work',
    period: '2022 – Present',
    title: { en: 'Systems Analyst', de: 'Systems Analyst' },
    company: { en: 'Tech.Corp GmbH', de: 'Tech.Corp GmbH' },
    description: {
      en: 'Lead architect for enterprise resource planning integration. Designed high-availability data pipelines connecting legacy mainframe systems with modern microservices. Reduced query latency by 45%.',
      de: 'Leitender Architekt für die ERP-Integration. Entwarf hochverfügbare Datenpipelines zwischen Legacy-Systemen und modernen Microservices. Reduzierte Abfragelatenz um 45 %.',
    },
  },
  {
    id: 'consultant',
    type: 'work',
    period: '2020 – 2022',
    title: { en: 'Junior IT Consultant', de: 'Junior IT-Berater' },
    company: { en: 'Consulting Wirtschaftsinformatik AG', de: 'Consulting Wirtschaftsinformatik AG' },
    description: {
      en: 'Supported digital transformation at mid-sized financial institutions. Conducted requirements engineering and coordinated agile sprints with offshore engineering teams.',
      de: 'Begleitete die digitale Transformation mittelständischer Finanzinstitute. Anforderungsengineering und Koordination agiler Sprints mit internationalen Entwicklungsteams.',
    },
  },
  {
    id: 'bsc',
    type: 'education',
    period: '2019 – 2022',
    title: { en: 'B.Sc. Wirtschaftsinformatik', de: 'B.Sc. Wirtschaftsinformatik' },
    company: { en: 'University of Applied Sciences', de: 'Fachhochschule' },
    description: {
      en: 'Thesis: "Evaluating Micro-Frontend Efficiency in Enterprise Applications." Graduated with honours. Key coursework: Systems Architecture, Database Design, IT Project Management.',
      de: 'Abschlussarbeit: „Effizienz von Micro-Frontends in Enterprise-Anwendungen." Mit Auszeichnung abgeschlossen. Schwerpunkte: Systemarchitektur, Datenbankdesign, IT-Projektmanagement.',
    },
  },
  {
    id: 'data-intern',
    type: 'work',
    period: '2018 – 2020',
    title: { en: 'Data Engineer Intern', de: 'Data-Engineer-Praktikant' },
    company: { en: 'Dataflow Logistics', de: 'Dataflow Logistics' },
    description: {
      en: 'Built automated Python scripts for data cleansing and normalisation. Maintained SQL database integrity ensuring 99.9 % uptime during peak cycles.',
      de: 'Entwickelte automatisierte Python-Skripte zur Datenbereinigung. Wartete SQL-Datenbanken mit 99,9 % Verfügbarkeit auch in Spitzenlastzeiten.',
    },
  },
  {
    id: 'diploma',
    type: 'education',
    period: '2015 – 2019',
    title: { en: 'Federal Diploma in IT', de: 'Eidg. Diplom Informatik' },
    company: { en: 'Vocational School of Technology', de: 'Technische Berufsfachschule' },
    description: {
      en: 'Specialisation in Application Development. Practical training combined with rigorous academic study in core computer science principles.',
      de: 'Vertiefung Applikationsentwicklung. Praxisnahe Ausbildung kombiniert mit fundiertem theoretischem Informatikstudium.',
    },
  },
]

// ─── Skills ────────────────────────────────────────────────────────────────────

export const languages: Language[] = [
  { name: 'Deutsch', level: { en: 'Native', de: 'Muttersprache' }, proficiency: 100, cert: null, flag: '🇨🇭' },
  { name: 'English', level: { en: 'Fluent – C1', de: 'Fliessend – C1' }, proficiency: 90, cert: 'Cambridge C1 Advanced', flag: '🇬🇧' },
  { name: 'Français', level: { en: 'Basic – A2', de: 'Grundkenntnisse – A2' }, proficiency: 30, cert: null, flag: '🇫🇷' },
  { name: '日本語',    level: { en: 'Beginner – learning', de: 'Anfänger – am Lernen' }, proficiency: 10, cert: null, flag: '🇯🇵' },
  { name: 'Python',    level: { en: 'Beginner – learning', de: 'Anfänger – am Lernen' }, proficiency: 20, cert: null, flag: 'Py' },
  { name: 'JavaScript', level: { en: 'Beginner – learning', de: 'Anfänger – am Lernen' }, proficiency: 20, cert: null, flag: 'JS' },
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
      en: 'Designed and implemented a comprehensive n8n orchestration system to synchronise CRM data with external marketing platforms. Reduced manual data entry by 85 % while ensuring zero-loss transactional integrity across API endpoints.',
      de: 'Entwarf und implementierte ein umfassendes n8n-Orchestrierungssystem zur Synchronisation von CRM-Daten mit externen Marketing-Plattformen. Reduzierte manuelle Dateneingabe um 85 %.',
    },
    tags: ['n8n', 'API', 'Node.js'],
    href: '#',
    pending: false,
  },
  {
    id: 'web',
    index: '02',
    category: { en: 'Frontend', de: 'Frontend' },
    title: 'Company Website Redesign',
    description: {
      en: 'Led the technical execution of a corporate web platform overhaul. Translated high-fidelity designs into a performant, component-driven architecture using modern Next.js paradigms for optimal Core Web Vitals.',
      de: 'Leitete den technischen Umbau eines Unternehmenswebauftritts. Übersetzte High-Fidelity-Designs in eine performante, komponentenbasierte Architektur mit optimalen Core Web Vitals.',
    },
    tags: ['Next.js', 'Tailwind', 'TypeScript'],
    href: '#',
    pending: false,
  },
  {
    id: 'ai',
    index: '03',
    category: { en: 'Machine Learning', de: 'Machine Learning' },
    title: 'AI Image Pipeline',
    description: {
      en: 'Architected a scalable ingestion pipeline using cloud-native GPU instances to generate and optimise high-volume visual assets. Integrated custom prompting heuristics to maintain brand consistency.',
      de: 'Entwickelte eine skalierbare Ingestion-Pipeline auf Cloud-GPU-Basis zur Generierung und Optimierung grosser Mengen visueller Assets mit markenkonformer Qualität.',
    },
    tags: ['Python', 'AWS', 'Stable Diffusion'],
    href: '#',
    pending: false,
  },
  {
    id: 'pending',
    index: '04',
    category: { en: 'Pending', de: 'Ausstehend' },
    title: '[In Progress]',
    description: {
      en: 'A decentralised credential verification system using blockchain. Architecture phase ongoing.',
      de: 'Ein dezentrales Beglaubigungssystem auf Blockchain-Basis. Architekturphase läuft.',
    },
    tags: ['TBD'],
    href: null,
    pending: true,
  },
]

// ─── Bio ──────────────────────────────────────────────────────────────────────

export const bio = {
  en: `Based in Zürich, I work at the intersection of design, technology and marketing. With a background in IT consulting and systems architecture, I bring a structured, analytical approach to digital product development — paired with a genuine passion for clean, user-centred design.

I hold a B.Sc. in Wirtschaftsinformatik and have hands-on experience across enterprise data systems, corporate web platforms and AI-driven automation. I'm driven by the challenge of turning complex requirements into elegant, functional solutions.`,
  de: `In Zürich tätig, arbeite ich an der Schnittstelle von Design, Technologie und Marketing. Mit einem Hintergrund in IT-Beratung und Systemarchitektur bringe ich einen strukturierten, analytischen Ansatz zur digitalen Produktentwicklung — verbunden mit einer echten Leidenschaft für sauberes, nutzerzentriertes Design.

Ich halte einen B.Sc. in Wirtschaftsinformatik und verfüge über praktische Erfahrung in Enterprise-Datensystemen, Unternehmenswebplattformen und KI-gestützter Automatisierung. Ich bin motiviert durch die Herausforderung, komplexe Anforderungen in elegante, funktionale Lösungen zu verwandeln.`,
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
    subtitle: { en: 'What I love outside of work', de: 'Was ich neben der Arbeit liebe' },
    body: {
      en: 'Photography, travel, self-hosting technology, and music are my main creative pursuits. I spend a lot of time exploring urban environments with a camera, tinkering with self-hosted services on my homelab, and playing guitar. I try to visit at least two new countries every year — Japan is high on the list.',
      de: 'Fotografie, Reisen, Self-Hosting und Musik sind meine kreative Beschäftigungen. Ich erkunde urbane Umgebungen mit der Kamera, betreibe ein Homelab mit diversen Self-Hosted-Diensten und spiele Gitarre. Mindestens zwei neue Länder pro Jahr — Japan steht ganz oben auf der Liste.',
    },
  },
  {
    id: 'goals',
    title: { en: 'Goals', de: 'Ziele' },
    subtitle: { en: 'Where I am heading', de: 'Wohin ich mich entwickle' },
    body: {
      en: 'I want to build digital products that are as technically solid as they are beautifully crafted. My focus is bridging the gap between design and engineering — creating systems that not only work well but feel intuitive to use. Long term, I aim to combine automation, AI, and thoughtful UX into products that genuinely improve how people work.',
      de: 'Ich möchte digitale Produkte entwickeln, die technisch solide und gleichzeitig schön gestaltet sind. Mein Fokus liegt auf der Brücke zwischen Design und Engineering — Systeme schaffen, die gut funktionieren und sich intuitiv anfühlen. Langfristig möchte ich Automatisierung, KI und durchdachte UX in Produkte verbinden, die Arbeitsweisen wirklich verbessern.',
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
