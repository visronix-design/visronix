import type { ReactNode } from 'react'

type Props = {
  title: ReactNode
  lead?: ReactNode
  /** Right-aligned mono data readout on the heading baseline. */
  aside?: ReactNode
  className?: string
}

/** Section heading block: one clear heading, optional supporting line and data aside. */
export function SectionHead({ title, lead, aside, className = '' }: Props) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="display">{title}</h2>
        {aside && <span className="data-xs text-dim">{aside}</span>}
      </div>
      {lead && <p className="lead mt-4">{lead}</p>}
    </div>
  )
}
