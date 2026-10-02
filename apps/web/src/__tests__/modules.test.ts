import { describe, expect, it } from "vitest"

import {
  type BrandModulesConfig,
  SYSTEM_MODULE_REGISTRY,
  assertModuleEnabled,
  getEnabledModulesList,
  getModuleByPath,
  isPathAllowed,
} from "@/src/config/modules.config"

describe("System Modules & Route Security Registry", () => {
  const allEnabledConfig: BrandModulesConfig = {
    home: true,
    stays: true,
    networking: true,
    events: true,
    experiences: true,
    benefits: true,
    keypass: true,
  }

  const viverdeConfig: BrandModulesConfig = {
    home: true,
    stays: true,
    networking: true,
    events: false,
    experiences: false,
    benefits: false,
    keypass: false,
  }

  const minimalConfig: BrandModulesConfig = {
    home: true,
    stays: false,
    networking: false,
    events: false,
    experiences: false,
    benefits: false,
    keypass: false,
  }

  describe("SYSTEM_MODULE_REGISTRY Completeness", () => {
    it("defines all 7 core modules with required metadata", () => {
      const requiredModules = [
        "home",
        "stays",
        "networking",
        "events",
        "experiences",
        "benefits",
        "keypass",
      ] as const

      for (const modId of requiredModules) {
        const mod = SYSTEM_MODULE_REGISTRY[modId]
        expect(mod).toBeDefined()
        expect(mod.id).toBe(modId)
        expect(mod.label).toBeTruthy()
        expect(mod.description).toBeTruthy()
        expect(mod.routePrefixes.length).toBeGreaterThan(0)
        expect(mod.defaultHref).toBeTruthy()
      }
    })
  })

  describe("getModuleByPath", () => {
    it("maps home and root paths to home module", () => {
      expect(getModuleByPath("/")).toBe("home")
      expect(getModuleByPath("")).toBe("home")
    })

    it("maps stays and alias routes to stays module", () => {
      expect(getModuleByPath("/hospedagens")).toBe("stays")
      expect(getModuleByPath("/hospedagens/123/reserva-vip")).toBe("stays")
      expect(getModuleByPath("/minhas-hospedagens")).toBe("stays")
      expect(getModuleByPath("/hospedagens/minhas-hospedagens")).toBe("stays")
      expect(
        getModuleByPath("/hospedagens/minhas-hospedagens/101/comprovante")
      ).toBe("stays")
    })

    it("maps networking and alias routes to networking module", () => {
      expect(getModuleByPath("/conexoes")).toBe("networking")
      expect(getModuleByPath("/conexoes/minhas-conexoes")).toBe("networking")
      expect(getModuleByPath("/conexoes/42/guilherme-albuquerque")).toBe(
        "networking"
      )
      expect(getModuleByPath("/pessoas")).toBe("networking")
      expect(getModuleByPath("/pessoas/42")).toBe("networking")
    })

    it("maps events and alias routes to events module", () => {
      expect(getModuleByPath("/eventos")).toBe("events")
      expect(getModuleByPath("/eventos/10/jantar-executivo")).toBe("events")
      expect(getModuleByPath("/eventos/10/jantar-executivo/quem-vai")).toBe(
        "events"
      )
      expect(getModuleByPath("/eventos/meus-eventos")).toBe("events")
      expect(getModuleByPath("/eventos/meus-eventos/10/slug")).toBe("events")
      expect(getModuleByPath("/agenda")).toBe("events")
      expect(getModuleByPath("/agenda/10")).toBe("events")
      expect(getModuleByPath("/agenda/10/quem-vai")).toBe("events")
      expect(getModuleByPath("/meus-eventos")).toBe("events")
    })

    it("maps experiences routes to experiences module", () => {
      expect(getModuleByPath("/experiencias")).toBe("experiences")
      expect(getModuleByPath("/experiencias/5/degustacao-vinhos")).toBe(
        "experiences"
      )
      expect(getModuleByPath("/experiencias/5/degustacao-vinhos/reserva")).toBe(
        "experiences"
      )
      expect(
        getModuleByPath("/experiencias/5/degustacao-vinhos/quem-vai")
      ).toBe("experiences")
    })

    it("maps benefits routes to benefits module", () => {
      expect(getModuleByPath("/beneficios")).toBe("benefits")
      expect(getModuleByPath("/beneficios?categoria=gastronomia")).toBe(
        "benefits"
      )
    })

    it("maps keypass routes to keypass module", () => {
      expect(getModuleByPath("/keypass")).toBe("keypass")
      expect(getModuleByPath("/keypass/missoes")).toBe("keypass")
      expect(getModuleByPath("/keypass/missoes?tab=drops")).toBe("keypass")
      expect(getModuleByPath("/keypass/ranking")).toBe("keypass")
      expect(getModuleByPath("/keypass/regras")).toBe("keypass")
    })

    it("returns null for system and exempt routes (always allowed)", () => {
      expect(getModuleByPath("/perfil")).toBeNull()
      expect(getModuleByPath("/perfil/minha-assinatura")).toBeNull()
      expect(getModuleByPath("/entrar")).toBeNull()
      expect(getModuleByPath("/login")).toBeNull()
      expect(getModuleByPath("/cadastro")).toBeNull()
      expect(getModuleByPath("/assinatura")).toBeNull()
      expect(getModuleByPath("/esqueci-minha-senha")).toBeNull()
      expect(getModuleByPath("/redefinir-senha")).toBeNull()
    })

    it("returns null for unmapped arbitrary routes", () => {
      expect(getModuleByPath("/termos-de-uso")).toBeNull()
      expect(getModuleByPath("/politica-de-privacidade")).toBeNull()
    })
  })

  describe("isPathAllowed", () => {
    describe("When all modules are enabled (Full Tenant)", () => {
      it("allows access to every route in the system", () => {
        const testPaths = [
          "/",
          "/hospedagens",
          "/hospedagens/123",
          "/minhas-hospedagens",
          "/conexoes",
          "/conexoes/42",
          "/pessoas",
          "/eventos",
          "/eventos/10",
          "/agenda",
          "/meus-eventos",
          "/experiencias",
          "/experiencias/5",
          "/beneficios",
          "/keypass",
          "/keypass/ranking",
          "/keypass/missoes",
          "/perfil",
          "/assinatura",
          "/entrar",
        ]

        for (const path of testPaths) {
          expect(isPathAllowed(path, allEnabledConfig)).toBe(true)
        }
      })
    })

    describe("When selective modules are disabled (Viverde Tenant)", () => {
      it("allows access to enabled modules (home, stays, networking)", () => {
        expect(isPathAllowed("/", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/hospedagens", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/hospedagens/123/suite", viverdeConfig)).toBe(
          true
        )
        expect(isPathAllowed("/minhas-hospedagens", viverdeConfig)).toBe(true)
        expect(
          isPathAllowed("/hospedagens/minhas-hospedagens", viverdeConfig)
        ).toBe(true)
        expect(isPathAllowed("/conexoes", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/conexoes/minhas-conexoes", viverdeConfig)).toBe(
          true
        )
        expect(isPathAllowed("/conexoes/42/slug", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/pessoas", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/pessoas/42", viverdeConfig)).toBe(true)
      })

      it("allows access to universal exempt routes", () => {
        expect(isPathAllowed("/perfil", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/perfil/minha-assinatura", viverdeConfig)).toBe(
          true
        )
        expect(isPathAllowed("/entrar", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/cadastro", viverdeConfig)).toBe(true)
        expect(isPathAllowed("/assinatura", viverdeConfig)).toBe(true)
      })

      it("strictly blocks access to disabled modules (events, experiences, benefits, keypass)", () => {
        expect(isPathAllowed("/eventos", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/eventos/10", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/eventos/10/slug/quem-vai", viverdeConfig)).toBe(
          false
        )
        expect(isPathAllowed("/eventos/meus-eventos", viverdeConfig)).toBe(
          false
        )
        expect(isPathAllowed("/agenda", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/agenda/10", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/meus-eventos", viverdeConfig)).toBe(false)

        expect(isPathAllowed("/experiencias", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/experiencias/5/slug", viverdeConfig)).toBe(false)
        expect(
          isPathAllowed("/experiencias/5/slug/reserva", viverdeConfig)
        ).toBe(false)

        expect(isPathAllowed("/beneficios", viverdeConfig)).toBe(false)

        expect(isPathAllowed("/keypass", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/keypass/ranking", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/keypass/missoes", viverdeConfig)).toBe(false)
        expect(isPathAllowed("/keypass/regras", viverdeConfig)).toBe(false)
      })
    })

    describe("When only home is enabled (Minimal Tenant)", () => {
      it("blocks all feature modules except home and system pages", () => {
        expect(isPathAllowed("/", minimalConfig)).toBe(true)
        expect(isPathAllowed("/perfil", minimalConfig)).toBe(true)
        expect(isPathAllowed("/assinatura", minimalConfig)).toBe(true)

        expect(isPathAllowed("/hospedagens", minimalConfig)).toBe(false)
        expect(isPathAllowed("/conexoes", minimalConfig)).toBe(false)
        expect(isPathAllowed("/eventos", minimalConfig)).toBe(false)
        expect(isPathAllowed("/experiencias", minimalConfig)).toBe(false)
        expect(isPathAllowed("/beneficios", minimalConfig)).toBe(false)
        expect(isPathAllowed("/keypass", minimalConfig)).toBe(false)
      })
    })

    describe("Custom Tenant Permutations Matrix", () => {
      it("handles Tickets & Gamification Tenant (events + keypass only)", () => {
        const eventsAndKeypassTenant: BrandModulesConfig = {
          home: true,
          stays: false,
          networking: false,
          events: true,
          experiences: false,
          benefits: false,
          keypass: true,
        }

        expect(isPathAllowed("/eventos", eventsAndKeypassTenant)).toBe(true)
        expect(isPathAllowed("/eventos/123", eventsAndKeypassTenant)).toBe(true)
        expect(isPathAllowed("/agenda", eventsAndKeypassTenant)).toBe(true)
        expect(isPathAllowed("/keypass", eventsAndKeypassTenant)).toBe(true)
        expect(isPathAllowed("/keypass/ranking", eventsAndKeypassTenant)).toBe(
          true
        )

        expect(isPathAllowed("/hospedagens", eventsAndKeypassTenant)).toBe(
          false
        )
        expect(isPathAllowed("/conexoes", eventsAndKeypassTenant)).toBe(false)
        expect(isPathAllowed("/experiencias", eventsAndKeypassTenant)).toBe(
          false
        )
        expect(isPathAllowed("/beneficios", eventsAndKeypassTenant)).toBe(false)
      })

      it("handles Travel & Experiences Tenant (stays + experiences only)", () => {
        const travelTenant: BrandModulesConfig = {
          home: true,
          stays: true,
          networking: false,
          events: false,
          experiences: true,
          benefits: false,
          keypass: false,
        }

        expect(isPathAllowed("/hospedagens", travelTenant)).toBe(true)
        expect(isPathAllowed("/experiencias", travelTenant)).toBe(true)
        expect(isPathAllowed("/minhas-hospedagens", travelTenant)).toBe(true)

        expect(isPathAllowed("/eventos", travelTenant)).toBe(false)
        expect(isPathAllowed("/conexoes", travelTenant)).toBe(false)
        expect(isPathAllowed("/beneficios", travelTenant)).toBe(false)
        expect(isPathAllowed("/keypass", travelTenant)).toBe(false)
      })

      it("handles Corporate Community Tenant (networking + benefits only)", () => {
        const communityTenant: BrandModulesConfig = {
          home: true,
          stays: false,
          networking: true,
          events: false,
          experiences: false,
          benefits: true,
          keypass: false,
        }

        expect(isPathAllowed("/conexoes", communityTenant)).toBe(true)
        expect(isPathAllowed("/pessoas", communityTenant)).toBe(true)
        expect(isPathAllowed("/beneficios", communityTenant)).toBe(true)

        expect(isPathAllowed("/hospedagens", communityTenant)).toBe(false)
        expect(isPathAllowed("/eventos", communityTenant)).toBe(false)
        expect(isPathAllowed("/experiencias", communityTenant)).toBe(false)
        expect(isPathAllowed("/keypass", communityTenant)).toBe(false)
      })

      it("correctly handles trailing slashes and query strings", () => {
        expect(getModuleByPath("/hospedagens/")).toBe("stays")
        expect(getModuleByPath("/eventos?data=2026")).toBe("events")
        expect(
          getModuleByPath("/keypass/missoes?tab=badges&status=active")
        ).toBe("keypass")
        expect(getModuleByPath("/conexoes/?page=2")).toBe("networking")
        expect(getModuleByPath("/perfil?tab=security")).toBeNull()
      })
    })
  })

  describe("getEnabledModulesList", () => {
    it("returns all 7 modules when all are true", () => {
      const list = getEnabledModulesList(allEnabledConfig)
      expect(list).toEqual([
        "home",
        "stays",
        "networking",
        "events",
        "experiences",
        "benefits",
        "keypass",
      ])
    })

    it("returns only active modules for viverde preset", () => {
      const list = getEnabledModulesList(viverdeConfig)
      expect(list).toEqual(["home", "stays", "networking"])
    })

    it("returns single module for minimal preset", () => {
      const list = getEnabledModulesList(minimalConfig)
      expect(list).toEqual(["home"])
    })
  })

  describe("assertModuleEnabled", () => {
    it("does not trigger notFound when module is enabled", () => {
      expect(() => {
        assertModuleEnabled("stays", allEnabledConfig)
      }).not.toThrow()
    })

    it("calls notFound when module is disabled", () => {
      expect(() => {
        assertModuleEnabled("events", viverdeConfig)
      }).toThrow()
    })
  })
})
