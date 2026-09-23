'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<'default' | 'link' | 'label'>('default')
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX)
        y.set(e.clientY)
        const target = e.target as HTMLElement
        const interactive = target.closest('[data-cursor]') as HTMLElement | null
        if (interactive) {
          const l = interactive.getAttribute('data-cursor-label')
          if (l) {
            setVariant('label')
            setLabel(l)
          } else {
            setVariant('link')
            setLabel('')
          }
        } else if (target.closest('a, button, input, [role="button"]')) {
          setVariant('link')
          setLabel('')
        } else {
          setVariant('default')
          setLabel('')
        }
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        animate={{
          width: variant === 'label' ? 76 : variant === 'link' ? 44 : 14,
          height: variant === 'label' ? 76 : variant === 'link' ? 44 : 14,
          backgroundColor:
            variant === 'default' ? 'oklch(0.19 0.006 60)' : 'oklch(0.62 0.2 33)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {variant === 'label' && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
