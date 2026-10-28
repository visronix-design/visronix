export function Led({
  state,
  children,
}: {
  state: 'lit' | 'ok' | 'progress' | 'off'
  children: React.ReactNode
}) {
  return <span className={`led led-${state}`}>{children}</span>
}
