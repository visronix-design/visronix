import { useEffect } from 'react'
import { site } from '@/config/site'

type Seo = {
  title: string
  description: string
  /** Route path, e.g. "/about" — used for og:url / canonical when a domain is configured. */
  path?: string
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route SEO: document title, meta description, Open Graph tags and a
 * canonical URL when VITE_SITE_URL is configured (real domain not known yet).
 */
export function useSeo({ title, description, path }: Seo) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} — ${site.shortName}`
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    if (site.url) {
      const abs = `${site.url.replace(/\/$/, '')}${path ?? '/'}`
      setMeta('property', 'og:url', abs)
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = abs
    }
  }, [title, description, path])
}
