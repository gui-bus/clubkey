import { expect, test } from "@playwright/test"

test.describe("Module Security & Route Gating E2E Suite", () => {
  test.describe("Allowed Routes for Active Tenant", () => {
    test("allows accessing the home/landing page", async ({ page }) => {
      const response = await page.goto("/", { waitUntil: "domcontentloaded" })
      expect(response?.status()).toBeLessThan(400)
      await expect(page.locator("header")).toBeVisible()
    })

    test("allows accessing the stays catalog (/hospedagens)", async ({
      page,
    }) => {
      const response = await page.goto("/hospedagens", {
        waitUntil: "domcontentloaded",
      })
      expect(response?.status()).toBeLessThan(400)
      await expect(page.locator("h1, h2").first()).toBeVisible()
    })

    test("allows accessing the subscription page (/assinatura)", async ({
      page,
    }) => {
      const response = await page.goto("/assinatura", {
        waitUntil: "domcontentloaded",
      })
      expect(response?.status()).toBeLessThan(400)
    })

    test("allows accessing the login page (/entrar)", async ({ page }) => {
      const response = await page.goto("/entrar", {
        waitUntil: "domcontentloaded",
      })
      expect(response?.status()).toBeLessThan(400)
      await expect(page.locator("#email")).toBeVisible()
      await expect(page.locator("#password")).toBeVisible()
    })
  })

  test.describe("Disabled Module Routes Gating (404 Not Found)", () => {
    const disabledRoutes = [
      "/eventos",
      "/experiencias",
      "/beneficios",
      "/keypass",
      "/keypass/missoes",
      "/keypass/ranking",
      "/keypass/regras",
      "/agenda",
      "/meus-eventos",
    ]

    for (const route of disabledRoutes) {
      test(`blocks and renders 404 for disabled route: ${route}`, async ({
        page,
      }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" })

        const notFoundText = page.locator("text=/404|Não Encontrad/i").first()
        await expect(notFoundText).toBeVisible()

        const backBtn = page.locator("a, button").filter({
          hasText: /voltar|início|navegação/i,
        })
        await expect(backBtn.first()).toBeVisible()
      })
    }
  })
})
