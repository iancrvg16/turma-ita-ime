import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { routeMeta } from '../src/data/routes'

const routes = Object.keys(routeMeta)
const widths = [320, 375, 390, 768, 1024, 1440, 1920]
test.use({ reducedMotion: 'reduce' })

for (const width of widths) {
  test(`Todas as páginas sem overflow em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    for (const route of routes) {
      const response = await page.goto(route)
      expect(response?.status(), route).toBe(200)
      await expect(page.locator('main h1'), route).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('header .brand')).toBeVisible()
      const size = await page.evaluate(() => ({
        viewport: window.innerWidth,
        body: document.body.scrollWidth,
        html: document.documentElement.scrollWidth,
      }))
      expect(Math.max(size.body, size.html), route).toBeLessThanOrEqual(size.viewport + 1)
      expect(await page.locator('main').innerText()).not.toMatch(/undefined|NaN/)
    }
    expect(errors).toEqual([])
  })
}

test('Menu mobile com foco, Escape e navegação', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const open = page.getByRole('button', { name: 'Abrir menu' })
  await open.click()
  await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  )
  await expect(
    page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Início', exact: true }),
  ).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(open).toBeFocused()
  await expect(open).toHaveAttribute('aria-expanded', 'false')
  await open.click()
  await page
    .getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('link', { name: 'Disciplinas' })
    .click()
  await expect(page).toHaveURL(/\/disciplinas$/)
  await expect(page.locator('main h1')).toContainText('Tudo começa')
  await expect(open).toHaveAttribute('aria-expanded', 'false')
})

test('Comparação ITA/IME e linha histórica interativas', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('tab', { name: '02 / IME' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Exército Brasileiro')
  await expect(page.getByRole('tabpanel')).toContainText('1959')
  await page.getByRole('link', { name: 'Explore a história do IME' }).click()
  await expect(page.locator('main h1')).toContainText('IME')
  await page.getByRole('button', { name: '1792 IME' }).click()
  await expect(page.locator('.timeline-story')).toContainText(
    'ainda não tinha sua denominação atual',
  )
  await page.getByRole('button', { name: 'ITA', exact: true }).click()
  await expect(page.locator('.timeline-track')).not.toContainText('1792')
  await expect(page.locator('.timeline-track')).toContainText('1939')
  await page.getByRole('button', { name: '1950 ITA' }).click()
  await expect(page.locator('.timeline-story')).toContainText('16 de janeiro')
})

test('Mapa conecta disciplinas, conteúdos, busca e professores', async ({ page }) => {
  await page.goto('/disciplinas?area=quimica')
  await expect(page.getByRole('tab', { name: /Química/ })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('Descobrir as transformações')
  const search = page.getByRole('searchbox')
  await search.fill('estequiometria')
  await expect(page.locator('.topics-list details')).toHaveCount(1)
  await page.locator('.topics-list summary').filter({ hasText: 'Estequiometria' }).click()
  await expect(page.locator('.topics-list details[open]')).toContainText(
    'Israel Oliveira Barbosa Lima',
  )
  await search.fill('zzzzzzz')
  await expect(page.getByText('Nenhum conteúdo encontrado. Tente outro termo.')).toBeVisible()
  await page.getByRole('button', { name: 'Limpar busca' }).click()
  await expect(search).toHaveValue('')
  await page.getByRole('tab', { name: /Física/ }).click()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: /Matemática/ })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(page.getByRole('tab', { name: /Matemática/ })).toBeFocused()
  await page.getByRole('tab', { name: /Inglês/ }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Raul Mozsek Duarte Sztutman')
})

test('Equipe filtra áreas e expande conteúdos sem inventar perfis', async ({ page }) => {
  await page.goto('/equipe')
  await expect(page.locator('.teacher-card')).toHaveCount(7)
  await page.getByLabel('Explore por área').selectOption('redacao')
  await expect(page.locator('.teacher-card')).toHaveCount(1)
  await expect(page.locator('.teacher-card h2')).toHaveText('Daniel da Silva Oliveira')
  await page.getByText('Explore os conteúdos', { exact: true }).click()
  await expect(page.getByText('Texto Dissertativo-Argumentativo', { exact: true })).toBeVisible()
})

test('Laboratório responde a controles e trata a = 0 corretamente', async ({ page }) => {
  await page.goto('/laboratorio')
  const amplitude = page.getByRole('slider', { name: 'Amplitude (A)' })
  await amplitude.focus()
  await page.keyboard.press('ArrowRight')
  await expect(amplitude).toHaveValue('0.7')
  await expect(page.getByRole('img', { name: /Onda senoidal/ })).toHaveAttribute(
    'aria-label',
    /0,7 metro/,
  )
  await page.getByRole('button', { name: 'Animar onda' }).click()
  await expect(page.getByRole('button', { name: 'Pausar' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).click()
  await expect(amplitude).toHaveValue('0.6')
  await page.getByRole('tab', { name: '02 / Funções' }).click()
  const a = page.getByRole('slider', { name: 'Coeficiente a' })
  await a.focus()
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  await expect(a).toHaveValue('0')
  await expect(page.locator('.formula')).toContainText('a = 0 e b = 0, a função é constante')
  await page.getByRole('tab', { name: '03 / Vetores' }).click()
  await expect(page.locator('.formula')).toContainText('6,08 N')
  await page.getByRole('slider', { name: 'Ângulo de F₂ com o eixo x' }).focus()
  await page.keyboard.press('Home')
  await expect(page.locator('.formula')).toContainText('7,00 N')
  await page.getByRole('slider', { name: 'Intensidade de F₂' }).focus()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await page.getByRole('slider', { name: 'Ângulo de F₂ com o eixo x' }).focus()
  await page.keyboard.press('End')
  await expect(page.locator('.formula')).toContainText('0,00 N')
  await expect(page.locator('.formula')).toContainText('direção indefinida')
  const zeroAudit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(zeroAudit.violations).toEqual([])
})

test('Foco, link de salto e movimento reduzido', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  const outline = await page
    .getByRole('link', { name: 'Pular para o conteúdo' })
    .evaluate((el) => getComputedStyle(el).outlineWidth)
  expect(parseFloat(outline)).toBeGreaterThan(0)
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const animation = await page
    .locator('.hero .plane-float')
    .evaluate((el) => getComputedStyle(el).animationName)
  expect(animation).toBe('none')
  await expect(page.locator('.hero h1')).toBeVisible()
})

test('Todos os links internos, arquivos e conteúdo estático de produção', async ({
  page,
  request,
}) => {
  const links = new Set<string>()
  for (const route of routes) {
    await page.goto(route)
    const found = await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')!))
    found.forEach((link) => links.add(link.split(/[?#]/)[0]))
    const response = await request.get(route)
    const html = await response.text()
    expect(html).toContain('<main')
    expect(html).toContain('property="og:title"')
    expect(html).not.toMatch(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/)
    expect(html).not.toMatch(/aprovação garantida/i)
    expect(html).not.toContain('rel="canonical" href="https://example')
  }
  for (const path of links) expect((await request.get(path)).status(), path).toBe(200)
  for (const path of ['/favicon.svg', '/sitemap.xml', '/robots.txt', '/assets/social.png'])
    expect((await request.get(path)).status(), path).toBe(200)
  await page.goto('/coordenada-inexistente')
  await expect(page.locator('main h1')).toContainText('recalcular')
  await page.getByRole('link', { name: 'Voltar ao início' }).click()
  await expect(page).toHaveURL('/')
})

test('Conteúdo acessível sem JavaScript em todas as rotas', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:4173${route}`)
    await expect(page.locator('main h1')).toBeVisible()
    expect(await page.locator('main').innerText()).toBeTruthy()
  }
  await context.close()
})

test('Auditoria automática de acessibilidade em todas as páginas', async ({ page }) => {
  test.setTimeout(120000)
  for (const route of routes) {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        targets: v.nodes.map((node) => node.target),
      })),
      route,
    ).toEqual([])
  }
})

test('Acessibilidade dos estados interativos e menu mobile', async ({ page }) => {
  test.setTimeout(90000)
  await page.setViewportSize({ width: 390, height: 844 })
  for (const route of ['/disciplinas?area=literatura', '/equipe', '/laboratorio']) {
    await page.goto(route)
    if (route === '/equipe') await page.getByLabel('Explore por área').selectOption('literatura')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      route,
    ).toEqual([])
  }
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(
    results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
  ).toEqual([])
})

test('Capturas para revisão em desktop e mobile', async ({ page }) => {
  test.setTimeout(120000)
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 })
    for (const route of ['/', '/disciplinas', '/ita', '/equipe', '/laboratorio', '/participe']) {
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({
        path: `docs/previews/${route === '/' ? 'inicio' : route.slice(1)}-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      })
    }
  }
})

test('Falha de carregamento oferece recuperacao funcional', async ({ page }) => {
  await page.goto('/')
  await page.route('**/assets/About-*.js', (route) => route.abort())
  await page
    .getByRole('navigation', { name: 'Navega\u00e7\u00e3o principal' })
    .getByRole('link', { name: 'Nossa turma', exact: true })
    .click()
  await expect(page.locator('main h1')).toContainText('Algo interrompeu')
  await page.unroute('**/assets/About-*.js')
  await page.getByRole('button', { name: 'Carregar novamente' }).click()
  await expect(page.locator('main h1')).toContainText('Aprender abre')
})

test('Navegacao, disciplinas e historia respondem ao toque', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
  })
  try {
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4173/')
    await page.getByRole('button', { name: 'Abrir menu' }).tap()
    await page
      .getByRole('navigation', { name: 'Navega\u00e7\u00e3o principal' })
      .getByRole('link', { name: 'Disciplinas' })
      .tap()
    await page.getByRole('tab', { name: /Reda/ }).tap()
    await expect(page.getByRole('tabpanel')).toContainText('Dar forma')
    await page.locator('.topics-list summary').first().tap()
    await expect(page.locator('.topics-list details[open]')).toHaveCount(1)
    await page.goto('http://127.0.0.1:4173/ime')
    await page.getByRole('button', { name: '1792 IME' }).tap()
    await expect(page.locator('.timeline-story')).toContainText('1792')
  } finally {
    await context.close()
  }
})
