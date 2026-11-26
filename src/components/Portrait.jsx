import { useEffect, useRef, useState } from 'react'
import useFaceTracking from '../hooks/useFaceTracking.js'
import { poses } from '../data.js'

const MOBILE_QUERY = '(max-width: 760px)'

// All poses stay mounted on desktop so switching never waits on a download.
// Hidden/unmounted on mobile screens so Hero shows text only.
export default function Portrait({ name }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false,
  )
  const anchor = useRef(null)
  const dir = useFaceTracking(anchor, !isMobile)
  const [prev, setPrev] = useState(null)
  const last = useRef('center')

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

  useEffect(() => {
    if (isMobile || last.current === dir) return undefined
    setPrev(last.current)
    last.current = dir
    const t = setTimeout(() => setPrev(null), 240)
    return () => clearTimeout(t)
  }, [dir, isMobile])

  if (isMobile) return null

  return (
    <div className="stage">
      <div className="portrait" ref={anchor}>
        {Object.entries(poses).map(([key, src]) => (
          <img
            key={key}
            className={`face${key === dir ? ' on' : ''}${key === prev ? ' off' : ''}`}
            style={{ zIndex: key === dir ? 2 : key === prev ? 1 : 0 }}
            src={src}
            alt={key === 'center' ? `Portrait of ${name}` : ''}
            aria-hidden={key === 'center' ? undefined : true}
            draggable="false"
            decoding="async"
          />
        ))}
      </div>
    </div>
  )
}
