import { WHATSAPP_NUMBER } from '@/config/site'

/**
 * WhatsApp enquiry utilities.
 *
 * The number lives in `config/site.ts` and is never duplicated in
 * components. Messages are URL-encoded with encodeURIComponent so spaces,
 * punctuation and user-provided text (product names, project details)
 * are always safe.
 */

const base = `https://wa.me/${WHATSAPP_NUMBER}`

/** Build a wa.me URL with an encoded prefilled message. */
export function whatsappUrl(message: string): string {
  return `${base}?text=${encodeURIComponent(message)}`
}

export type EnquiryContext =
  | { kind: 'general' }
  | { kind: 'product'; productName: string }
  | { kind: 'course'; courseName: string }
  | { kind: 'project'; domain: string; details: string }
  | { kind: 'iot' }
  | { kind: 'agrinex' }
  | { kind: 'custom'; message: string }

/** Contextual prefilled message for each enquiry type. */
export function enquiryMessage(ctx: EnquiryContext): string {
  switch (ctx.kind) {
    case 'general':
      return 'Hello VISRONIX Technologies, I would like to know more about your services.'
    case 'product':
      return `Hello VISRONIX Technologies, I am interested in ${ctx.productName}. Please share the price, availability, specifications, and ordering details.`
    case 'course':
      return `Hello VISRONIX Technologies, I am interested in your ${ctx.courseName} programme. Please share the syllabus, schedule, eligibility, and fees.`
    case 'project':
      return `Hello VISRONIX Technologies, I would like to discuss an engineering project. Domain: ${ctx.domain}. Project details: ${ctx.details}.`
    case 'iot':
      return 'Hello VISRONIX Technologies, I am interested in your IoT and smart home solutions. Please contact me to discuss my requirements.'
    case 'agrinex':
      return 'Hello VISRONIX Technologies, I would like to learn more about the AGRINEX Smart Agricultural Robot and its current development status.'
    case 'custom':
      return ctx.message
  }
}

/** Convenience: contextual wa.me URL. */
export function enquiryWhatsAppUrl(ctx: EnquiryContext): string {
  return whatsappUrl(enquiryMessage(ctx))
}
