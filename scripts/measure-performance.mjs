import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROME_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH }
    : {}),
})
const measurements = []
const motion = process.argv.includes('--full-motion') ? 'no-preference' : 'reduce'
try {
  for (const profile of [
    {
      name: 'desktop-local',
      width: 1440,
      height: 900,
      cpu: 1,
      latency: 0,
      download: -1,
      upload: -1,
    },
    {
      name: 'mobile-simulado',
      width: 390,
      height: 844,
      cpu: 4,
      latency: 150,
      download: 1_600_000 / 8,
      upload: 750_000 / 8,
    },
  ]) {
    const context = await browser.newContext({
      viewport: { width: profile.width, height: profile.height },
      reducedMotion: motion,
    })
    const page = await context.newPage()
    const cdp = await context.newCDPSession(page)
    await cdp.send('Network.enable')
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu })
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: profile.latency,
      downloadThroughput: profile.download,
      uploadThroughput: profile.upload,
    })
    await page.addInitScript(() => {
      window.__qaMetrics = { lcp: null, cls: 0 }
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__qaMetrics.lcp = entry.startTime
      }).observe({ type: 'largest-contentful-paint', buffered: true })
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.__qaMetrics.cls += entry.value
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(3000)
    const metrics = await page.evaluate(() => ({
      ...window.__qaMetrics,
      resources: performance.getEntriesByType('resource').length,
      transferBytes: performance
        .getEntriesByType('resource')
        .reduce((sum, entry) => sum + entry.transferSize, 0),
      domContentLoaded: performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,
    }))
    measurements.push({ ...profile, ...metrics, inp: null })
    await context.close()
  }
  const result = {
    measuredAt: new Date().toISOString(),
    browser: await browser.version(),
    environment:
      'Chrome headless no Windows; localhost; cache desativado; uma amostra por perfil; movimento: ' +
      motion,
    limitations:
      'Medição de laboratório, não dados de campo. Não equivale ao percentil 75 de usuários reais. INP não foi medido. A rede e a CPU simuladas não reproduzem todas as condições de um celular.',
    measurements,
  }
  await mkdir('docs', { recursive: true })
  await writeFile(
    motion === 'no-preference' ? 'docs/performance-motion.json' : 'docs/performance.json',
    JSON.stringify(result, null, 2) + '\n',
  )
  console.log(JSON.stringify(result, null, 2))
} finally {
  await browser.close()
}
