export function StatusRail({ items }: { items: string[] }) {
  return (
    <div className="status-rail" aria-label="Site status">
      {items.map((item, i) => (
        <span
          key={item}
          className="boot-rise"
          style={{ animationDelay: `${0.55 + i * 0.14}s` }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
