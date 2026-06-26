import { courses, business } from '../data'
import { SectionHeader, PrimaryButton, Icon } from '../components/ui'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { useVideoModal } from '../components/VideoModal'
import { scrollToId } from '../lib/scroll'

// Faux video-player frame — poster + play button + native-looking control bar.
function VideoFrame({ poster, runtime, onPlay }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-black shadow-soft">
      <img src={poster} alt="" loading="lazy" className="aspect-video w-full object-cover object-top opacity-95" />
      {/* center play */}
      <button
        type="button"
        onClick={onPlay}
        aria-label="Play course preview"
        className="group absolute inset-0 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink shadow-soft transition-colors duration-300 group-hover:bg-white">
          <Icon.Play className="h-5 w-5 translate-x-[1px]" />
        </span>
      </button>
      {/* faux control bar */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6">
        <div className="mb-1.5 h-[3px] w-full rounded-full bg-white/30">
          <div className="h-full w-[6%] rounded-full bg-white" />
        </div>
        <div className="flex items-center gap-3 text-white">
          <Icon.Play className="h-3.5 w-3.5" />
          <span className="text-[10px] tabular-nums tracking-tight">0:00 / {runtime}</span>
          <span className="flex-1" />
          <Icon.Volume className="h-3.5 w-3.5" />
          <Icon.Expand className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  )
}

function CourseCard({ c, onPlay }) {
  const t = c.theme
  return (
    <article
      className={`flex h-full flex-col rounded-[1.75rem] p-6 text-center shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(30,64,52,0.4)] sm:p-8 ${t.card}`}
    >
      {/* delivery icons */}
      <div className="flex items-center justify-center gap-3">
        <Icon.Truck className="h-9 w-9" />
        {c.software && <Icon.Laptop className="h-9 w-9" />}
      </div>

      <p className={`mt-3 text-xs font-medium sm:text-sm ${t.sub}`}>{c.label}</p>
      <h3 className="mt-1 font-display text-xl font-bold leading-tight sm:text-2xl">{c.title}</h3>

      {/* price */}
      <p className="mt-3 flex items-start justify-center leading-none">
        {c.dollar && <span className="mt-1 text-xl font-semibold sm:text-2xl">$</span>}
        <span className="font-display text-4xl font-extrabold sm:text-5xl">{c.amount}</span>
        <span className="ml-2 mt-2 text-xl font-semibold sm:text-2xl">{c.currency}</span>
        <span className={`ml-1.5 mt-4 text-xs font-medium ${t.sub}`}>{c.unit}</span>
      </p>

      {/* video */}
      <div className="mt-5">
        <VideoFrame poster={c.poster} runtime={c.runtime} onPlay={onPlay} />
      </div>

      {/* pdf link */}
      <p className={`mt-4 text-xs sm:text-sm ${t.sub}`}>
        {c.pdf}{' '}
        <button
          type="button"
          onClick={() => scrollToId('contact')}
          className={`font-semibold underline underline-offset-2 ${t.pdf}`}
        >
          Click Here To Download
        </button>
      </p>

      {/* enrol */}
      <button
        onClick={() => scrollToId('contact')}
        aria-label={`Enrol in ${c.title}`}
        className={`mt-5 w-full rounded-full py-3.5 text-sm font-semibold shadow-soft transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${t.btn}`}
      >
        Enrol Now
      </button>
    </article>
  )
}

export default function CourseGrid() {
  const { open: openVideo } = useVideoModal()
  return (
    <section id="courses" className="scroll-mt-24 bg-cream py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <SectionHeader
            align="left"
            title={<>Tailored Pricing Plans<br className="sm:hidden" /> Designed For You</>}
            className="!text-center sm:!text-left"
          />
          <Reveal variant="sectionRevealTight" delay={0.15} className="shrink-0">
            <PrimaryButton onClick={() => scrollToId('contact')}>View All Courses</PrimaryButton>
          </Reveal>
        </div>

        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:gap-8" amount={0.1}>
          {courses.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <CourseCard c={c} onPlay={() => openVideo(business.promoVideoUrl)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
