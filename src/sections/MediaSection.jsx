import { Icon } from '../components/ui'
import { Reveal } from '../components/motion'
import { useVideoModal } from '../components/VideoModal'
import { business } from '../data'

export default function MediaSection() {
  const { open: openVideo } = useVideoModal()
  return (
    <section id="video" className="scroll-mt-24 bg-cream pb-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal variant="sectionReveal" className="relative overflow-hidden rounded-4xl">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&h=520&q=70"
            alt=""
            loading="lazy"
            className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
          />
          <div className="absolute inset-0 bg-forest/30" />
          <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">From Student to Success</p>
            <h3 className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
              See dispatch training in action
            </h3>
          </div>
          <button
            onClick={() => openVideo(business.promoVideoUrl)}
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange text-white shadow-card transition-colors duration-300 ease-out hover:bg-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Play training video"
          >
            <Icon.Play className="h-6 w-6" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
