import { bootcamps } from '../data'
import { SectionHeader, PrimaryButton, Icon } from '../components/ui'
import { Reveal, Stagger, StaggerItem, cardHover, ctaFill } from '../components/motion'
import { scrollToId } from '../lib/scroll'

export default function BootcampSection() {
  return (
    <section id="paths" className="scroll-mt-24 bg-peach py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            align="left"
            title={<>Career-Focused<br className="sm:hidden" /> Training Paths</>}
            className="!text-center sm:!text-left"
          />
          <Reveal variant="sectionRevealTight" delay={0.15} className="shrink-0">
            <PrimaryButton onClick={() => scrollToId('courses')}>View All Paths</PrimaryButton>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {bootcamps.map((b, i) => (
            <StaggerItem key={i} className={`overflow-hidden rounded-3xl bg-white p-4 shadow-card ${cardHover}`}>
              <div className="h-44 w-full overflow-hidden rounded-2xl">
                <img src={b.img} alt={b.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="px-1 pt-4">
                <p className="text-xs font-medium text-muted">{b.category}</p>
                <h3 className="mt-1.5 text-xl font-bold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-xs text-muted">by {b.by}</p>

                <div className="mt-4 flex items-center justify-between border-t border-forest/10 pt-4 text-[10.5px] font-medium text-muted">
                  <span className="flex items-center gap-1.5">
                    <Icon.Clock className="h-3.5 w-3.5 text-forest/60" /> {b.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon.Video className="h-3.5 w-3.5 text-forest/60" /> {b.lessons}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon.Layers className="h-3.5 w-3.5 text-forest/60" /> {b.joined}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  aria-label={`Enrol in ${b.title}`}
                  className={`mt-4 w-full rounded-full border border-forest/15 py-3 text-sm font-semibold text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${ctaFill}`}
                >
                  Enrol Now
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
