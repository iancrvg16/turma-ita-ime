import { useState } from 'react'
import { PageIntro } from '../components/PageIntro'
import { TeamCard } from '../components/TeamCard'
import { JoinBanner } from '../components/JoinBanner'
import { teachers } from '../data/team'
import type { SubjectId } from '../data/team'
import { subjects } from '../data/subjects'

export default function Team() {
  const [filter, setFilter] = useState<SubjectId | 'all'>('all')
  const visible = teachers.filter(
    (t) => filter === 'all' || t.areas.some((a) => a.subject === filter),
  )
  return (
    <>
      <PageIntro
        eyebrow="PESSOAS QUE SOMAM"
        title={
          <>
            Conhecimento
            <br />
            tem <span className="cyan-text">muitas vozes.</span>
          </>
        }
      >
        <p>
          Gente que compartilha ideias, acolhe perguntas e constrói caminhos com você. Conheça a
          equipe da nossa turma.
        </p>
      </PageIntro>
      <section className="section-light content-section">
        <div className="container">
          <div className="team-filter">
            <label htmlFor="team-area">Explore por área</label>
            <select
              id="team-area"
              value={filter}
              onChange={(e) => setFilter(e.target.value as SubjectId | 'all')}
            >
              <option value="all">Toda a equipe</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <span aria-live="polite">
              {visible.length} {visible.length === 1 ? 'pessoa' : 'pessoas'} para conhecer
            </span>
          </div>
          <div className="team-grid">
            {visible.map((t) => (
              <TeamCard key={t.id} teacher={t} />
            ))}
          </div>
          <p className="editorial-note">
            Os elementos com iniciais são ilustrações provisórias, sem representação fotográfica dos
            professores. Nomes e conteúdos seguem a lista fornecida para o projeto e estão sujeitos
            à revisão editorial da coordenação.
          </p>
        </div>
      </section>
      <JoinBanner />
    </>
  )
}
