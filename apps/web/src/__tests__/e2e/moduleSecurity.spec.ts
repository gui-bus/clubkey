import { expect, test } from "@playwright/test"

import { brandConfig } from "@/src/config/brand.config"
import {
  SYSTEM_MODULE_REGISTRY,
  type SystemModule,
} from "@/src/config/modules.config"

test.describe("Module Security & Route Gating E2E Suite", () => {
  test.describe("Universal System Routes", () => {
    const universalRoutes = ["/", "/entrar", "/cadastro", "/assinatura"]

    for (const route of universalRoutes) {
      test(`allows accessing universal route: ${route}`, async ({ page }) => {
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
        })
        expect(response?.status()).toBeLessThan(400)
      })
    }
  })

  test.describe("Dynamic Module Route Gating based on Active Brand", () => {
    const allModules = Object.keys(SYSTEM_MODULE_REGISTRY) as SystemModule[]
    const enabledModules = allModules.filter(
      (m) => m !== "home" && brandConfig.modules[m]
    )
    const disabledModules = allModules.filter((m) => !brandConfig.modules[m])

    for (const modId of enabledModules) {
      const mod = SYSTEM_MODULE_REGISTRY[modId]
      test(`allows accessing enabled module default route: ${mod.defaultHref} (${mod.label})`, async ({
        page,
      }) => {
        const response = await page.goto(mod.defaultHref, {
          waitUntil: "domcontentloaded",
        })
        expect(response?.status()).toBeLessThan(400)
        await expect(page.locator("header")).toBeVisible()
      })
    }

    for (const modId of disabledModules) {
      const mod = SYSTEM_MODULE_REGISTRY[modId]
      for (const prefix of mod.routePrefixes) {
        test(`blocks and renders 404 for disabled module route: ${prefix} (${mod.label})`, async ({
          page,
        }) => {
          await page.goto(prefix, { waitUntil: "domcontentloaded" })

          const notFoundText = page.locator("text=/404|Não Encontrad/i").first()
          await expect(notFoundText).toBeVisible()

          const backBtn = page.locator("a, button").filter({
            hasText: /voltar|início|navegação/i,
          })
          await expect(backBtn.first()).toBeVisible()
        })
      }
    }
  })
})
