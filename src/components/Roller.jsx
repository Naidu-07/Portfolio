import { useEffect, useState } from 'react'

// Cycles through roles. All roles share one grid cell so the width never jumps.
export default function Roller({ roles, interval = 2600 }) {
  const [state, setState] = useState({ cur: 0, prev: -1 })

  useEffect(() => {
    if (roles.length < 2) return undefined
    const id = setInterval(() => {
      setState((s) => ({ cur: (s.cur + 1) % roles.length, prev: s.cur }))
    }, interval)
    return () => clearInterval(id)
  }, [roles.length, interval])

  return (
    <span className="roller" aria-live="polite">
      {roles.map((role, i) => (
        <span
          key={role}
          className={`role${i === state.cur ? ' is-active' : ''}${i === state.prev ? ' is-leaving' : ''}`}
          aria-hidden={i !== state.cur}
        >
          {role}
        </span>
      ))}
    </span>
  )
}
