import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { Button } from '@/components/ui/Button'
import { EnquiryActions } from '@/components/EnquiryActions'
import { founders, founderImageSrc, type Founder } from '@/data/founders'
import { site, WHATSAPP_DISPLAY } from '@/config/site'

function Portrait({ f, eager = false }: { f: Founder; eager?: boolean }) {
  return (
    <img
      src={founderImageSrc(f)}
      alt={`Portrait of ${f.name}, ${f.position} of VISRONIX Technologies.`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="size-full object-cover"
      style={{ objectPosition: f.objectPosition }}
    />
  )
}

export default function Founders() {
  useSeo({
    title: 'The People Behind VISRONIX',
    description:
      'Meet the founders and leadership of VISRONIX Technologies in Chennai — the people guiding engineering, education and agricultural robotics.',
    path: '/founders',
  })

  const founder = founders.find((f) => f.role === 'FOUNDER')!
  const leadership = founders.filter((f) => f.role === 'LEADERSHIP')

  return (
    <>
      <PageHero
        path="VISRONIX / COMPANY / FOUNDERS"
        title="The people behind VISRONIX."
        lead="Meet the leadership shaping our vision, guiding our engineering efforts, and building the future of VISRONIX Technologies."
      />

      {/* ── Founder feature ──────────────────────────── */}
      <section className="section-y pt-0!">
        <div className="container-x">
          <Reveal className="panel grid overflow-hidden md:grid-cols-[2fr_3fr]">
            <div className="aspect-[4/5] overflow-hidden border-b border-line p-3 md:aspect-auto md:border-b-0 md:border-r">
              <Portrait f={founder} eager />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <span className="data-xs text-low">FDR-01 · FOUNDING TEAM</span>
              <h2 className="display mt-5">{founder.name}</h2>
              <p className="data mt-3 uppercase text-accent" style={{ letterSpacing: '0.08em' }}>
                {founder.position}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Leadership row ───────────────────────────── */}
      <section className="section-y pt-0!">
        <div className="container-x">
          <Reveal>
            <SectionHead
              title="The leadership bench."
              lead="The people running the company's day-to-day engineering, information and operations."
              aside="PROFILES // 03"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((f, i) => (
              <Reveal key={f.file} className="panel flex flex-col overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden border-b border-line p-3">
                  <Portrait f={f} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="data-xs text-low">FDR-{String(i + 2).padStart(2, '0')}</span>
                  <h3 className="title mt-2 text-[1.15rem]">{f.name}</h3>
                  <p className="data-xs mt-1.5 uppercase text-accent" style={{ letterSpacing: '0.08em' }}>
                    {f.position}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shared direction ─────────────────────────── */}
      <section className="section-y border-t border-line bg-base-2">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal>
            <SectionHead
              title="One direction, shared."
              lead="Leadership here is not a set of titles — it is a working loop the whole company runs on."
            />
          </Reveal>
          <Reveal>
            <p className="body-text max-w-2xl">
              The company runs on a documented loop — learn on real hardware, build prototypes
              that become products, ship them, and teach what the work taught. The mission is
              shared too: technology that is learnable and buildable, and products like AGRINEX
              that solve real problems for the people who use them.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="outline">
                Read the company story
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Close panel ──────────────────────────────── */}
      <section className="section-y">
        <div className="container-x">
          <Reveal className="brackets panel-face on-face px-6 py-14 md:px-14 md:py-20">
            <h2 className="display-xl max-w-3xl">Work with the people behind the work.</h2>
            <p className="body-text mt-5 max-w-xl">
              Training programmes, components, IoT solutions, engineering projects or AGRINEX
              collaboration — the same team that builds the products handles every enquiry.
            </p>
            <EnquiryActions
              className="mt-9"
              context={{ kind: 'general' }}
              whatsappLabel="WhatsApp us"
              emailLabel="Email us"
              email={{
                subject: 'General enquiry — VISRONIX Technologies',
                body: 'Hello VISRONIX Technologies,\n\nI would like to enquire about your programmes, products, and services.',
              }}
            />
            <p className="data-xs mt-8 text-face-low">
              {site.location.toUpperCase()} · WHATSAPP {WHATSAPP_DISPLAY}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
