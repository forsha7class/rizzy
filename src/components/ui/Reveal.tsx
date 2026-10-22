import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li'
}

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const animation = {
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }

  if (as === 'li') {
    return (
      <motion.li className={className} {...animation}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div className={className} {...animation}>
      {children}
    </motion.div>
  )
}
