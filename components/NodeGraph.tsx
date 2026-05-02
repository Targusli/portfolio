'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

const NODE_DEFS: NodeDef[] = [
  { id: 'noah', level: 0, labelEn: 'Noah Zuppiger', labelDe: 'Noah Zuppiger', angle: 0, r: 0, parentId: null, modalId: null },
  { id: 'experience', level: 2, labelEn: 'Experience', labelDe: 'Erfahrung', angle: 0, r: 22, parentId: 'noah', modalId: 'experience' },
  { id: 'skills', level: 2, labelEn: 'Skills & Tools', labelDe: 'Skills & Tools', angle: 72, r: 22, parentId: 'noah', modalId: 'skills' },
  { id: 'projects', level: 2, labelEn: 'Projects', labelDe: 'Arbeiten', angle: 144, r: 22, parentId: 'noah', modalId: 'projects' },
  { id: 'hobbies', level: 2, labelEn: 'Hobbies', labelDe: 'Hobbies', angle: 216, r: 22, parentId: 'noah', modalId: 'hobbies' },
  { id: 'contact', level: 2, labelEn: 'Contact', labelDe: 'Kontakt', angle: 288, r: 22, parentId: 'noah', modalId: 'contact' },
  { id: 'skills-languages', level: 3, labelEn: 'Languages', labelDe: 'Sprachen', angle: 50, r: 38, parentId: 'skills', modalId: 'skills-languages' },
  { id: 'skills-tools', level: 3, labelEn: 'Tools', labelDe: 'Tools', angle: 72, r: 38, parentId: 'skills', modalId: 'skills-tools' },
  { id: 'skills-skills', level: 3, labelEn: 'Skills', labelDe: 'Skills', angle: 94, r: 38, parentId: 'skills', modalId: 'skills-skills' },
  { id: 'project-n8n', level: 3, labelEn: 'n8n', labelDe: 'n8n', angle: 122, r: 38, parentId: 'projects', modalId: 'project-n8n' },
  { id: 'project-web', level: 3, labelEn: 'Web', labelDe: 'Web', angle: 136, r: 38, parentId: 'projects', modalId: 'project-web' },
  { id: 'project-ai', level: 3, labelEn: 'AI', labelDe: 'AI', angle: 150, r: 38, parentId: 'projects', modalId: 'project-ai' },
  { id: 'project-pending', level: 3, labelEn: '···', labelDe: '···', angle: 164, r: 38, parentId: 'projects', modalId: 'project-pending' },
  { id: 'hobby-photography', level: 3, labelEn: 'Photo', labelDe: 'Foto', angle: 196, r: 38, parentId: 'hobbies', modalId: 'hobby-photography' },
  { id: 'hobby-travel', level: 3, labelEn: 'Travel', labelDe: 'Reisen', angle: 210, r: 38, parentId: 'hobbies', modalId: 'hobby-travel' },
  { id: 'hobby-tech', level: 3, labelEn: 'Tech', labelDe: 'Tech', angle: 224, r: 38, parentId: 'hobbies', modalId: 'hobby-tech' },
  { id: 'hobby-music', level: 3, labelEn: 'Music', labelDe: 'Musik', angle: 238, r: 38, parentId: 'hobbies', modalId: 'hobby-music' },
]

function nodeHash(id: string) {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xffff
  return h
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

export default function NodeGraph() {
  const { openModal } = useModal()
  const { lang } = useLang()
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

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

  function nodeSize(level: number) {
    if (level === 0) return Math.max(64, Math.min(88, vmin * 9))
    if (level === 2) return Math.max(48, Math.min(70, vmin * 7))
    return Math.max(36, Math.min(54, vmin * 5.5))
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

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Subtle star-field background */}
      <div className="absolute inset-0 star-field pointer-events-none" />

      {/* SVG lines */}
      {size.w > 0 && (
        <svg className="absolute inset-0 pointer-events-none" width={size.w} height={size.h}>
          {lines.map((l) => (
            <line
              key={l.key}
              x1={l.x1} y1={l.y1}
              x2={l.x2} y2={l.y2}
              stroke="rgba(74,127,193,0.18)"
              strokeWidth="1"
            />
          ))}
        </svg>
      )}

      {/* Nodes */}
      {size.w > 0 && positions.map((node) => {
        const h = nodeHash(node.id)
        const amp = 4 + (h % 7)
        const dur = 3.2 + ((h % 20) / 10)
        const delay = ((h % 100) / 100) * dur
        const sz = nodeSize(node.level)
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
            {/* Float animation wrapper */}
            <motion.div
              className="relative w-full h-full"
              animate={{ y: [-amp / 2, amp / 2, -amp / 2] }}
              transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
            >
              {/* Hover + click wrapper */}
              <motion.div
                className={`w-full h-full rounded-full${clickable ? ' cursor-pointer' : ''}`}
                whileHover={clickable ? { scale: 1.18 } : {}}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                onClick={() => node.modalId && openModal(node.modalId)}
                style={{
                  background: `radial-gradient(circle at center,
                    rgba(74,127,193,0.82) 0%,
                    rgba(74,127,193,0.42) 32%,
                    rgba(74,127,193,0.12) 64%,
                    transparent 100%)`,
                  boxShadow: `0 0 ${sz * 0.55}px ${sz * 0.12}px rgba(74,127,193,0.22)`,
                }}
              />

              {/* Center label for noah node */}
              {node.level === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-[10px] tracking-wider text-primary/70 text-center leading-tight px-2">
                    {label}
                  </span>
                </div>
              )}

              {/* Label below for level 2 & 3 */}
              {node.level !== 0 && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                  style={{ top: sz + 6 }}
                >
                  <span
                    className={
                      node.level === 2
                        ? 'font-mono text-[11px] tracking-wider text-on-surface-variant'
                        : 'font-mono text-[9px] tracking-wider text-outline'
                    }
                  >
                    {label}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
