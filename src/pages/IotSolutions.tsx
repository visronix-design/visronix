import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { EnquiryActions } from '@/components/EnquiryActions'
import { iotServices, iotProcess } from '@/data/iot'

export default function IotSolutions() {
  useSeo({
    title: 'IoT & Smart Home Solutions',
    description:
      'Smart lighting, appliance automation, energy monitoring and custom IoT devices — designed, prototyped and built by VISRONIX Technologies in Chennai.',
    path: '/iot-solutions',
  })

  return (
    <>
      <PageHero
        path="VISRONIX / SOLUTIONS / IOT"
        title="Connected spaces, built around you."
        lead="Smart lighting, appliance automation, energy monitoring and custom IoT devices — designed for your space and built with proper isolation, ratings and safety."
      >
        <EnquiryActions
          context={{ kind: 'iot' }}
          email={{
            subject: 'IoT & smart home enquiry',
            body: 'Hello VISRONIX Technologies,\n\nI am interested in your IoT and smart home solutions. Please contact me to discuss my requirements.',
          }}
        />
      </PageHero>

      {/* ── Signal path: how an engagement proceeds ──── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="How an engagement works"
              lead="A straightforward path from idea to working system — you know what happens at each step."
              aside="SIGNAL PATH // 04 STAGES"
            />
          </Reveal>
          <Reveal className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-stretch">
            {iotProcess.map((p, i) => (
              <div key={p.step} className="flex flex-1 items-center gap-4 max-lg:flex-col max-lg:items-stretch">
                <div className="panel-2 flex-1 p-5">
                  <span className="data-xs text-accent">SIG-{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="title mt-2 text-[1.05rem]">{p.step}</h3>
                  <p className="body-text mt-2 text-[0.9375rem]">{p.text}</p>
                </div>
                {i < iotProcess.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-px w-10 shrink-0 bg-line-strong max-lg:h-6 max-lg:w-px"
                  />
                )}
              </div>
            ))}
          </Reveal>
          <Reveal className="brackets panel mt-10 p-6 md:p-7">
            <p className="data-xs text-accent" style={{ letterSpacing: '0.14em' }}>
              SCOPE NOTE
            </p>
            <p className="body-text mt-3 max-w-3xl">
              We design, prototype and build IoT systems and devices. For installations in your
              premises, we agree the exact scope — including any electrical work and who handles
              it — before the project starts. Nothing is assumed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── What we build: module spec rows ──────────── */}
      <section className="section-y border-t border-line bg-base-2">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="What we build"
              lead="Start with one room or automate the whole space. Every engagement begins with what you actually need — not a fixed package."
              aside="MODULES // 06"
            />
          </Reveal>
          <Reveal className="mt-10 border-t border-line">
            {iotServices.map((s, i) => (
              <article
                key={s.id}
                className="grid gap-x-10 gap-y-3 border-b border-line py-6 md:grid-cols-[16rem_1fr]"
              >
                <div>
                  <span className="data-xs text-low">MOD-{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="title mt-1 text-[1.05rem]">{s.name}</h3>
                </div>
                <div>
                  <p className="body-text max-w-2xl text-[0.9375rem]">{s.summary}</p>
                  <p className="data-xs mt-3 text-low">{s.points.join(' · ').toUpperCase()}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Close ────────────────────────────────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal>
            <h2 className="display max-w-3xl">Describe your space. We will design the system.</h2>
            <p className="lead mt-4 max-w-xl">
              Tell us the rooms, appliances and outcomes you want — we will respond with a
              practical, honest plan.
            </p>
            <div className="mt-8">
              <EnquiryActions
                context={{ kind: 'iot' }}
                email={{
                  subject: 'IoT consultation request',
                  body: 'Hello VISRONIX Technologies,\n\nI would like to discuss an IoT / smart home requirement. Please contact me.',
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
