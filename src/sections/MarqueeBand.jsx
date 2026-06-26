// Crossed X-ribbon promo: two full-width scrolling ribbons that intersect at the centre.
// Blue tilts +8° (upper-left → lower-right), yellow tilts -8° (lower-left → upper-right).

const ROW_A = [
  'Save 40% on enrolling in All 4 courses!',
  'Free professional resume for every student',
  'No prior experience required',
]

const ROW_B = [
  'Save 10% when 2+ students enroll together!',
  'Onsite & online classes available',
  'Job placement support across North America',
]

// One seamless marquee ribbon: track holds the content twice and slides -50%.
function Ribbon({ items, dir, className }) {
  const Group = () => (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span
          key={i}
          className="whitespace-nowrap px-7 text-base font-extrabold tracking-tight sm:text-lg lg:text-xl"
        >
          {t}
        </span>
      ))}
    </div>
  )
  return (
    <div className={`flex overflow-hidden py-2.5 ${className}`}>
      <div className={`flex w-max ${dir === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
        <Group />
        <Group />
      </div>
    </div>
  )
}

export default function MarqueeBand() {
  return (
    <section
      className="relative overflow-hidden bg-cream h-[120px] sm:h-[140px] lg:h-[150px]"
      aria-label="Promotions"
    >
      {/* Yellow ribbon — gentle downward tilt (behind) */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[4deg]">
        <Ribbon items={ROW_B} dir="right" className="bg-[#f7c33d] text-[#14161b]" />
      </div>

      {/* Blue ribbon — gentle upward tilt (on top at the crossing) */}
      <div className="absolute left-1/2 top-1/2 z-20 w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[4deg] shadow-soft">
        <Ribbon items={ROW_A} dir="left" className="bg-[#4285f4] text-[#14161b]" />
      </div>
    </section>
  )
}
