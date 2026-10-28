/* Smoke-test suite for the VISRONIX website (dev/QA only, not shipped to users). */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:4173'
const SHOTS = 'shots'
mkdirSync(SHOTS, { recursive: true })

const routes = [
  ['/', 'home'],
  ['/about', 'about'],
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
  [1280, 800, 'desktop'],
  [768, 1024, 'tablet'],
  [390, 844, 'mobile-l'],
  [320, 700, 'mobile-s'],
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
  if (m.type() === 'error') consoleErrors.push(`[${page.url()}] ${m.text()}`)
})
page.on('pageerror', (e) => consoleErrors.push(`[${page.url()}] pageerror: ${e.message}`))

/* ── Per-route × per-viewport checks ── */
for (const [w, h, vpName] of viewports) {
  await page.setViewportSize({ width: w, height: h })
  for (const [route, name] of routes) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement
      return el.scrollWidth - el.clientWidth
    })
    log(overflow <= 1, `no-h-overflow ${name} @${vpName}`, `overflow=${overflow}px`)
    if (vpName === 'desktop') {
      await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true })
    }
  }
}

/* ── Functional checks ── */
await page.setViewportSize({ width: 1280, height: 800 })

// 1. Title/meta per route
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
const title = await page.title()
log(title.includes('VISRONIX'), 'home title contains VISRONIX', title)
const desc = await page.locator('meta[name="description"]').getAttribute('content')
log(!!desc && desc.length > 50, 'meta description present', desc?.slice(0, 60))

// 2. Navigation to each page via header links
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Learning' }).click()
await page.waitForURL('**/stem-education')
log(true, 'header nav → /stem-education')

// 3. Dropdown navigation
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Solutions' }).click()
await page.getByRole('link', { name: 'AGRINEX Agricultural Robot' }).click()
await page.waitForURL('**/agrinex')
await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('AGRINEX'))
log(true, 'dropdown nav → /agrinex')
const h1 = await page.locator('h1').first().textContent()
log(h1?.includes('AGRINEX'), 'agrinex h1', h1 ?? 'MISSING')

// 4. Store: search, filter, sort
await page.goto(BASE + '/electronic-components', { waitUntil: 'networkidle' })
const countText = await page.locator('[role="status"]').first().textContent()
log(countText?.includes('14'), 'store shows all 14 demo listings', countText?.trim() ?? '')
await page.fill('#product-search', 'esp32')
let shown = await page.locator('article').count()
log(shown === 2, 'search "esp32" → 2 results', `got ${shown}`)
await page.fill('#product-search', '')
await page.getByRole('button', { name: 'SENSORS', exact: true }).click()
shown = await page.locator('article').count()
log(shown === 3, 'category Sensors → 3 results', `got ${shown}`)
await page.selectOption('#product-sort', 'name-desc')
log(true, 'sort applied without error')
await page.getByRole('button', { name: 'ALL', exact: true }).click()
// product detail expand + contextual enquiry
await page.getByRole('button', { name: /Arduino Uno R3/ }).first().click()
const waLinks = await page.getByRole('link', { name: /Enquire on WhatsApp/ }).count()
log(waLinks >= 1, 'product detail exposes WhatsApp enquiry')
const href = await page.getByRole('link', { name: /Enquire on WhatsApp/ }).first().getAttribute('href')
log(
  href?.startsWith('https://wa.me/919962011415?text=') === true &&
    decodeURIComponent(href).includes('Arduino Uno R3'),
  'product WhatsApp URL correct + contextual',
  href ?? 'MISSING',
)

// 5. Course enquiry context
await page.goto(BASE + '/stem-education', { waitUntil: 'networkidle' })
const courseWa = await page.getByRole('link', { name: /Ask about IoT Systems/ }).first().getAttribute('href')
log(
  courseWa ? decodeURIComponent(courseWa).includes('IoT Systems') : false,
  'course enquiry includes course name',
)

// 6. Project form: validation + handoff
await page.goto(BASE + '/engineering-projects', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Prepare my enquiry' }).click()
const alerts = await page.locator('[role="alert"]').count()
log(alerts >= 3, 'empty required fields show validation errors', `alerts=${alerts}`)
await page.fill('input[name="name"]', 'Test Student')
await page.fill('input[name="email"]', 'test@example.com')
await page.selectOption('select[name="level"]', { index: 1 })
await page.selectOption('select[name="domain"]', 'robotics')
await page.fill('textarea[name="details"]', 'Line-following robot with obstacle avoidance.')
await page.getByRole('button', { name: 'Prepare my enquiry' }).click()
await page.waitForSelector('[role="status"]')
const handoffText = await page.locator('[role="status"]').textContent()
log(handoffText?.includes('ready to send') === true, 'form handoff panel appears (honest, no fake send)')
const handoffWa = await page.getByRole('link', { name: /Send via WhatsApp/ }).getAttribute('href')
log(
  decodeURIComponent(handoffWa).includes('robotics') || decodeURIComponent(handoffWa).includes('Robotics'),
  'handoff WhatsApp message includes domain',
)
const handoffEmailLink = page.getByRole('link', { name: /Send via email/ })
log(
  (await handoffEmailLink.count()) === 1,
  'email handoff offered now that VITE_CONTACT_EMAIL is set',
)
const handoffMail = await handoffEmailLink.getAttribute('href')
log(
  handoffMail?.startsWith('mailto:visronix@gmail.com') === true,
  'handoff email is a mailto to the business address',
  handoffMail?.slice(0, 60) ?? 'MISSING',
)
log(
  (await page.getByText('Email enquiries coming soon').count()) === 0,
  'no stale "coming soon" email states anywhere',
)

// 7. Contact page
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' })
const body = await page.locator('body').textContent()
log(body?.includes('+91 99620 11415') === true, 'contact shows formatted WhatsApp number')
log(body?.includes('visronix@gmail.com') === true, 'contact shows the business email')
const mailHref = await page.locator('a[href^="mailto:visronix@gmail.com"]').first().getAttribute('href')
log(!!mailHref, 'contact email link is a real mailto', mailHref ?? 'MISSING')

// 8. Footer links + 404 behaviour
await page.goto(BASE + '/nope', { waitUntil: 'networkidle' })
const nf = await page.locator('h1').first().textContent()
log(nf?.toLowerCase().includes('circuit') === true, 'branded 404 renders', nf ?? '')
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.locator('footer').getByRole('link', { name: 'Research & Innovation' }).click()
await page.waitForURL('**/research')
log(true, 'footer link works')

// 9. Floating WhatsApp button
await page.evaluate(() => window.scrollTo(0, 1200))
await page.waitForTimeout(400)
const floatHref = await page.locator('a[aria-label*="WhatsApp"]').last().getAttribute('href')
log(floatHref?.startsWith('https://wa.me/919962011415') === true, 'floating WhatsApp URL correct')

// 10. Mobile menu
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Open menu' }).click()
await page.getByRole('dialog').waitFor()
log(true, 'mobile menu opens')
await page.getByRole('dialog').getByRole('link', { name: 'Contact' }).click()
await page.waitForURL('**/contact')
log(true, 'mobile menu navigates and closes')

// 11. Skip link
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.keyboard.press('Tab')
const focused = await page.evaluate(() => document.activeElement?.textContent ?? '')
log(focused.includes('Skip to content'), 'skip link is first tab stop', focused)

/* ── Console errors ── */
log(consoleErrors.length === 0, 'zero console errors across all routes', consoleErrors.slice(0, 3).join(' | ') || 'clean')

await browser.close()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
process.exit(failed.length ? 1 : 0)
