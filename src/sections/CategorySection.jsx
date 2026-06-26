import { categories } from '../data'
import { SectionHeader } from '../components/ui'
import { Stagger, StaggerItem, categoryHover } from '../components/motion'
import { scrollToId } from '../lib/scroll'

export default function CategorySection() {
  return (
    <section id="programs" className="scroll-mt-24 bg-peach py-16 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader title={<>Explore Our<br className="sm:hidden" /> Training Programs</>} />

        <Stagger className="mt-10 grid grid-cols-2 gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-7">
          {categories.map((c) => (
            <StaggerItem
              key={c.title}
              as="a"
              href="#courses"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('courses')
              }}
              aria-label={`${c.title} — view courses`}
              className={`flex flex-col items-start gap-5 rounded-[1.75rem] ${c.tone} p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange sm:min-h-[240px] ${categoryHover}`}
            >
              <div className="h-28 w-full overflow-hidden rounded-2xl bg-white/40 lg:h-32">
                <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-ink lg:text-lg">{c.title}</h3>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
