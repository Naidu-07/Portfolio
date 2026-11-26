import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'
import useScramble from '../hooks/useScramble.js'
import Nav from './Nav.jsx'
import Portrait from './Portrait.jsx'
import Roller from './Roller.jsx'
import SplitWords from './SplitWords.jsx'
import MagneticLink from './MagneticLink.jsx'
import MobileHero from './MobileHero.jsx'

const MOBILE_QUERY = '(max-width: 760px)'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false,
  )
  const heroRef = useRef(null)
  const greeting = useScramble(profile.greeting.toUpperCase(), { delay: 250, duration: 950 })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mql = window.matchMedia(MOBILE_QUERY)
    const sync = () => setIsMobile(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    window.addEventListener('resize', sync, { passive: true })
    return () => {
      mql.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  // Portrait drifts a few pixels with the desktop mouse pointer (CSS vars, no re-render).
  useEffect(() => {
    if (isMobile) return undefined
    const el = heroRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let queued = false
    let nx = 0
    let ny = 0
    const onMove = (e) => {
      if (e.pointerType === 'touch' || window.scrollY > window.innerHeight * 1.1) return
      nx = (e.clientX / window.innerWidth - 0.5) * 2
      ny = (e.clientY / window.innerHeight - 0.5) * 2
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        el.style.setProperty('--px', nx.toFixed(3))
        el.style.setProperty('--py', ny.toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [isMobile])

  return (
    <div id="home">
      <Nav items={profile.nav} />

      <section className="hero" ref={heroRef}>
        <Portrait name={profile.name} />

        <div className="copy">
          <p className="eyebrow" aria-label={profile.greeting}>
            <span aria-hidden="true">{greeting}</span>
          </p>

          <h1 className="name-wrap" aria-label={profile.name}>
            <span className="name" aria-hidden="true">
              {profile.name}
            </span>
            <svg className="swash" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="swashGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#ff7a2f" stopOpacity="0" />
                  <stop offset="0.25" stopColor="#ff7a2f" />
                  <stop offset="1" stopColor="#ff4d2e" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M4 16 C 70 3, 160 4, 250 11 S 350 17, 396 8"
                pathLength="1"
                fill="none"
                stroke="url(#swashGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h1>

          <p className="role-line">
            <span className="role-line__tick" aria-hidden="true" />
            <Roller roles={profile.roles} />
          </p>

          <SplitWords className="tagline" text={profile.tagline} delay={1.15} />

          <div className="actions">
            <MagneticLink href={profile.resumeUrl} variant="ghost">
              Resume <span aria-hidden="true">↗</span>
            </MagneticLink>
            <MagneticLink href={profile.ctaHref} variant="solid">
              {profile.ctaLabel}
            </MagneticLink>
          </div>
        </div>
      </section>

      <MobileHero />
    </div>
  )
}
