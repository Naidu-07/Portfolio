import { useEffect, useRef } from 'react'

const DISABLE_QUERY = '(max-width: 760px), (hover: none), (pointer: coarse)'

// Trailing ring that grows over links on desktop. Disabled on mobile/touch screens.
export default function Cursor() {
  const ring = useRef(null)

  useEffect(() => {
    const el = ring.current
    if (!el) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const disableMql = window.matchMedia(DISABLE_QUERY)
    let disabled = disableMql.matches
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let seen = false
    let raf = 0

    const loop = () => {
      raf = 0
      if (disabled) return
      const dx = tx - x
      const dy = ty - y
      if (reduce || (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1)) {
        x = tx
        y = ty
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        return
      }
      x += dx * 0.2
      y += dy * 0.2
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (!raf && !disabled) raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      if (disabled || e.pointerType === 'touch') return
      tx = e.clientX
      ty = e.clientY
      if (!seen) {
        seen = true
        x = tx
        y = ty
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        el.classList.add('seen')
      } else {
        wake()
      }
      el.classList.toggle('hot', Boolean(e.target.closest && e.target.closest('a')))
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = 0
      seen = false
      el.classList.remove('seen', 'hot')
    }

    const onMediaChange = () => {
      disabled = disableMql.matches
      if (disabled) onLeave()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    disableMql.addEventListener('change', onMediaChange)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      disableMql.removeEventListener('change', onMediaChange)
    }
  }, [])

  return <div className="ring" ref={ring} aria-hidden="true" />
}
