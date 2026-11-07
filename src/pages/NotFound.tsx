import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">404 / COORDENADA NÃO ENCONTRADA</p>
        <span className="not-found-number" aria-hidden="true">
          404<span>↗</span>
        </span>
        <h1>
          Vamos recalcular
          <br />
          essa trajetória?
        </h1>
        <p>Este caminho não levou a uma página. Há outras possibilidades para explorar.</p>
        <Link className="button button-cyan" to="/">
          Voltar ao início <Icon name="arrow" />
        </Link>
      </div>
    </section>
  )
}
