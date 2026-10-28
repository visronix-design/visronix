/* Mobile-only QA audit for the VISRONIX website (dev/QA only, not shipped to users).
   Audits every route at the mobile widths from the brief plus landscape, and runs
   mobile-specific functional checks (menu, store, forms, portraits, tap targets,
   iOS-zoom input sizes, console errors). Screenshots land in shots/mobile/. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:4173'
const SHOTS = 'shots/mobile'
mkdirSync(SHOTS, { recursive: true })

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
  ['/does-not-exist', '404'],
]

const viewports = [
  [320, 700, '320'],
  [360, 740, '360'],
  [375, 812, '375'],
  [390, 844, '390'],
  [414, 896, '414'],
  [430, 932, '430'],
  [844, 390, 'landscape-844'],
  [700, 320, 'landscape-700'],
]

const results = []
const consoleErrors = []

function log(ok, label, detail = '') {
  results.push({ ok, label, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch()
const page = await browser.newPage()
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(`[${page.url()} @${vpLabel ?? '?'}] ${m.text()}`)
})
page.on('pageerror', (e) => consoleErrors.push(`[${page.url()} @${vpLabel ?? '?'}] pageerror: ${e.message}`))

let vpLabel = ''

/* ── Per-route × per-viewport layout audit ── */
for (const [w, h, name] of viewports) {
  await page.setViewportSize({ width: w, height: h })
  for (const [route, rName] of routes) {
    vpLabel = name
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(250)

    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement
      return el.scrollWidth - el.clientWidth
    })
    log(overflow <= 1, `no-h-overflow ${rName} @${name}`, `overflow=${overflow}px`)

    if (overflow > 1) {
      const offenders = await page.evaluate(() => {
        const vw = document.scrollingElement.clientWidth
        const bad = []
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          const cs = getComputedStyle(el)
          if (r.width === 0 || cs.visibility === 'hidden' || cs.display === 'none') continue
          if (r.right > vw + 1 && r.bottom > 0 && r.top < window.innerHeight) {
            bad.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 3).join('.')} right=${Math.round(r.right)}`)
          }
          if (bad.length >= 5) break
        }
        return bad
      })
      console.log(`      offenders @${name} ${rName}: ${offenders.join(' | ') || 'none found'}`)
    }

    if (name === '320' || name === '390') {
      await page.screenshot({ path: `${SHOTS}/${rName}-${name}.png`, fullPage: true })
    }
  }
}

/* ── Site-wide element audits at 390×844 ── */
await page.setViewportSize({ width: 390, height: 844 })
vpLabel = '390'

const auditScript = () => {
  const problems = { tinyTap: [], zoomInputs: [] }
  const vw = document.scrollingElement.clientWidth
  for (const el of document.querySelectorAll('a, button, input, select, textarea, [role="button"]')) {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden' || r.width === 0 || r.height === 0) continue
    if (el.classList.contains('sr-only')) continue
    if (r.right < 0 || r.left > vw) continue
    // .tap extends the hit area 8px vertically / 4px horizontally via ::before
    const h = el.classList.contains('tap') ? r.height + 16 : r.height
    const w = el.classList.contains('tap') ? r.width + 8 : r.width
    if (w < 24 || h < 24) {
      problems.tinyTap.push(
        `${el.tagName.toLowerCase()}${el.name ? `[name=${el.name}]` : ''}"${(el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 24)}" ${Math.round(w)}x${Math.round(h)}`,
      )
    }
  }
  for (const el of document.querySelectorAll('input, select, textarea')) {
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden') continue
    const size = parseFloat(cs.fontSize)
    if (size < 16) problems.zoomInputs.push(`${el.tagName.toLowerCase()}${el.name ? `[name=${el.name}]` : ''} ${size}px`)
  }
  return problems
}

for (const [route, rName] of routes) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  const p = await page.evaluate(auditScript)
  log(p.tinyTap.length === 0, `tap-targets ≥24px ${rName} @390`, p.tinyTap.slice(0, 4).join(' | ') || 'ok')
  log(p.zoomInputs.length === 0, `form inputs ≥16px (no iOS zoom) ${rName} @390`, p.zoomInputs.slice(0, 4).join(' | ') || 'ok')
}

/* ── Mobile menu at smallest and largest widths ── */
for (const [w, h, name] of [[320, 700, '320'], [430, 932, '430'], [700, 320, 'landscape-700']]) {
  await page.setViewportSize({ width: w, height: h })
  vpLabel = name
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('dialog').waitFor()
  const drawerOverflow = await page.evaluate(() => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth)
  log(drawerOverflow <= 1, `menu drawer no-overflow open @${name}`, `overflow=${drawerOverflow}px`)
  const enquire = page.getByRole('dialog').getByRole('link', { name: 'ENQUIRE' })
  log((await enquire.count()) === 1 && (await enquire.isEnabled()), `menu ENQUIRE reachable @${name}`)
  await page.getByRole('dialog').getByRole('link', { name: 'Contact' }).click()
  await page.waitForURL('**/contact')
  log(true, `menu navigates and closes @${name}`)
}

/* ── Menu opened while page is scrolled (backdrop-blur regression) ── */
await page.setViewportSize({ width: 375, height: 667 })
vpLabel = '375-scrolled'
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(300)
await page.getByRole('button', { name: 'Open menu' }).click()
await page.getByRole('dialog').waitFor()
const box = await page.getByRole('dialog').boundingBox()
const coversViewport = !!box && box.x <= 1 && box.y <= 1 && box.width >= 374 && box.height >= 666
log(coversViewport, 'scrolled menu drawer covers full viewport @375', box ? `${Math.round(box.width)}x${Math.round(box.height)}@${Math.round(box.x)},${Math.round(box.y)}` : 'missing')
const closeBtnVisible = await page.getByRole('button', { name: 'Close menu' }).isVisible()
log(closeBtnVisible, 'scrolled menu close button visible @375')
await page.screenshot({ path: `${SHOTS}/menu-scrolled-375.png` })
await page.getByRole('dialog').getByRole('link', { name: 'Contact' }).click()
await page.waitForURL('**/contact')

/* ── Hamburger hidden on desktop ── */
await page.setViewportSize({ width: 1280, height: 800 })
vpLabel = 'desktop'
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
const burger = await page.getByRole('button', { name: 'Open menu' }).count()
log(burger === 0, 'hamburger hidden on desktop @1280')

/* ── Store interactions on mobile ── */
await page.setViewportSize({ width: 390, height: 844 })
vpLabel = '390'
await page.goto(BASE + '/electronic-components', { waitUntil: 'networkidle' })
await page.fill('#product-search', 'esp32')
let shown = await page.locator('article').count()
log(shown === 2, 'store search works @390', `got ${shown}`)
await page.fill('#product-search', '')
await page.getByRole('button', { name: 'SENSORS', exact: true }).click()
shown = await page.locator('article').count()
log(shown === 3, 'store category filter works @390', `got ${shown}`)
await page.selectOption('#product-sort', 'name-desc')
log(true, 'store sort works @390')
await page.getByRole('button', { name: 'ALL', exact: true }).click()
await page.getByRole('button', { name: /Arduino Uno R3/ }).first().click()
const detailsVisible = await page.getByText('TYPICAL SPECIFICATIONS').isVisible()
log(detailsVisible, 'product details expand @390')
const waHref = await page.getByRole('link', { name: /Enquire on WhatsApp/ }).first().getAttribute('href')
log(waHref?.startsWith('https://wa.me/919962011415?text=') === true, 'product enquiry URL @390')

/* ── Form on mobile: fill, validate, handoff ── */
await page.goto(BASE + '/engineering-projects', { waitUntil: 'networkidle' })
await page.fill('input[name="name"]', 'Mobile Tester')
await page.fill('input[name="email"]', 'test@example.com')
await page.selectOption('select[name="level"]', { index: 1 })
await page.selectOption('select[name="domain"]', 'robotics')
await page.fill('textarea[name="details"]', 'Obstacle-avoiding robot.')
await page.getByRole('button', { name: 'Prepare my enquiry' }).click()
await page.waitForSelector('[role="status"]')
log(true, 'form completes on mobile @390')
const handoff = await page.locator('[role="status"]').isVisible()
log(handoff, 'handoff panel visible @390')

/* ── Founders portraits on mobile ── */
await page.goto(BASE + '/founders', { waitUntil: 'networkidle' })
await page.evaluate(async () => {
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})))
})
const broken = await page.evaluate(
  () => [...document.querySelectorAll('img[alt*="Portrait of"]')].filter((i) => !i.complete || i.naturalWidth === 0).length,
)
log(broken === 0, 'founder portraits load @390', `broken=${broken}`)

/* ── Floating WhatsApp reachable on mobile ── */
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.evaluate(() => window.scrollTo(0, 1200))
await page.waitForTimeout(400)
const fab = await page.locator('a[aria-label*="WhatsApp"]').last().boundingBox()
log(!!fab && fab.width >= 24 && fab.height >= 24 && fab.y < 844, 'floating WhatsApp visible + tappable @390', fab ? `${Math.round(fab.width)}x${Math.round(fab.height)}@y${Math.round(fab.y)}` : 'hidden')

/* ── Viewport meta ── */
const vpMeta = await page.locator('meta[name="viewport"]').getAttribute('content')
log(!!vpMeta && vpMeta.includes('width=device-width'), 'viewport meta correct', vpMeta ?? 'MISSING')

/* ── Console errors ── */
log(consoleErrors.length === 0, 'zero console errors across mobile audit', consoleErrors.slice(0, 3).join(' | ') || 'clean')

await browser.close()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
