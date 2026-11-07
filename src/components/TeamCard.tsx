import type { Teacher } from '../data/team'
import { subjectById } from '../data/subjects'
import { site } from '../config/site'
import { Icon } from './Icon'

export function TeamCard({ teacher }: { teacher: Teacher }) {
  const image = site.assets.teacherPortraits[teacher.id]
  return (
    <article className={`teacher-card tone-${teacher.color}`} id={teacher.id}>
      <div className="teacher-portrait">
        {image ? (
          <img
            src={image}
            alt={`Retrato de ${teacher.name}`}
            width="480"
            height="320"
            loading="lazy"
          />
        ) : (
          <>
            <div className="portrait-grid" />
            <span className="teacher-initials" aria-hidden="true">
              {teacher.initials}
            </span>
            <span className="portrait-label">CONHECIMENTO SE CONSTRÓI JUNTO</span>
            <svg viewBox="0 0 100 100" className="portrait-orbit" aria-hidden="true">
              <circle cx="50" cy="50" r="44" />
              <ellipse cx="50" cy="50" rx="44" ry="18" transform="rotate(-35 50 50)" />
            </svg>
          </>
        )}
      </div>
      <div className="teacher-info">
        <p className="eyebrow">{teacher.role}</p>
        <h2>{teacher.name}</h2>
        <div className="teacher-subjects">
          {teacher.areas.map((a) => (
            <span key={a.subject}>{subjectById(a.subject).name}</span>
          ))}
        </div>
        <details className="teacher-details">
          <summary>
            Explore os conteúdos <Icon name="plus" size={18} />
          </summary>
          <div>
            {teacher.areas.map((a) => (
              <section key={a.subject}>
                <h3>{subjectById(a.subject).name}</h3>
                <ul>
                  {a.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>
      </div>
    </article>
  )
}
