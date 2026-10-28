import { Link } from 'react-router-dom'

/** VISRONIX wordmark with a circuit-style V mark (temporary brand mark — replaceable). */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5"
      aria-label="VISRONIX Technologies — home"
    >
      <svg
        viewBox="0 0 32 32"
        className="size-8 shrink-0"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
      >
        <path d="M7 7 L16 25 L25 7" stroke="var(--color-cyan)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="2.4" fill="var(--color-cyan)" stroke="none" />
        <circle cx="25" cy="7" r="2.4" stroke="var(--color-cyan)" strokeWidth="1.6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-[1.05rem] font-semibold text-paper"
          style={{ fontStretch: '118%', letterSpacing: '0.02em' }}
        >
          VISRONIX
        </span>
        {!compact && (
          <span className="data-xs mt-1 text-dim" style={{ letterSpacing: '0.3em' }}>
            TECHNOLOGIES
          </span>
        )}
      </span>
    </Link>
  )
}
