const SEGMENTS: Record<string, string[]> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'g', 'c', 'd'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'g', 'e', 'c', 'd'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
}

type Seg = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

function hbar(x1: number, x2: number, y: number): string {
  return `${x1},${y} ${x1 + 3.5},${y - 3.5} ${x2 - 3.5},${y - 3.5} ${x2},${y} ${x2 - 3.5},${y + 3.5} ${x1 + 3.5},${y + 3.5}`
}

function vbar(x: number, y1: number, y2: number): string {
  return `${x},${y1} ${x + 3.5},${y1 + 3.5} ${x + 3.5},${y2 - 3.5} ${x},${y2} ${x - 3.5},${y2 - 3.5} ${x - 3.5},${y1 + 3.5}`
}

const PATHS: Record<Seg, string> = {
  a: hbar(8, 36, 5),
  b: vbar(39, 8, 36),
  c: vbar(39, 42, 70),
  d: hbar(8, 36, 75),
  e: vbar(5, 42, 70),
  f: vbar(5, 8, 36),
  g: hbar(8, 36, 40),
}

function Digit({ d, height }: { d: string; height: number }) {
  const lit = new Set(SEGMENTS[d] ?? [])
  return (
    <svg viewBox="0 0 44 80" height={height} style={{ height, width: 'auto' }} aria-hidden="true">
      {(Object.keys(PATHS) as Seg[]).map((s) => (
        <polygon
          key={s}
          points={PATHS[s]}
          className={lit.has(s) ? 'seg-lit' : 'seg-ghost'}
        />
      ))}
    </svg>
  )
}

export function SegmentDisplay({
  value,
  cells,
  height = 56,
  label,
  className,
}: {
  value: string
  cells?: number
  height?: number
  label: string
  className?: string
}) {
  const digits = value.replace(/\D/g, '').split('')
  const pad = cells ? Math.max(0, cells - digits.length) : 0
  const all: string[] = [...Array<string>(pad).fill(''), ...digits]
  return (
    <span
      role="img"
      aria-label={label}
      className={className}
      style={{ display: 'inline-flex', gap: height * 0.14, alignItems: 'center' }}
    >
      {all.map((d, i) => (
        <Digit key={i} d={d} height={height} />
      ))}
    </span>
  )
}
