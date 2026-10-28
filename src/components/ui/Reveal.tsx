import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Stagger direct children instead of the wrapper itself. */
  stagger?: boolean
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Scroll-triggered reveal. Uses IntersectionObserver once; respects
 * prefers-reduced-motion via CSS (elements render visible immediately).
 */
export function Reveal({ children, className = '', stagger = false, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const Tag = as
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
