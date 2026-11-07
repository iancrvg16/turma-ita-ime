import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROME_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROME_PATH }
    : {}),
})
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  const svg = await readFile('public/assets/social.svg', 'utf8')
  await page.setContent(
    `<html lang="pt-BR"><head><title>Imagem de compartilhamento</title></head><body style="margin:0;background:#081525">${svg}</body></html>`,
  )
  await page.screenshot({ path: 'public/assets/social.png' })
  console.log('Criado: public/assets/social.png (1200 × 630), a partir do SVG original.')
} finally {
  await browser.close()
}
