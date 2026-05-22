'use client'

import { useLang } from '@/lib/i18n'
import { useModal } from '@/lib/modal'
import { projects } from '@/lib/data'
import Breadcrumbs from '@/components/Breadcrumbs'

// ── Project detail ────────────────────────────────────────────────────────────

function ProjectDetail({ projectId }: { projectId: string }) {
  const { lang, t } = useLang()
  const project = projects.find((p) => p.id === projectId)
  if (!project) return null

  return (
    <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto w-full">
      <Breadcrumbs className="mb-6" />

      {/* Index + title */}
      <div className="flex items-baseline gap-3 mb-5">
        <span className={`font-mono text-xs shrink-0 ${project.pending ? 'text-[#3d9b6a]/60' : 'text-outline'}`}>
          {project.index}
        </span>
        <h2 className={`font-mono text-lg font-semibold leading-snug ${project.pending ? 'text-[#3d9b6a]/80' : 'text-on-surface'}`}>
          {lang === 'de' ? project.title.de : project.title.en}
        </h2>
      </div>

      {/* Tags below title */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className={`font-mono text-xs px-2.5 py-1 rounded-sm border ${
          project.pending
            ? 'border-[#3d9b6a]/40 text-[#3d9b6a]/80 bg-[#3d9b6a]/5'
            : 'border-primary/30 text-primary/70 bg-primary/5'
        }`}>
          {lang === 'de' ? project.category.de : project.category.en}
        </span>
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs px-2.5 py-1 border border-[#2a2a2a] text-outline rounded-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-on-surface-variant leading-relaxed text-[15px] whitespace-pre-line">
        {lang === 'de' ? project.description.de : project.description.en}
      </p>
    </div>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────────

function OverviewView() {
  const { lang, t } = useLang()
  const { pushModal } = useModal()

  return (
    <div className="px-6 md:px-10 py-8 max-w-3xl mx-auto w-full">
      <Breadcrumbs className="mb-6" />
      <h2 className="font-mono text-2xl font-bold text-white mb-3">{t.projects.title}</h2>
      <p className="font-mono text-sm text-on-surface-variant mb-8">{t.projects.subtitle}</p>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`border rounded-sm p-5 transition-all group ${
              project.pending
                ? 'border-[#3d9b6a]/30 hover:border-[#3d9b6a]/50 hover:bg-[#3d9b6a]/5'
                : 'border-[#1e1e1e] hover:border-primary/30 hover:bg-surface-container cursor-pointer'
            }`}
            onClick={() => { if (!project.pending) pushModal(`project-${project.id}`) }}
          >
            {/* Index + title */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`font-mono text-xs shrink-0 ${project.pending ? 'text-[#3d9b6a]/50' : 'text-outline'}`}>
                {project.index}
              </span>
              <span className={`font-mono text-sm font-medium transition-colors ${
                project.pending
                  ? 'text-[#3d9b6a]/80'
                  : 'text-on-surface group-hover:text-primary'
              }`}>
                {lang === 'de' ? project.title.de : project.title.en}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${
                project.pending
                  ? 'border-[#3d9b6a]/40 text-[#3d9b6a]/70'
                  : 'border-[#2a2a2a] text-outline'
              }`}>
                {lang === 'de' ? project.category.de : project.category.en}
              </span>
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-[#252525] text-outline/60">
                  {tag}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="font-mono text-[10px] text-outline/40">+{project.tags.length - 4}</span>
              )}
            </div>

            {/* Description preview */}
            <p className="font-mono text-xs text-outline leading-relaxed line-clamp-2 mb-3">
              {lang === 'de' ? project.description.de : project.description.en}
            </p>

            {/* More info — non-pending only */}
            {!project.pending && (
              <div className="flex justify-end">
                <button
                  onClick={(e) => { e.stopPropagation(); pushModal(`project-${project.id}`) }}
                  className="font-mono text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1"
                >
                  {lang === 'de' ? 'Mehr Infos' : 'More information'}
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const { activeModal } = useModal()

  if (activeModal?.startsWith('project-')) {
    const projectId = activeModal.replace('project-', '')
    return <ProjectDetail projectId={projectId} />
  }

  return <OverviewView />
}
