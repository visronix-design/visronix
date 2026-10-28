import { contactEmail, emailConfigured } from '@/config/site'

/**
 * Email enquiry utilities.
 *
 * The business email is configured through VITE_CONTACT_EMAIL. While it is
 * unset, `emailConfigured` is false and every email action across the site
 * renders as an honest "coming soon" state instead of an invented address.
 *
 * There is no server-side form delivery yet: forms hand off to a prefilled
 * mailto: draft (or WhatsApp). Opening a mail client does NOT send anything
 * by itself — the UI never claims an email was delivered.
 */

export type EmailEnquiry = {
  subject: string
  body: string
}

/** Build a correctly encoded mailto: URL. Returns null while unconfigured. */
export function emailUrl(enquiry: EmailEnquiry): string | null {
  if (!emailConfigured) return null
  const params = new URLSearchParams({ subject: enquiry.subject, body: enquiry.body })
  return `mailto:${contactEmail}?${params.toString()}`
}

export function isEmailConfigured(): boolean {
  return emailConfigured
}
