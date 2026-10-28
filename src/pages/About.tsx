import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { Button } from '@/components/ui/Button'
import { Led } from '@/components/instrument/Led'
import { divisions } from '@/data/divisions'

const domains = [
  'Robotics',
  'Embedded systems',
  'IoT & connectivity',
  'Electronics design',
  'Automation',
  'Agricultural technology',
]

const loop = [
  { step: 'LEARN', text: 'Students train on the hardware we stock and use.' },
  { step: 'BUILD', text: 'Ideas become working prototypes on our benches.' },
  { step: 'SHIP', text: 'Prototypes are engineered into dependable products.' },
  { step: 'TEACH', text: 'What we ship feeds back into what we teach.' },
]

const statements = [
  {
    label: 'VISION',
    text: 'To become a trusted Tamil Nadu technology house where practical education and real engineering products grow from the same roots.',
  },
  {
    label: 'MISSION',
    text: 'To make technology learnable and buildable — through honest teaching, quality components, working prototypes and products like AGRINEX that solve real problems.',
  },
  {
    label: 'PHILOSOPHY',
    text: 'Build what we can stand behind. Teach what we have actually done. Publish only what we can verify. Say what a thing is — and what it is not yet.',
  },
]

const roadmap = [
  { state: 'progress' as const, label: 'IN PROGRESS', text: 'Take AGRINEX from prototype to field-tested pilot deployments.' },
  { state: 'lit' as const, label: 'ACTIVE', text: 'Grow structured STEM programmes with partner schools and colleges.' },
  { state: 'off' as const, label: 'PENDING', text: 'Expand the components catalogue with verified stock and pricing.' },
  { state: 'off' as const, label: 'PENDING', text: 'Develop custom IoT products for homes and small businesses.' },
]

export default function About() {
  useSeo({
    title: 'About Us',
    description:
      'VISRONIX Technologies is a multidisciplinary technology company in Chennai — connecting STEM education, electronic components, IoT solutions, engineering projects and AGRINEX agricultural robotics.',
    path: '/about',
  })

  return (
    <>
      <PageHero
        path="VISRONIX / COMPANY / ABOUT"
        title="One team across education, hardware and engineering."
        lead="VISRONIX Technologies is a multidisciplinary technology company based in Chennai, Tamil Nadu — built around a simple loop: learn, build, ship, teach."
      />

      {/* ── The operating loop: signal path ──────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="The loop that runs the company."
              lead="We work where hands-on learning meets real engineering. Prototypes become products; products feed back into better teaching."
            />
          </Reveal>
          <Reveal className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch">
            {loop.map((n, i) => (
              <div key={n.step} className="flex flex-1 items-center gap-4 max-md:flex-col max-md:items-stretch">
                <div className="panel-2 flex-1 p-5">
                  <Led state="lit">{n.step}</Led>
                  <p className="body-text mt-3 text-[0.9375rem]">{n.text}</p>
                </div>
                {i < loop.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-10 shrink-0 bg-line-2 max-md:h-6 max-md:w-px"
                  />
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Division pinout: the same index table ────── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Six divisions, one board."
              lead="Each division is a pin on the same chip — wired to the others, powered by the same bench."
              aside="PINOUT // VX-01 … VX-06"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {divisions.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className="group grid items-baseline gap-x-6 gap-y-1 border-b border-line py-5 transition-colors hover:bg-ink/50 md:grid-cols-[5rem_1fr_1.5rem]"
              >
                <span className="data text-dim transition-colors group-hover:text-cyan">VX-{d.index}</span>
                <span>
                  <span className="text-[1.05rem] font-medium text-paper">{d.name}</span>
                  <span className="body-text mt-0.5 block max-w-xl text-[0.9375rem]">{d.summary}</span>
                </span>
                <ArrowRight
                  className="hidden size-4 self-center text-dim transition-all group-hover:translate-x-1 group-hover:text-cyan md:block"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Statements: editorial list, not cards ────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal className="border-t border-line">
            {statements.map((s) => (
              <div
                key={s.label}
                className="grid gap-x-10 gap-y-3 border-b border-line py-8 md:grid-cols-[10rem_1fr] md:py-10"
              >
                <span className="data-xs pt-1.5 text-cyan" style={{ letterSpacing: '0.14em' }}>
                  {s.label}
                </span>
                <p className="max-w-2xl text-[1.05rem] leading-relaxed text-paper/90">{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Domains + working method ─────────────────── */}
      <section className="section-y border-t border-line">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHead title="Technology domains" lead="The fields our work lives in — across every division." />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {domains.map((d) => (
                <li key={d} className="tag">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <SectionHead title="How we work" />
            <ul className="mt-8 flex flex-col gap-4">
              {[
                'Hands-on first — concepts are proven on real hardware, not just slides.',
                'Honest scope — we say clearly what we deliver, and what remains your responsibility.',
                'Documented builds — prototypes come with explanations, not mysteries.',
                'Local support — Chennai-based and reachable on WhatsApp.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Led state="lit">
                    <span className="sr-only">Confirmed practice</span>
                  </Led>
                  <span className="body-text">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Status panel: honesty as designed absence ── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Panel status."
              lead="These readouts fill as the company verifies them. We publish team profiles, milestones and capabilities — never before."
              aside="STATUS // PARTIALLY UNVERIFIED"
            />
          </Reveal>
          <Reveal className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4 bg-ink p-8 text-center">
              <Led state="lit">FOUNDER PROFILES — PUBLISHED</Led>
              <p className="body-text max-w-sm text-[0.9375rem]">
                The founders and leadership team are now published on the Founders page.
              </p>
              <Button to="/founders" variant="outline" size="sm">
                Meet the founders
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 bg-ink p-8 text-center">
              <Led state="off">ACHIEVEMENTS &amp; MILESTONES — AWAITING VERIFICATION</Led>
              <p className="body-text max-w-sm text-[0.9375rem]">
                Verified achievements and company milestones will appear here as they are
                confirmed.
              </p>
              <Button to="/agrinex" variant="outline" size="sm">
                Follow AGRINEX development
              </Button>
            </div>
          </Reveal>
          <Reveal className="mt-10">
            <h3 className="title">Where we are heading</h3>
            <ul className="mt-5 border-t border-line">
              {roadmap.map((r) => (
                <li
                  key={r.text}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
                >
                  <span className="body-text max-w-xl text-[0.9375rem]">{r.text}</span>
                  <Led state={r.state}>{r.label}</Led>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
