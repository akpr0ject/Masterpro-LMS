import { articles } from '../data'
import { SectionHeader, PrimaryButton, Icon } from '../components/ui'
import { Reveal, Stagger, StaggerItem, cardHover } from '../components/motion'
import { scrollToId } from '../lib/scroll'

export default function BlogSection() {
  return (
    <section id="documents" className="scroll-mt-24 bg-cream py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            title={<>Documents<br className="sm:hidden" /> & Resources</>}
            className="!text-center sm:!text-left"
          />
          <Reveal variant="sectionRevealTight" delay={0.15} className="shrink-0">
            <PrimaryButton onClick={() => scrollToId('contact')}>View All Resources</PrimaryButton>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {articles.map((a, i) => (
            <StaggerItem key={i} className={`group overflow-hidden rounded-3xl bg-white shadow-card ${cardHover}`}>
              <div className="h-52 w-full overflow-hidden">
                <img src={a.img} alt={a.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              {/* white panel overlapping image bottom — tints on card hover */}
              <div className="relative z-10 -mt-10 mx-4 rounded-2xl bg-white px-4 pb-4 pt-3 shadow-soft transition-colors duration-300 ease-out group-hover:bg-peach/70">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-forest px-3 py-1 text-[10px] font-bold text-white">
                    {a.tag}
                  </span>
                  <span className="text-[11px] text-muted">{a.date}</span>
                </div>
                <h3 className="mt-3 text-base font-bold leading-snug text-ink">{a.title}</h3>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  aria-label={`Purchase ${a.title}`}
                  className="group/btn mt-3 flex items-center gap-2 text-sm font-semibold text-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                >
                  Purchase Now{' '}
                  <Icon.Arrow className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
