import { useEffect, useState } from 'react'

// Choose a pose from where the pointer sits relative to the face.
export function pickDirection(px, py, rect) {
  const cx = rect.left + rect.width * 0.52
  const cy = rect.top + rect.height * 0.4
  const dx = px - cx
  const dy = py - cy
  const dead = Math.max(80, rect.height * 0.1)
  if (Math.hypot(dx, dy) < dead) return 'center'
  const a = (Math.atan2(dy, dx) * 180) / Math.PI // 0 right, 90 down, -90 up
  // Eight 45-degree sectors. "right" splits in two: far to the right turns the head fully.
  if (a > -22.5 && a <= 22.5) return dx > window.innerWidth * 0.28 ? 'exact-right' : 'right'
  if (a > 22.5 && a <= 67.5) return 'right-bottom'
  if (a > 67.5 && a <= 112.5) return 'bottom'
  if (a > 112.5 && a <= 157.5) return 'down'
  if (a > -67.5 && a <= -22.5) return 'up-right'
  if (a > -112.5 && a <= -67.5) return 'top'
  if (a > -157.5 && a <= -112.5) return 'up-left'
  return 'left'
}

export default function useFaceTracking(anchorRef, enabled = true) {
  const [dir, setDir] = useState('center')

  useEffect(() => {
    if (!enabled) {
      setDir('center')
      return undefined
    }

    let queued = false
    let x = 0
    let y = 0

    const onMove = (e) => {
      if (e.pointerType === 'touch' || window.scrollY > window.innerHeight * 1.1) return
      x = e.clientX
      y = e.clientY
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        const el = anchorRef.current
        if (el) setDir(pickDirection(x, y, el.getBoundingClientRect()))
      })
    }
    const onLeave = () => setDir('center')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [anchorRef, enabled])

  return dir
}
