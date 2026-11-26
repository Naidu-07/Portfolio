import { useRef } from 'react'

// Button that leans toward the mouse pointer on desktop.
export default function MagneticLink({ href, variant = 'ghost', children }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.28
    const y = (e.clientY - r.top - r.height / 2) * 0.4
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const external = typeof href === 'string' && /^https?:\/\//i.test(href)

  return (
    <a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`btn btn--${variant}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="btn__label">{children}</span>
    </a>
  )
}
