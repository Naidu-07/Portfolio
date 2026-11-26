import { useCallback, useEffect, useRef, useState } from 'react'
import { projects, projectsSection } from '../data.js'
import { SylvaLivingWorldScene } from '../shaders/sylva-living-world/SylvaLivingWorldScene.tsx'
import '../shaders/threeui.css'
import ProjectCard from './ProjectCard.jsx'

// Matches SCAN_DUR (3.4s) + 2-frame build kick-off in inner-green-3d.html
const BG_ANIMATION_MS = 3500

export default function Projects() {
  const reduced =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  const [inView, setInView] = useState(reduced)
  const [revealed, setRevealed] = useState(reduced)
  const [activeSlide, setActiveSlide] = useState(0)
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const timelineRef = useRef(null)

  const scrollToSlide = useCallback((index) => {
    const track = timelineRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(projects.length - 1, index))
    const rows = track.querySelectorAll('.projects__row')
    const target = rows[clamped]
    if (!target) return
    const left = target.offsetLeft - (track.clientWidth - target.clientWidth) / 2
    track.scrollTo({
      left: Math.max(0, left),
      behavior: reduced ? 'auto' : 'smooth',
    })
    setActiveSlide(clamped)
  }, [reduced])

  useEffect(() => {
    const track = timelineRef.current
    if (!track) return undefined

    let raf = 0
    const syncActiveFromScroll = () => {
      raf = 0
      const rows = track.querySelectorAll('.projects__row')
      if (!rows.length) return
      const center = track.scrollLeft + track.clientWidth / 2
      let bestIndex = 0
      let bestDist = Infinity
      rows.forEach((row, i) => {
        const rowCenter = row.offsetLeft + row.clientWidth / 2
        const dist = Math.abs(rowCenter - center)
        if (dist < bestDist) {
          bestDist = dist
          bestIndex = i
        }
      })
      setActiveSlide(bestIndex)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(syncActiveFromScroll)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (inView) return undefined
    const el = sectionRef.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.03, rootMargin: '0px 0px -4% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  // Reveal the timeline & 4 project cards once the background scan-light animation finishes.
  useEffect(() => {
    if (!inView || revealed) return undefined
    const sceneEl = bgRef.current?.querySelector('.sylva-living-world-scene')
    let revealTimer = 0
    let fallbackTimer = 0

    const scheduleReveal = () => {
      if (revealTimer) return
      window.clearTimeout(fallbackTimer)
      revealTimer = window.setTimeout(() => setRevealed(true), BG_ANIMATION_MS)
    }

    if (sceneEl?.getAttribute('data-state') === 'ready') {
      scheduleReveal()
      return () => window.clearTimeout(revealTimer)
    }

    let mo = null
    if (sceneEl && typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver(() => {
        if (sceneEl.getAttribute('data-state') === 'ready') {
          mo.disconnect()
          scheduleReveal()
        }
      })
      mo.observe(sceneEl, { attributes: true, attributeFilter: ['data-state'] })
    }

    // Safety fallback so cards never stay hidden if iframe load stalls
    fallbackTimer = window.setTimeout(() => setRevealed(true), BG_ANIMATION_MS + 1800)

    return () => {
      mo?.disconnect()
      window.clearTimeout(revealTimer)
      window.clearTimeout(fallbackTimer)
    }
  }, [inView, revealed])

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`projects${inView ? ' is-in' : ''}${revealed ? ' is-revealed' : ''}`}
    >
      <div className="projects__bg" ref={bgRef} aria-hidden="true">
        <div className="projects__bg-base" />
        <div className="shader-frame projects__shader">
          <SylvaLivingWorldScene variant="living-green" />
        </div>
        <div className="projects__bg-tint" />
      </div>

      <div className="projects__stage">
        <div className="projects__intro">
          <header className="projects__head">
            <p className="projects__eyebrow">{projectsSection.eyebrow}</p>
            <h2 className="projects__title" aria-label={projectsSection.title}>
              {[...projectsSection.title].map((ch, i) => (
                <span key={i} className="ch" aria-hidden="true" style={{ '--i': i }}>
                  {ch}
                </span>
              ))}
            </h2>
            <span className="projects__rule" aria-hidden="true" />
          </header>

          <p className="projects__lede">A collection of web experiences I&apos;ve designed and developed.</p>
        </div>

        <div className="projects__slider-wrap">
          <div className="projects__timeline" ref={timelineRef} style={{ '--count': projects.length }}>
            <span className="projects__rail" aria-hidden="true" />
            {projects.map((project, i) => (
              <div className="projects__row" key={project.id} style={{ '--i': i }}>
                <span className="projects__dot" aria-hidden="true" />
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>

          <div className="projects__slider-controls" aria-label="Project slider controls">
            <div className="projects__slider-dots" role="tablist" aria-label="Choose project slide">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === i}
                  aria-label={`Show ${project.title}`}
                  className={`projects__slider-dot${activeSlide === i ? ' is-active' : ''}`}
                  onClick={() => scrollToSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
