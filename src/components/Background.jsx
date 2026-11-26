import { useEffect, useRef } from 'react'

// Fixed, page-wide background: drifting red/orange glows, bright bokeh orbs and
// floating dust. It parallaxes with scroll and the pointer, and glows stronger
// once you leave the hero. Colours live in PALETTE.
const PALETTE = {
  top: '#0d122c',
  bottom: '#0a0c1f',
  glows: [
    [255, 64, 52],
    [255, 122, 47],
    [214, 40, 96],
    [255, 70, 110],
    [120, 70, 255],
  ],
  bokeh: [255, 58, 58],
  dust: [
    [255, 150, 100],
    [255, 95, 85],
    [205, 180, 255],
  ],
}

const rnd = (a, b) => a + Math.random() * (b - a)
const wrap = (v, size) => ((v % size) + size) % size

export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let glows = []
    let bokeh = []
    let dust = []
    let sy = window.scrollY
    let tsy = sy
    let mx = 0
    let my = 0
    let tmx = 0
    let tmy = 0
    let bgGrad = null
    let vigGrad = null
    const t0 = performance.now()

    const isVisibleArea = () => !document.hidden && tsy <= h + 40

    const init = () => {
      w = window.innerWidth
      h = window.innerHeight
      // Soft atmospheric glows look identical at 1x while cutting fill-rate on HiDPI screens.
      const dpr = 1
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      bgGrad = ctx.createLinearGradient(0, 0, 0, h)
      bgGrad.addColorStop(0, PALETTE.top)
      bgGrad.addColorStop(1, PALETTE.bottom)
      vigGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.8)
      vigGrad.addColorStop(0, 'rgba(5,6,16,0)')
      vigGrad.addColorStop(1, 'rgba(5,6,16,0.55)')
      const big = Math.max(w, h)
      glows = PALETTE.glows.map((c, i) => ({
        c,
        ax: rnd(0.05, 0.95),
        ay: rnd(0, 1.3),
        rx: rnd(0.04, 0.12),
        ry: rnd(0.03, 0.09),
        sp: rnd(0.05, 0.12),
        ph: rnd(0, 6.28),
        r: rnd(0.28, 0.5) * big,
        a: i < 2 ? rnd(0.2, 0.3) : rnd(0.12, 0.22),
        depth: rnd(0.08, 0.22),
      }))
      bokeh = Array.from({ length: 5 }, () => ({
        ax: rnd(0.05, 0.95),
        ay: rnd(0, 1.3),
        r: rnd(22, 64),
        sp: rnd(0.08, 0.2),
        ph: rnd(0, 6.28),
        depth: rnd(0.2, 0.6),
        a: rnd(0.55, 0.9),
      }))
      const count = w < 700 ? 60 : 130
      dust = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 1.4,
        r: rnd(0.5, 2.1),
        vx: rnd(-0.08, 0.08),
        vy: rnd(-0.22, -0.04),
        depth: rnd(0.05, 0.7),
        tw: rnd(0, 6.28),
        c: PALETTE.dust[Math.floor(Math.random() * PALETTE.dust.length)],
        a: rnd(0.2, 0.75),
      }))
    }

    const draw = (now) => {
      raf = 0
      if (!reduce && !isVisibleArea()) {
        sy = tsy
        return
      }
      const t = reduce ? 0 : (now - t0) / 1000
      sy += (tsy - sy) * 0.08
      mx += (tmx - mx) * 0.05
      my += (tmy - my) * 0.05
      const inten = 0.55 + 0.45 * Math.min(1, sy / h)
      const span = h * 1.4

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter'

      for (const o of glows) {
        const x = (o.ax + Math.sin(t * o.sp + o.ph) * o.rx) * w - mx * 40 * o.depth * 4
        const y = wrap((o.ay + Math.cos(t * o.sp * 1.3 + o.ph) * o.ry) * h - sy * o.depth, span) - h * 0.2
        const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r)
        const a = o.a * inten
        grad.addColorStop(0, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},${a})`)
        grad.addColorStop(0.55, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},${a * 0.35})`)
        grad.addColorStop(1, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(x - o.r, y - o.r, o.r * 2, o.r * 2)
      }

      for (const b of bokeh) {
        const pulse = 0.8 + 0.2 * Math.sin(t * b.sp * 4 + b.ph)
        const x = (b.ax + Math.sin(t * b.sp + b.ph) * 0.06) * w - mx * 60 * b.depth
        const y = wrap((b.ay + Math.cos(t * b.sp * 0.8 + b.ph) * 0.05) * h - sy * b.depth, span) - h * 0.2
        const r = b.r * pulse
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
        const a = b.a * (0.45 + 0.55 * inten)
        const c = PALETTE.bokeh
        grad.addColorStop(0, `rgba(255,150,140,${a})`)
        grad.addColorStop(0.25, `rgba(${c[0]},${c[1]},${c[2]},${a * 0.7})`)
        grad.addColorStop(0.6, `rgba(${c[0]},${c[1]},${c[2]},${a * 0.18})`)
        grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`)
        ctx.fillStyle = grad
        ctx.fillRect(x - r, y - r, r * 2, r * 2)
      }

      for (const d of dust) {
        if (!reduce) {
          d.x += d.vx
          d.y += d.vy
        }
        const x = wrap(d.x - mx * 30 * d.depth, w)
        const y = wrap(d.y - sy * d.depth, span) - h * 0.2
        const tw = 0.6 + 0.4 * Math.sin(t * 1.4 + d.tw)
        const a = d.a * tw * inten
        ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${a})`
        ctx.beginPath()
        ctx.arc(x, y, d.r, 0, 6.2832)
        ctx.fill()
        if (d.r > 1.4) {
          ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${a * 0.18})`
          ctx.beginPath()
          ctx.arc(x, y, d.r * 4, 0, 6.2832)
          ctx.fill()
        }
      }

      // vignette keeps the edges dark so text stays readable
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = vigGrad
      ctx.fillRect(0, 0, w, h)

      if (!reduce && isVisibleArea()) raf = requestAnimationFrame(draw)
    }

    const startIfNeeded = () => {
      if (!reduce && !raf && isVisibleArea()) {
        raf = requestAnimationFrame(draw)
      }
    }

    const mobileMql = window.matchMedia('(max-width: 760px), (hover: none), (pointer: coarse)')
    const onScroll = () => {
      tsy = window.scrollY
      startIfNeeded()
    }
    const onMove = (e) => {
      if (mobileMql.matches || e.pointerType === 'touch' || tsy > h + 40) return
      tmx = e.clientX / w - 0.5
      tmy = e.clientY / h - 0.5
    }
    const onVisibility = () => {
      if (isVisibleArea()) startIfNeeded()
    }
    const onResize = () => {
      init()
      if (reduce) draw(performance.now())
      else startIfNeeded()
      if (mobileMql.matches) {
        tmx = 0
        tmy = 0
      }
    }

    init()
    if (reduce) draw(performance.now())
    else startIfNeeded()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas className="bg" ref={ref} aria-hidden="true" />
}
