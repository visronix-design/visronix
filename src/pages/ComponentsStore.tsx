import { useMemo, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { useSeo } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryActions } from '@/components/EnquiryActions'
import { EmptyState } from '@/components/ui/EmptyState'
import { Led } from '@/components/instrument/Led'
import { SegmentDisplay } from '@/components/instrument/Segment'
import {
  products,
  productCategories,
  type Product,
  type ProductCategory,
} from '@/data/products'

type SortKey = 'name-asc' | 'name-desc' | 'category'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'category', label: 'Category' },
]

function ProductBin({ product, index }: { product: Product; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="panel flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex flex-1 flex-col items-start p-5 text-left"
      >
        <div className="flex w-full items-center justify-between gap-3">
          <span className="data-xs text-low transition-colors group-hover:text-accent">
            BIN-{String(index + 1).padStart(2, '0')} · {product.category.toUpperCase()}
          </span>
          {product.demo && (
            <span className="tag shrink-0 text-copper" title="Demonstration listing — confirm stock with us">
              DEMO
            </span>
          )}
        </div>
        <h3 className="title mt-3 text-[1.05rem]">{product.name}</h3>
        <p className="body-text mt-2 text-[0.9375rem]">{product.description}</p>
        <span className="mt-auto flex w-full items-center justify-between gap-2 pt-4">
          <Led state="off">STOCK UNVERIFIED</Led>
          <span className="data-xs inline-flex items-center gap-1 text-accent">
            {open ? 'HIDE' : 'DETAILS'}
            <ChevronDown
              className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </span>
        </span>
      </button>
      {open && (
        <div className="border-t border-line px-5 pb-5 pt-4">
          <h4 className="data-xs text-low" style={{ letterSpacing: '0.12em' }}>
            TYPICAL SPECIFICATIONS
          </h4>
          <ul className="mt-3 flex flex-col gap-1.5">
            {product.specs.map((s) => (
              <li key={s} className="data text-[0.8125rem] text-hi/85">
                <span className="mr-2 text-accent" aria-hidden="true">
                  ·
                </span>
                {s}
              </li>
            ))}
          </ul>
          <p className="data-xs mt-4 text-low">
            PRICE &amp; AVAILABILITY: CONFIRMED ON ENQUIRY — NO ONLINE PAYMENTS
          </p>
          <div className="mt-4">
            <EnquiryActions
              compact
              context={{ kind: 'product', productName: product.name }}
              email={{
                subject: `Component enquiry — ${product.name}`,
                body: `Hello VISRONIX Technologies,\n\nI am interested in ${product.name}. Please share the price, availability, specifications, and ordering details.`,
              }}
              whatsappLabel="Enquire on WhatsApp"
              emailLabel="Email enquiry"
            />
          </div>
        </div>
      )}
    </article>
  )
}

export default function ComponentsStore() {
  useSeo({
    title: 'Electronic Components Store',
    description:
      'Browse Arduino boards, ESP32 boards, sensors, motor drivers, modules and maker hardware from VISRONIX Technologies, Chennai. Enquire directly on WhatsApp — no online payment needed.',
    path: '/electronic-components',
  })

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('name-asc')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category
      const matchesQuery =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
    list = [...list].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      return a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    })
    return list
  }, [query, category, sort])

  return (
    <>
      <PageHero
        path="VISRONIX / STORE / COMPONENTS"
        title="Electronic components, curated for builders."
        lead="Boards, sensors, drivers and modules — the same hardware we use in our own labs and builds. Order by enquiry: message us on WhatsApp and collect or get delivery arranged."
      />

      <section className="section-y pt-0!">
        <div className="container-x">
          <Reveal className="panel flex items-start gap-4 p-4 md:p-5">
            <Led state="lit">CATALOGUE PREVIEW</Led>
            <p className="body-text text-[0.9375rem]">
              The listings below are demonstration entries showing the catalogue structure —
              contact us for the current stock list and prices. No online payments; every order is
              confirmed personally.
            </p>
          </Reveal>

          {/* Controls */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-low"
                aria-hidden="true"
              />
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components…"
                className="field-input !pl-11"
              />
            </div>
            <div>
              <label htmlFor="product-sort" className="sr-only">
                Sort products
              </label>
              <select
                id="product-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="field-input w-full lg:w-auto"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value} className="bg-panel">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              type="button"
              onClick={() => setCategory('all')}
              aria-pressed={category === 'all'}
              className={`tag ${category === 'all' ? 'tag-lit' : 'hover:border-line-strong hover:text-hi'}`}
            >
              ALL
            </button>
            {productCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`tag ${category === c ? 'tag-lit' : 'hover:border-line-strong hover:text-hi'}`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-8 flex flex-wrap items-end gap-5" role="status" aria-live="polite">
            <SegmentDisplay
              value={String(filtered.length)}
              cells={2}
              height={44}
              label={`${filtered.length} of ${products.length} listings shown`}
            />
            <p className="data-xs pb-1 text-low">
              SHOWING {filtered.length} OF {products.length} LISTINGS
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6">
              <EmptyState title="No components match">
                Try a different search term or clear the category filter. If you need something
                specific, message us — we may have it or can source it.
              </EmptyState>
            </div>
          ) : (
            <Reveal stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductBin key={p.id} product={p} index={i} />
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
