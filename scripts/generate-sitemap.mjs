/* Post-build: generate dist/sitemap.xml and dist/robots.txt from VITE_SITE_URL.
   Run automatically after `vite build`. Set VITE_SITE_URL in the Vercel
   dashboard (or shell) once the production domain is known — until then the
   placeholder files from public/ are left untouched. Keep ROUTES in sync
   with src/App.tsx. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const ROUTES = [
  ['/', 1.0],
  ['/about', 0.8],
  ['/founders', 0.8],
  ['/stem-education', 0.9],
  ['/electronic-components', 0.9],
  ['/iot-solutions', 0.9],
  ['/engineering-projects', 0.9],
  ['/agrinex', 1.0],
  ['/research', 0.7],
  ['/projects', 0.8],
  ['/contact', 0.8],
]

const raw = (process.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')
if (!raw || !/^https?:\/\//.test(raw)) {
  console.log('generate-sitemap: VITE_SITE_URL not set — leaving placeholder sitemap/robots untouched.')
  process.exit(0)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  ([path, priority]) =>
    `  <url><loc>${raw}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod><priority>${priority.toFixed(1)}</priority></url>`,
).join('\n')}
</urlset>
`
writeFileSync('dist/sitemap.xml', sitemap)

let robots = 'User-agent: *\nAllow: /\n'
const publicRobots = 'public/robots.txt'
if (existsSync(publicRobots)) {
  robots =
    readFileSync(publicRobots, 'utf8')
      .split('\n')
      .filter((l) => !l.trim().startsWith('#') && !l.startsWith('Sitemap:'))
      .join('\n')
      .trimEnd() + '\n'
}
robots += `\nSitemap: ${raw}/sitemap.xml\n`
writeFileSync('dist/robots.txt', robots)

console.log(`generate-sitemap: wrote dist/sitemap.xml + dist/robots.txt for ${raw}`)
