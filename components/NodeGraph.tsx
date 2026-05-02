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
}

// R2 = 26vmin, R3 = 46vmin for generous spacing
const NODE_DEFS: NodeDef[] = [
  { id: 'noah', level: 0, labelEn: 'Noah', labelDe: 'Noah', angle: 0, r: 0, parentId: null, modalId: null },
  { id: 'experience', level: 2, labelEn: 'Experience', labelDe: 'Erfahrung', angle: 0, r: 26, parentId: 'noah', modalId: 'experience' },
  { id: 'skills', level: 2, labelEn: 'Skills & Tools', labelDe: 'Skills & Tools', angle: 72, r: 26, parentId: 'noah', modalId: 'skills' },
  { id: 'projects', level: 2, labelEn: 'Projects', labelDe: 'Arbeiten', angle: 144, r: 26, parentId: 'noah', modalId: 'projects' },
  { id: 'about', level: 2, labelEn: 'About Me', labelDe: 'Über mich', angle: 216, r: 26, parentId: 'noah', modalId: 'about' },
  { id: 'contact', level: 2, labelEn: 'Contact', labelDe: 'Kontakt', angle: 288, r: 26, parentId: 'noah', modalId: 'contact' },
  // Skills sub-nodes
  { id: 'skills-languages', level: 3, labelEn: 'Languages', labelDe: 'Sprachen', angle: 50, r: 46, parentId: 'skills', modalId: 'skills-languages' },
  { id: 'skills-tools', level: 3, labelEn: 'Tools', labelDe: 'Tools', angle: 72, r: 46, parentId: 'skills', modalId: 'skills-tools' },
  { id: 'skills-skills', level: 3, labelEn: 'Skills', labelDe: 'Skills', angle: 94, r: 46, parentId: 'skills', modalId: 'skills-skills' },
  // Projects sub-nodes
  { id: 'project-n8n', level: 3, labelEn: 'n8n', labelDe: 'n8n', angle: 122, r: 46, parentId: 'projects', modalId: 'project-n8n' },
  { id: 'project-web', level: 3, labelEn: 'Web', labelDe: 'Web', angle: 136, r: 46, parentId: 'projects', modalId: 'project-web' },
  { id: 'project-ai', level: 3, labelEn: 'AI', labelDe: 'AI', angle: 150, r: 46, parentId: 'projects', modalId: 'project-ai' },
  { id: 'project-pending', level: 3, labelEn: '···', labelDe: '···', angle: 164, r: 46, parentId: 'projects', modalId: 'project-pending' },
  // About Me sub-nodes
  { id: 'about-interests', level: 3, labelEn: 'Interests', labelDe: 'Interessen', angle: 202, r: 46, parentId: 'about', modalId: 'about-interests' },
  { id: 'about-story', level: 3, labelEn: 'Story', labelDe: 'Story', angle: 216, r: 46, parentId: 'about', modalId: 'about-story' },
  { id: 'about-goals', level: 3, labelEn: 'Goals', labelDe: 'Ziele', angle: 230, r: 46, parentId: 'about', modalId: 'about-goals' },
]

function nodeHash(id: string) {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return h
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

// Uniform sizes: center node is larger, all others identical
const CENTER_SIZE = 90
const NODE_SIZE = 68   // level 2 and 3 all the same
const LABEL_SIZE = 20  // px

export default function NodeGraph() {
  const { openModal } = useModal()
  const { lang } = useLang()
  const outerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // ── Pan / zoom interaction ────────────────────────────────────────────────
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const zoomMv = useMotionValue(1)
  const smoothPanX = useSpring(panX, { stiffness: 90, damping: 28 })
  const smoothPanY = useSpring(panY, { stiffness: 90, damping: 28 })
  const smoothZoom = useSpring(zoomMv, { stiffness: 160, damping: 38 })

  const dragActive = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragBase = useRef({ x: 0, y: 0 })
  const wasDragging = useRef(false)

  function onPointerDown(e: React.PointerEvent) {
    dragActive.current = true
    wasDragging.current = false
    dragStart.current = { x: e.clientX, y: e.clientY }
    dragBase.current = { x: panX.get(), y: panY.get() }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragActive.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    if (Math.hypot(dx, dy) > 5) wasDragging.current = true
    panX.set(dragBase.current.x + dx)
    panY.set(dragBase.current.y + dy)
  }

  function onPointerUp() {
    dragActive.current = false
  }

  // Wheel zoom (non-passive)
  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const next = Math.max(0.45, Math.min(2.8, zoomMv.get() - e.deltaY * 0.0008))
      zoomMv.set(next)
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [zoomMv])

  // ── Container size ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    update()
    return () => ro.disconnect()
  }, [])

  const vmin = size.w > 0 ? Math.min(size.w, size.h) / 100 : 0
  const cx = size.w / 2
  const cy = size.h / 2

  function getPos(angle: number, r: number) {
    return {
      x: cx + r * Math.sin(toRad(angle)) * vmin,
      y: cy - r * Math.cos(toRad(angle)) * vmin,
    }
  }

  const positions = NODE_DEFS.map((n) => ({ ...n, ...getPos(n.angle, n.r) }))
  const byId = Object.fromEntries(positions.map((p) => [p.id, p]))

  const lines = positions
    .filter((n) => n.parentId)
    .map((n) => {
      const parent = byId[n.parentId!]
      if (!parent) return null
      return { key: `${parent.id}--${n.id}`, x1: parent.x, y1: parent.y, x2: n.x, y2: n.y }
    })
    .filter(Boolean) as { key: string; x1: number; y1: number; x2: number; y2: number }[]

  function handleNodeClick(modalId: string) {
    if (wasDragging.current) return
    openModal(modalId)
  }

  return (
    <div
      ref={outerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Subtle star-field background */}
      <div className="absolute inset-0 star-field pointer-events-none" />

      {/* Pan + zoom canvas */}
      <motion.div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          x: smoothPanX,
          y: smoothPanY,
          scale: smoothZoom,
          transformOrigin: 'center center',
        }}
      >
        {/* SVG lines */}
        {size.w > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={size.w}
            height={size.h}
          >
            {lines.map((l) => (
              <line
                key={l.key}
                x1={l.x1} y1={l.y1}
                x2={l.x2} y2={l.y2}
                stroke="rgba(74,127,193,0.20)"
                strokeWidth="1"
              />
            ))}
          </svg>
        )}

        {/* Nodes */}
        {size.w > 0 && positions.map((node) => {
          const h = nodeHash(node.id)
          const amp = 5 + (h % 6)
          const dur = 3.5 + ((h % 20) / 10)
          const delay = ((h % 100) / 100) * dur
          const sz = node.level === 0 ? CENTER_SIZE : NODE_SIZE
          const label = lang === 'de' ? node.labelDe : node.labelEn
          const clickable = !!node.modalId

          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: node.x,
                top: node.y,
                marginLeft: -sz / 2,
                marginTop: -sz / 2,
                width: sz,
                height: sz,
              }}
            >
              {/* Float animation */}
              <motion.div
                className="relative w-full h-full"
                animate={{ y: [0, amp, 0, -amp, 0] }}
                transition={{
                  duration: dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              >
                {/* Hover scale — tween for smooth, no oscillation */}
                <motion.div
                  className={`w-full h-full rounded-full${clickable ? ' pointer-events-auto' : ''}`}
                  style={{
                    cursor: clickable ? 'pointer' : 'default',
                    background: `radial-gradient(circle at center,
                      rgba(74,127,193,0.88) 0%,
                      rgba(74,127,193,0.46) 30%,
                      rgba(74,127,193,0.14) 62%,
                      transparent 100%)`,
                    boxShadow: `0 0 ${sz * 0.6}px ${sz * 0.14}px rgba(74,127,193,0.24)`,
                  }}
                  whileHover={clickable ? { scale: 1.15 } : {}}
                  transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (node.modalId) handleNodeClick(node.modalId)
                  }}
                />

                {/* Center "Noah" label — inside the glow */}
                {node.level === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="font-mono font-bold tracking-widest text-white"
                      style={{ fontSize: 13 }}
                    >
                      {label}
                    </span>
                  </div>
                )}

                {/* Labels below level-2 and level-3 nodes */}
                {node.level !== 0 && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                    style={{ top: sz + 8 }}
                  >
                    <span
                      className="font-mono font-semibold text-white"
                      style={{ fontSize: LABEL_SIZE }}
                    >
                      {label}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
