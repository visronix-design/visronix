import { chromium } from 'playwright'

const BASE = 'http://localhost:4173'
const targets = [
  ['/home', '/', 320],
  ['/about', '/about', 320],
  ['/about-390', '/about', 390],
  ['/projects-service', '/engineering-projects', 320],
  ['/agrinex', '/agrinex', 320],
]

const browser = await chromium.launch()
const page = await browser.newPage()
for (const [name, route, width] of targets) {
  await page.setViewportSize({ width, height: 844 })
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const offenders = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const bad = []
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.right > vw + 1 || r.left < -1) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 90),
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
        })
      }
    }
    // keep the outermost offenders only (dedupe by similar box)
    return bad.slice(0, 40)
  })
  console.log(`\n=== ${name} @${width} ===`)
  for (const o of offenders) console.log(`${o.tag} [${o.cls}] L${o.left} R${o.right} W${o.w}`)
}
await browser.close()
