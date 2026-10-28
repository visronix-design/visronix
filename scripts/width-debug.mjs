import { chromium } from 'playwright'

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 320, height: 800 } })
await p.goto('http://localhost:4173/stem-education', { waitUntil: 'networkidle' })
const out = await p.evaluate(() => {
  const art = document.querySelector('article')
  const rows = []
  for (const el of art.querySelectorAll('*')) {
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    rows.push({
      w: Math.round(r.width),
      ws: cs.whiteSpace,
      tag: el.tagName,
      cls: String(el.className).slice(0, 44),
      txt: (el.textContent || '').trim().slice(0, 34),
    })
  }
  rows.sort((a, b) => b.w - a.w)
  return rows.slice(0, 12).map((r) => `${r.w}px ws=${r.ws} ${r.tag}.${r.cls} "${r.txt}"`)
})
console.log(out.join('\n'))
await b.close()
