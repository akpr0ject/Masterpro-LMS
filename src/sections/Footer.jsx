import { footerCols, footerLegal, business } from '../data'
import { Icon } from '../components/ui'
import { Reveal } from '../components/motion'
import { scrollToId } from '../lib/scroll'

// Map footer link labels to in-page section targets.
const TARGETS = {
  'Dispatch Training': 'courses',
  'Dispatch + Freight Brokerage': 'courses',
  'Truck Safety & Compliance': 'courses',
  'Billing & Invoicing': 'courses',
  'Demo Course': 'courses',
  'About Us': 'why',
  'Why Master Pro?': 'benefits',
  'Resume Support': 'benefits',
  'Documents & Resources': 'documents',
  'Success Stories': 'stories',
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
    >
      {children}
    </a>
  )
}

// Resolves a footer link string to the right element: tel / mailto / scroll / plain text.
function FooterLink({ label }) {
  const linkClass = 'text-sm leading-relaxed text-white/60 transition hover:text-orange focus:outline-none focus-visible:text-orange'

  if (label.includes('@')) {
    return (
      <a href={`mailto:${label}`} className={linkClass}>
        {label}
      </a>
    )
  }
  if (label.includes('+') && /\d{3}/.test(label)) {
    const tel = label.replace(/[^\d+]/g, '')
    return (
      <a href={`tel:${tel}`} className={linkClass}>
        {label}
      </a>
    )
  }
  if (TARGETS[label]) {
    return (
      <a
        href={`#${TARGETS[label]}`}
        onClick={(e) => {
          e.preventDefault()
          scrollToId(TARGETS[label])
        }}
        className={linkClass}
      >
        {label}
      </a>
    )
  }
  // address lines etc. — non-interactive text
  return <span className="text-sm leading-relaxed text-white/60">{label}</span>
}

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      <Reveal variant="fadeIn" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('top')
              }}
              aria-label="Master Pro — back to top"
              className="flex items-center gap-2 font-display text-lg font-extrabold leading-tight text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange text-white">
                <Icon.Truck className="h-5 w-5" />
              </span>
              <span>
                Master Pro
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Academy
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {business.tagline}. A Canadian-based academy training the next generation of logistics and
              transportation professionals.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Social href={business.social.facebook} label="Master Pro on Facebook">f</Social>
              <Social href={business.social.youtube} label="Master Pro on YouTube">yt</Social>
              <Social href={business.social.instagram} label="Master Pro on Instagram">ig</Social>
              <Social href={business.social.tiktok} label="Master Pro on TikTok">tk</Social>
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <FooterLink label={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/50">© 2026 {business.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerLegal.map((l) => (
              <a
                key={l}
                href="#top"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('top')
                }}
                className="text-xs text-white/50 transition hover:text-orange focus:outline-none focus-visible:text-orange"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
