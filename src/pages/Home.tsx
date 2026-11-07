import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Aircraft, OrbitMark } from '../components/Artwork'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { JoinBanner } from '../components/JoinBanner'
import { SchoolCompare } from '../components/interactive/SchoolCompare'
import { subjects } from '../data/subjects'
import { values } from '../data/content'

export default function Home() {
  const [paused, setPaused] = useState(false)
  return (
    <>
      <section className={`hero ${paused ? 'motion-paused' : ''}`}>
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">
              <span /> TURMA PREPARATÓRIA ITA/IME
            </p>
            <h1>
              <span>Grandes</span>
              <span>desafios.</span>
              <span className="cyan-text">Novas</span>
              <span className="cyan-text">
                possibilidades<span className="hero-period">.</span>
              </span>
            </h1>
            <p className="hero-description">
              O futuro começa com uma pergunta.
              <br />E ganha força quando a gente aprende junto.
            </p>
            <div className="hero-actions">
              <Link className="button button-cyan" to="/nossa-turma">
                Conheça nossa turma <Icon name="external" size={18} />
              </Link>
              <a className="hero-second-link" href="#instituicoes">
                Explore o ITA e o IME <Icon name="arrow" size={17} />
              </a>
            </div>
            <p className="hero-note">
              <span /> Curiosidade é o seu ponto de partida.
            </p>
          </div>
          <div className="hero-art">
            <div className="hero-art-top">
              <span>PROJETE SEU PRÓXIMO PASSO</span>
              <span>↗</span>
            </div>
            <Aircraft />
            <div className="hero-art-bottom">
              <span>
                IDEIAS EM MOVIMENTO
                <span className="art-dot" />
              </span>
              <button
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
                aria-label={paused ? 'Retomar animação decorativa' : 'Pausar animação decorativa'}
              >
                <Icon name={paused ? 'play' : 'pause'} size={14} />
                <span>{paused ? 'Retomar' : 'Pausar'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <a href="#nossa-proposta">
            <span className="scroll-line" /> HÁ MUITO PARA DESCOBRIR{' '}
            <Icon name="arrow" size={14} style={{ transform: 'rotate(90deg)' }} />
          </a>
          <span>CIÊNCIA, DEDICAÇÃO E FUTURO — JUNTOS.</span>
        </div>
      </section>

      <section className="intro-section section-light" id="nossa-proposta">
        <div className="container">
          <Reveal>
            <div className="section-topline">
              <p className="eyebrow">
                <span className="tiny-cross">+</span> 01 / NOSSA TURMA
              </p>
              <span className="mono subtle">POTENCIAL ENCONTRA OPORTUNIDADE</span>
            </div>
            <div className="home-intro-grid">
              <h2>
                Você não precisa
                <br />
                saber tudo.
                <br />
                <span className="muted-heading">
                  Precisa ter espaço
                  <br />
                  para descobrir.
                </span>
              </h2>
              <div className="home-intro-copy">
                <p className="large-copy">
                  Uma turma para quem tem curiosidade, vontade de aprender e coragem de construir o
                  próprio caminho.
                </p>
                <p>
                  Somos a Turma Preparatória ITA/IME do Pirambu Innovation. Aqui, estudar ciências e
                  linguagens também é aprender a pensar, colaborar e enxergar novas possibilidades.
                </p>
                <Link className="text-link" to="/nossa-turma">
                  Encontre seu ponto de partida <Icon name="external" />
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="values-row">
            {values.map((v) => (
              <Reveal key={v.number}>
                <span className="value-number">
                  {v.number}
                  <Icon name="external" size={18} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="institutions-section" id="instituicoes">
        <div className="container">
          <Reveal>
            <div className="section-topline">
              <p className="eyebrow">
                <span className="tiny-cross">+</span> 02 / NOVOS HORIZONTES
              </p>
              <span className="mono subtle">DOIS CAMINHOS. MUITAS DESCOBERTAS.</span>
            </div>
            <div className="section-heading">
              <h2>
                Grandes ideias
                <br />
                encontram seu lugar<span className="cyan-text">.</span>
              </h2>
              <p>
                Conheça duas instituições que fazem parte da história da engenharia brasileira.
                Explore o que torna cada trajetória única.
              </p>
            </div>
          </Reveal>
          <SchoolCompare />
        </div>
      </section>

      <section className="knowledge-section section-light">
        <div className="container">
          <Reveal>
            <div className="section-topline">
              <p className="eyebrow">
                <span className="tiny-cross">+</span> 03 / EXPLORE O CONHECIMENTO
              </p>
              <Link className="text-link" to="/disciplinas">
                Ver todos os conteúdos <Icon name="external" size={17} />
              </Link>
            </div>
            <div className="knowledge-grid">
              <div>
                <h2>
                  O mundo tem
                  <br />
                  muitas perguntas.
                  <br />
                  <span className="muted-heading">
                    Por onde você
                    <br />
                    quer começar?
                  </span>
                </h2>
                <p>
                  Sete áreas. Diferentes formas de pensar.
                  <br />
                  Um universo de conexões para explorar.
                </p>
                <Link className="lab-teaser" to="/laboratorio">
                  <span className="lab-teaser-icon">
                    <Icon name="spark" size={25} />
                  </span>
                  <span>
                    <small>APRENDER EXPERIMENTANDO</small>
                    <strong>Entre no laboratório de ideias</strong>
                  </span>
                  <Icon name="external" size={20} />
                </Link>
              </div>
              <div className="subject-rows">
                {subjects.map((s, i) => (
                  <Link
                    to={`/disciplinas?area=${s.id}`}
                    className={`subject-row tone-${s.color}`}
                    key={s.id}
                  >
                    <span className="subject-row-num">0{i + 1}</span>
                    <span className="subject-row-symbol" aria-hidden="true">
                      {s.symbol}
                    </span>
                    <span>{s.name}</span>
                    <Icon name="external" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="people-section">
        <div className="container people-grid">
          <Reveal>
            <p className="eyebrow">
              <span className="tiny-cross">+</span> 04 / PESSOAS QUE SOMAM
            </p>
            <h2>
              Ninguém constrói
              <br />o futuro sozinho<span className="cyan-text">.</span>
            </h2>
            <p>
              Por trás de cada boa pergunta, existe espaço para uma conversa. Conheça os professores
              que caminham com a turma.
            </p>
            <Link className="text-link light-link" to="/equipe">
              Conheça nossa equipe <Icon name="external" />
            </Link>
          </Reveal>
          <div className="people-art">
            <div className="initials-composition" aria-hidden="true">
              <span className="tone-cyan">JG</span>
              <span className="tone-amber">AG</span>
              <span className="tone-blue">JP</span>
              <span className="tone-green">IL</span>
              <span className="tone-purple">RS</span>
              <span className="tone-coral">DO</span>
              <span className="tone-pink">IC</span>
            </div>
            <p>CONHECIMENTO MULTIPLICA QUANDO É COMPARTILHADO.</p>
          </div>
        </div>
      </section>

      <section className="pirambu-home section-light">
        <div className="container pirambu-home-inner">
          <div className="pirambu-orbit">
            <OrbitMark />
          </div>
          <div>
            <p className="eyebrow">DO PIRAMBU PARA NOVAS POSSIBILIDADES</p>
            <h2>
              Oportunidade também
              <br />é uma forma de inovação.
            </h2>
            <p>
              Uma iniciativa educacional do Pirambu Innovation, que conecta tecnologia, conhecimento
              e inclusão na comunidade do Pirambu, em Fortaleza.
            </p>
            <Link className="text-link" to="/pirambu-innovation">
              Descubra o que nos move <Icon name="external" />
            </Link>
          </div>
          <span className="pirambu-side-note" aria-hidden="true">
            CONHECIMENTO → TRANSFORMAÇÃO
          </span>
        </div>
      </section>
      <JoinBanner />
    </>
  )
}
