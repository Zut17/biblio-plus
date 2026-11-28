import { test, expect } from '@playwright/test'

const viewports = [
  { name: 'mobile-320', width: 320, height: 640 },
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablette', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

const pages = [
  { name: 'accueil', path: '/' },
  { name: 'catalogue', path: '/catalogue' },
  { name: 'detail', path: '/livres/3' },
  { name: 'favoris', path: '/favoris' },
  { name: 'contact', path: '/contact' },
]

for (const vp of viewports) {
  for (const p of pages) {
    test(`${p.name} sans défilement horizontal – ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(p.path)
      await page.waitForLoadState('networkidle')

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )
      expect(overflow).toBe(false)

      await page.screenshot({
        path: `captures/${p.name}-${vp.name}.png`,
        fullPage: true,
      })
    })
  }
}

test('le menu burger est visible et fonctionne sur mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Navigation principale' })
  const toggle = page.getByRole('button', { name: 'Menu' })
  const catalogueLink = nav.getByRole('link', { name: 'Catalogue' }).first()

  await expect(toggle).toBeVisible()
  await expect(catalogueLink).toBeHidden()
  await toggle.click()
  await expect(catalogueLink).toBeVisible()
})

test('le menu burger est masqué sur ordinateur', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden()
})
