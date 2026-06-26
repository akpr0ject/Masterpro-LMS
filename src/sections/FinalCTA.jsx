import { useState } from 'react'
import { PrimaryButton } from '../components/ui'
import { Reveal, Stagger, motion, sectionReveal, EASE } from '../components/motion'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Stand-in submit. Replace with a real POST to your admissions/CRM endpoint.
async function submitLead(email) {
  await new Promise((r) => setTimeout(r, 900))
  if (!navigator.onLine) throw new Error('offline')
  return { ok: true, email }
}

function EnquiryForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return // prevent duplicate submits
    const value = email.trim()
    if (!value) {
      setError('Please enter your email address.')
      return
    }
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStatus('loading')
    try {
      await submitLead(value)
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again or call us.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        variants={sectionReveal}
        className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-full bg-white/15 px-6 py-3.5 text-sm font-semibold text-white"
        role="status"
        aria-live="polite"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-orange" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Thanks! Our admissions team will be in touch shortly.
      </motion.div>
    )
  }

  return (
    <motion.form
      variants={sectionReveal}
      noValidate
      onSubmit={onSubmit}
      className="mx-auto mt-7 max-w-md"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          placeholder="Enter your email address"
          aria-label="Email address"
          aria-invalid={error ? 'true' : undefined}
          disabled={status === 'loading'}
          className="w-full rounded-full bg-white px-5 py-3 text-sm text-ink outline-none ring-orange transition placeholder:text-muted focus-visible:ring-2 disabled:opacity-70"
        />
        <PrimaryButton type="submit" disabled={status === 'loading'} className="shrink-0 px-7 py-3 disabled:opacity-70">
          {status === 'loading' ? 'Sending…' : 'Enquire Now'}
        </PrimaryButton>
      </div>
      {error && (
        <p className="mt-2 text-left text-xs font-medium text-white/90" role="alert">
          {error}
        </p>
      )}
    </motion.form>
  )
}

function Avatar({ src, className }) {
  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
      className={`rounded-full border-4 border-forest object-cover ${className}`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
    />
  )
}

export default function FinalCTA() {
  return (
    <section id="contact" className="scroll-mt-24 bg-cream pb-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal variant="sectionReveal" className="relative overflow-hidden rounded-4xl bg-forest px-6 py-14 text-center lg:py-20">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-forest-light/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-leaf/20 blur-2xl" />

          {/* decorative avatars — quiet fade entrance, no float */}
          <Avatar
            src="https://i.pravatar.cc/64?img=20"
            className="absolute left-3 top-6 h-10 w-10 sm:left-8 sm:top-10 sm:h-12 sm:w-12"
          />
          <Avatar
            src="https://i.pravatar.cc/64?img=8"
            className="absolute right-4 top-12 h-10 w-10 sm:right-10 sm:top-16 sm:h-12 sm:w-12"
          />
          <Avatar
            src="https://i.pravatar.cc/64?img=51"
            className="absolute bottom-6 left-6 h-10 w-10 sm:bottom-10 sm:left-14 sm:h-12 sm:w-12"
          />
          <Avatar
            src="https://i.pravatar.cc/64?img=33"
            className="absolute bottom-8 right-6 hidden h-12 w-12 sm:block"
          />

          <Stagger as="div" className="relative mx-auto max-w-xl" amount={0.2}>
            <motion.h2
              variants={sectionReveal}
              className="font-display text-3xl font-extrabold leading-tight text-white lg:text-4xl"
            >
              Navigate the Future of Dispatch with Confidence
            </motion.h2>
            <motion.p variants={sectionReveal} className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Take the first step toward a real career in logistics and transportation. Talk to our admissions team
              about onsite or online training — no prior experience required.
            </motion.p>

            <EnquiryForm />
          </Stagger>
        </Reveal>
      </div>
    </section>
  )
}
