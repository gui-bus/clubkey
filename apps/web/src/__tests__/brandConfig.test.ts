import { describe, expect, it } from "vitest"

import {
  brandConfig,
  brandPresets,
  generateBrandCssVariables,
  getActiveEnabledModules,
  isModuleEnabled,
  isRouteAllowed,
} from "@/src/config/brand.config"

describe("Brand & White-Label Tenant Configuration Suite", () => {
  describe("Tenant Resolution & Presets", () => {
    it("has valid configurations for all registered brand presets", () => {
      const presetKeys = Object.keys(brandPresets)
      expect(presetKeys.length).toBeGreaterThanOrEqual(2)
      expect(presetKeys).toContain("clubkey")
      expect(presetKeys).toContain("viverde")

      for (const key of presetKeys) {
        const preset = brandPresets[key]
        expect(preset.id).toBe(key)
        expect(preset.name).toBeTruthy()
        expect(preset.shortName).toBeTruthy()
        expect(preset.tagline).toBeTruthy()
        expect(preset.colors.light.primary).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(preset.colors.dark.primary).toMatch(/^#[0-9A-Fa-f]{6}$/)
        expect(preset.assets.logoMain).toBeTruthy()
        expect(preset.links.website).toBeTruthy()

        expect(typeof preset.modules.home).toBe("boolean")
        expect(typeof preset.modules.stays).toBe("boolean")
        expect(typeof preset.modules.networking).toBe("boolean")
        expect(typeof preset.modules.events).toBe("boolean")
        expect(typeof preset.modules.experiences).toBe("boolean")
        expect(typeof preset.modules.benefits).toBe("boolean")
        expect(typeof preset.modules.keypass).toBe("boolean")
      }
    })

    it("verifies all presets have valid boolean configuration for all core modules", () => {
      const requiredModules = [
        "home",
        "stays",
        "networking",
        "events",
        "experiences",
        "benefits",
        "keypass",
      ] as const

      for (const preset of Object.values(brandPresets)) {
        for (const mod of requiredModules) {
          expect(typeof preset.modules[mod]).toBe("boolean")
        }
      }
    })

    it("verifies brandConfig reflects active tenant preset", () => {
      expect(brandConfig.id).toBeTruthy()
      expect(brandPresets[brandConfig.id]).toBeDefined()
      expect(brandConfig.modules).toEqual(brandPresets[brandConfig.id].modules)
    })
  })

  describe("Active Brand Helpers", () => {
    it("getActiveEnabledModules returns array matching enabled modules in brandConfig", () => {
      const activeModules = getActiveEnabledModules()
      expect(Array.isArray(activeModules)).toBe(true)
      for (const mod of activeModules) {
        expect(brandConfig.modules[mod]).toBe(true)
      }
    })

    it("isModuleEnabled returns boolean matching active brandConfig", () => {
      expect(isModuleEnabled("home")).toBe(brandConfig.modules.home)
      expect(isModuleEnabled("stays")).toBe(brandConfig.modules.stays)
      expect(isModuleEnabled("networking")).toBe(brandConfig.modules.networking)
      expect(isModuleEnabled("events")).toBe(brandConfig.modules.events)
      expect(isModuleEnabled("experiences")).toBe(
        brandConfig.modules.experiences
      )
      expect(isModuleEnabled("benefits")).toBe(brandConfig.modules.benefits)
      expect(isModuleEnabled("keypass")).toBe(brandConfig.modules.keypass)
    })

    it("isRouteAllowed correctly evaluates routes against active brand", () => {
      expect(isRouteAllowed("/hospedagens")).toBe(brandConfig.modules.stays)
      expect(isRouteAllowed("/conexoes")).toBe(brandConfig.modules.networking)
      expect(isRouteAllowed("/eventos")).toBe(brandConfig.modules.events)
      expect(isRouteAllowed("/experiencias")).toBe(
        brandConfig.modules.experiences
      )
      expect(isRouteAllowed("/beneficios")).toBe(brandConfig.modules.benefits)
      expect(isRouteAllowed("/keypass")).toBe(brandConfig.modules.keypass)
    })
  })

  describe("Dynamic Brand CSS Variables Generation", () => {
    it("generates valid CSS custom properties for light and dark modes", () => {
      const cssVars = generateBrandCssVariables(brandPresets.viverde)

      expect(cssVars).toContain(":root")
      expect(cssVars).toContain(".dark")
      expect(cssVars).toContain(
        `--brand-primary: ${brandPresets.viverde.colors.light.primary}`
      )
      expect(cssVars).toContain(
        `--primary: ${brandPresets.viverde.colors.light.primary}`
      )
      expect(cssVars).toContain(
        `--brand-secondary: ${brandPresets.viverde.colors.light.secondary}`
      )
    })

    it("generates distinct palettes for different brands", () => {
      const clubkeyCss = generateBrandCssVariables(brandPresets.clubkey)
      const viverdeCss = generateBrandCssVariables(brandPresets.viverde)

      expect(clubkeyCss).toContain(brandPresets.clubkey.colors.light.primary)
      expect(viverdeCss).toContain(brandPresets.viverde.colors.light.primary)
      expect(clubkeyCss).not.toEqual(viverdeCss)
    })
  })
})
