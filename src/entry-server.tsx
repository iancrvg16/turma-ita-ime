import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { PassThrough } from 'node:stream'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const output = new PassThrough()
    output.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output)
        },
        onError(error) {
          reject(error)
        },
      },
    )
  })
}
