'use client'

import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { projects } from '@/lib/data'

function ProjectDetail({ projectId }: { projectId: string }) {
  const { lang, t } = useLang()
  const project = projects.find((p) => p.id === projectId)
  if (!project) return null

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs text-outline">{project.index}</span>
        <span className="font-mono text-xs px-2 py-0.5 border border-[#2a2a2a] text-on-surface-variant rounded-sm">
          {lang === 'de' ? project.category.de : project.category.en}
        </span>
        {project.pending && (
          <span className="font-mono text-xs px-2 py-0.5 border border-tertiary/40 text-tertiary/80 rounded-sm">
            {t.projects.pending}
          </span>
        )}
      </div>

      <h2 className="font-mono text-lg text-on-surface mb-4">{project.title}</h2>

      <p className="text-on-surface-variant leading-relaxed mb-8">
        {lang === 'de' ? project.description.de : project.description.en}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-3 py-1 border border-[#2a2a2a] text-outline rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.href && !project.pending && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 transition-colors border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-sm"
        >
          {t.projects.viewProject}
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            arrow_outward
          </span>
        </a>
      )}
    </div>
  )
}

function OverviewView() {
  const { lang, t } = useLang()
  const { openModal } = useModal()

  return (
    <div className="px-6 md:px-10 py-8 max-w-3xl mx-auto w-full">
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.projects.subtitle}</p>
      <div className="grid gap-4">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => openModal(`project-${project.id}`)}
            className={`text-left border rounded-sm p-5 transition-all group ${
              project.pending
                ? 'border-[#1e1e1e] opacity-60 cursor-pointer hover:opacity-80'
                : 'border-[#1e1e1e] hover:border-primary/30 hover:bg-surface-container'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-outline">{project.index}</span>
                <span className="font-mono text-sm text-on-surface group-hover:text-primary transition-colors">
                  {project.title}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="font-mono text-[10px] px-2 py-0.5 border border-[#2a2a2a] text-outline rounded-sm">
                  {lang === 'de' ? project.category.de : project.category.en}
                </span>
                {project.pending && (
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-tertiary/30 text-tertiary/70 rounded-sm">
                    {t.projects.pending}
                  </span>
                )}
              </div>
            </div>
            <p className="font-mono text-xs text-outline leading-relaxed line-clamp-2">
              {lang === 'de' ? project.description.de : project.description.en}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-outline/60">
                  #{tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const { activeModal } = useModal()

  if (activeModal?.startsWith('project-')) {
    const projectId = activeModal.replace('project-', '')
    return <ProjectDetail projectId={projectId} />
  }

  return <OverviewView />
}
