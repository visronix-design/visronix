/* WCAG 2.2 contrast verification for the VISRONIX colour system.
   Run: node scripts/contrast-check.mjs  (QA tool, not shipped) */

const hex = (h) => {
  const s = h.replace('#', '')
  const n = parseInt(s.length === 3 ? s.split('').map((c) => c + c).join('') : s, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const lum = (h) => {
  const [r, g, b] = hex(h).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [y1, y2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (y1 + 0.05) / (y2 + 0.05)
}

const T = {
  base: '#f2f5f7',
  base2: '#e8edf1',
  panel: '#ffffff',
  hi: '#0f1b28',
  mid: '#42525f',
  low: '#5a6b78',
  face: '#0c151f',
  face2: '#13202c',
  faceHi: '#eef3f8',
  faceMid: '#a2b1bf',
  faceLow: '#7d8ea1',
  accent: '#0c7068',
  accentStrong: '#085b54',
  accentBright: '#3ad4c2',
  onAccent: '#ffffff',
  copper: '#a1550b',
  copperBright: '#f2a54e',
  ok: '#1a6e3c',
  okBright: '#4cd087',
  bad: '#b3261e',
  badBright: '#f4827a',
  info: '#0d6a9e',
  infoBright: '#5cb8ef',
  line: '#d4dbe2',
  lineStrong: '#76838e',
}

const checks = [
  // [fg, bg, min, label]
  [T.hi, T.panel, 4.5, 'primary text on card'],
  [T.hi, T.base, 4.5, 'primary text on page'],
  [T.hi, T.base2, 4.5, 'primary text on tinted section'],
  [T.mid, T.panel, 4.5, 'secondary text on card'],
  [T.mid, T.base, 4.5, 'secondary text on page'],
  [T.mid, T.base2, 4.5, 'secondary text on tinted section'],
  [T.low, T.panel, 4.5, 'muted text on card'],
  [T.low, T.base, 4.5, 'muted text on page'],
  [T.low, T.base2, 4.5, 'muted text on tinted section'],
  [T.accent, T.panel, 4.5, 'accent links/text on card'],
  [T.accent, T.base, 4.5, 'accent links/text on page'],
  [T.accent, T.base2, 4.5, 'accent links/text on tinted section'],
  [T.copper, T.panel, 4.5, 'copper text on card'],
  [T.copper, T.base2, 4.5, 'copper text on tinted section'],
  [T.ok, T.panel, 4.5, 'success text on card'],
  [T.bad, T.panel, 4.5, 'error text on card'],
  [T.bad, T.base, 4.5, 'error text on page'],
  [T.info, T.panel, 4.5, 'info text on card'],
  [T.onAccent, T.accent, 4.5, 'text on primary button'],
  [T.onAccent, T.accentStrong, 4.5, 'text on primary button hover'],
  [T.faceHi, T.face, 4.5, 'primary text on faceplate'],
  [T.faceHi, T.face2, 4.5, 'primary text on elevated faceplate'],
  [T.faceMid, T.face, 4.5, 'secondary text on faceplate'],
  [T.faceMid, T.face2, 4.5, 'secondary text on elevated faceplate'],
  [T.faceLow, T.face, 4.5, 'muted text on faceplate'],
  [T.faceLow, T.face2, 4.5, 'muted text on elevated faceplate'],
  [T.accentBright, T.face, 4.5, 'accent text on faceplate'],
  [T.accentBright, T.face2, 4.5, 'accent text on elevated faceplate'],
  [T.copperBright, T.face, 4.5, 'copper LED/text on faceplate'],
  [T.okBright, T.face, 4.5, 'success LED/text on faceplate'],
  [T.badBright, T.face, 4.5, 'error LED/text on faceplate'],
  [T.infoBright, T.face, 4.5, 'info LED/text on faceplate'],
  // 3:1 non-text / UI boundaries
  [T.lineStrong, T.panel, 3, 'input border on card'],
  [T.lineStrong, T.base, 3, 'input border on page'],
  [T.lineStrong, T.base2, 3, 'input border on tinted section'],
  [T.accent, T.panel, 3, 'focus ring / control boundary on card'],
  [T.accentBright, T.face, 3, 'focus ring on faceplate'],
  [T.ok, T.panel, 3, 'LED dot (ok) on card'],
  [T.copper, T.panel, 3, 'LED dot (warn) on card'],
  [T.bad, T.panel, 3, 'LED dot (error) on card'],
  [T.okBright, T.face, 3, 'LED dot (ok) on faceplate'],
  [T.faceLow, T.face, 3, 'LED dot (off) on faceplate'],
  [T.faceLow, T.face2, 3, 'LED dot (off) on elevated faceplate'],
]

let fail = 0
for (const [fg, bg, min, label] of checks) {
  const r = ratio(fg, bg)
  const pass = r >= min
  if (!pass) fail++
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}  (min ${min})  ${label}  ${fg} on ${bg}`)
}
console.log(fail === 0 ? `\nAll ${checks.length} checks pass.` : `\n${fail} FAILURES`)
process.exit(fail === 0 ? 0 : 1)
