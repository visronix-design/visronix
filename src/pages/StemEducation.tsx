import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { Button } from '@/components/ui/Button'
import { EnquiryActions } from '@/components/EnquiryActions'
import { Led } from '@/components/instrument/Led'
import { courses, learningDomains } from '@/data/courses'

export default function StemEducation() {
  useSeo({
    title: 'STEM Education & Training',
    description:
      'Hands-on STEM training in Chennai — robotics, Arduino and electronics, IoT, embedded systems and sensors for school and college students. Project-based learning with real hardware.',
    path: '/stem-education',
  })

  return (
    <>
      <PageHero
        path="VISRONIX / LEARNING / STEM"
        title="Learn technology by building it."
        lead="Robotics, Arduino, IoT, embedded systems and sensors — taught hands-on in Chennai, for school and college students who want to understand technology by making it work."
      >
        <EnquiryActions
          context={{ kind: 'custom', message: 'Hello VISRONIX Technologies, I would like to know more about your STEM education and training programmes.' }}
          whatsappLabel="Ask about training"
          email={{ subject: 'STEM training enquiry', body: 'Hello VISRONIX Technologies,\n\nI would like to know more about your STEM education and training programmes.' }}
        />
      </PageHero>

      {/* ── How we teach: apparatus list ─────────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="How we teach"
              lead="Every concept ends in hardware you can hold. Sessions are built around experiments and projects — not slide decks — so theory lands through your own working builds."
            />
          </Reveal>
          <Reveal className="mt-12 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {learningDomains.map((d) => (
              <div key={d.name} className="flex items-start gap-3.5 border-b border-line pb-6">
                <span className="pt-1.5">
                  <Led state="lit">
                    <span className="sr-only">Active domain</span>
                  </Led>
                </span>
                <div>
                  <h3 className="text-[1.05rem] font-medium text-hi">{d.name}</h3>
                  <p className="body-text mt-1 text-[0.9375rem]">{d.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Programmes: the spec sheet ───────────────── */}
      <section className="section-y border-t border-line bg-base-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Programmes"
              lead="Fees, schedules and batch dates are confirmed directly by our team — enquire for current details rather than relying on published prices."
              aside="SPEC SHEET // 06 PROGRAMMES"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {courses.map((c, i) => (
              <article
                key={c.id}
                className="grid gap-x-8 gap-y-4 border-b border-line py-7 lg:grid-cols-[3.5rem_1fr_16rem]"
              >
                <span className="data text-low">EDU-{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="title">{c.title}</h3>
                    <span className="flex gap-2">
                      <span className="tag">{c.level.toUpperCase()}</span>
                      <span className="tag">{c.audience.toUpperCase()}</span>
                    </span>
                  </div>
                  <p className="body-text mt-2 max-w-2xl text-[0.9375rem]">{c.description}</p>
                  <p className="data-xs mt-3 text-low">
                    <span className="text-mid">SKILLS:</span>{' '}
                    {c.skills.join(' · ').toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <p className="data-xs text-low lg:text-right">{c.format.toUpperCase()}</p>
                  <EnquiryActions
                    compact
                    context={{ kind: 'course', courseName: c.title }}
                    email={{
                      subject: `STEM enquiry — ${c.title}`,
                      body: `Hello VISRONIX Technologies,\n\nI am interested in your ${c.title} programme. Please share the syllabus, schedule, eligibility, and fees.`,
                    }}
                    whatsappLabel={`Ask about ${c.title}`}
                    emailLabel="Email about this course"
                  />
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── For schools / for colleges ───────────────── */}
      <section className="section-y border-t border-line">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="brackets panel p-7 md:p-9">
            <h2 className="title">For schools</h2>
            <p className="body-text mt-4">
              Structured programmes that bring robotics and electronics into the classroom —
              workshops, activity modules and club support, tailored to the age group and syllabus.
              We work with the school to agree scope before anything begins.
            </p>
            <div className="mt-6">
              <EnquiryActions
                context={{
                  kind: 'custom',
                  message:
                    'Hello VISRONIX Technologies, we are a school interested in your STEM programmes. Please contact us to discuss options.',
                }}
                whatsappLabel="School enquiry"
                email={{
                  subject: 'School STEM programme enquiry',
                  body: 'Hello VISRONIX Technologies,\n\nWe are a school interested in your STEM programmes. Please contact us to discuss options.',
                }}
              />
            </div>
          </Reveal>
          <Reveal className="brackets panel p-7 md:p-9">
            <h2 className="title">For colleges</h2>
            <p className="body-text mt-4">
              Deeper technical training for engineering students — IoT, embedded systems and
              robotics tracks that align with project work and industry expectations, delivered as
              workshops or mentored lab formats.
            </p>
            <div className="mt-6">
              <EnquiryActions
                context={{
                  kind: 'custom',
                  message:
                    'Hello VISRONIX Technologies, we are a college interested in your STEM training programmes. Please contact us to discuss options.',
                }}
                whatsappLabel="College enquiry"
                email={{
                  subject: 'College STEM programme enquiry',
                  body: 'Hello VISRONIX Technologies,\n\nWe are a college interested in your STEM training programmes. Please contact us to discuss options.',
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────── */}
      <section className="on-face section-y border-t border-face-line bg-face">
        <div className="container-x">
          <Reveal>
            <h2 className="display max-w-2xl">Ready to start building?</h2>
            <p className="lead mt-4 max-w-xl">
              Tell us the student's level and interest — we will suggest the right programme.
            </p>
            <div className="mt-8">
              <Button to="/contact">Contact the team</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
