import { business, trustedLogos } from '../data'
import { PrimaryButton, Icon } from '../components/ui'
import { motion, sectionReveal, maskReveal, staggerContainer, SubtleBadgeFloat, EASE } from '../components/motion'
import { useVideoModal } from '../components/VideoModal'
import { scrollToId } from '../lib/scroll'

// Fallback portrait until public/owner.jpg is present.
const OWNER_FALLBACK =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=820&h=1000&q=80'
const FLEET_INSET =
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=480&h=480&q=75'

const reveal = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/* ---------- Decorative tech graphics ---------- */

// Faint blueprint truck behind the portrait.
function TruckBlueprint({ className = '' }) {
  return (
    <svg viewBox="0 0 320 200" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="14" y="60" width="170" height="96" rx="4" />
      <path d="M184 86h54l34 30v40h-88z" />
      <path d="M238 86v30h34" />
      <circle cx="70" cy="166" r="20" />
      <circle cx="70" cy="166" r="9" />
      <circle cx="236" cy="166" r="20" />
      <circle cx="236" cy="166" r="9" />
      <path d="M14 156h36M90 156h126M256 156h20" />
      <path d="M198 96h28v18h-28z" />
    </svg>
  )
}

function CornerTicks() {
  return (
    <>
      {/* top-right corner bracket */}
      <svg className="absolute right-2 top-2 h-10 w-10 text-forest/30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M40 2H16M38 0v24" />
        <circle cx="6" cy="6" r="2.5" className="text-orange" stroke="currentColor" />
      </svg>
      {/* bottom-right corner bracket */}
      <svg className="absolute bottom-2 right-2 h-10 w-10 text-forest/30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M40 38H16M38 40V16" />
      </svg>
    </>
  )
}

// Small floating UI panels (top-left of the composition).
function UiPanels() {
  return (
    <div className="absolute left-3 top-4 z-30 hidden w-40 space-y-2 sm:block">
      <div className="rounded-lg border border-forest/15 bg-white/85 p-2 shadow-soft backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-orange/15 text-orange">
            <Icon.Users className="h-3.5 w-3.5" />
          </span>
          <div className="flex-1 space-y-1">
            <span className="block h-1.5 w-3/4 rounded bg-forest/20" />
            <span className="block h-1.5 w-1/2 rounded bg-forest/10" />
          </div>
        </div>
      </div>
      <div className="ml-6 rounded-lg border border-forest/15 bg-white/85 p-2 shadow-soft backdrop-blur">
        <span className="block h-1.5 w-2/3 rounded bg-forest/20" />
        <span className="mt-1 block h-1.5 w-1/2 rounded bg-forest/10" />
        <span className="mt-1 block h-1.5 w-3/5 rounded bg-forest/10" />
      </div>
    </div>
  )
}

/* ---------- Right composition ---------- */

function HeroVisual() {
  return (
    <motion.div
      {...reveal(0.2, 18)}
      className="relative mx-auto h-[360px] w-full max-w-xl sm:h-[440px] lg:h-[520px]"
    >
      {/* schematic grid + soft panel background */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-peach/40 ring-1 ring-forest/10">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(30,64,52,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,64,52,0.06) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
        {/* blueprint truck */}
        <TruckBlueprint className="absolute right-3 top-8 h-32 w-52 text-forest/25 lg:h-40 lg:w-64" />
        <CornerTicks />
      </div>

      {/* portrait — dominant subject, faded into the grid on its left edge */}
      <img
        src={business.ownerImage}
        onError={(e) => {
          if (e.currentTarget.src !== OWNER_FALLBACK) e.currentTarget.src = OWNER_FALLBACK
        }}
        alt="Master Pro founder"
        className="absolute bottom-0 right-0 z-20 h-full w-[78%] rounded-br-[2rem] object-cover object-top sm:w-[70%]"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 22%, #000 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, #000 22%, #000 100%)',
        }}
      />

      <UiPanels />

      {/* circular fleet inset — overlaps lower-left of the portrait */}
      <motion.div
        {...reveal(0.5, 16)}
        className="absolute bottom-8 left-2 z-30 sm:bottom-12 sm:left-4"
      >
        <div className="relative">
          {/* dashed orbit ring */}
          <svg className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-forest/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="48" strokeDasharray="3 4" />
            <circle cx="50" cy="2" r="2" className="text-orange" stroke="currentColor" />
          </svg>
          <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-card sm:h-40 sm:w-40">
            <img src={FLEET_INSET} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </motion.div>

      {/* hiring-network stat chip floating on the composition */}
      <SubtleBadgeFloat
        range={4}
        duration={6}
        className="absolute -bottom-3 right-6 z-40 flex items-center gap-2 rounded-2xl border border-forest/10 bg-white px-3.5 py-2.5 shadow-card"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-orange/10 text-orange">
          <Icon.Truck className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-ink">986+</p>
          <p className="text-[10px] text-muted">Hiring Network</p>
        </div>
      </SubtleBadgeFloat>
    </motion.div>
  )
}

/* ---------- Hero ---------- */

export default function Hero() {
  const { open: openVideo } = useVideoModal()
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-8 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* LEFT */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.h1
              variants={maskReveal}
              className="pb-1 font-display text-[34px] font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-[58px]"
            >
              Boost Your Logistics Career With{' '}
              <span className="text-orange">Dispatch Training</span>
            </motion.h1>

            <motion.p variants={sectionReveal} className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Master Pro is a Canadian-based academy turning ambition into real careers across North America —
              dispatch, freight brokerage and trucking operations with hands-on software exposure and dedicated
              job-placement support. No prior experience required.
            </motion.p>

            <motion.div variants={sectionReveal} className="mt-7 flex flex-wrap items-center gap-4">
              <PrimaryButton className="px-7 py-3.5" onClick={() => scrollToId('contact')}>
                Enrol Now
              </PrimaryButton>
              <button
                onClick={() => openVideo(business.promoVideoUrl)}
                aria-label="Watch student stories video"
                className="group inline-flex items-center gap-3 rounded-full border border-forest/15 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-orange/10 text-orange">
                  <Icon.Play className="h-3.5 w-3.5" />
                </span>
                Watch Stories
              </button>
            </motion.div>

            {/* stat card */}
            <motion.div
              variants={sectionReveal}
              className="mt-7 inline-flex w-fit flex-col rounded-2xl border border-forest/12 bg-white/70 px-6 py-4 shadow-soft backdrop-blur"
            >
              <span className="font-display text-3xl font-extrabold text-orange sm:text-4xl">986+</span>
              <span className="mt-0.5 text-sm font-semibold text-ink">Hiring Network</span>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <HeroVisual />
        </div>
      </div>

      {/* trust strip — seamless infinite marquee (right → left) */}
      <div className="border-t border-forest/10 bg-white/70 py-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Trusted by 500+ hiring partners
        </p>

        <div
          className="group relative mt-5 overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)',
          }}
        >
          {/* track holds the list twice → translateX(-50%) loops seamlessly */}
          <div className="flex w-max items-center will-change-transform animate-marquee-left motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {[...trustedLogos, ...trustedLogos].map((name, i) => (
              <span
                key={i}
                aria-hidden={i >= trustedLogos.length}
                className="mx-8 flex shrink-0 items-center gap-2 text-muted opacity-65 transition-[opacity,transform] duration-[250ms] ease-out hover:scale-[1.03] hover:opacity-100"
              >
                <Icon.Truck className="h-5 w-5" />
                <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
