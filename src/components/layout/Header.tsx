import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { navigation, type NavGroup } from '@/config/site'

function groupIsActive(group: NavGroup, pathname: string): boolean {
  if (group.to && pathname.startsWith(group.to)) return true
  return (group.children ?? []).some((c) => pathname.startsWith(c.to))
}

function Dropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const active = groupIsActive(group, pathname)

  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`flex min-h-11 items-center gap-1.5 px-4 text-[0.9375rem] font-medium transition-colors hover:text-cyan ${
          active ? 'text-cyan' : 'text-paper/85'
        }`}
      >
        {group.label}
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="panel absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 p-1.5 shadow-xl shadow-black/50">
          {group.children?.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                `flex items-center justify-between gap-2 px-4 py-3 text-[0.9375rem] transition-colors hover:bg-ink-3 ${
                  isActive ? 'text-cyan' : 'text-paper/85'
                }`
              }
            >
              {child.label}
              <span className="data-xs text-dim" aria-hidden="true">
                →
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const { pathname } = useLocation()
  // Menu state carries the pathname it was opened at: navigating away
  // (pathname change) closes it without an effect-driven setState.
  const [menuState, setMenuState] = useState<{ open: boolean; path: string }>({
    open: false,
    path: pathname,
  })
  const menuOpen = menuState.open && menuState.path === pathname
  const [scrolled, setScrolled] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuState((s) => ({ ...s, open: false }))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-4">
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((group) =>
            group.children ? (
              <Dropdown key={`${group.label}-${pathname}`} group={group} />
            ) : (
              <NavLink
                key={group.label}
                to={group.to!}
                className={({ isActive }) =>
                  `flex min-h-11 items-center px-4 text-[0.9375rem] font-medium transition-colors hover:text-cyan ${
                    isActive ? 'text-cyan' : 'text-paper/85'
                  }`
                }
              >
                {group.label}
              </NavLink>
            ),
          )}
          <Link to="/contact" className="btn btn-lit btn-sm ml-3 !min-h-11">
            Enquire
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuState({ open: true, path: pathname })}
          aria-expanded={menuOpen}
          aria-label="Open menu"
          className="flex size-11 items-center justify-center text-paper"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="container-x flex h-[4.25rem] items-center justify-between">
            <Logo />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMenuState((s) => ({ ...s, open: false }))}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center text-paper"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="container-x mt-2 flex flex-col gap-7 overflow-y-auto pb-16">
            {navigation.map((group) => (
              <div key={group.label} className="flex flex-col gap-1">
                {group.to ? (
                  <NavLink
                    to={group.to}
                    className={({ isActive }) =>
                      `title py-2 ${isActive ? 'text-cyan' : 'text-paper'}`
                    }
                  >
                    {group.label}
                  </NavLink>
                ) : (
                  <p className="data-xs px-1 pb-1 pt-2 uppercase text-dim" style={{ letterSpacing: '0.14em' }}>
                    {group.label}
                  </p>
                )}
                {group.children?.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) =>
                      `title px-1 py-2.5 ${isActive ? 'text-cyan' : 'text-paper/90'}`
                    }
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            ))}
            <Link to="/contact" className="btn btn-lit mt-2 w-full">
              Enquire now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
