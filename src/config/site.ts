/**
 * VISRONIX Technologies — central site configuration.
 *
 * Every business detail the client needs to update lives here (or in
 * environment variables read here). Update these values — never hunt
 * through components.
 */

export const site = {
  name: 'VISRONIX Technologies',
  shortName: 'VISRONIX',
  tagline: 'Engineering Ideas Into Intelligent Solutions.',
  description:
    'From hands-on STEM education and electronic components to IoT automation and agricultural robotics, VISRONIX Technologies turns engineering ideas into practical innovation.',
  location: 'Chennai, Tamil Nadu, India',
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',
} as const

/**
 * WhatsApp — official business number.
 * Stored in international format without spaces or punctuation for wa.me URLs.
 * Displayed to humans with India country code formatting.
 */
export const WHATSAPP_NUMBER = '919962011415'
export const WHATSAPP_DISPLAY = '+91 99620 11415'

/**
 * Business email — visronix@gmail.com (verified by the client).
 * Override with VITE_CONTACT_EMAIL if the address ever changes; set it to an
 * empty string to return every email action to its honest "coming soon" state.
 */
export const contactEmail: string =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? 'visronix@gmail.com'

export const emailConfigured = contactEmail.trim().length > 0

/**
 * Social links — none verified yet. Add entries here once official
 * accounts exist; the footer and contact page render from this list and
 * stay empty (with an honest note) while it is empty.
 */
export const socialLinks: { label: string; href: string }[] = [
  // { label: 'LinkedIn', href: 'https://www.linkedin.com/company/…' },
  // { label: 'Instagram', href: 'https://www.instagram.com/…' },
  // { label: 'YouTube',  href: 'https://www.youtube.com/@…' },
]

/** Primary navigation model — grouped to keep ten pages discoverable. */
export type NavChild = { label: string; to: string }
export type NavGroup = { label: string; to?: string; children?: NavChild[] }

export const navigation: NavGroup[] = [
  {
    label: 'Solutions',
    children: [
      { label: 'IoT & Smart Home', to: '/iot-solutions' },
      { label: 'Engineering Projects', to: '/engineering-projects' },
      { label: 'AGRINEX Agricultural Robot', to: '/agrinex' },
    ],
  },
  {
    label: 'Learning',
    to: '/stem-education',
  },
  {
    label: 'Store',
    to: '/electronic-components',
  },
  {
    label: 'Company',
    children: [
      { label: 'About Us', to: '/about' },
      { label: 'Research & Innovation', to: '/research' },
      { label: 'Projects & Portfolio', to: '/projects' },
    ],
  },
  {
    label: 'Contact',
    to: '/contact',
  },
]
