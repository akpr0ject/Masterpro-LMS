import { useState } from 'react'
import { faqs } from '../data'
import { SectionHeader, PrimaryButton, Icon } from '../components/ui'
import { Reveal, motion } from '../components/motion'
import { AnimatePresence } from 'framer-motion'
import { scrollToId } from '../lib/scroll'

function FAQItem({ f, idx, open, onToggle }) {
  const panelId = `faq-panel-${idx}`
  const btnId = `faq-btn-${idx}`
  return (
    <div className="py-5">
      <button
        id={btnId}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-4 focus-visible:ring-offset-white"
      >
        <span className="text-sm font-semibold text-ink">{f.q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
            open ? 'bg-orange text-white' : 'bg-forest/5 text-forest'
          }`}
        >
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="grid place-items-center"
          >
            {open ? <Icon.Minus className="h-4 w-4" /> : <Icon.Plus className="h-4 w-4" />}
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
            id={panelId}
            role="region"
            aria-labelledby={btnId}
          >
            <p className="mt-3 pr-10 text-xs leading-relaxed text-muted">{f.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="scroll-mt-24 bg-peach py-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        {/* Left */}
        <div>
          <SectionHeader align="left" title={<>Frequently<br /> Asked Questions</>} />
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Answers to the most common questions about job placement, eligibility for newcomers, immigration
              pathways and how our courses get you hired.
            </p>
            <div className="mt-6">
              <PrimaryButton onClick={() => scrollToId('contact')}>Contact Admissions</PrimaryButton>
            </div>
          </Reveal>
        </div>

        {/* Right accordion */}
        <Reveal variant="splitRevealRight" className="divide-y divide-forest/10 rounded-3xl bg-white px-6 shadow-card">
          {faqs.map((f, i) => (
            <FAQItem key={i} idx={i} f={f} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
