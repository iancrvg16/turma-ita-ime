import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { SubjectExplorer } from '../components/interactive/SubjectExplorer'
import { Icon } from '../components/Icon'

export default function Subjects() {
  return (
    <>
      <PageIntro
        eyebrow="MAPA DO CONHECIMENTO"
        title={
          <>
            Tudo começa
            <br />
            com uma <span className="cyan-text">pergunta.</span>
          </>
        }
        aside={
          <div className="formula-art" aria-hidden="true">
            <span>ƒ(x)</span>
            <span>→</span>
            <span>H₂O</span>
          </div>
        }
      >
        <p>
          Explore as disciplinas, encontre conteúdos e conheça quem ajuda a transformar curiosidade
          em conhecimento.
        </p>
      </PageIntro>
      <section className="section-light content-section">
        <div className="container">
          <SubjectExplorer />
          <div className="explorer-bottom-note">
            <span>As áreas se encontram. Os caminhos se multiplicam.</span>
            <Link to="/laboratorio" className="text-link">
              Experimente no laboratório <Icon name="external" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
