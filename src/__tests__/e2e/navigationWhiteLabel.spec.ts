import { expect, test } from "@playwright/test"

test.describe("White Label Navigation & Branding E2E Suite", () => {
  test("header brand logo, links and module isolation", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })

    const brandLogo = page.locator('header a[href="/"]').first()
    await expect(brandLogo).toBeVisible()

    const hospedagensLink = page.locator('header nav a[href="/hospedagens"]')
    if (await hospedagensLink.count()) {
      await expect(hospedagensLink.first()).toBeVisible()
    }

    await expect(page.locator('header nav a[href="/eventos"]')).toHaveCount(0)
    await expect(page.locator('header nav a[href="/keypass"]')).toHaveCount(0)
  })

  test("footer branding, copyright and module link isolation", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })

    const footer = page.locator("footer")
    await expect(footer).toBeVisible()

    await expect(footer).toContainText(/Todos os direitos reservados/i)

    await expect(footer.locator('a[href="/eventos"]')).toHaveCount(0)
    await expect(footer.locator('a[href="/keypass"]')).toHaveCount(0)
  })
})
