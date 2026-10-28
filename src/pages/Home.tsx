import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { site, WHATSAPP_DISPLAY } from '@/config/site'
import { whatsappUrl } from '@/lib/whatsapp'
import { divisions } from '@/data/divisions'
import { courses } from '@/data/courses'
import { products } from '@/data/products'
import { agrinexJourney } from '@/data/agrinex'
import { Led } from '@/components/instrument/Led'
import { StatusRail } from '@/components/instrument/StatusRail'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { EnquiryActions } from '@/components/EnquiryActions'

const RAIL = ['CHENNAI · 13.08°N 80.27°E', 'WHATSAPP +91 99620 11415', 'ENQUIRIES OPEN']

const DIVISION_STATE: Record<string, { state: 'lit' | 'progress'; label: string }> = {
  '/agrinex': { state: 'progress', label: 'PROTOTYPE' },
}
const divisionState = (to: string) => DIVISION_STATE[to] ?? { state: 'lit' as const, label: 'OPEN' }

const shelfPicks = ['arduino-uno-r3', 'esp32-devkit', 'ultrasonic-hc-sr04', 'motor-driver-l298n']
const benchPicks = ['robotics-foundations', 'arduino-electronics', 'iot-systems']

export default function Home() {
  useSeo({
    title: 'VISRONIX Technologies — Engineering Ideas Into Intelligent Solutions',
    description: site.description,
    path: '/',
  })

  return (
    <>
      {/* ── Hero: power-on ───────────────────────────── */}
      <section className="flex min-h-[92svh] items-center border-b border-line">
        <div className="container-x grid w-full gap-12 pb-20 pt-32 md:pt-36 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <div className="boot-line mb-5 h-px bg-line-2" aria-hidden="true" />
            <StatusRail items={RAIL} />
            <h1 className="display-xl boot-rise mt-8 max-w-4xl" style={{ animationDelay: '0.3s' }}>
              Engineering ideas into intelligent solutions.
            </h1>
            <p className="lead boot-rise mt-6 max-w-xl" style={{ animationDelay: '0.5s' }}>
              From hands-on STEM education and electronic components to IoT automation and
              agricultural robotics, VISRONIX Technologies turns engineering ideas into practical
              innovation.
            </p>
            <div className="boot-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '0.65s' }}>
              <Button
                href={whatsappUrl(
                  'Hello VISRONIX Technologies, I would like to know more about your services.',
                )}
                external
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Start an enquiry
              </Button>
              <Button to="#divisions" variant="outline" aria-label="Explore our six divisions">
                Explore the divisions
              </Button>
            </div>
            <div className="boot-rise mt-10" style={{ animationDelay: '0.8s' }}>
              <Led state="progress">AGRINEX FLAGSHIP — PROTOTYPE IN DEVELOPMENT</Led>
            </div>
          </div>

          {/* Division mini-index — navigation, not a stat panel */}
          <nav aria-label="Division index" className="hidden self-end lg:block">
            <p className="data-xs border-b border-line pb-2 text-dim" style={{ letterSpacing: '0.14em' }}>
              DIVISION INDEX
            </p>
            <ul>
              {divisions.map((d, i) => {
                const st = divisionState(d.to)
                return (
                  <li key={d.to} className="boot-rise" style={{ animationDelay: `${0.55 + i * 0.09}s` }}>
                    <Link
                      to={d.to}
                      className="group flex items-center justify-between gap-3 border-b border-line py-2.5 transition-colors hover:bg-ink-2/60"
                    >
                      <span className="data-xs text-dim transition-colors group-hover:text-cyan">
                        VX-{d.index}
                      </span>
                      <span className="flex-1 text-[0.8125rem] text-paper/85 transition-colors group-hover:text-paper">
                        {d.name}
                      </span>
                      <Led state={st.state}>{st.label}</Led>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── Division index table ─────────────────────── */}
      <section id="divisions" className="section-y scroll-mt-20">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="One company, six connected divisions."
              lead="Education feeds engineering. Components supply the builds. Prototypes become products. Each division strengthens the others."
              aside="INDEX // 06 ENTRIES"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {divisions.map((d) => {
              const st = divisionState(d.to)
              return (
                <Link
                  key={d.to}
                  to={d.to}
                  className="group grid items-baseline gap-x-6 gap-y-1 border-b border-line py-6 transition-colors hover:bg-ink-2/50 md:grid-cols-[5rem_1fr_11rem_1.5rem]"
                >
                  <span className="data text-dim transition-colors group-hover:text-cyan">
                    VX-{d.index}
                  </span>
                  <span>
                    <span className="title block">{d.name}</span>
                    <span className="body-text mt-1 block max-w-xl text-[0.9375rem]">{d.summary}</span>
                  </span>
                  <span className="md:justify-self-end">
                    <Led state={st.state}>{st.label}</Led>
                  </span>
                  <ArrowRight
                    className="hidden size-4 self-center text-dim transition-all group-hover:translate-x-1 group-hover:text-cyan md:block"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* ── AGRINEX field band ───────────────────────── */}
      <section className="section-y border-y border-line bg-ink-2">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Led state="progress">FLAGSHIP // PROTOTYPE IN DEVELOPMENT</Led>
            <h2 className="display mt-5">AGRINEX.</h2>
            <p className="lead mt-5">
              A smart agricultural robot, engineered in-house for the fields that feed us — built
              to take repetitive work off farmers, not to replace their judgement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/agrinex">Meet AGRINEX</Button>
              <Button
                href={whatsappUrl(
                  'Hello VISRONIX Technologies, I would like to learn more about the AGRINEX Smart Agricultural Robot and its current development status.',
                )}
                external
                variant="outline"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Ask about AGRINEX
              </Button>
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-6">
            <ol className="border-t border-line">
              {agrinexJourney.map((j) => (
                <li
                  key={j.stage}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <span className="text-[0.9375rem] font-medium text-paper">{j.stage}</span>
                  <span className="body-text hidden max-w-xs text-[0.875rem] sm:block">{j.text}</span>
                  <Led
                    state={
                      j.state === 'done' ? 'ok' : j.state === 'current' ? 'progress' : 'off'
                    }
                  >
                    {j.state === 'done' ? 'COMPLETE' : j.state === 'current' ? 'IN PROGRESS' : 'PENDING'}
                  </Led>
                </li>
              ))}
            </ol>
            <MediaPlaceholder label="AGRINEX prototype photography" aspect="aspect-[16/10]" />
          </Reveal>
        </div>
      </section>

      {/* ── The bench: learning spec rows ────────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="The bench is the classroom."
              lead="Robotics, electronics, IoT and embedded systems — taught hands-on, so concepts land as things students can demo, debug and explain."
              aside="PROGRAMMES // 06 COURSES"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {benchPicks.map((id) => {
              const c = courses.find((x) => x.id === id)!
              return (
                <Link
                  key={c.id}
                  to="/stem-education"
                  className="group grid items-baseline gap-x-6 gap-y-2 border-b border-line py-6 transition-colors hover:bg-ink-2/50 md:grid-cols-[1fr_auto]"
                >
                  <span>
                    <span className="title block">{c.title}</span>
                    <span className="body-text mt-1 block max-w-xl text-[0.9375rem]">
                      {c.description}
                    </span>
                    <span className="data-xs mt-2 block text-dim">{c.format.toUpperCase()}</span>
                  </span>
                  <span className="flex items-center gap-4 md:justify-self-end">
                    <span className="tag">{c.level.toUpperCase()}</span>
                    <ArrowRight
                      className="size-4 text-dim transition-all group-hover:translate-x-1 group-hover:text-cyan"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              )
            })}
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Button to="/stem-education" variant="outline">
              Explore STEM programmes
            </Button>
            <p className="data-xs text-dim">FOR SCHOOLS, COLLEGES AND INDIVIDUAL LEARNERS</p>
          </Reveal>
        </div>
      </section>

      {/* ── The parts shelf ──────────────────────────── */}
      <section className="section-y border-y border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="The parts shelf."
              lead="Boards, sensors, modules and maker hardware — a curated catalogue with direct enquiry ordering."
              aside="CATALOGUE // 14 ENTRIES · PREVIEW"
            />
          </Reveal>
          <Reveal stagger className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {shelfPicks.map((id) => {
              const p = products.find((x) => x.id === id)!
              return (
                <Link
                  key={p.id}
                  to="/electronic-components"
                  className="group flex flex-col gap-3 bg-ink p-5 transition-colors hover:bg-ink-3"
                >
                  <span className="data-xs text-dim transition-colors group-hover:text-cyan">
                    {p.category.toUpperCase()}
                  </span>
                  <span className="title text-[1.05rem]">{p.name}</span>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <Led state="off">STOCK UNVERIFIED</Led>
                    <ArrowRight
                      className="size-4 text-dim transition-all group-hover:translate-x-1 group-hover:text-cyan"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              )
            })}
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Button to="/electronic-components" variant="outline">
              Browse the catalogue
            </Button>
            <p className="data-xs text-dim">CATALOGUE PREVIEW — STOCK AND PRICING CONFIRMED ON ENQUIRY</p>
          </Reveal>
        </div>
      </section>

      {/* ── Close panel ──────────────────────────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal className="brackets panel px-6 py-14 md:px-14 md:py-20">
            <h2 className="display-xl max-w-3xl">Ready when you are.</h2>
            <p className="body-text mt-5 max-w-xl">
              Training programmes, components, IoT solutions, engineering projects or AGRINEX
              collaboration — tell us what you have in mind.
            </p>
            <EnquiryActions
              className="mt-9"
              context={{ kind: 'general' }}
              whatsappLabel="WhatsApp us"
            />
            <p className="data-xs mt-8 text-dim">
              {site.location.toUpperCase()} · WHATSAPP {WHATSAPP_DISPLAY}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
