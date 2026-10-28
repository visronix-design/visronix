import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'outline'
  size?: 'md' | 'sm'
  /** Internal route — renders a router Link. */
  to?: string
  /** External/absolute URL — renders an anchor. */
  href?: string
  external?: boolean
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

/**
 * Single control primitive used everywhere: rectangular panel switch,
 * mono label, press feedback on pointer-down, lit cyan for the primary action.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  external,
  type = 'button',
  onClick,
  className = '',
  ...rest
}: Props) {
  const classes = [
    'btn',
    variant === 'primary' ? 'btn-lit' : '',
    size === 'sm' ? 'btn-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
