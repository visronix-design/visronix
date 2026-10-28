export function Led({
  state,
  children,
}: {
  state: 'lit' | 'ok' | 'warn' | 'off'
  children: React.ReactNode
}) {
  return <span className={`led led-${state}`}>{children}</span>
}
