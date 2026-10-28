import { MessageCircle, MapPin } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { EnquiryForm } from '@/components/EnquiryForm'
import { Led } from '@/components/instrument/Led'
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, site, socialLinks, emailConfigured, contactEmail } from '@/config/site'
import { whatsappUrl } from '@/lib/whatsapp'

const topics = [
  { value: 'general', label: 'General enquiry' },
  { value: 'training', label: 'STEM education & training' },
  { value: 'components', label: 'Electronic components' },
  { value: 'iot', label: 'IoT & smart home solutions' },
  { value: 'project', label: 'School / college project' },
  { value: 'agrinex', label: 'AGRINEX collaboration' },
]

export default function Contact() {
  useSeo({
    title: 'Contact Us',
    description:
      'Contact VISRONIX Technologies in Chennai — WhatsApp +91 99620 11415 for training, components, IoT solutions, engineering projects and AGRINEX collaboration.',
    path: '/contact',
  })

  return (
    <>
      <PageHero
        path="VISRONIX / CONTACT / I-O"
        title="Talk to the team."
        lead="WhatsApp is the fastest way to reach us. Tell us what you need — training, components, automation, a project or AGRINEX — and we will respond personally."
      />

      {/* ── I/O panel: three ports ───────────────────── */}
      <section className="section-y pt-0!">
        <div className="container-x grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
          <Reveal className="brackets panel flex flex-col p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="data-xs text-low">PORT 01</span>
              <Led state="lit">PRIMARY CHANNEL</Led>
            </div>
            <h2 className="title mt-4 flex items-center gap-2.5">
              <MessageCircle className="size-5 text-accent" aria-hidden="true" />
              WhatsApp
            </h2>
            <p className="body-text mt-2">
              Quickest response — message us directly with your enquiry.
            </p>
            <p className="data mt-3 text-hi/90">{WHATSAPP_DISPLAY}</p>
            <div className="mt-auto pt-5">
              <a
                href={whatsappUrl('Hello VISRONIX Technologies, I would like to know more about your services.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lit w-full"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Open WhatsApp chat
              </a>
            </div>
          </Reveal>

          <Reveal
            className={`${emailConfigured ? 'panel' : 'ghost-cell'} flex flex-col p-6 md:p-7`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`data-xs ${emailConfigured ? 'text-low' : 'text-low/70'}`}>
                PORT 02
              </span>
              {emailConfigured ? (
                <Led state="lit">SECONDARY CHANNEL</Led>
              ) : (
                <Led state="off">NOT WIRED YET</Led>
              )}
            </div>
            <h2 className={`title mt-4 ${emailConfigured ? '' : 'text-hi/80'}`}>Email</h2>
            {emailConfigured ? (
              <>
                <p className="body-text mt-2">For detailed briefs and documents.</p>
                <p className="data mt-3 text-hi/90">
                  <a href={`mailto:${contactEmail}`} className="tap hover:text-accent">
                    {contactEmail}
                  </a>
                </p>
              </>
            ) : (
              <>
                <p className="body-text mt-2 text-low">
                  Our business email address is being set up and will appear here soon. Until
                  then, WhatsApp is the reliable way to reach us.
                </p>
                <p className="data-xs mt-4 border border-line px-4 py-3 uppercase" style={{ letterSpacing: '0.08em' }}>
                  Email enquiries coming soon
                </p>
              </>
            )}
            <div className="mt-auto pt-5">
              <p className="data-xs text-low">REPLIES DURING WORKING HOURS, MONDAY–SATURDAY</p>
            </div>
          </Reveal>

          <Reveal className="panel-2 flex flex-col p-6 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="data-xs text-low">PORT 03</span>
              <Led state="lit">VISITS BY APPOINTMENT</Led>
            </div>
            <h2 className="title mt-4 flex items-center gap-2.5">
              <MapPin className="size-5 text-accent" aria-hidden="true" />
              Location
            </h2>
            <p className="body-text mt-2">{site.location}</p>
            <p className="data-xs mt-3 text-low">VISITS BY APPOINTMENT — MESSAGE US TO ARRANGE ONE</p>
            <div className="mt-auto pt-5">
              {socialLinks.length === 0 ? (
                <p className="data-xs text-low">
                  OFFICIAL SOCIAL MEDIA LINKS WILL BE PUBLISHED HERE ONCE VERIFIED
                </p>
              ) : (
                socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="data-xs text-hi hover:text-accent">
                    {s.label.toUpperCase()}
                  </a>
                ))
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── General enquiry: patch panel ─────────────── */}
      <section className="section-y border-t border-line bg-base-2">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <SectionHead
              title="Send a general enquiry"
              lead="Pick a topic, write your message, and we will prepare it as a prefilled WhatsApp or email draft for you to review and send."
            />
            <p className="data-xs mt-6 text-low">
              YOUR DETAILS STAY IN YOUR BROWSER — THIS FORM DOES NOT TRANSMIT OR STORE ANYTHING ON
              A SERVER
            </p>
          </Reveal>
          <Reveal className="brackets panel p-6 md:p-10">
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
                  kind: 'select',
                  name: 'topic',
                  label: 'What is this about?',
                  required: true,
                  options: topics,
                  placeholder: 'Select a topic',
                },
                {
                  kind: 'textarea',
                  name: 'message',
                  label: 'Message',
                  required: true,
                  rows: 5,
                  placeholder: 'Tell us what you need…',
                },
              ]}
              buildHandoff={(v) => {
                const topicLabel = topics.find((t) => t.value === v.topic)?.label ?? v.topic
                return {
                  whatsappMessage: `Hello VISRONIX Technologies, I have a ${topicLabel.toLowerCase()} enquiry.\n\nName: ${v.name}\nEmail: ${v.email}\n\n${v.message}`,
                  email: {
                    subject: `Website enquiry — ${topicLabel}`,
                    body: `Hello VISRONIX Technologies,\n\nName: ${v.name}\nEmail: ${v.email}\nTopic: ${topicLabel}\n\n${v.message}`,
                  },
                  summary: `${v.name} · ${topicLabel}`,
                }
              }}
              note={
                <>
                  On submit, your enquiry is prepared as a prefilled message — you review and send
                  it yourself via WhatsApp or email. Nothing is sent automatically.
                </>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* ── Deep link ────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="container-x py-8">
          <Reveal>
            <p className="data-xs text-low">
              WHATSAPP DEEP LINK:{' '}
              <span className="text-hi/80">https://wa.me/{WHATSAPP_NUMBER}</span> — OPENING IT
              SHOWS THE PREFILLED MESSAGE IN WHATSAPP; YOU CHOOSE WHEN TO SEND
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
