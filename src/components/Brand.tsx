import { Link } from 'react-router-dom'

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${footer ? 'brand-footer' : ''}`}
      aria-label="ITA/IME. PIRAMBU INNOVATION — página inicial"
    >
      <svg viewBox="0 0 42 44" width="36" height="38" fill="none" aria-hidden="true">
        <path d="m3 32 18-30 18 30H28L21 20l-7 12Z" fill="currentColor" />
        <path d="M17 39h8" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span>
        <strong>
          ITA<span className="brand-slash">/</span>IME<span className="brand-dot">.</span>
        </strong>
        <small>PIRAMBU INNOVATION</small>
      </span>
    </Link>
  )
}
