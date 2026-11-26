import { useEffect, useRef, useState } from 'react'

// Glass pill with a highlight that slides to the hovered or tapped link.
export default function Nav({ items }) {
  const [pill, setPill] = useState(null)
  const listRef = useRef(null)
  const clearTimer = useRef(0)

  useEffect(() => () => window.clearTimeout(clearTimer.current), [])

  const point = (e) => {
    window.clearTimeout(clearTimer.current)
    const el = e.currentTarget
    setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }

  const scheduleClear = () => {
    window.clearTimeout(clearTimer.current)
    clearTimer.current = window.setTimeout(() => setPill(null), 240)
  }

  return (
    <nav className="nav" aria-label="Primary" ref={listRef} onMouseLeave={() => setPill(null)}>
      <span
        className="nav__pill"
        aria-hidden="true"
        style={{
          opacity: pill ? 1 : 0,
          width: pill ? pill.width : 0,
          transform: `translateX(${pill ? pill.left : 0}px)`,
        }}
      />
      {items.map((item) => {
        const external = /^https?:\/\//i.test(item.href)
        return (
          <a
            key={item.label}
            href={item.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            onMouseEnter={point}
            onFocus={point}
            onTouchStart={point}
            onTouchEnd={scheduleClear}
            onTouchCancel={scheduleClear}
            onBlur={() => setPill(null)}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
