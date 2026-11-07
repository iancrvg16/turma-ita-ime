import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer, loadEnv } from 'vite'

const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env }
const origin = (env.VITE_SITE_URL || '').replace(/\/$/, '')
if (origin && (!/^https?:\/\//.test(origin) || new URL(origin).origin !== origin)) {
  throw new Error('VITE_SITE_URL deve ser uma origem HTTP(S), sem caminho nem barra final.')
}
const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const template = await readFile('dist/index.html', 'utf8')
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  mode: 'production',
})
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx')
  const { routeMeta } = await server.ssrLoadModule('/src/data/routes.ts')
  for (const [path, meta] of [
    ...Object.entries(routeMeta),
    [
      '/404',
      {
        title: 'Página não encontrada',
        description: 'Vamos encontrar um novo caminho na Turma ITA/IME.',
      },
    ],
  ]) {
    const title = `${meta.title} | Turma ITA/IME — Pirambu Innovation`
    const html = await render(path)
    const url = `${origin}${path === '/' ? '/' : path}`
    const tags = [
      `<meta property="og:title" content="${escape(title)}" />`,
      `<meta property="og:description" content="${escape(meta.description)}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:locale" content="pt_BR" />',
      '<meta property="og:site_name" content="Turma ITA/IME — Pirambu Innovation" />',
      ...(origin && path !== '/404'
        ? [
            `<link rel="canonical" href="${escape(url)}" />`,
            `<meta property="og:url" content="${escape(url)}" />`,
            `<meta property="og:image" content="${escape(origin)}/assets/social.png" />`,
            '<meta property="og:image:width" content="1200" />',
            '<meta property="og:image:height" content="630" />',
            '<meta name="twitter:card" content="summary_large_image" />',
          ]
        : []),
      ...(!origin || path === '/404' ? ['<meta name="robots" content="noindex, follow" />'] : []),
    ].join('\n    ')
    const page = template
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(meta.description)}" />`,
      )
      .replace('<!--app-html-->', html)
      .replace('</head>', `    ${tags}\n  </head>`)
    const destination = path === '/' ? 'dist/index.html' : `dist${path}.html`
    await mkdir(resolve(destination, '..'), { recursive: true })
    await writeFile(destination, page)
    console.log(`Pré-renderizado: ${path}`)
  }
  const routes = Object.keys(routeMeta)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${origin ? routes.map((path) => `\n  <url><loc>${escape(origin + path)}</loc></url>`).join('') : ''}\n</urlset>\n`
  await writeFile('dist/sitemap.xml', sitemap)
  await writeFile(
    'dist/robots.txt',
    origin
      ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n# Configure VITE_SITE_URL e gere outro build para ativar a indexacao.\n',
  )
  console.log(
    origin
      ? `SEO configurado para ${origin}`
      : 'Revisão local: sem domínio presumido, indexação desativada.',
  )
} finally {
  await server.close()
}
