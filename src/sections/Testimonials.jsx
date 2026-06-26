import { testimonials } from '../data'
import { SectionHeader, Stars } from '../components/ui'
import { Stagger, StaggerItem, cardHover } from '../components/motion'

export default function Testimonials() {
  return (
    <section id="stories" className="scroll-mt-24 bg-peach py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader title={<>Hear From Our<br className="sm:hidden" /> Successful Graduates</>} />

        <Stagger className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <StaggerItem key={i} className={`flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ${cardHover}`}>
              <Stars />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-forest/10 pt-4">
                <img src={t.avatar} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                <div className="leading-tight">
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
