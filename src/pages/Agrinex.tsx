import { MessageCircle } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { EnquiryActions } from '@/components/EnquiryActions'
import { Led } from '@/components/instrument/Led'
import { SegmentDisplay } from '@/components/instrument/Segment'
import { capabilityGroups, agrinexJourney } from '@/data/agrinex'
import { whatsappUrl } from '@/lib/whatsapp'

const problemPoints = [
  {
    title: 'Repetitive field work',
    text: 'Monitoring, scouting and routine passes consume hours that farmers could spend on decisions that need human judgement.',
  },
  {
    title: 'Data arrives too late',
    text: 'Soil and crop conditions change fast; manual observation cycles often catch problems after they have already cost yield.',
  },
  {
    title: 'Automation priced for agribusiness',
    text: 'Industrial agricultural equipment is built for large farms. Small and mid-sized farms need affordable, right-sized machines.',
  },
]

const capabilityLed: Record<string, { state: 'ok' | 'progress' | 'off'; label: string }> = {
  implemented: { state: 'ok', label: 'IMPLEMENTED' },
  'in-development': { state: 'progress', label: 'IN DEVELOPMENT' },
  planned: { state: 'off', label: 'PLANNED' },
}

export default function Agrinex() {
  useSeo({
    title: 'AGRINEX — Smart Agricultural Robot',
    description:
      'AGRINEX is VISRONIX Technologies’ flagship agricultural robot, in prototype development in Chennai — engineered to bring affordable automation to real farm conditions.',
    path: '/agrinex',
  })

  return (
    <>
      {/* ── Hero: unit 01 on the bench ───────────────── */}
      <section className="border-b border-line">
        <div className="container-x pb-20 pt-32 md:pb-28 md:pt-40">
          <Reveal>
            <div className="flex flex-wrap items-center gap-5">
              <Led state="progress">FLAGSHIP // PROTOTYPE IN DEVELOPMENT</Led>
              <SegmentDisplay value="01" cells={2} height={34} label="Unit 01" />
              <span className="data-xs text-dim">UNIT 01</span>
            </div>
            <h1 className="display-xl mt-6 max-w-3xl">
              AGRINEX.
              <span className="block text-mist">A robot for the fields that feed us.</span>
            </h1>
            <p className="lead mt-6 max-w-xl">
              An agricultural robot engineered in-house by VISRONIX — designed for real farm rows,
              real soil and real budgets, not showroom conditions.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                href={whatsappUrl(
                  'Hello VISRONIX Technologies, I would like to learn more about the AGRINEX Smart Agricultural Robot and its current development status.',
                )}
                external
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Enquire about AGRINEX
              </Button>
              <Button to="/agrinex#development" variant="outline">
                Follow the development
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────── */}
      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHead
              title="What AGRINEX is"
              lead="A compact, field-capable robot platform combining embedded control, sensor-based navigation and a modular chassis designed around agricultural row geometry."
            />
            <p className="body-text mt-6">
              AGRINEX is being developed by our own engineering team in Chennai. It is a
              long-horizon product programme: every subsystem is built, tested and documented by
              the same people who teach and build with this hardware every day.
            </p>
            <p className="body-text mt-4">
              We publish capabilities only as they are verified on the prototype. Detailed
              specifications will be released alongside the prototype reveal.
            </p>
          </Reveal>
          <Reveal>
            <MediaPlaceholder
              label="AGRINEX prototype photography"
              aspect="aspect-[4/3]"
            />
            <p className="data-xs mt-3 text-dim">
              PLACEHOLDER SHOWN INTENTIONALLY — CONCEPT RENDERS ARE NEVER PRESENTED AS PHOTOS OF
              THE REAL ROBOT
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The problem: field rows ──────────────────── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="The problem it addresses"
              lead="Agriculture runs on time-sensitive, repetitive physical work — exactly the work machines can take over when they are built for the field's real constraints."
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {problemPoints.map((p, i) => (
              <div
                key={p.title}
                className="grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-[5rem_16rem_1fr]"
              >
                <span className="data text-dim">FLD-{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[1rem] font-medium text-paper">{p.title}</span>
                <span className="body-text text-[0.9375rem]">{p.text}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Development journey: trace timeline ──────── */}
      <section id="development" className="section-y scroll-mt-20">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Development journey"
              lead="Where AGRINEX stands today — and what comes next."
              aside="TRACE // 04 STAGES"
            />
          </Reveal>
          <Reveal className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {agrinexJourney.map((j, i) => (
              <div key={j.stage} className="flex flex-1 items-center gap-4 max-lg:flex-col max-lg:items-stretch">
                <div
                  aria-current={j.state === 'current' ? 'step' : undefined}
                  className={`flex-1 p-5 ${
                    j.state === 'current' ? 'panel border-cyan/50' : 'panel-2'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="data-xs text-dim">ST-{String(i + 1).padStart(2, '0')}</span>
                    <Led
                      state={j.state === 'done' ? 'ok' : j.state === 'current' ? 'progress' : 'off'}
                    >
                      {j.state === 'done' ? 'COMPLETE' : j.state === 'current' ? 'NOW' : 'PENDING'}
                    </Led>
                  </div>
                  <h3 className="title mt-3 text-[1.05rem]">{j.stage}</h3>
                  <p className="body-text mt-2 text-[0.9375rem]">{j.text}</p>
                </div>
                {i < agrinexJourney.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-10 shrink-0 bg-line-2 max-lg:h-6 max-lg:w-px"
                  />
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Capability status: the honest table ──────── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Capability status"
              lead="We separate what is built, what is being built and what is planned — and we do not publish a capability until it is verified on hardware."
              aside="STATUS // AWAITING VERIFICATION"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {capabilityGroups.map((g) => {
              const led = capabilityLed[g.id]
              return (
                <div
                  key={g.id}
                  className="grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-[16rem_1fr]"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1rem] font-medium text-paper">{g.label}</h3>
                    <Led state={led.state}>{led.label}</Led>
                  </div>
                  <p className="body-text max-w-2xl text-[0.9375rem]">{g.note}</p>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* ── Media: ghost cells ───────────────────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Media"
              lead="Photographs and working videos of the prototype will be published here as they are captured."
              aside="MEDIA // 03 SLOTS"
            />
          </Reveal>
          <Reveal stagger className="mt-10 grid gap-5 md:grid-cols-3">
            <MediaPlaceholder label="Prototype build photos" aspect="aspect-[4/3]" />
            <MediaPlaceholder label="Working video" aspect="aspect-[4/3]" />
            <MediaPlaceholder label="Field test footage" aspect="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      {/* ── Collaboration CTA ────────────────────────── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <h2 className="display max-w-2xl">Build AGRINEX with us.</h2>
            <p className="lead mt-4 max-w-xl">
              Agricultural institutions, farmers, students and engineering collaborators — we are
              open to demonstrations, feedback and partnership discussions.
            </p>
            <div className="mt-8">
              <EnquiryActions
                context={{ kind: 'agrinex' }}
                email={{
                  subject: 'AGRINEX collaboration enquiry',
                  body: 'Hello VISRONIX Technologies,\n\nI would like to learn more about the AGRINEX Smart Agricultural Robot and its current development status.',
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
