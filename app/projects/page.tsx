import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Projects — Noah Zuppiger' }

const projects = [
  {
    index: '01',
    category: 'AUTOMATION',
    title: 'n8n Workflow Automation',
    description:
      'Designed and implemented a comprehensive n8n-based orchestration system to synchronise CRM data with external marketing platforms. Reduced manual data entry overhead by 85% while ensuring zero-loss transactional integrity across API endpoints.',
    tags: ['N8N', 'API', 'NODE.JS'],
    href: '#',
    pending: false,
  },
  {
    index: '02',
    category: 'FRONTEND',
    title: 'Company Website Redesign',
    description:
      'Led the technical execution of a corporate web platform overhaul. Translated high-fidelity marketing designs into a performant, component-driven frontend architecture utilising modern framework paradigms for optimal Core Web Vitals.',
    tags: ['NEXT.JS', 'TAILWIND', 'TYPESCRIPT'],
    href: '#',
    pending: false,
  },
  {
    index: '03',
    category: 'MACHINE LEARNING',
    title: 'AI Image Pipeline',
    description:
      'Architected a scalable ingestion and processing pipeline utilising cloud-native GPU instances to generate and optimise high-volume visual assets. Integrated custom prompting heuristics to maintain brand consistency across generated outputs.',
    tags: ['PYTHON', 'AWS', 'STABLE DIFFUSION'],
    href: '#',
    pending: false,
  },
  {
    index: '04',
    category: 'PENDING',
    title: '[In Progress]',
    description:
      'Currently developing a secure, decentralised credential verification system utilising blockchain technology. Architecture phase ongoing. Awaiting primary module completion.',
    tags: ['TBD'],
    href: null,
    pending: true,
  },
]

export default function ProjectsPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-6 md:px-10 py-16 md:py-24 grid-bg">
      {/* Header */}
      <div className="mb-12 border-b border-[#1e1e1e] pb-6">
        <h1 className="font-h1 text-h1 text-on-surface mb-2">&gt;_ PROJECTS</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          A selection of recent technical implementations, workflow automations, and digital systems
          architecture.
        </p>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.index}
            className={[
              'bg-[#0d0d0d] border border-[#1e1e1e] border-l-2 relative flex flex-col min-h-[320px] transition-colors duration-150',
              project.pending
                ? 'border-l-surface-container-highest opacity-70'
                : 'border-l-[#4a7fc1] hover:border-[#4a7fc1] group',
            ].join(' ')}
          >
            {/* External link arrow */}
            {!project.pending && project.href && (
              <Link
                href={project.href}
                className="absolute top-4 right-4 text-on-surface-variant group-hover:text-primary transition-colors"
                aria-label={`Open ${project.title}`}
              >
                <span className="material-symbols-outlined">north_east</span>
              </Link>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <div className="mb-4">
                <span
                  className={`font-mono-data text-mono-data mb-1 block ${
                    project.pending ? 'text-surface-container-highest' : 'text-primary'
                  }`}
                >
                  {project.index} // {project.category}
                </span>
                <h2
                  className={`font-h2 text-h2 ${
                    project.pending ? 'text-outline' : 'text-on-surface'
                  }`}
                >
                  {project.title}
                </h2>
              </div>

              <p
                className={`font-body-md text-body-md mb-8 flex-grow ${
                  project.pending ? 'text-outline-variant italic' : 'text-on-surface-variant'
                }`}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 font-label-caps text-label-caps text-on-surface-variant border border-[#1e1e1e] ${
                      project.pending ? 'border-dashed' : 'bg-surface-container-high'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
