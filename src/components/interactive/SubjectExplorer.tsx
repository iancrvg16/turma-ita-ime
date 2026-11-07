import { useState, useSyncExternalStore } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { subjects } from '../../data/subjects'
import { teachers } from '../../data/team'
import type { SubjectId } from '../../data/team'
import { Icon } from '../Icon'
import { Tabs } from './Tabs'

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
const noSubscription = () => () => {}
export function SubjectExplorer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested: SubjectId =
    subjects.find((s) => s.id === searchParams.get('area'))?.id || 'fisica'
  // O HTML estático usa a área inicial. A URL é aplicada após a hidratação,
  // preservando links profundos sem divergências entre servidor e navegador.
  const selected = useSyncExternalStore(
    noSubscription,
    () => requested,
    (): SubjectId => 'fisica',
  )
  const setSelected = (value: SubjectId) =>
    setSearchParams({ area: value }, { replace: true, preventScrollReset: true })
  const [query, setQuery] = useState('')
  const subject = subjects.find((s) => s.id === selected)!
  const related = teachers.filter((t) => t.areas.some((a) => a.subject === selected))
  const topics = related.flatMap((t) =>
    t.areas
      .filter((a) => a.subject === selected)
      .flatMap((a) => a.topics.map((topic) => ({ topic, teacher: t }))),
  )
  const filtered = topics.filter((t) =>
    normalize(`${t.topic} ${t.teacher.name}`).includes(normalize(query)),
  )
  return (
    <div className="subject-explorer">
      <Tabs
        id="subjects"
        label="Escolha uma disciplina"
        className="subject-tabs"
        options={subjects.map((s) => ({
          value: s.id,
          label: (
            <>
              <span className={`subject-tab-symbol tone-${s.color}`} aria-hidden="true">
                {s.symbol}
              </span>
              {s.name}
              <Icon size={16} />
            </>
          ),
        }))}
        value={selected}
        onChange={(v) => {
          setSelected(v)
          setQuery('')
        }}
      />
      <div
        id="subjects-panel"
        className={`subject-panel tone-${subject.color}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`subjects-tab-${selected}`}
      >
        <div className="subject-panel-top">
          <div>
            <p className="eyebrow">MAPA DO CONHECIMENTO / {subject.name.toUpperCase()}</p>
            <h2>{subject.verb}</h2>
            <p>{subject.description}</p>
          </div>
          <span className="big-symbol" aria-hidden="true">
            {subject.symbol}
          </span>
        </div>
        <div className="subject-professors">
          <p className="eyebrow">QUEM CONSTRÓI ESSE CAMINHO</p>
          <div>
            {related.map((t) => (
              <Link to={`/equipe#${t.id}`} key={t.id}>
                <span className={`mini-avatar tone-${t.color}`} aria-hidden="true">
                  {t.initials}
                </span>
                <span>{t.name}</span>
                <Icon name="external" size={14} />
              </Link>
            ))}
          </div>
        </div>
        <div className="topic-header">
          <h3>Territórios para explorar</h3>
          <label className="search-field">
            <Icon name="search" size={17} />
            <span className="sr-only">Buscar conteúdo ou professor nesta disciplina</span>
            <input
              type="search"
              placeholder="Buscar conteúdo…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p className="sr-only" role="status">
          {filtered.length} conteúdos encontrados em {subject.name}.
        </p>
        <div className="topics-list">
          {filtered.map(({ topic, teacher }, i) => (
            <details key={`${selected}-${teacher.id}-${topic}`}>
              <summary>
                <span className="topic-number">{String(i + 1).padStart(2, '0')}</span>
                {topic}
                <Icon name="plus" size={17} />
              </summary>
              <p>
                Conteúdo de {subject.name} associado a{' '}
                <Link to={`/equipe#${teacher.id}`}>{teacher.name}</Link> no relatório da turma.
              </p>
            </details>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <p>Nenhum conteúdo encontrado. Tente outro termo.</p>
            <button className="text-link" onClick={() => setQuery('')}>
              Limpar busca <Icon name="reset" size={16} />
            </button>
          </div>
        )}
        {selected === 'ingles' && (
          <p className="editorial-note">
            O relatório informa a disciplina e o professor, sem detalhar tópicos de Inglês.
          </p>
        )}
        {selected === 'redacao' && (
          <p className="editorial-note">
            Os conteúdos indicam a associação registrada no relatório. A distribuição atual das
            atividades de Redação depende de confirmação da coordenação.
          </p>
        )}
      </div>
    </div>
  )
}
