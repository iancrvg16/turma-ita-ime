import { useState } from 'react'
import { milestones } from '../../data/institutions'
import { Icon } from '../Icon'

export function Timeline() {
  const [filter, setFilter] = useState<'all' | 'ita' | 'ime'>('all')
  const [year, setYear] = useState('1950')
  const visible = milestones.filter(
    (m) => filter === 'all' || m.institution === filter || m.institution === 'both',
  )
  const selected = visible.find((m) => m.year === year) || visible[0]
  return (
    <div className="timeline">
      <div className="timeline-toolbar">
        <p>Selecione um marco para descobrir a história.</p>
        <div className="filter-group" role="group" aria-label="Filtrar trajetória">
          {(
            [
              { id: 'all', name: 'Os dois caminhos' },
              { id: 'ita', name: 'ITA' },
              { id: 'ime', name: 'IME' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="timeline-track" role="group" aria-label="Marcos históricos">
        <span
          className="timeline-progress"
          style={{
            width: `${(visible.findIndex((m) => m.year === selected.year) / visible.length) * 100}%`,
          }}
          aria-hidden="true"
        />
        {visible.map((m) => (
          <button
            key={m.year}
            onClick={() => setYear(m.year)}
            className={selected.year === m.year ? 'selected' : ''}
            aria-pressed={selected.year === m.year}
          >
            <span className="timeline-point" />
            <span className="timeline-year">{m.year}</span>
            <span className="timeline-tag">
              {m.institution === 'both' ? 'ITA + IME' : m.institution.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
      <div className="timeline-story" aria-live="polite" aria-atomic="true">
        <span className="story-year" aria-hidden="true">
          {selected.year}
        </span>
        <div key={selected.year}>
          <p className="eyebrow">{selected.tag}</p>
          <h3>{selected.title}</h3>
          <p>{selected.text}</p>
          <a className="source-link" href={selected.source.url} target="_blank" rel="noreferrer">
            Fonte: {selected.source.title} <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
