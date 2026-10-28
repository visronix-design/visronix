import { useState, type ReactNode } from 'react'
import { Check, MessageCircle, Mail, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TextField, SelectField, TextAreaField } from '@/components/ui/fields'
import { whatsappUrl } from '@/lib/whatsapp'
import { emailUrl, isEmailConfigured } from '@/lib/email'

export type FormField =
  | {
      kind: 'text'
      name: string
      label: string
      required?: boolean
      type?: 'text' | 'email' | 'tel' | 'date'
      placeholder?: string
      hint?: string
      autoComplete?: string
      half?: boolean
    }
  | {
      kind: 'select'
      name: string
      label: string
      required?: boolean
      options: { value: string; label: string }[]
      placeholder?: string
      half?: boolean
    }
  | {
      kind: 'textarea'
      name: string
      label: string
      required?: boolean
      placeholder?: string
      rows?: number
      hint?: string
    }

export type Handoff = {
  /** WhatsApp message built from the submitted values. */
  whatsappMessage: string
  /** Optional email draft. */
  email?: { subject: string; body: string }
  /** One-line echo of what will be sent. */
  summary: string
}

type Props = {
  fields: FormField[]
  /** Compose the WhatsApp/email handoff from validated values. */
  buildHandoff: (values: Record<string, string>) => Handoff
  submitLabel: string
  /** Honest note shown under the form (e.g. what happens on submit). */
  note: ReactNode
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Static-site enquiry form. There is no server, so a valid submission does
 * NOT claim to have been "sent" — it opens a handoff panel where the visitor
 * sends the prefilled enquiry themselves via WhatsApp (or email, when
 * configured). Includes a honeypot field as lightweight spam protection.
 */
export function EnquiryForm({ fields, buildHandoff, submitLabel, note }: Props) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [handoff, setHandoff] = useState<Handoff | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const set = (name: string, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    for (const f of fields) {
      const v = (values[f.name] ?? '').trim()
      if (f.kind !== 'textarea' && 'required' in f && f.required && !v) {
        next[f.name] = 'This field is required.'
        continue
      }
      if (f.kind === 'textarea' && f.required && !v) {
        next[f.name] = 'This field is required.'
        continue
      }
      if (f.kind === 'text' && f.type === 'email' && v && !EMAIL_RE.test(v)) {
        next[f.name] = 'Enter a valid email address.'
      }
      if (f.kind === 'text' && f.type === 'tel' && v && !/^[+\d][\d\s-]{6,15}$/.test(v)) {
        next[f.name] = 'Enter a valid phone number.'
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot !== '') return // bot filled the hidden field — ignore silently
    if (!validate()) return
    setHandoff(buildHandoff(values))
  }

  function reset() {
    setHandoff(null)
    setValues({})
    setErrors({})
  }

  if (handoff) {
    const wa = whatsappUrl(handoff.whatsappMessage)
    const mail = handoff.email ? emailUrl(handoff.email) : null
    return (
      <div
        role="status"
        className="panel border-cyan/40 p-6 md:p-8"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center border border-cyan/40 bg-cyan/10 text-cyan">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <h3 className="title">Your enquiry is ready to send</h3>
        </div>
        <p className="body-text mt-4">
          Nothing has been sent yet. Choose how you would like to send it — your answers are
          prefilled in the message:
        </p>
        <p className="data mt-3 border border-line bg-ink px-4 py-3 text-mist">
          {handoff.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={wa} external>
            <MessageCircle className="size-4" aria-hidden="true" />
            Send via WhatsApp
          </Button>
          {isEmailConfigured() && mail ? (
            <Button href={mail} variant="outline">
              <Mail className="size-4" aria-hidden="true" />
              Send via email
            </Button>
          ) : (
            <span
              className="ghost-cell data-xs flex min-h-12 items-center px-5 uppercase"
              style={{ letterSpacing: '0.08em' }}
            >
              Email enquiries coming soon
            </span>
          )}
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Edit details
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          if (f.kind === 'text')
            return (
              <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
                <TextField
                  label={f.label}
                  name={f.name}
                  type={f.type}
                  value={values[f.name] ?? ''}
                  onChange={(v) => set(f.name, v)}
                  error={errors[f.name]}
                  required={f.required}
                  hint={f.hint}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                />
              </div>
            )
          if (f.kind === 'select')
            return (
              <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
                <SelectField
                  label={f.label}
                  name={f.name}
                  value={values[f.name] ?? ''}
                  onChange={(v) => set(f.name, v)}
                  options={f.options}
                  error={errors[f.name]}
                  required={f.required}
                  placeholder={f.placeholder}
                />
              </div>
            )
          return (
            <div key={f.name} className="sm:col-span-2">
              <TextAreaField
                label={f.label}
                name={f.name}
                value={values[f.name] ?? ''}
                onChange={(v) => set(f.name, v)}
                error={errors[f.name]}
                required={f.required}
                hint={f.hint}
                placeholder={f.placeholder}
                rows={f.rows}
              />
            </div>
          )
        })}
      </div>

      {/* Honeypot — hidden from humans, catches naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" className="self-start">
          {submitLabel}
        </Button>
        <p className="data-xs text-dim">{note}</p>
      </div>
    </form>
  )
}
