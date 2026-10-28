import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { site, WHATSAPP_DISPLAY, socialLinks, emailConfigured, contactEmail } from '@/config/site'
import { whatsappUrl } from '@/lib/whatsapp'

const columns = [
  {
    title: 'Solutions',
    links: [
      { label: 'IoT & Smart Home', to: '/iot-solutions' },
      { label: 'Engineering Projects', to: '/engineering-projects' },
      { label: 'AGRINEX Robot', to: '/agrinex' },
    ],
  },
  {
    title: 'Learning & Store',
    links: [
      { label: 'STEM Education', to: '/stem-education' },
      { label: 'Electronic Components', to: '/electronic-components' },
      { label: 'Projects & Portfolio', to: '/projects' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Research & Innovation', to: '/research' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-x grid gap-12 py-14 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="body-text max-w-xs">
            A multidisciplinary technology company in Chennai — education, electronics, automation
            and agricultural robotics under one roof.
          </p>
          <p className="data-xs text-dim">{site.location.toUpperCase()}</p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
            <h2 className="data-xs uppercase text-dim" style={{ letterSpacing: '0.14em' }}>
              {col.title}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[0.9375rem] text-paper/85 transition-colors hover:text-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="data-xs text-dim">
            © {year} {site.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={whatsappUrl('Hello VISRONIX Technologies, I would like to know more about your services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="data-xs flex items-center gap-1.5 text-paper/85 transition-colors hover:text-cyan"
            >
              <MessageCircle className="size-3.5" aria-hidden="true" />
              WHATSAPP {WHATSAPP_DISPLAY}
            </a>
            {emailConfigured ? (
              <a
                href={`mailto:${contactEmail}`}
                className="data-xs text-paper/85 transition-colors hover:text-cyan"
              >
                {contactEmail.toUpperCase()}
              </a>
            ) : (
              <span className="data-xs text-dim">BUSINESS EMAIL — COMING SOON</span>
            )}
            {socialLinks.length === 0 && (
              <span className="data-xs text-dim">SOCIAL LINKS — COMING SOON</span>
            )}
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="data-xs text-paper/85 transition-colors hover:text-cyan"
              >
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
