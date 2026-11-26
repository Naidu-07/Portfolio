const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6" />
    <path d="M10 14 20 4" />
    <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
  </svg>
)

function resolveProjectHref(rawPath) {
  const trimmed = typeof rawPath === 'string' ? rawPath.trim() : ''
  if (!trimmed) return ''

  if (/^(https?:\/\/|mailto:|tel:|#)/i.test(trimmed)) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/'
    return `${base}${trimmed.slice(1)}`
  }

  return trimmed
}

function ViewProjectButton({ href, title }) {
  if (href) {
    const isHashLink = href.startsWith('#')
    return (
      <a
        className="card__btn card__btn--live"
        href={href}
        target={isHashLink ? undefined : '_blank'}
        rel={isHashLink ? undefined : 'noopener noreferrer'}
      >
        <span>View Project</span>
        <ExternalLinkIcon />
      </a>
    )
  }

  return (
    <button
      type="button"
      className="card__btn card__btn--live is-pending"
      disabled
      title={`Add path for ${title} in src/data.js`}
    >
      <span>View Project</span>
      <ExternalLinkIcon />
    </button>
  )
}

export default function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0')
  const dir = index % 2 === 0 ? -1 : 1
  const projectHref = resolveProjectHref(project.path || project.liveUrl || project.demo)

  return (
    <article
      className="card"
      style={{
        '--c': project.accent,
        '--i': index,
        '--dir': dir,
      }}
    >
      <div className="card__shell">
        <span className="card__border" aria-hidden="true" />

        <div className="card__media">
          {project.image ? (
            <img className="card__image" src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" />
          ) : (
            <div className="card__fallback">
              <span className="card__kicker">{project.kicker}</span>
              <span className="card__num" aria-hidden="true">
                {num}
              </span>
            </div>
          )}
        </div>

        <div className="card__drawer">
          <h3 className="card__drawer-title">{project.title}</h3>
          <div className="card__drawer-actions">
            <ViewProjectButton href={projectHref} title={project.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
