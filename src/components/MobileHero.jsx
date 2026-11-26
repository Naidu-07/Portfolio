import { footerSection, profile } from '../data.js'

const CodeBracketsIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="8 7 3 12 8 17" />
    <polyline points="16 7 21 12 16 17" />
    <line x1="13.5" y1="5" x2="10.5" y2="19" />
  </svg>
)

const ReactMiniIcon = () => (
  <svg viewBox="0 0 128 128" width="26" height="26" aria-hidden="true">
    <g fill="#61DAFB">
      <circle cx="64" cy="64" r="11" />
      <ellipse cx="64" cy="64" rx="54" ry="20" fill="none" stroke="#61DAFB" strokeWidth="6" />
      <ellipse cx="64" cy="64" rx="54" ry="20" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="54" ry="20" fill="none" stroke="#61DAFB" strokeWidth="6" transform="rotate(120 64 64)" />
    </g>
  </svg>
)

const JsMiniIcon = () => (
  <svg viewBox="0 0 48 48" width="24" height="24" aria-hidden="true">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="none" stroke="#a7ef34" strokeWidth="2.5" />
    <text x="24" y="31" textAnchor="middle" fill="#a7ef34" fontSize="18" fontWeight="700" fontFamily="Outfit, sans-serif">
      JS
    </text>
  </svg>
)

const LeafMiniIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path fill="#69e845" d="M12 2.5C9 6.6 7.4 10.1 7.4 13.7c0 3.2 1.8 5.5 4 6.6v1.8h1.2v-1.8c2.2-1.1 4-3.4 4-6.6 0-3.6-1.6-7.1-4.6-11.2Z" />
    <path fill="#a7ef34" d="M12 3.2c0 5.4.1 11.4.2 16.5 2-1.1 3.5-3.1 3.5-6 0-3.2-1.3-6.6-3.7-10.5Z" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.72c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7.07c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.02c0-3.13-1.67-4.59-3.9-4.59-1.8 0-2.61 1-3.06 1.71V8.5H10.1c.04.96 0 11 0 11h3.38v-6.14c0-.33.02-.66.12-.89.26-.66.86-1.34 1.86-1.34 1.31 0 1.84 1 1.84 2.47V19.5h3.38v-6.48h-.24Z" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
)

const MOBILE_TAGLINE =
  'Bringing websites to life from pixel to database, crafting fluid front-end motion backed by seamless server logic.'

export default function MobileHero() {
  const base = import.meta.env.BASE_URL
  const githubHref = footerSection.socials.find((s) => s.id === 'github')?.href || '#'
  const linkedinHref = footerSection.socials.find((s) => s.id === 'linkedin')?.href || '#'
  const mailHref = `mailto:${footerSection.contact.email}`

  return (
    <section className="mhero">
      <div className="mhero__bg" aria-hidden="true">
        <div className="mhero__motes">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <span className="mhero__mark" aria-hidden="true">
        R<span>.</span>
      </span>

      <div className="mhero__stage">
        <div className="mhero__halo" aria-hidden="true" />
        <svg className="mhero__orbit" viewBox="0 0 360 320" fill="none" aria-hidden="true">
          <path
            d="M 250 118 C 350 176, 336 254, 152 272"
            stroke="url(#mheroOrbitGrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="mheroOrbitGrad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a7ef34" stopOpacity="0.8" />
              <stop offset="1" stopColor="#a7ef34" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="mhero__code-card" aria-hidden="true">
          <div className="mhero__code-head">
            <span className="dot dot--r" />
            <span className="dot dot--y" />
            <span className="dot dot--g" />
            <span className="mhero__code-tag">
              <CodeBracketsIcon />
            </span>
          </div>
          <pre className="mhero__code-body">
            <code>
              <span className="c-kw">const</span> <span className="c-var">Ranga</span> = {'{\n'}
              {'  '}role: <span className="c-str">&apos;Full Stack&apos;</span>,{'\n'}
              {'  '}stack: [<span className="c-str">&apos;React&apos;</span>, <span className="c-str">&apos;Node&apos;</span>,{'\n'}
              {'          '}<span className="c-str">&apos;Express&apos;</span>, <span className="c-str">&apos;MongoDB&apos;</span>],{'\n'}
              {'  '}passion: <span className="c-str">&apos;Build &amp; Design&apos;</span>{'\n'}
              {'};'}
            </code>
          </pre>
        </div>

        <div className="mhero__tech-stack" aria-hidden="true">
          <div className="mhero__tech-tile">
            <ReactMiniIcon />
          </div>
          <div className="mhero__tech-tile">
            <JsMiniIcon />
          </div>
          <div className="mhero__tech-tile">
            <LeafMiniIcon />
          </div>
        </div>

        <img
          className="mhero__portrait"
          src={`${base}images/mobile-hero-portrait.png`}
          alt={`Portrait of ${profile.name}`}
          draggable="false"
          decoding="async"
        />
      </div>

      <div className="mhero__copy">
        <p className="mhero__eyebrow">{profile.greeting.toUpperCase()}</p>

        <h1 className="mhero__name-wrap" aria-label={profile.name}>
          <span className="mhero__name" aria-hidden="true">
            {profile.name}
          </span>
          <svg className="mhero__swash" viewBox="0 0 320 22" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="mheroSwashGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#a7ef34" stopOpacity="0.15" />
                <stop offset="0.3" stopColor="#a7ef34" />
                <stop offset="1" stopColor="#5ce63a" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M6 16 C 85 4, 185 4, 314 11"
              pathLength="1"
              fill="none"
              stroke="url(#mheroSwashGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </h1>

        <p className="mhero__role">
          Full Stack <span>Developer</span>
          <span className="mhero__caret" aria-hidden="true" />
        </p>

        <p className="mhero__tagline">{MOBILE_TAGLINE}</p>

        <div className="mhero__actions">
          <a className="mhero__btn mhero__btn--primary" href="#work">
            Explore Work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="mhero__btn mhero__btn--ghost"
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="mhero__socials">
          <a
            className="mhero__social"
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            className="mhero__social"
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a className="mhero__social" href={mailHref} aria-label="Email">
            <MailIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
