'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/i18n'

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const commands = t.loading.commands
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const total = 2400 // ms
    const steps = 100
    const interval = total / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      setProgress(step)
      if (step >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setVisible(false)
          setTimeout(onDone, 600)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onDone])

  const cmdIndex = Math.min(Math.floor((progress / 100) * commands.length), commands.length - 1)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-md px-8 font-mono">
            {/* Terminal commands */}
            <div className="mb-10 space-y-2 min-h-[120px]">
              {commands.map((cmd, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: i <= cmdIndex ? 1 : 0, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-sm ${
                    i === cmdIndex ? 'text-primary' : 'text-outline'
                  }`}
                >
                  {cmd}
                  {i === cmdIndex && progress < 100 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="flex justify-between items-center mb-2 text-[11px] tracking-widest uppercase text-outline">
              <span>{t.loading.label}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-px bg-[#1e1e1e]">
              <motion.div
                className="h-full bg-primary origin-left"
                style={{ scaleX: progress / 100 }}
                transition={{ type: 'tween', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
