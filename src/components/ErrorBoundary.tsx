import { Component } from 'react'
import type { ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed)
      return (
        <main className="not-found">
          <div className="container">
            <p className="eyebrow">VAMOS RETOMAR O CAMINHO</p>
            <h1>
              Algo interrompeu
              <br />
              esta descoberta.
            </h1>
            <p>
              Tente carregar a página novamente. Se estiver sem conexão, aguarde o acesso à internet
              voltar.
            </p>
            <button className="button button-cyan" onClick={() => window.location.reload()}>
              Carregar novamente
            </button>
          </div>
        </main>
      )
    return this.props.children
  }
}
