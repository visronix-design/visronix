/**
 * Founders & leadership — VISRONIX Technologies.
 *
 * Single source of truth for who appears on /founders. Every entry is derived
 * from a client-provided portrait file: the part before the parentheses is the
 * person's name, the part inside the parentheses is their position. Nothing
 * here is invented — biographies do not exist yet and are deliberately absent.
 *
 * The original files live in `data/` (client's drop folder, untouched); the
 * served copies live in `public/founders/` under identical filenames. The
 * page component URL-encodes `file` when building the src, so spaces and
 * parentheses are safe.
 */

export type Founder = {
  /** Display name — verbatim from the client-provided filename. */
  name: string
  /** Position — verbatim from the parenthesised part of the filename. */
  position: string
  /** Uppercase role group used by the page's code labels. */
  role: 'FOUNDER' | 'LEADERSHIP'
  /** Original filename (with extension) — also the served asset name. */
  file: string
  /** Per-portrait object-position so faces survive the uniform 4:5 crop. */
  objectPosition: string
}

export const founders: Founder[] = [
  {
    name: 'Vishal Saravanan',
    position: 'Founder',
    role: 'FOUNDER',
    file: 'VISHAL SARAVANAN(FOUNDER).jpeg',
    objectPosition: 'center 30%',
  },
  {
    name: 'Sudharsan S',
    position: 'Chief Technology Officer',
    role: 'LEADERSHIP',
    file: 'SUDHARSAN S(CHIEF TECHNOLOGY OFFICER).jpeg',
    objectPosition: 'center 25%',
  },
  {
    name: 'Swathi R',
    position: 'Chief Information Officer',
    role: 'LEADERSHIP',
    file: 'SWATHI R(CHIEF INFORMATION OFFICER).jpeg',
    objectPosition: 'center 20%',
  },
  {
    name: 'Vidula K',
    position: 'Chief Operating Officer',
    role: 'LEADERSHIP',
    file: 'VIDULA K (CHIEF OPERATING OFFICER).jpeg',
    objectPosition: 'center 12%',
  },
]

/** URL for a founder's portrait as served from /public/founders/. */
export function founderImageSrc(f: Founder): string {
  return `/founders/${encodeURIComponent(f.file)}`
}
