import { chromium } from 'playwright'

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 320, height: 800 } })
await p.goto('http://localhost:4173/stem-education', { waitUntil: 'networkidle' })
const out = await p.evaluate(() => {
  const art = document.querySelector('article')
  art.style.width = '60px'
  art.style.overflow = 'visible'
  const rows = []
  for (const el of art.querySelectorAll('*')) {
    const r = el.getBoundingClientRect()
    if (r.width > 150) rows.push(`${Math.round(r.width)}px ${el.tagName}.${String(el.className).slice(0, 40)} "${(el.textContent || '').trim().slice(0, 30)}"`)
  }
  return rows.slice(0, 10)
})
console.log(out.join('\n') || 'nothing over 150px — grid track was the only problem')
await b.close()
