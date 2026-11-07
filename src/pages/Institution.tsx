import { Link } from 'react-router-dom'
import { Aircraft, Structure } from '../components/Artwork'
import { Icon } from '../components/Icon'
import { PageIntro } from '../components/PageIntro'
import { Reveal } from '../components/Reveal'
import { Timeline } from '../components/interactive/Timeline'
import { SchoolCompare } from '../components/interactive/SchoolCompare'
import { JoinBanner } from '../components/JoinBanner'
import { institutions } from '../data/institutions'
import type { InstitutionId } from '../data/institutions'

export default function Institution({ id }: { id: InstitutionId }) {
  const school = institutions[id]
  return (
    <div className={`institution-page institution-${id}`}>
      <PageIntro
        eyebrow={`EXPLORE / ${school.short}`}
        title={
          <>
            {school.short}
            <span className="cyan-text">.</span>
            <span className="institution-intro-name">{school.name}</span>
          </>
        }
        aside={id === 'ita' ? <Aircraft compact /> : <Structure />}
      >
        <p>{school.description}</p>
        <div className="institution-switch">
          <Link to="/ita" aria-current={id === 'ita' ? 'page' : undefined}>
            Conheça o ITA
          </Link>
          <Link to="/ime" aria-current={id === 'ime' ? 'page' : undefined}>
            Conheça o IME
          </Link>
        </div>
      </PageIntro>
      <section className="section-light content-section">
        <div className="container">
          <Reveal>
            <div className="editorial-grid">
              <p className="eyebrow">CIÊNCIA QUE CONSTRÓI O FUTURO</p>
              <div>
                <h2>{school.line}</h2>
                <p className="large-copy">{school.mission}</p>
                <p>{school.history}</p>
                <div className="institution-fact-row">
                  <div>
                    <span className="eyebrow">LOCALIZAÇÃO</span>
                    <strong>
                      <Icon name="pin" />
                      {school.location}
                    </strong>
                  </div>
                  <div>
                    <span className="eyebrow">VINCULAÇÃO</span>
                    <strong>{school.affiliation}</strong>
                  </div>
                </div>
                <a className="text-link" href={school.link} target="_blank" rel="noreferrer">
                  Visite o site oficial do {school.short} <Icon name="external" />
                </a>
                <p className="editorial-note">
                  Informação institucional. Este site apresenta a turma preparatória do Pirambu
                  Innovation e não é um portal oficial do {school.short}.
                </p>
              </div>
            </div>
          </Reveal>
          <aside className="curiosity">
            <Icon name="spark" size={32} />
            <div>
              <p className="eyebrow">UMA CONEXÃO PARA DESCOBRIR</p>
              <p>{school.curiosity}</p>
            </div>
          </aside>
        </div>
      </section>
      <section className="history-section">
        <div className="container">
          <p className="eyebrow">UMA HISTÓRIA, DOIS CAMINHOS</p>
          <h2>
            O futuro tem
            <br />
            uma história<span className="cyan-text">.</span>
          </h2>
          <Timeline />
          <div className="sources-list">
            <p className="eyebrow">CONTINUE A INVESTIGAÇÃO / FONTES INSTITUCIONAIS</p>
            {school.sources.map((source) => (
              <a href={source.url} key={source.url} target="_blank" rel="noreferrer">
                {source.title}
                <Icon name="external" size={15} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="compare-section">
        <div className="container">
          <div className="section-heading">
            <h2>Explore os dois horizontes.</h2>
            <p>
              Trajetórias diferentes, um interesse em comum: a construção do conhecimento em
              engenharia.
            </p>
          </div>
          <SchoolCompare key={id} initial={id} />
        </div>
      </section>
      <JoinBanner />
    </div>
  )
}
