import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export function JoinBanner() {
  return (
    <section className="join-banner">
      <div className="container join-inner">
        <div>
          <p className="eyebrow">SEU PONTO DE PARTIDA</p>
          <h2>
            O próximo movimento
            <br />
            pode ser seu<span>.</span>
          </h2>
        </div>
        <Link className="button button-dark" to="/participe">
          Conheça as possibilidades <Icon name="external" />
        </Link>
        <span className="join-cross" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  )
}
