import { useId } from 'react'
import type { ReactNode } from 'react'

type BaseProps = {
  label: string
  name: string
  error?: string
  required?: boolean
  hint?: string
}

function FieldShell({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-cyan" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="data-xs text-dim">{hint}</p>}
      {error && (
        <p className="data-xs text-[#f07a6a]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  hint,
  type = 'text',
  placeholder,
  autoComplete,
}: BaseProps & {
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'email' | 'tel' | 'date'
  placeholder?: string
  autoComplete?: string
}) {
  const id = useId()
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error} hint={hint}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-input"
      />
    </FieldShell>
  )
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  hint,
  placeholder,
}: BaseProps & {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}) {
  const id = useId()
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error} hint={hint}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={error ? true : undefined}
        className={`field-input ${value === '' ? 'text-dim' : ''}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-2 text-paper">
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  hint,
  placeholder,
  rows = 4,
}: BaseProps & {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  const id = useId()
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error} hint={hint}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={error ? true : undefined}
        className="field-input resize-y"
      />
    </FieldShell>
  )
}
