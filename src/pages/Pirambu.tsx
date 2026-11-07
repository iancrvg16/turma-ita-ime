import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { OrbitMark } from '../components/Artwork'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { JoinBanner } from '../components/JoinBanner'
import { sources } from '../data/institutions'
import { site } from '../config/site'

export default function Pirambu() {
  return (
    <>
      <PageIntro
        eyebrow="PIRAMBU INNOVATION"
        title={
          <>
            O futuro também
            <br />
            nasce <span className="cyan-text">aqui.</span>
          </>
        }
        aside={<OrbitMark />}
      >
        <p>
          Da comunidade do Pirambu, em Fortaleza, uma ideia que conecta juventude, conhecimento e
          novas oportunidades.
        </p>
      </PageIntro>
      <section className="section-light content-section">
        <div className="container">
          <div className="editorial-grid">
            <p className="eyebrow">TECNOLOGIA COM PROPÓSITO</p>
            <div>
              <h2>
                Conhecer. Criar.
                <br />
                Transformar.
              </h2>
              <p className="large-copy">
                O Pirambu Innovation aproxima tecnologia, educação e inclusão. Sua história se
                conecta à experiência do Pirambu Digital, uma iniciativa surgida na comunidade do
                Pirambu.
              </p>
              <p>
                Em sua apresentação institucional, o projeto propõe que jovens desenvolvam
                pensamento crítico, criatividade e participação na construção da tecnologia.
                Aprender a criar é parte de ampliar possibilidades.
              </p>
              <a className="text-link" href={site.links.pirambu} target="_blank" rel="noreferrer">
                Conheça o Pirambu Innovation <Icon name="external" />
              </a>
            </div>
          </div>
          <div className="pirambu-history">
            <Reveal>
              <span className="history-big-year">2003</span>
              <div>
                <p className="eyebrow">UMA IDEIA COMEÇA</p>
                <h3>Conhecimento dentro da comunidade.</h3>
                <p>
                  Nasce o Pirambu Digital, com a proposta de inclusão digital e formação de jovens
                  no Pirambu, em Fortaleza.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <span className="history-big-year">2023</span>
              <div>
                <p className="eyebrow">A IDEIA ENCONTRA NOVOS CAMINHOS</p>
                <h3>Do digital à inovação.</h3>
                <p>
                  A trajetória ganha continuidade como Pirambu Innovation, mantendo a oportunidade
                  para a juventude no centro de sua proposta.
                </p>
              </div>
            </Reveal>
            <a className="source-link" href={sources.pirambu.url} target="_blank" rel="noreferrer">
              Fonte: {sources.pirambu.title}
              <Icon name="external" size={14} />
            </a>
          </div>
        </div>
      </section>
      <section className="statement-section">
        <div className="container">
          <p className="eyebrow">NOSSA TURMA FAZ PARTE DESSA IDEIA</p>
          <h2>
            Oportunidade
            <br />
            coloca o potencial
            <br />
            <span className="cyan-text">em movimento.</span>
          </h2>
          <div className="statement-bottom">
            <span className="statement-asterisk" aria-hidden="true">
              ↗
            </span>
            <div>
              <p>
                A preparação ITA/IME integra esse propósito educacional: um espaço para desenvolver
                fundamentos, compartilhar descobertas e olhar para a engenharia como possibilidade.
              </p>
              <Link to="/nossa-turma" className="text-link light-link">
                Conheça nossa proposta <Icon name="external" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <JoinBanner />
    </>
  )
}
