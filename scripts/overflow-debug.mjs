import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()

for (const [route, w] of [
  ['/stem-education', 320],
  ['/stem-education', 390],
  ['/stem-education', 768],
  ['/about', 320],
]) {
  await page.setViewportSize({ width: w, height: 800 })
  await page.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const culprits = await page.evaluate(() => {
    const out = []
    const cw = document.scrollingElement.clientWidth
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.right > cw + 1 && r.width > 0) {
        out.push(`${el.tagName}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)} w=${Math.round(r.width)}`)
      }
    }
    return out.slice(0, 8)
  })
  console.log(`\n== ${route} @${w}px ==`)
  culprits.forEach((c) => console.log('  ', c))
}
await browser.close()
