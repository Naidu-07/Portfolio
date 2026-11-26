import { useEffect, useRef, useState } from 'react'
import { footerSection } from '../data.js'

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="8 7 3 12 8 17" />
    <polyline points="16 7 21 12 16 17" />
    <line x1="13.5" y1="5" x2="10.5" y2="19" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 3.5 10.5 8 6 12.5" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
)

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.8" />
  </svg>
)

function SocialIcon({ id }) {
  switch (id) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7.07c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.02c0-3.13-1.67-4.59-3.9-4.59-1.8 0-2.61 1-3.06 1.71V8.5H10.1c.04.96 0 11 0 11h3.38v-6.14c0-.33.02-.66.12-.89.26-.66.86-1.34 1.86-1.34 1.31 0 1.84 1 1.84 2.47V19.5h3.38v-6.48h-.24Z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.11c-.24.69-1.42 1.31-1.97 1.39-.51.07-1.15.11-1.85-.12-.43-.14-.98-.32-1.69-.63-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.84 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.61.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.07.12.07.72-.17 1.41Z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Footer() {
  const [inView, setInView] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  )
  const footerRef = useRef(null)

  useEffect(() => {
    if (inView) return undefined
    const el = footerRef.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  return (
    <footer className={`footer${inView ? ' is-in' : ''}`} ref={footerRef}>
      <div className="footer__bg" aria-hidden="true">
        <div className="footer__bg-base" />
        <div className="footer__leaves-wrap">
          <img className="footer__leaves" src={footerSection.leavesImage} alt="" decoding="async" />
        </div>
        <div className="footer__bg-bridge" />
      </div>

      <div className="footer__inner">
        <a className="footer__brand" href={footerSection.homeHref}>
          <span className="footer__logo-box" aria-hidden="true">
            <CodeIcon />
          </span>
          <div className="footer__brand-copy">
            <h3 className="footer__name">
              {footerSection.firstName} <span>{footerSection.lastName}</span>
            </h3>
            <p className="footer__subtitle">{footerSection.subtitle}</p>
          </div>
        </a>

        <span className="footer__divider" aria-hidden="true" />

        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            {footerSection.quickLinks.map((link) => {
              const external = /^https?:\/\//i.test(link.href)
              return (
                <li key={link.label}>
                  <a
                    className="footer__link"
                    href={link.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    <span className="footer__chev" aria-hidden="true">
                      <ChevronIcon />
                    </span>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <span className="footer__divider" aria-hidden="true" />

        <div className="footer__col">
          <h4 className="footer__heading">Get in Touch</h4>
          <ul className="footer__list footer__list--contact">
            <li>
              <a className="footer__link" href={`mailto:${footerSection.contact.email}`}>
                <span className="footer__icon" aria-hidden="true">
                  <MailIcon />
                </span>
                {footerSection.contact.email}
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href={footerSection.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer__icon" aria-hidden="true">
                  <PhoneIcon />
                </span>
                {footerSection.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href={footerSection.contact.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer__icon" aria-hidden="true">
                  <PinIcon />
                </span>
                {footerSection.contact.location}
              </a>
            </li>
          </ul>
        </div>

        <span className="footer__divider" aria-hidden="true" />

        <div className="footer__col">
          <h4 className="footer__heading">Connect</h4>
          <div className="footer__socials">
            {footerSection.socials.map((item) => (
              <a
                key={item.id}
                className="footer__social-btn"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
              >
                <SocialIcon id={item.id} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
