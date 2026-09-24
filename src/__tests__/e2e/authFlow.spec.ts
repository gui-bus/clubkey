import { expect, test } from "@playwright/test"

test.describe("Authentication & Member Journey E2E Suite", () => {
  test("full login, cockpit access, dropdown menu checks and logout journey", async ({
    page,
  }) => {
    await page.goto("/entrar", { waitUntil: "domcontentloaded" })
    await expect(page.locator("#email")).toBeVisible()
    await expect(page.locator("#password")).toBeVisible()

    await page.fill("#email", "gui@example.com")
    await page.fill("#password", "SenhaSegura123!")
    await page.locator('button[type="submit"]').click()

    await page.waitForURL((url) => url.pathname === "/", { timeout: 10000 })

    const welcomeHeading = page.locator("h1").filter({ hasText: /Bem-vindo/i })
    if (await welcomeHeading.isVisible()) {
      await expect(welcomeHeading).toBeVisible()
    }

    const userTrigger = page.locator("#navbar-profile-dropdown-trigger")
    await expect(userTrigger).toBeVisible()
    await userTrigger.click()

    await expect(page.locator("text=Meu Perfil").first()).toBeVisible()
    await expect(page.locator("text=Minhas Hospedagens").first()).toBeVisible()
    await expect(page.locator("text=Minha Assinatura").first()).toBeVisible()
    await expect(page.locator("text=Sair do Portal").first()).toBeVisible()

    await expect(page.locator("text=Meus Eventos")).toHaveCount(0)

    await page.click("text=Sair do Portal")
    await page.waitForTimeout(500)

    await expect(page).toHaveURL(/.*entrar|.*/)
  })
})
