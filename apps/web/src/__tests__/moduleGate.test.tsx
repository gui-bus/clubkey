import * as React from "react"

import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ModuleGate } from "@/src/components/common/moduleGate"

import * as brandConfig from "@/src/config/brand.config"

describe("<ModuleGate /> Component", () => {
  describe("Single module gating", () => {
    it("renders children when module is enabled", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockImplementation(
        (m) => m === "stays"
      )

      render(
        <ModuleGate module="stays">
          <div data-testid="stays-content">Conteúdo de Hospedagens</div>
        </ModuleGate>
      )

      expect(screen.getByTestId("stays-content")).toBeInTheDocument()
      expect(screen.getByText("Conteúdo de Hospedagens")).toBeInTheDocument()
    })

    it("does not render children and renders null when module is disabled without fallback", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockImplementation(
        (m) => m !== "events"
      )

      render(
        <ModuleGate module="events">
          <div data-testid="events-content">Conteúdo de Eventos</div>
        </ModuleGate>
      )

      expect(screen.queryByTestId("events-content")).not.toBeInTheDocument()
    })

    it("renders fallback when module is disabled and fallback is provided", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockImplementation(
        (m) => m !== "keypass"
      )

      render(
        <ModuleGate
          module="keypass"
          fallback={<div data-testid="fallback-box">Módulo indisponível</div>}
        >
          <div data-testid="keypass-content">Passe KeyPass</div>
        </ModuleGate>
      )

      expect(screen.queryByTestId("keypass-content")).not.toBeInTheDocument()
      expect(screen.getByTestId("fallback-box")).toBeInTheDocument()
      expect(screen.getByText("Módulo indisponível")).toBeInTheDocument()
    })
  })

  describe("Multi-module gating (modules array)", () => {
    it("renders children when ANY module is enabled (requireAll = false)", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockImplementation(
        (m) => m === "stays"
      )

      render(
        <ModuleGate modules={["stays", "events"]}>
          <div data-testid="or-content">Hospedagens ou Eventos</div>
        </ModuleGate>
      )

      expect(screen.getByTestId("or-content")).toBeInTheDocument()
    })

    it("does not render children when ALL passed modules are disabled (requireAll = false)", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockReturnValue(false)

      render(
        <ModuleGate modules={["events", "experiences", "benefits"]}>
          <div data-testid="disabled-group">Módulos Desativados</div>
        </ModuleGate>
      )

      expect(screen.queryByTestId("disabled-group")).not.toBeInTheDocument()
    })

    it("renders children only when ALL modules are enabled (requireAll = true)", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockReturnValue(true)

      render(
        <ModuleGate modules={["home", "stays", "networking"]} requireAll>
          <div data-testid="all-enabled">Todos Ativos</div>
        </ModuleGate>
      )

      expect(screen.getByTestId("all-enabled")).toBeInTheDocument()
    })

    it("blocks rendering when at least one module is disabled (requireAll = true)", () => {
      vi.spyOn(brandConfig, "isModuleEnabled").mockImplementation(
        (m) => m !== "events"
      )

      render(
        <ModuleGate modules={["home", "stays", "events"]} requireAll>
          <div data-testid="mixed-require-all">
            Misto com Requerimento Total
          </div>
        </ModuleGate>
      )

      expect(screen.queryByTestId("mixed-require-all")).not.toBeInTheDocument()
    })
  })
})
