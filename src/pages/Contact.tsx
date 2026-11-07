import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { Icon } from '../components/Icon'
import { site } from '../config/site'

export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="CONTATO / PARTICIPE"
        title={
          <>
            Toda trajetória
            <br />
            começa com uma
            <br />
            <span className="cyan-text">oportunidade.</span>
          </>
        }
      >
        <p>
          Quer conhecer melhor o projeto? Estamos construindo um espaço onde curiosidade e dedicação
          encontram novas possibilidades.
        </p>
      </PageIntro>
      <section className="section-light content-section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">UM CONVITE PARA DESCOBRIR</p>
            <h2>
              Seu próximo passo
              <br />
              pode começar aqui.
            </h2>
            <p className="large-copy">
              O interesse por aprender já é uma boa pergunta para começar a conversa.
            </p>
            <p>
              Conheça a proposta, explore as disciplinas e descubra as pessoas que fazem parte da
              turma.
            </p>
          </div>
          <div className="contact-status">
            <span className="status-symbol" aria-hidden="true">
              <Icon name="spark" size={34} />
            </span>
            <p className="eyebrow">INFORMAÇÕES DE PARTICIPAÇÃO</p>
            <h3>
              Estamos preparando
              <br />
              os próximos caminhos.
            </h3>
            <p>{site.contactMessage}</p>
            {site.contacts.email && (
              <a className="text-link" href={`mailto:${site.contacts.email}`}>
                {site.contacts.email}
                <Icon name="external" />
              </a>
            )}
            {site.contacts.phone && (
              <a className="text-link" href={`tel:${site.contacts.phone.replace(/[^+\d]/g, '')}`}>
                {site.contacts.phone}
                <Icon name="external" />
              </a>
            )}
            {site.contacts.whatsapp && (
              <a
                className="text-link"
                href={`https://wa.me/${site.contacts.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp do projeto
                <Icon name="external" />
              </a>
            )}
            {site.contacts.registrationUrl && (
              <a
                className="text-link"
                href={site.contacts.registrationUrl}
                target="_blank"
                rel="noreferrer"
              >
                Informações de inscrição
                <Icon name="external" />
              </a>
            )}
            <div className="contact-status-note">
              <span /> Canais aguardando confirmação institucional
            </div>
          </div>
        </div>
      </section>
      <section className="section-light contact-discover">
        <div className="container">
          <h2>Enquanto isso, siga a curiosidade.</h2>
          <div className="contact-links">
            <Link to="/nossa-turma">
              <span>01</span>
              <strong>Encontre a nossa turma</strong>
              <Icon name="external" />
            </Link>
            <Link to="/laboratorio">
              <span>02</span>
              <strong>Experimente uma ideia</strong>
              <Icon name="external" />
            </Link>
            <Link to="/equipe">
              <span>03</span>
              <strong>Conheça quem constrói junto</strong>
              <Icon name="external" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
