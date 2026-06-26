import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const VideoModalContext = createContext(null)

export function useVideoModal() {
  const ctx = useContext(VideoModalContext)
  if (!ctx) return { open: () => {} }
  return ctx
}

export function VideoModalProvider({ children }) {
  const [src, setSrc] = useState(null)
  const open = useCallback((url) => setSrc(url || null), [])
  const close = useCallback(() => setSrc(null), [])
  const isOpen = src !== null

  return (
    <VideoModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <VideoModal src={src} onClose={close} />
    </VideoModalContext.Provider>
  )
}

function VideoModal({ src, onClose }) {
  const videoRef = useRef(null)
  const closeBtnRef = useRef(null)
  const open = src !== null

  // Lock background scroll + ESC to close + move focus to close button.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const t = setTimeout(() => closeBtnRef.current?.focus(), 30)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
      // pause + reset the video when the modal closes
      const v = videoRef.current
      if (v) {
        try {
          v.pause()
          v.currentTime = 0
        } catch {
          /* noop */
        }
      }
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {src && (
              <video
                ref={videoRef}
                src={src}
                className="aspect-video w-full bg-black"
                controls
                autoPlay
                playsInline
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
