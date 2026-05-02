import Link from 'next/link'

const mobileCards = [
  { href: '/skills', label: 'SKILLS' },
  { href: '/experience', label: 'EXPERIENCE' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/skills', label: 'TOOLS' },
]

const graphNodes = [
  {
    label: 'SKILLS',
    top: '30%',
    left: '70%',
    href: '/skills',
    subNodes: [
      { label: 'DESIGN', top: '-40px', left: '40px' },
      { label: 'MARKETING', top: '0px', left: '60px' },
      { label: 'IT', top: '40px', left: '40px' },
    ],
  },
  { label: 'EXPERIENCE', top: '40%', left: '30%', href: '/experience' },
  { label: 'PROJECTS', top: '75%', left: '65%', href: '/projects' },
  { label: 'TOOLS', top: '80%', left: '35%', href: '/skills' },
  { label: 'CONTACT', top: '25%', left: '50%', href: '/contact' },
]

const graphLines = [
  { rotate: -30, width: 250 },
  { rotate: -150, width: 200 },
  { rotate: 45, width: 220 },
  { rotate: 120, width: 280 },
  { rotate: -90, width: 150 },
]

export default function Home() {
  return (
    <>
      {/* ── Desktop: node graph ─────────────────────────────── */}
      <div className="hidden md:flex flex-grow relative overflow-hidden min-h-[calc(100vh-120px)]">
        {/* Star field */}
        <div className="absolute inset-0 star-field pointer-events-none" />

        {/* Lines radiating from centre */}
        {graphLines.map((line, i) => (
          <div
            key={i}
            className="absolute bg-[#1e1e1e]"
            style={{
              top: '50%',
              left: '50%',
              width: line.width,
              height: 1,
              transformOrigin: '0 50%',
              transform: `rotate(${line.rotate}deg)`,
              zIndex: 0,
            }}
          />
        ))}

        {/* Central node */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-2 h-2 rounded-full bg-[#1b3a6b] border-2 border-[#4a7fc1] node-glow mb-2" />
          <span className="font-h3 text-h3 text-primary">NOAH</span>
        </div>

        {/* Satellite nodes */}
        {graphNodes.map((node) => (
          <div
            key={node.label}
            className="absolute z-10 flex flex-col items-center"
            style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#1b3a6b] border border-[#4a7fc1] node-glow mb-2" />
            <Link
              href={node.href ?? '#'}
              className="font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors duration-150"
            >
              {node.label}
            </Link>

            {/* Sub-nodes (SKILLS only) */}
            {node.subNodes?.map((sub) => (
              <div
                key={sub.label}
                className="absolute flex flex-col items-start"
                style={{ top: sub.top, left: sub.left }}
              >
                <div className="w-1 h-1 rounded-full bg-secondary-container node-glow mb-1" />
                <span className="font-mono text-[10px] text-on-surface-variant">{sub.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Mobile: card grid ───────────────────────────────── */}
      <div className="md:hidden flex flex-col flex-grow">
        <p className="text-center py-4 font-mono text-sm text-[#6b6b6b]">
          Marketing · Design · IT — Zürich
        </p>
        <div className="flex flex-col gap-4 px-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            {mobileCards.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="bg-[#0d0d0d] border border-[#1e1e1e] border-l-2 border-l-[#1b3a6b] p-5 flex justify-between items-center hover:border-l-[#4a7fc1] transition-colors duration-300 group"
              >
                <h2 className="font-h3 text-h3 text-on-surface uppercase tracking-widest">
                  {label}
                </h2>
                <span className="text-[#6b6b6b] font-mono group-hover:text-primary transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
          {/* Contact — full width */}
          <Link
            href="/contact"
            className="bg-[#0d0d0d] border border-[#1e1e1e] border-l-2 border-l-[#1b3a6b] p-5 flex justify-between items-center hover:border-l-[#4a7fc1] transition-colors duration-300 group"
          >
            <h2 className="font-h3 text-h3 text-on-surface uppercase tracking-widest">CONTACT</h2>
            <span className="text-[#6b6b6b] font-mono group-hover:text-primary transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}
