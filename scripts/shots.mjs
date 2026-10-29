import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:4173'
mkdirSync('shots', { recursive: true })
const routes = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/founders', 'founders'],
  ['/stem-education', 'stem'],
  ['/electronic-components', 'store'],
  ['/iot-solutions', 'iot'],
  ['/engineering-projects', 'projects-service'],
  ['/agrinex', 'agrinex'],
  ['/research', 'research'],
  ['/projects', 'portfolio'],
  ['/contact', 'contact'],
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
// Headless full-page captures don't always pump frames for the scroll pass,
// so IntersectionObserver reveals can stay opacity-0 in shots. Reduced-motion
// renders every reveal visible immediately (site CSS honours it), making
// captures faithful to what a scrolling visitor sees.
await page.emulateMedia({ reducedMotion: 'reduce' })
for (const [route, name] of routes) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  // scroll through the page so every reveal fires, then back to top
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const h = document.scrollingElement.scrollHeight
    for (let y = 0; y < h; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(900)
  // force-fetch + decode every image (lazy portraits can lose the race
  // against the programmatic scroll and capture blank otherwise)
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})))
  })
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true })
  console.log('shot', name)
}
await browser.close()
