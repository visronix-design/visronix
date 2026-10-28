import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  action?: ReactNode
}

/** Honest empty state — used where verified content does not exist yet. */
export function EmptyState({ title, children, action }: Props) {
  return (
    <div className="ghost-cell px-6 py-10 text-center md:px-10 md:py-12">
      <h3 className="title">{title}</h3>
      <p className="body-text mx-auto mt-3 max-w-md">{children}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  )
}
