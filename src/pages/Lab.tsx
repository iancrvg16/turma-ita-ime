import { PageIntro } from '../components/PageIntro'
import KnowledgeLab from '../components/interactive/KnowledgeLab'
import { Icon } from '../components/Icon'
import { Link } from 'react-router-dom'

export default function Lab() {
  return (
    <>
      <PageIntro
        eyebrow="LABORATÓRIO DE IDEIAS"
        title={
          <>
            Menos “e se?”.
            <br />
            Mais <span className="cyan-text">“vamos testar”.</span>
          </>
        }
        aside={
          <div className="lab-intro-symbol" aria-hidden="true">
            ∿
          </div>
        }
      >
        <p>
          Arraste um controle. Mude uma variável. Observe o que acontece. A ciência também começa
          assim.
        </p>
      </PageIntro>
      <section className="lab-section">
        <div className="container">
          <KnowledgeLab />
          <div className="lab-footnote">
            <Icon name="spark" size={20} />
            <p>
              Três modelos didáticos simplificados para explorar relações matemáticas. Use as setas
              do teclado nos controles para fazer pequenos ajustes.
            </p>
          </div>
          <Link className="text-link light-link" to="/disciplinas">
            Conecte a experiência às disciplinas <Icon name="external" />
          </Link>
        </div>
      </section>
    </>
  )
}
