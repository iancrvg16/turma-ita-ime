import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { OrbitMark } from '../components/Artwork'
import { Reveal } from '../components/Reveal'
import { JoinBanner } from '../components/JoinBanner'
import { Icon } from '../components/Icon'
import { values } from '../data/content'

export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="01 / NOSSA TURMA"
        title={
          <>
            Aprender abre
            <br />
            <span className="cyan-text">novos caminhos.</span>
          </>
        }
        aside={<OrbitMark />}
      >
        <p>
          Preparação em ciências e linguagens. Espaço para perguntar. Pessoas para caminhar junto.
        </p>
      </PageIntro>
      <section className="section-light content-section">
        <div className="container">
          <Reveal>
            <div className="editorial-grid">
              <p className="eyebrow">UMA PREPARAÇÃO COM PROPÓSITO</p>
              <div>
                <h2>
                  Seu potencial merece
                  <br />
                  um lugar para crescer.
                </h2>
                <p className="large-copy">
                  A Turma Preparatória ITA/IME é uma iniciativa educacional do Pirambu Innovation.
                  Nossa proposta combina uma preparação acadêmica exigente com apoio, colaboração e
                  respeito a cada estudante.
                </p>
                <p>
                  Trabalhar os fundamentos em Física, Matemática, Química e Linguagens é parte dessa
                  jornada. Construir autonomia para estudar, elaborar perguntas e desenvolver
                  raciocínios também.
                </p>
                <p>
                  O ITA e o IME são horizontes para explorar. Cada percurso é próprio, e o
                  aprendizado tem valor em todas as suas etapas.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="values-row">
            {values.map((v) => (
              <Reveal key={v.number}>
                <span className="value-number">{v.number}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="statement-section">
        <div className="container">
          <p className="eyebrow">SEU PONTO DE PARTIDA IMPORTA.</p>
          <Reveal>
            <h2>
              Você não precisa
              <br />
              saber tudo
              <br />
              <span className="cyan-text">para começar.</span>
            </h2>
          </Reveal>
          <div className="statement-bottom">
            <span className="statement-asterisk" aria-hidden="true">
              ✳
            </span>
            <p>
              Todo grande percurso começa com perguntas. O importante é encontrar um espaço para
              aprender, testar ideias, superar dificuldades e descobrir até onde você pode chegar.
            </p>
          </div>
        </div>
      </section>
      <section className="section-light content-section">
        <div className="container editorial-grid">
          <p className="eyebrow">COMO APRENDEMOS</p>
          <div>
            <h2>
              Rigor para pensar.
              <br />
              Acolhimento para avançar.
            </h2>
            <div className="prose-columns">
              <div>
                <h3>Entender antes de decorar</h3>
                <p>
                  Investigar por que uma ideia funciona e em quais situações pode ser aplicada. As
                  conexões entre conceitos ajudam a construir fundamentos sólidos.
                </p>
              </div>
              <div>
                <h3>Errar também ensina</h3>
                <p>
                  Uma dúvida não é um limite. É uma oportunidade de olhar novamente, testar outro
                  caminho e conversar sobre o que ainda não ficou claro.
                </p>
              </div>
              <div>
                <h3>Colaborar para crescer</h3>
                <p>
                  Explicar uma ideia e ouvir outra perspectiva ampliam o aprendizado. A comunidade
                  faz parte da preparação.
                </p>
              </div>
              <div>
                <h3>Avançar com autonomia</h3>
                <p>
                  Reconhecer o que você já sabe e o que precisa trabalhar permite construir um
                  percurso mais consciente, respeitando seu ponto de partida.
                </p>
              </div>
            </div>
            <Link className="text-link" to="/disciplinas">
              Explore as áreas de conhecimento <Icon name="external" />
            </Link>
          </div>
        </div>
      </section>
      <JoinBanner />
    </>
  )
}
