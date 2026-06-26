import { useState } from 'react'
import { navLinks, business } from '../data'
import { GreenButton, Icon } from '../components/ui'
import { motion } from '../components/motion'
import { scrollToId, useActiveSection } from '../lib/scroll'

const SECTION_IDS = ['why', 'benefits', 'courses', 'documents', 'contact']
const telHref = `tel:${business.phoneCA.replace(/[^\d+]/g, '')}`

function Logo({ onClick }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      aria-label="Master Pro — back to top"
      className="flex items-center gap-2 font-display text-lg font-extrabold leading-tight text-ink"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange text-white">
        <Icon.Truck className="h-5 w-5" />
      </span>
      <span>
        Master <span className="text-orange">Pro</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Academy</span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  const go = (target) => {
    setOpen(false)
    scrollToId(target)
  }

  return (
    <motion.header
      className="sticky top-0 z-50 bg-cream/90 backdrop-blur"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo onClick={() => go('top')} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={`#${l.target}`}
              onClick={(e) => {
                e.preventDefault()
                go(l.target)
              }}
              aria-current={active === l.target ? 'true' : undefined}
              className={`text-sm font-medium transition hover:text-orange ${
                active === l.target ? 'text-orange' : 'text-ink/80'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={telHref} className="text-sm font-semibold text-ink/80 transition hover:text-orange">
            {business.phoneCA}
          </a>
          <GreenButton className="px-6" onClick={() => go('contact')}>
            Contact Us Now!
          </GreenButton>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-forest/15 text-ink transition hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <Icon.Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-forest/10 bg-cream px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={`#${l.target}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.target)
                }}
                className={`text-sm font-medium ${active === l.target ? 'text-orange' : 'text-ink/80'}`}
              >
                {l.label}
              </a>
            ))}
            <a href={telHref} className="text-sm font-semibold text-ink/80">
              {business.phoneCA}
            </a>
            <div className="mt-2 flex items-center gap-3">
              <GreenButton className="flex-1" onClick={() => go('contact')}>
                Contact Us Now!
              </GreenButton>
            </div>
          </nav>
        </div>
      )}
    </motion.header>
  )
}
