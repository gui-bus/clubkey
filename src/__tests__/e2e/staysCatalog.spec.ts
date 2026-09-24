import { expect, test } from "@playwright/test"

test.describe("Stays Catalog & Details Journey E2E Suite", () => {
  test("browsing catalog, selecting accommodation and viewing details", async ({
    page,
  }) => {
    await page.goto("/hospedagens", { waitUntil: "domcontentloaded" })

    await expect(page.locator("h1, h2").first()).toBeVisible()

    const roomCardLinks = page.locator('a[href^="/hospedagens/"]')
    await expect(roomCardLinks.first()).toBeVisible()

    const firstRoomHref = await roomCardLinks.first().getAttribute("href")
    if (firstRoomHref) {
      await page.goto(firstRoomHref, { waitUntil: "domcontentloaded" })

      await expect(page.locator("h1, h2").first()).toBeVisible()

      const bookingCta = page.locator("button:visible, a:visible").filter({
        hasText: /reservar|assine/i,
      })
      await expect(bookingCta.first()).toBeVisible()

      await expect(page.locator("text=/\\+\\s*\\d+\\s*XP/")).toHaveCount(0)
    }
  })
})
