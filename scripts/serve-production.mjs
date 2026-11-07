import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

const root = resolve('dist')
const port = Number(process.env.PORT || 5173)
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
}

await stat(resolve(root, 'index.html')).catch(() => {
  throw new Error('Build não encontrado. Execute npm run build antes do preview.')
})
const exists = async (file) => {
  try {
    return (await stat(file)).isFile()
  } catch {
    return false
  }
}
const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405)
    response.end()
    return
  }
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname)
    let file = resolve(root, `.${path === '/' ? '/index.html' : path}`)
    if (!file.startsWith(root + sep)) {
      response.writeHead(403)
      response.end()
      return
    }
    let status = 200
    if (!(await exists(file))) {
      if (!extname(file) && (await exists(`${file}.html`))) file += '.html'
      else {
        file = resolve(root, '404.html')
        status = 404
      }
    }
    const body = await readFile(file)
    response.writeHead(status, {
      'Content-Type': mime[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    })
    response.end(request.method === 'HEAD' ? undefined : body)
  } catch {
    response.writeHead(400)
    response.end('Requisição inválida.')
  }
})
server.on('error', (error) => {
  console.error(error.message)
  process.exitCode = 1
})
server.listen(port, '127.0.0.1', () =>
  console.log(
    `Turma ITA/IME · http://127.0.0.1:${port}\nPreview do build de produção. Ctrl+C encerra.`,
  ),
)
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close())
