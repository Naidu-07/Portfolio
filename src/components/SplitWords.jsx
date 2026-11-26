// Words rise in one by one with a blur-to-sharp reveal.
export default function SplitWords({ text, className = '', delay = 0, step = 0.045 }) {
  return (
    <p className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word"
          aria-hidden="true"
          style={{ animationDelay: `${delay + i * step}s` }}
        >
          {word}
        </span>
      ))}
    </p>
  )
}
