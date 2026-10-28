import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/Reveal'

type Props = {
  /** Mono data path shown above the heading, e.g. "VISRONIX / LEARNING". */
  path: string
  title: string
  lead?: string
  children?: ReactNode
}

/** Consistent page header for interior pages: data path, display heading, lead. */
export function PageHero({ path, title, lead, children }: Props) {
  return (
    <section className="border-b border-line">
      <Reveal className="container-x pb-14 pt-32 md:pb-20 md:pt-40">
        <p className="data-xs text-dim" aria-hidden="true">
          {path}
        </p>
        <h1 className="display-xl mt-5 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
        {children && <div className="mt-9">{children}</div>}
      </Reveal>
    </section>
  )
}
