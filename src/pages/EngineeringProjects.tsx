import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Led } from '@/components/instrument/Led'
import { enquiryWhatsAppUrl } from '@/lib/whatsapp'

const educationLevels = [
  { value: 'school-middle', label: 'School — middle years' },
  { value: 'school-high', label: 'School — high school' },
  { value: 'college-diploma', label: 'College — diploma' },
  { value: 'college-ug', label: 'College — undergraduate' },
  { value: 'college-pg', label: 'College — postgraduate' },
  { value: 'other', label: 'Hobbyist / professional' },
]

const domains = [
  { value: 'school-science', label: 'School science project' },
  { value: 'electronics', label: 'Electronics project' },
  { value: 'robotics', label: 'Robotics prototype' },
  { value: 'iot', label: 'IoT project' },
  { value: 'embedded', label: 'Embedded systems' },
  { value: 'final-year', label: 'Final-year project' },
  { value: 'custom', label: 'Custom engineering solution' },
]

const support = [
  ['School science projects', 'Working models and experiments that demonstrate real principles.'],
  ['Electronics projects', 'Circuit design, sourcing, assembly and testing.'],
  ['Robotics prototypes', 'Chassis, drive, sensing and control for moving machines.'],
  ['IoT projects', 'Connected devices with sensor data and remote control.'],
  ['Embedded systems', 'Microcontroller firmware and peripheral interfacing.'],
  ['Final-year consultation', 'Scope refinement, feasibility checks and build mentoring.'],
  ['Prototype development', 'From sketch-of-an-idea to a demonstrable unit.'],
  ['Custom engineering', 'One-off solutions for businesses and makers.'],
]

export default function EngineeringProjects() {
  useSeo({
    title: 'School & College Engineering Projects',
    description:
      'Project guidance and prototype development for school and college students in Chennai — robotics, IoT, electronics and embedded systems. Enquire with your brief.',
    path: '/engineering-projects',
  })

  return (
    <>
      <PageHero
        path="VISRONIX / PROJECTS / WORK ORDERS"
        title="Bring a brief. Leave with a working prototype."
        lead="School science projects, electronics builds, robotics prototypes, IoT systems and final-year project support — with real components, real guidance and real debugging sessions."
      />

      {/* ── Integrity plate ──────────────────────────── */}
      <section className="pt-0!">
        <div className="container-x">
          <Reveal className="brackets panel flex items-start gap-4 p-4 md:p-5">
            <Led state="lit">HOW WE WORK WITH STUDENTS</Led>
            <p className="body-text text-[0.9375rem]">
              We provide technical guidance, components and prototype development support — and we
              make sure you understand every part of your build. Academic submissions, reports and
              viva remain the student's own responsibility. That is the point: you should be able
              to explain and defend your project.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Work order ───────────────────────────────── */}
      <section className="section-y pt-10!">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Project enquiry"
              lead="Fill in the brief below. On submit, we prepare your enquiry as a prefilled WhatsApp message — review it and send. Final scope, timelines and service availability are always confirmed by our team before anything begins."
              aside="FORM // WO-ENQ"
            />
          </Reveal>
          <Reveal className="brackets panel mt-10 p-6 md:p-10">
            <EnquiryForm
              submitLabel="Prepare my enquiry"
              fields={[
                {
                  kind: 'text',
                  name: 'name',
                  label: 'Your name',
                  required: true,
                  half: true,
                  autoComplete: 'name',
                  placeholder: 'Full name',
                },
                {
                  kind: 'text',
                  name: 'email',
                  label: 'Email',
                  type: 'email',
                  required: true,
                  half: true,
                  autoComplete: 'email',
                  placeholder: 'you@example.com',
                },
                {
                  kind: 'text',
                  name: 'phone',
                  label: 'Phone (optional)',
                  type: 'tel',
                  half: true,
                  hint: 'Only if you prefer a call back on WhatsApp or phone.',
                  placeholder: '+91 …',
                },
                {
                  kind: 'select',
                  name: 'level',
                  label: 'Education level',
                  required: true,
                  half: true,
                  options: educationLevels,
                  placeholder: 'Select your level',
                },
                {
                  kind: 'select',
                  name: 'domain',
                  label: 'Project domain',
                  required: true,
                  half: true,
                  options: domains,
                  placeholder: 'Select a domain',
                },
                {
                  kind: 'text',
                  name: 'deadline',
                  label: 'Deadline (optional)',
                  type: 'date',
                  half: true,
                },
                {
                  kind: 'textarea',
                  name: 'details',
                  label: 'Project description',
                  required: true,
                  rows: 5,
                  placeholder:
                    'What should the project do? Any constraints, components you already have, or requirements from your institution…',
                },
              ]}
              buildHandoff={(v) => {
                const domainLabel = domains.find((d) => d.value === v.domain)?.label ?? v.domain
                const details = v.details?.trim() || '—'
                return {
                  whatsappMessage: `Hello VISRONIX Technologies, I would like to discuss an engineering project.\n\nName: ${v.name}\nEducation level: ${v.level}\nDomain: ${domainLabel}\n${v.deadline ? `Deadline: ${v.deadline}\n` : ''}\nProject details: ${details}`,
                  email: {
                    subject: `Project enquiry — ${domainLabel}`,
                    body: `Hello VISRONIX Technologies,\n\nI would like to discuss an engineering project.\n\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '—'}\nEducation level: ${v.level}\nDomain: ${domainLabel}\nDeadline: ${v.deadline || '—'}\n\nProject details:\n${details}`,
                  },
                  summary: `${v.name} · ${domainLabel} · deadline ${v.deadline || 'flexible'}`,
                }
              }}
              note={
                <>
                  Submitting prepares a prefilled message — nothing is sent until you review and
                  send it yourself via WhatsApp or email. We reply personally; there is no
                  automated processing of your data on this site.
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* ── Support register ─────────────────────────── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="What we support"
              lead="If your domain is not listed, ask anyway — if it involves electronics, code or motion, we can probably help."
              aside="REGISTER // 08 DOMAINS"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {support.map(([t, d], i) => (
              <div
                key={t}
                className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[5rem_16rem_1fr]"
              >
                <span className="data text-dim">PRJ-{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[1rem] font-medium text-paper">{t}</span>
                <span className="body-text text-[0.9375rem]">{d}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10">
            <p className="body-text">
              Prefer to ask directly?{' '}
              <a
                href={enquiryWhatsAppUrl({ kind: 'project', domain: 'General', details: 'I have a project idea to discuss.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan underline-offset-4 hover:underline"
              >
                Message us on WhatsApp
              </a>{' '}
              with your idea.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
