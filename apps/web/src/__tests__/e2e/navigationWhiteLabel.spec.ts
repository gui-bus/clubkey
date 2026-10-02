import { expect, test } from "@playwright/test"

import { brandConfig } from "@/src/config/brand.config"

test.describe("White Label Navigation & Branding E2E Suite", () => {
  test("header brand logo, links and module isolation", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })

    const brandLogo = page.locator('header a[href="/"]').first()
    await expect(brandLogo).toBeVisible()

    if (brandConfig.modules.stays) {
      await expect(
        page.locator('header nav a[href="/hospedagens"]').first()
      ).toBeVisible()
    } else {
      await expect(
        page.locator('header nav a[href="/hospedagens"]')
      ).toHaveCount(0)
    }

    if (brandConfig.modules.networking) {
      await expect(
        page.locator('header nav a[href="/conexoes"]').first()
      ).toBeVisible()
    } else {
      await expect(page.locator('header nav a[href="/conexoes"]')).toHaveCount(
        0
      )
    }

    if (brandConfig.modules.events) {
      await expect(
        page.locator('header nav a[href="/eventos"]').first()
      ).toBeVisible()
    } else {
      await expect(page.locator('header nav a[href="/eventos"]')).toHaveCount(0)
    }

    if (brandConfig.modules.experiences) {
      await expect(
        page.locator('header nav a[href="/experiencias"]').first()
      ).toBeVisible()
    } else {
      await expect(
        page.locator('header nav a[href="/experiencias"]')
      ).toHaveCount(0)
    }

    if (brandConfig.modules.keypass) {
      await expect(
        page.locator('header nav a[href="/keypass"]').first()
      ).toBeVisible()
    } else {
      await expect(page.locator('header nav a[href="/keypass"]')).toHaveCount(0)
    }
  })

  test("footer branding, copyright and module link isolation", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })

    const footer = page.locator("footer")
    await expect(footer).toBeVisible()
    await expect(footer).toContainText(/Todos os direitos reservados/i)

    if (brandConfig.modules.events) {
      await expect(footer.locator('a[href="/eventos"]').first()).toBeVisible()
    } else {
      await expect(footer.locator('a[href="/eventos"]')).toHaveCount(0)
    }

    if (brandConfig.modules.keypass) {
      await expect(footer.locator('a[href="/keypass"]').first()).toBeVisible()
    } else {
      await expect(footer.locator('a[href="/keypass"]')).toHaveCount(0)
    }
  })
})
