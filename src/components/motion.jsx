// Premium motion system for Master Pro.
// Language: opacity + small translation only. No visible scale reveals, no bounce,
// no springs, no theatrical stagger. Hover = depth (lift + shadow), never size.
// Respects reduced motion globally via <MotionConfig reducedMotion="user"> in App.

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Robust scroll reveal. Uses IntersectionObserver to fire when the element enters the
// viewport, plus a scroll/resize fallback that reveals anything already scrolled past —
// so no scroll speed, jump, or mid-page reload can leave content stuck hidden.
function useReveal(amount = 0.15) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let done = false
    const vh = () => window.innerHeight || document.documentElement.clientHeight
    const reveal = () => {
      if (done) return
      done = true
      setShown(true)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      if (r.top < vh() * (1 - amount) && r.bottom > 0) reveal()
      else if (r.bottom <= 0) reveal() // already scrolled past — never leave hidden
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal()),
      { threshold: amount }
    )
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll() // initial check for already-in-view / restored scroll position
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [amount])
  return [ref, shown]
}

// Controlled ease-out cubic — smooth, modern, no overshoot.
export const EASE = [0.33, 1, 0.68, 1]
export const DURATION = 0.78
export const DURATION_TIGHT = 0.6

/* ---------------- Variants ---------------- */

// A) Standard section reveal — default for headings, paragraphs, content blocks.
export const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
}

// B) Tight reveal — badges, small labels, subheadings, compact blocks.
export const sectionRevealTight = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION_TIGHT, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION, ease: EASE } },
}

// C) Split layout reveals — the two sides enter with different, calm offsets.
export const splitRevealLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
}

export const splitRevealRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
}

// D) Stagger container — clear but quick cadence.
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// E) Heading mask reveal — unveils the heading left-to-right (clip-path) with a tiny rise.
export const maskReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0, y: 6 },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

// Back-compat aliases (older call sites).
export const fadeUp = sectionReveal
export const fadeLeft = splitRevealLeft
export const fadeRight = splitRevealRight

const VARIANTS = {
  sectionReveal,
  sectionRevealTight,
  fadeIn,
  splitRevealLeft,
  splitRevealRight,
  staggerItem,
  // aliases
  fadeUp: sectionReveal,
  fadeLeft: splitRevealLeft,
  fadeRight: splitRevealRight,
}

// On reduced motion, collapse movement to a quiet opacity fade.
function useResolved(variant) {
  const reduce = useReducedMotion()
  if (!reduce) return variant
  return { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
}

/* ---------------- Components ---------------- */

// Single element reveal on scroll-into-view (once).
// Ref-based useInView is deterministic — it won't leave content stuck hidden the way
// the whileInView prop can under fast scroll / StrictMode double-mount.
export function Reveal({
  as = 'div',
  variant = 'sectionReveal',
  delay = 0,
  amount = 0.15,
  className = '',
  children,
  ...props
}) {
  const [ref, shown] = useReveal(amount)
  const v = useResolved(VARIANTS[variant] || sectionReveal)
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={v}
      initial="hidden"
      animate={shown ? 'show' : 'hidden'}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

// Container that staggers its <StaggerItem> children when scrolled into view.
export function Stagger({ as = 'div', className = '', amount = 0.15, children, ...props }) {
  const [ref, shown] = useReveal(amount)
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={reduce ? fadeIn : staggerContainer}
      initial="hidden"
      animate={shown ? 'show' : 'hidden'}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({ as = 'div', variant = 'staggerItem', className = '', children, ...props }) {
  const v = useResolved(VARIANTS[variant] || staggerItem)
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag className={className} variants={v} {...props}>
      {children}
    </MotionTag>
  )
}

// Heading reveal: unveils left-to-right via clip-path on scroll-into-view.
// Falls back to a quiet fade on reduced motion.
export function MaskReveal({ as = 'h2', className = '', amount = 0.12, children, ...props }) {
  const [ref, shown] = useReveal(amount)
  const reduce = useReducedMotion()
  const v = reduce ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } } : maskReveal
  const MotionTag = motion[as] || motion.h2
  return (
    <MotionTag ref={ref} className={className} variants={v} initial="hidden" animate={shown ? 'show' : 'hidden'} {...props}>
      {children}
    </MotionTag>
  )
}

// Extremely restrained idle drift for ONE tiny supporting badge only.
// Disabled entirely on reduced motion.
export function SubtleBadgeFloat({ className = '', range = 3, duration = 6, children, ...props }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -range, 0] }}
      transition={reduce ? undefined : { duration, ease: 'easeInOut', repeat: Infinity }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* ---------------- Hover presets (Tailwind, GPU-friendly) ---------------- */

// Unified premium card hover (iDemy language): lift + soft peach tint + solid dark-green
// offset shadow. `group` lets inner CTAs react via ctaFill. Gains depth + warmth, not size.
export const cardHover =
  'group transition-[transform,box-shadow,background-color] duration-300 ease-out will-change-transform ' +
  'hover:-translate-y-1 hover:bg-peach/70 hover:shadow-[8px_10px_0_0_theme(colors.forest.DEFAULT)]'

// Pastel category card hover — same solid dark-green offset shadow + small lift (no tint).
export const categoryHover =
  'group transition-[transform,box-shadow] duration-300 ease-out will-change-transform ' +
  'hover:-translate-y-1 hover:shadow-[8px_10px_0_0_theme(colors.forest.DEFAULT)]'

// Smaller solid-green offset shadow for compact boxes (stat pills, etc.).
export const offsetShadowHover =
  'transition-[transform,box-shadow] duration-300 ease-out will-change-transform ' +
  'hover:-translate-y-1 hover:shadow-[5px_6px_0_0_theme(colors.forest.DEFAULT)]'

// Inner outlined CTA that fills orange when its parent card (group) is hovered.
export const ctaFill =
  'transition-colors duration-300 ease-out group-hover:border-orange group-hover:bg-orange group-hover:text-white'

// Compact variant for chips / small interactive blocks.
export const liftHover = 'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5'

export { motion }
