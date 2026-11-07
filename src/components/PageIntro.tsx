import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export function PageIntro({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string
  title: ReactNode
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <Link className="back-link" to="/">
          <Icon style={{ transform: 'rotate(180deg)' }} size={16} /> Início
        </Link>
        <div className="intro-grid">
          <div>
            <p className="eyebrow">
              <span /> {eyebrow}
            </p>
            <h1>{title}</h1>
            <div className="intro-description">{children}</div>
          </div>
          {aside && <div className="intro-aside">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
