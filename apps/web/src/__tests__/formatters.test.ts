import { getFullName, getInitials } from "@/src/data/portalData"
import { describe, expect, it } from "vitest"

import {
  formatBRL,
  formatCurrency,
  formatDateRange,
  formatNumber,
  formatShortDate,
} from "@/src/lib/formatters"

describe("Formatters Library", () => {
  describe("formatCurrency", () => {
    it("formats standard amounts in BRL", () => {
      expect(formatCurrency(1500)).toBe("R$ 1.500,00")
      expect(formatCurrency(19.9)).toBe("R$ 19,90")
    })

    it("handles zero and invalid inputs gracefully", () => {
      expect(formatCurrency(0)).toBe("R$ 0,00")
      expect(formatCurrency("invalid")).toBe("R$ 0,00")
    })

    it("respects hidePrefix option", () => {
      expect(formatCurrency(1500, { hidePrefix: true })).toBe("1.500,00")
    })

    it("respects custom decimals", () => {
      expect(formatCurrency(1500, { decimals: 0 })).toBe("R$ 1.500")
    })
  })

  describe("formatBRL", () => {
    it("formats rounded integer amounts", () => {
      const result = formatBRL(1500)
      expect(result.replace(/\u00a0/g, " ")).toMatch(/R\$\s?1\.500/)
    })
  })

  describe("formatNumber", () => {
    it("formats numbers with Brazilian thousand separators", () => {
      expect(formatNumber(12500)).toBe("12.500")
      expect(formatNumber(0)).toBe("0")
    })
  })

  describe("formatShortDate", () => {
    it("formats dates correctly", () => {
      const date = new Date("2026-10-15T12:00:00Z")
      expect(formatShortDate(date)).toMatch(/15/)
    })

    it("handles invalid dates gracefully", () => {
      expect(formatShortDate("invalid")).toBe("")
    })
  })

  describe("formatDateRange", () => {
    it("returns fallback for empty dates", () => {
      expect(formatDateRange(null, null)).toBe("Qualquer data")
    })

    it("handles start date only", () => {
      const start = new Date("2026-10-15T12:00:00Z")
      expect(formatDateRange(start, null)).toContain("Escolha a saída")
    })

    it("handles complete date range", () => {
      const start = new Date("2026-10-10T12:00:00Z")
      const end = new Date("2026-10-15T12:00:00Z")
      expect(formatDateRange(start, end)).toContain("—")
    })
  })

  describe("getFullName and getInitials", () => {
    it("returns formatted name and initials correctly", () => {
      expect(getFullName({ firstName: "William", lastName: "Tabata" })).toBe(
        "William Tabata"
      )
      expect(getInitials("William", "Tabata")).toBe("WT")
    })

    it("handles undefined or empty gracefully with DEFAULT_USER fallback", () => {
      expect(getFullName(null)).toBe("William Tabata")
      expect(getFullName({ firstName: undefined, lastName: undefined })).toBe(
        "William Tabata"
      )
      expect(getInitials(undefined, undefined)).toBe("WT")
    })
  })
})
