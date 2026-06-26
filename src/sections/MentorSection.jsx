import { mentors } from '../data'
import { SectionHeader, PrimaryButton } from '../components/ui'
import { Reveal, Stagger, StaggerItem, cardHover } from '../components/motion'
import { scrollToId } from '../lib/scroll'

export default function MentorSection() {
  return (
    <section id="benefits" className="scroll-mt-24 bg-cream py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <SectionHeader title={<>Everything You Need<br className="sm:hidden" /> To Get Hired</>} />
        </div>

        <Stagger className="mt-8 grid grid-cols-2 gap-5 lg:mt-12 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <StaggerItem key={i} className={`relative aspect-[4/5] overflow-hidden rounded-3xl ${cardHover}`}>
              <img src={m.img} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-soft backdrop-blur-sm">
                <h3 className="text-sm font-bold text-ink">{m.name}</h3>
                <p className="mt-0.5 text-xs text-muted">{m.role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted">
            From day one to your first job offer, Master Pro supports you with real training, industry
            connections and placement assistance across North America.
          </p>
          <div className="mt-6 flex justify-center">
            <PrimaryButton className="px-8" onClick={() => scrollToId('contact')}>
              Talk to Admissions
            </PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
