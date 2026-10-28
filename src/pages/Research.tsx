import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { EnquiryActions } from '@/components/EnquiryActions'
import { Led } from '@/components/instrument/Led'
import { researchAreas } from '@/data/research'
import { projects } from '@/data/projects'

export default function Research() {
  useSeo({
    title: 'Research & Innovation',
    description:
      'VISRONIX research and innovation — agricultural robotics, autonomous navigation, embedded systems, IoT networks and applied AI, anchored by the AGRINEX programme.',
    path: '/research',
  })

  const active = researchAreas.filter((r) => r.status === 'active')
  const exploring = researchAreas.filter((r) => r.status === 'exploring')

  return (
    <>
      <PageHero
        path="VISRONIX / RESEARCH / INNOVATION"
        title="Research that has to survive contact with reality."
        lead="Our exploration is anchored by one active programme — AGRINEX — and grows outward into the technologies it needs. We label what is active and what is exploratory, honestly."
      />

      {/* ── Areas: live channel vs ghost channel ─────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Areas of exploration"
              lead="Active areas are being worked on now. Exploratory areas are declared interests we are building competence in — not claims of completed research."
              aside={`CHANNELS // ${String(active.length).padStart(2, '0')} ACTIVE · ${String(exploring.length).padStart(2, '0')} EXPLORATORY`}
            />
          </Reveal>
          <Reveal className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
            <div className="bg-ink p-6 md:p-8">
              <Led state="lit">ACTIVE CHANNEL</Led>
              <ul className="mt-5 flex flex-col">
                {active.map((r, i) => (
                  <li key={r.id} className="border-b border-line py-5 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="data-xs text-dim">RSR-{String(i + 1).padStart(2, '0')}</span>
                      <Led state="ok">ACTIVE</Led>
                    </div>
                    <h3 className="title mt-1.5 text-[1.05rem]">{r.name}</h3>
                    <p className="body-text mt-1.5 text-[0.9375rem]">{r.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ghost-cell p-6 md:p-8">
              <Led state="off">EXPLORATORY CHANNEL</Led>
              <ul className="mt-5 flex flex-col">
                {exploring.map((r, i) => (
                  <li key={r.id} className="border-b border-line/60 py-5 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="data-xs text-dim/70">RSR-{String(i + 4).padStart(2, '0')}</span>
                      <Led state="off">EXPLORING</Led>
                    </div>
                    <h3 className="title mt-1.5 text-[1.05rem] text-paper/75">{r.name}</h3>
                    <p className="body-text mt-1.5 text-[0.9375rem] text-dim">{r.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Flagship programme ───────────────────────── */}
      <section className="section-y border-t border-line bg-ink-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="Flagship programme"
              lead="AGRINEX is the research programme everything else serves — agricultural robotics tested against real field constraints."
              aside="PROGRAMME // 01 ACTIVE"
            />
          </Reveal>
          <Reveal className="brackets panel mt-10 grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-9">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="data-xs text-dim">PRG-01</span>
                <Led state="progress">PROTOTYPE</Led>
              </div>
              <h3 className="title mt-3">{projects[0].title}</h3>
              <p className="body-text mt-2 max-w-xl">{projects[0].summary}</p>
            </div>
            <EnquiryActions
              context={{ kind: 'agrinex' }}
              whatsappLabel="Discuss AGRINEX"
              email={{
                subject: 'AGRINEX research enquiry',
                body: 'Hello VISRONIX Technologies,\n\nI would like to discuss the AGRINEX research programme.',
              }}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
