import { SectionHeader, PrimaryButton, SecondaryButton } from '../components/ui'
import { Reveal, Stagger, sectionReveal, motion, offsetShadowHover } from '../components/motion'
import { scrollToId } from '../lib/scroll'

function StatCard({ value, label }) {
  return (
    <div className={`rounded-2xl bg-peach p-4 ${offsetShadowHover}`}>
      <p className="font-display text-2xl font-extrabold text-orange">{value}</p>
      <p className="mt-1 text-xs leading-snug text-muted">{label}</p>
    </div>
  )
}

export default function FeatureSplit() {
  return (
    <section id="why" className="scroll-mt-24 bg-cream py-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        {/* Image side */}
        <Reveal variant="splitRevealLeft" className="relative mx-auto max-w-md lg:mx-0">
          <div className="absolute -top-4 left-4 z-20 rounded-2xl bg-forest px-4 py-3 text-white shadow-card">
            <p className="font-display text-xl font-extrabold">40% OFF</p>
            <p className="text-[10px]">All 4 courses bundle</p>
          </div>
          <div className="overflow-hidden rounded-4xl">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=560&h=520&q=70"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Content side */}
        <div>
          <SectionHeader align="left" title={<>Why<br /> Master Pro</>} />
          <Stagger as="div">
            <motion.p variants={sectionReveal} className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Our programs are built around how the industry actually works — not just theory. Learn with practical
            tools, real software exposure and personalized instruction in small-class settings, backed by strong
            industry connections that help you land real jobs.
          </motion.p>

          <motion.div variants={sectionReveal} className="mt-6 grid max-w-md grid-cols-2 gap-4">
            <StatCard value="986+" label="Hiring partner companies across North America" />
            <StatCard value="100%" label="Free professional resume for every student" />
          </motion.div>

            <motion.div variants={sectionReveal} className="mt-6 flex items-center gap-4">
              <PrimaryButton onClick={() => scrollToId('contact')}>Enrol Now</PrimaryButton>
              <SecondaryButton onClick={() => scrollToId('contact')}>Contact Us</SecondaryButton>
            </motion.div>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
