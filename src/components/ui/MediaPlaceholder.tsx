type Props = {
  label: string
  className?: string
  aspect?: 'aspect-video' | 'aspect-[4/3]' | 'aspect-square' | 'aspect-[16/10]' | 'aspect-[4/5]'
}

/**
 * Ghost media cell — used wherever real photography or video has not been
 * supplied yet. Rendered as designed absence, clearly labelled; never
 * disguised as a photo.
 */
export function MediaPlaceholder({ label, className = '', aspect = 'aspect-video' }: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`ghost-cell relative flex ${aspect} w-full items-center justify-center px-6 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="data-xs uppercase" style={{ letterSpacing: '0.14em' }}>
          {label}
        </p>
        <p className="data-xs text-low/70">AWAITING ASSETS</p>
      </div>
    </div>
  )
}
