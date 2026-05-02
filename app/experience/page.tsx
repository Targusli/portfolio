import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Experience — Noah Zuppiger' }

const workHistory = [
  {
    period: '2022 — PRESENT',
    title: 'SYSTEMS ANALYST',
    company: 'TECH.CORP GMBH',
    description:
      'Lead architect for enterprise resource planning integration. Designed and implemented high-availability data pipelines connecting legacy mainframe systems with modern web-based microservices. Streamlined internal reporting, reducing query latency by 45%.',
  },
  {
    period: '2020 — 2022',
    title: 'JUNIOR IT CONSULTANT',
    company: 'CONSULTING WIRTSCHAFTSINFORMATIK AG',
    description:
      'Assisted in the digital transformation of mid-sized financial institutions. Conducted requirements engineering, drafted technical specifications, and coordinated agile development sprints between client stakeholders and offshore engineering teams.',
  },
  {
    period: '2018 — 2020',
    title: 'DATA ENGINEER INTERN',
    company: 'DATAFLOW LOGISTICS',
    description:
      'Developed automated Python scripts for data cleansing and normalisation. Maintained operational integrity of SQL databases ensuring 99.9% uptime during peak logistical cycles.',
  },
]

const education = [
  {
    period: '2019 — 2022',
    title: 'B.SC. WIRTSCHAFTSINFORMATIK',
    company: 'UNIVERSITY OF APPLIED SCIENCES',
    description:
      'Thesis: "Evaluating the Efficiency of Micro-Frontends in Enterprise Scale Applications." Graduated with honours. Key coursework included Systems Architecture, Database Design, and IT Project Management.',
  },
  {
    period: '2015 — 2019',
    title: 'FEDERAL DIPLOMA IN IT',
    company: 'VOCATIONAL SCHOOL OF TECHNOLOGY',
    description:
      'Specialisation in Application Development. Practical training combined with rigorous academic study in core computer science principles.',
  },
]

function TimelineItem({
  period,
  title,
  company,
  description,
}: {
  period: string
  title: string
  company: string
  description: string
}) {
  return (
    <div className="relative mb-12 last:mb-0">
      {/* Timeline dot */}
      <div className="absolute -left-[35px] top-1.5 w-[6px] h-[6px] bg-primary" />
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
        <div className="font-mono-data text-mono-data text-outline">{period}</div>
        <div>
          <h3 className="font-h3 text-h3 text-on-surface mb-1">{title}</h3>
          <div className="font-mono-data text-mono-data text-primary mb-4">{company}</div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <main className="flex-grow max-w-container-max mx-auto w-full px-6 md:px-10 py-16 md:py-24">
      <header className="mb-16">
        <h1 className="font-h1 text-h1 text-on-surface mb-4">EXPERIENCE LOG</h1>
        <p className="font-mono-data text-mono-data text-outline">
          PROFESSIONAL TIMELINE &amp; ACADEMIC BACKGROUND
        </p>
      </header>

      {/* Timeline */}
      <div className="relative pl-8 border-l border-[#1e1e1e]">
        {/* Work History */}
        <section className="mb-24">
          <h2 className="font-label-caps text-label-caps text-outline mb-10 tracking-[0.2em]">
            WORK HISTORY
          </h2>
          {workHistory.map((item) => (
            <TimelineItem key={item.title} {...item} />
          ))}
        </section>

        {/* Divider */}
        <div className="w-16 h-px bg-[#1e1e1e] mb-16 -ml-8" />

        {/* Education */}
        <section>
          <h2 className="font-label-caps text-label-caps text-outline mb-10 tracking-[0.2em]">
            EDUCATION
          </h2>
          {education.map((item) => (
            <TimelineItem key={item.title} {...item} />
          ))}
        </section>
      </div>
    </main>
  )
}
