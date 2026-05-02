import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Skills — Noah Zuppiger' }

const categories = [
  {
    title: 'Design',
    description:
      'Translating complex requirements into intuitive interfaces through user-centred methodology. Experienced in crafting scalable design systems and high-fidelity prototypes for web and mobile products.',
    skills: ['Figma', 'UI/UX Design', 'Prototyping', 'Design Systems', 'Wireframing', 'Interaction Design'],
  },
  {
    title: 'Marketing',
    description:
      'Data-driven approach to content strategy, campaign management, and brand positioning. Proficient in performance analysis and optimizing digital channels to maximise reach and conversion.',
    skills: ['SEO Optimization', 'Content Strategy', 'Google Analytics', 'Campaign Management', 'Brand Positioning'],
  },
  {
    title: 'IT & Tools',
    description:
      'Full-stack awareness spanning frontend development, version control, database queries, and workflow automation. Comfortable bridging the gap between technical implementation and business requirements.',
    skills: ['HTML5 / CSS3', 'Tailwind CSS', 'Next.js', 'Git / GitHub', 'VS Code', 'Python', 'SQL', 'n8n', 'CMS Platforms'],
  },
  {
    title: 'Languages',
    description:
      'Native German speaker with professional English fluency and working knowledge of French, enabling effective collaboration across international teams and client engagements.',
    skills: ['German (Native)', 'English (Fluent / C1)', 'French (Basic / A2)'],
  },
]

export default function SkillsPage() {
  return (
    <main className="flex-grow max-w-container-max mx-auto w-full px-6 md:px-10 py-16 md:py-24">
      <header className="mb-16">
        <h1 className="font-h1 text-h1 text-on-surface mb-6">SKILLS</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          A structured overview of technical capabilities, design methodologies, and tools utilised
          across various projects. This index is continuously updated to reflect ongoing professional
          development and industry standards.
        </p>
      </header>

      <div className="space-y-16">
        {categories.map((cat) => (
          <section key={cat.title}>
            <h2 className="font-h2 text-h2 text-primary border-b border-[#1e1e1e] pb-4 mb-6 uppercase">
              {cat.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-3xl">
              {cat.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#1e1e1e] hover:border-[#4a7fc1] rounded bg-surface px-3 py-1.5 font-mono-data text-mono-data text-on-surface transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
