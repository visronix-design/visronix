import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { EnquiryActions } from '@/components/EnquiryActions'
import { Led } from '@/components/instrument/Led'
import { projects, projectCategories, type ProjectStatus, type ProjectCategory } from '@/data/projects'

const statusLed: Record<ProjectStatus, { state: 'ok' | 'progress' | 'lit'; label: string }> = {
  prototype: { state: 'progress', label: 'PROTOTYPE' },
  'in-progress': { state: 'progress', label: 'IN DEVELOPMENT' },
  completed: { state: 'ok', label: 'COMPLETED' },
}

export default function Portfolio() {
  useSeo({
    title: 'Projects & Portfolio',
    description:
      'VISRONIX Technologies project portfolio — verified builds and prototypes, starting with the AGRINEX agricultural robot. Case studies are published as work completes.',
    path: '/projects',
  })

  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(
    () => projects.filter((p) => category === 'all' || p.category === category),
    [category],
  )

  return (
    <>
      <PageHero
        path="VISRONIX / PROJECTS / PORTFOLIO"
        title="Work we can stand behind."
        lead="Every entry here is a real VISRONIX build with an honest status. Case studies are added as projects complete and their outcomes can be verified."
      />

      <section className="section-y pt-0!">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`tag ${category === 'all' ? 'tag-lit' : 'hover:border-line-2 hover:text-paper'}`}
            >
              ALL
            </button>
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`tag ${category === c ? 'tag-lit' : 'hover:border-line-2 hover:text-paper'}`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10">
              <EmptyState title="Nothing in this category yet">
                As projects in this category complete, they will appear here with verified details.
              </EmptyState>
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-6">
              {filtered.map((p, i) => {
                const open = openId === p.id
                const led = statusLed[p.status]
                return (
                  <Reveal key={p.id}>
                    <article className="brackets panel">
                      <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_1fr] md:p-9">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="data-xs text-dim">CASE-{String(i + 1).padStart(2, '0')}</span>
                            <Led state={led.state}>{led.label}</Led>
                            <span className="tag">{p.category.toUpperCase()}</span>
                          </div>
                          <h2 className="display mt-4 text-[1.6rem]">{p.title}</h2>
                          <p className="body-text mt-3 max-w-xl">{p.summary}</p>
                          <button
                            type="button"
                            onClick={() => setOpenId(open ? null : p.id)}
                            aria-expanded={open}
                            className="btn btn-sm mt-6"
                          >
                            {open ? 'Hide project details' : 'Read project details'}
                            <ChevronDown
                              className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <MediaPlaceholder
                          label={`${p.title} — media`}
                          aspect="aspect-[16/10]"
                        />
                      </div>

                      {open && (
                        <div className="border-t border-line px-6 py-8 md:px-9">
                          <div className="grid gap-8 md:grid-cols-2">
                            <div>
                              <h3 className="data-xs text-dim" style={{ letterSpacing: '0.12em' }}>
                                PROBLEM
                              </h3>
                              <p className="body-text mt-2">{p.problem}</p>
                            </div>
                            <div>
                              <h3 className="data-xs text-dim" style={{ letterSpacing: '0.12em' }}>
                                APPROACH
                              </h3>
                              <p className="body-text mt-2">{p.solution}</p>
                            </div>
                          </div>
                          <h3 className="data-xs mt-8 text-dim" style={{ letterSpacing: '0.12em' }}>
                            TECHNOLOGIES
                          </h3>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {p.technologies.map((t) => (
                              <li key={t} className="tag">
                                {t}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                            {p.link && (
                              <Button to={p.link.to} variant="outline" size="sm">
                                {p.link.label}
                              </Button>
                            )}
                            <p className="data-xs text-dim">
                              RELATED SERVICE:{' '}
                              <Link to={p.relatedService.to} className="text-cyan hover:underline">
                                {p.relatedService.label}
                              </Link>
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  </Reveal>
                )
              })}
            </div>
          )}

          <Reveal className="mt-10">
            <EmptyState
              title="More case studies coming as work completes"
              action={
                <EnquiryActions
                  compact
                  context={{
                    kind: 'custom',
                    message:
                      'Hello VISRONIX Technologies, I would like to discuss an engineering project.',
                  }}
                  whatsappLabel="Discuss your project"
                  email={{
                    subject: 'Project enquiry',
                    body: 'Hello VISRONIX Technologies,\n\nI would like to discuss an engineering project.',
                  }}
                />
              }
            >
              We do not publish work-in-progress as finished case studies. Your project could be
              the next verified entry here.
            </EmptyState>
          </Reveal>
        </div>
      </section>
    </>
  )
}
