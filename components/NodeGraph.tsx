'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useModal } from '@/lib/modal'
import { useLang } from '@/lib/i18n'

interface NodeDef {
  id: string
  level: 0 | 2 | 3
  labelEn: string
  labelDe: string
  angle: number
  r: number
  parentId: string | null
  modalId: string | null
  href?: string
}

// Irregular radii per node to break the perfect-circle look
const NODE_DEFS: NodeDef[] = [
  { id: 'noah',     level: 0, labelEn: 'Noah',          labelDe: 'Noah',          angle: 0,   r: 0,  parentId: null,       modalId: 'about' },

  // ── Level 2 — varied R ──────────────────────────────────────────────────────
  { id: 'about',    level: 2, labelEn: 'About Me',       labelDe: 'Über mich',     angle: 352, r: 34, parentId: 'noah',     modalId: 'about' },
  { id: 'skills',   level: 2, labelEn: 'Competencies',   labelDe: 'Kompetenzen',   angle: 64,  r: 38, parentId: 'noah',     modalId: 'skills' },
  { id: 'projects', level: 2, labelEn: 'Projects',       labelDe: 'Arbeiten',      angle: 142, r: 30, parentId: 'noah',     modalId: 'projects' },
  { id: 'exp',      level: 2, labelEn: 'Experience',     labelDe: 'Erfahrung',     angle: 218, r: 36, parentId: 'noah',     modalId: 'experience' },
  { id: 'contact',  level: 2, labelEn: 'Contact',        labelDe: 'Kontakt',       angle: 286, r: 32, parentId: 'noah',     modalId: 'contact' },

  // ── Level 3 — Skills ────────────────────────────────────────────────────────
  { id: 'skills-languages', level: 3, labelEn: 'Languages',    labelDe: 'Sprachen',    angle: 50, r: 58, parentId: 'skills', modalId: 'skills-languages' },
  { id: 'skills-tools',     level: 3, labelEn: 'Skills & Tools', labelDe: 'Skills & Tools', angle: 78, r: 62, parentId: 'skills', modalId: 'skills-tools' },

  // ── Level 3 — Projects ──────────────────────────────────────────────────────
  { id: 'project-n8n',     level: 3, labelEn: 'n8n',     labelDe: 'n8n',     angle: 120, r: 52, parentId: 'projects', modalId: 'project-n8n' },
  { id: 'project-web',     level: 3, labelEn: 'Web',     labelDe: 'Web',     angle: 134, r: 58, parentId: 'projects', modalId: 'project-web' },
  { id: 'project-ai',      level: 3, labelEn: 'AI',      labelDe: 'AI',      angle: 150, r: 50, parentId: 'projects', modalId: 'project-ai' },
  { id: 'project-pending', level: 3, labelEn: '···',     labelDe: '···',     angle: 165, r: 56, parentId: 'projects', modalId: 'project-pending' },

  // ── Level 3 — About Me ──────────────────────────────────────────────────────
  { id: 'about-interests', level: 3, labelEn: 'Interests', labelDe: 'Interessen', angle: 343, r: 58, parentId: 'about', modalId: 'about-interests' },
  { id: 'about-goals',     level: 3, labelEn: 'Goals',     labelDe: 'Ziele',      angle: 1,   r: 60, parentId: 'about', modalId: 'about-goals' },

  // ── Level 3 — Experience ────────────────────────────────────────────────────
  { id: 'exp-work', level: 3, labelEn: 'Work',      labelDe: 'Berufserfahrung', angle: 200, r: 52, parentId: 'exp', modalId: 'experience-work' },
  { id: 'exp-edu',  level: 3, labelEn: 'Education', labelDe: 'Ausbildung',      angle: 236, r: 52, parentId: 'exp', modalId: 'experience-education' },

  // ── Level 3 — Contact ───────────────────────────────────────────────────────
  { id: 'linkedin', level: 3, labelEn: 'LinkedIn', labelDe: 'LinkedIn', angle: 304, r: 52, parentId: 'contact', modalId: null, href: 'https://www.linkedin.com/in/noah-zuppiger/' },
]

function nodeHash(id: string) {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return h
}

function toRad(deg: number) { return (deg * Math.PI) / 180 }

const CENTER_SIZE = 106
const NODE_SIZE   = 72
const LABEL_PX    = 20

export default function NodeGraph() {
  const { openModal, replaceStack } = useModal()
  const { lang } = useLang()
  const outerRef    = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // ── Pan & zoom ───────────────────────────────────────────────────────────────
  const panX   = useMotionValue(0)
  const panY   = useMotionValue(0)
  const zoomMv = useMotionValue(1)
  const sPanX  = useSpring(panX,  { stiffness: 90, damping: 28 })
  const sPanY  = useSpring(panY,  { stiffness: 90, damping: 28 })
  const sZoom  = useSpring(zoomMv,{ stiffness: 160, damping: 38 })

  const dragActive  = useRef(false)
  const dragStart   = useRef({ x: 0, y: 0 })
  const dragBase    = useRef({ x: 0, y: 0 })
  const wasDragging = useRef(false)

  // Use document-level pointer handlers so setPointerCapture is not needed —
  // this keeps node onClick events firing correctly.
  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragActive.current) return
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (Math.hypot(dx, dy) > 6) wasDragging.current = true
      panX.set(dragBase.current.x + dx)
      panY.set(dragBase.current.y + dy)
    }
    function onUp() { dragActive.current = false }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }
  }, [panX, panY])

  // Wheel zoom — must be non-passive
  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      zoomMv.set(Math.max(0.45, Math.min(2.8, zoomMv.get() - e.deltaY * 0.0008)))
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [zoomMv])

  // ── Container resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    return () => ro.disconnect()
  }, [])

  const vmin = size.w > 0 ? Math.min(size.w, size.h) / 100 : 0
  const cx   = size.w / 2
  const cy   = size.h / 2

  function getPos(angle: number, r: number) {
    return {
      x: cx + r * Math.sin(toRad(angle)) * vmin,
      y: cy - r * Math.cos(toRad(angle)) * vmin,
    }
  }

  const positions = NODE_DEFS.map((n) => ({ ...n, ...getPos(n.angle, n.r) }))
  const byId      = Object.fromEntries(positions.map((p) => [p.id, p]))

  const lines = positions
    .filter((n) => n.parentId)
    .map((n) => {
      const p = byId[n.parentId!]
      return p ? { key: `${p.id}--${n.id}`, x1: p.x, y1: p.y, x2: n.x, y2: n.y } : null
    })
    .filter(Boolean) as { key: string; x1: number; y1: number; x2: number; y2: number }[]

  // ── Click handler ────────────────────────────────────────────────────────────
  function handleClick(node: typeof NODE_DEFS[number]) {
    if (wasDragging.current) { wasDragging.current = false; return }

    // External link (LinkedIn)
    if (node.href) {
      window.open(node.href, '_blank', 'noopener,noreferrer')
      return
    }
    if (!node.modalId) return

    // For level-3 nodes: include the parent modal in the stack so Back works
    if (node.level === 3 && node.parentId) {
      const parentNode = NODE_DEFS.find((n) => n.id === node.parentId)
      if (parentNode?.modalId) {
        replaceStack([parentNode.modalId, node.modalId])
        return
      }
    }

    openModal(node.modalId)
  }

  return (
    <div
      ref={outerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ cursor: 'grab' }}
      onPointerDown={(e) => {
        dragActive.current  = true
        wasDragging.current = false
        dragStart.current   = { x: e.clientX, y: e.clientY }
        dragBase.current    = { x: panX.get(), y: panY.get() }
      }}
    >
      <div className="absolute inset-0 star-field pointer-events-none" />

      {/* Pan + zoom canvas */}
      <motion.div
        ref={canvasRef}
        className="absolute inset-0"
        style={{ x: sPanX, y: sPanY, scale: sZoom, transformOrigin: 'center center' }}
      >
        {/* SVG connection lines */}
        {size.w > 0 && (
          <svg className="absolute inset-0 pointer-events-none" width={size.w} height={size.h}>
            {lines.map((l) => (
              <line
                key={l.key}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="rgba(74,127,193,0.22)"
                strokeWidth="1"
              />
            ))}
          </svg>
        )}

        {/* Nodes */}
        {size.w > 0 && positions.map((node) => {
          const h   = nodeHash(node.id)
          const amp = 5 + (h % 6)
          const dur = 3.5 + (h % 20) / 10
          const del = ((h % 100) / 100) * dur
          const sz  = node.level === 0 ? CENTER_SIZE : NODE_SIZE
          const lbl = lang === 'de' ? node.labelDe : node.labelEn
          const isLinkedIn    = !!node.href
          const isExperience  = node.id === 'exp' || node.parentId === 'exp'

          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: node.x, top: node.y, marginLeft: -sz / 2, marginTop: -sz / 2, width: sz, height: sz }}
            >
              {/* Float */}
              <motion.div
                className="relative w-full h-full"
                animate={{ y: [0, amp, 0, -amp, 0] }}
                transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: del, times: [0, 0.25, 0.5, 0.75, 1] }}
              >
                {/* Glow — hover scale via tween (no spring wobble) */}
                <motion.div
                  className="w-full h-full rounded-full cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'tween', duration: 0.16, ease: 'easeOut' }}
                  onClick={(e) => { e.stopPropagation(); handleClick(node) }}
                  style={{
                    background: isLinkedIn
                      ? `radial-gradient(circle at center, rgba(10,102,194,0.90) 0%, rgba(10,102,194,0.44) 32%, rgba(10,102,194,0.12) 64%, transparent 100%)`
                      : isExperience
                      ? `radial-gradient(circle at center, rgba(245,158,11,0.78) 0%, rgba(245,158,11,0.38) 32%, rgba(245,158,11,0.10) 64%, transparent 100%)`
                      : `radial-gradient(circle at center, rgba(74,127,193,0.88) 0%, rgba(74,127,193,0.44) 32%, rgba(74,127,193,0.12) 64%, transparent 100%)`,
                    boxShadow: isExperience
                      ? `0 0 ${sz * 0.6}px ${sz * 0.14}px rgba(245,158,11,0.20)`
                      : `0 0 ${sz * 0.6}px ${sz * 0.14}px rgba(74,127,193,0.22)`,
                  }}
                />

                {/* Label below every node */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none text-center"
                  style={{ top: sz + 10 }}
                >
                  <span
                    className="font-mono font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                    style={{ fontSize: LABEL_PX }}
                  >
                    {lbl}
                  </span>
                </div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
