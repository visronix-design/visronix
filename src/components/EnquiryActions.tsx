import { MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { enquiryWhatsAppUrl, type EnquiryContext } from '@/lib/whatsapp'
import { emailUrl, isEmailConfigured, type EmailEnquiry } from '@/lib/email'

type Props = {
  context: EnquiryContext
  /** Email subject/body — used only when the business email is configured. */
  email?: EmailEnquiry
  align?: 'start' | 'center'
  whatsappLabel?: string
  emailLabel?: string
  /** Compact switch size for dense rows. */
  compact?: boolean
  className?: string
}

/**
 * The contextual enquiry pair used across the site: WhatsApp (always) plus
 * email (only when VITE_CONTACT_EMAIL is configured). Never fakes a sent
 * confirmation — these open a prefilled draft the visitor reviews and sends.
 */
export function EnquiryActions({
  context,
  email,
  align = 'start',
  whatsappLabel = 'Enquire on WhatsApp',
  emailLabel = 'Email enquiry',
  compact = false,
  className = '',
}: Props) {
  const wa = enquiryWhatsAppUrl(context)
  const mail = email ? emailUrl(email) : null
  const showEmail = isEmailConfigured() && mail
  const size = compact ? 'sm' : 'md'

  return (
    <div className={`flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : ''} ${className}`}>
      <Button href={wa} external size={size} aria-label={`${whatsappLabel} (opens WhatsApp in a new tab)`}>
        <MessageCircle className="size-4" aria-hidden="true" />
        {whatsappLabel}
      </Button>
      {showEmail ? (
        <Button href={mail!} variant="outline" size={size} aria-label={`${emailLabel} (opens your email app with a draft)`}>
          <Mail className="size-4" aria-hidden="true" />
          {emailLabel}
        </Button>
      ) : (
        <span
          className={`ghost-cell data-xs flex items-center px-4 uppercase ${compact ? 'min-h-10' : 'min-h-12'}`}
          style={{ letterSpacing: '0.08em' }}
          title="Business email will appear here once configured"
        >
          Email enquiries coming soon
        </span>
      )}
    </div>
  )
}
