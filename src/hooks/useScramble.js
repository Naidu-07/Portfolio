import { useEffect, useState } from 'react'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789<>/\\[]{}=+*#'
const KEEP = new Set([' ', ',', "'", '.'])

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
const scrambleAll = (text) => [...text].map((c) => (KEEP.has(c) ? c : randomGlyph())).join('')

// Decodes `text` out of random glyphs, left to right.
export default function useScramble(text, { delay = 0, duration = 900 } = {}) {
  const [out, setOut] = useState(() => scrambleAll(text))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return undefined
    }
    let raf = 0
    let start = 0
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now
        const p = Math.min(1, (now - start) / duration)
        const chars = [...text]
        const next = chars
          .map((c, i) => (KEEP.has(c) || i / chars.length < p ? c : randomGlyph()))
          .join('')
        setOut(next)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, delay, duration])

  return out
}
