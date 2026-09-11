"use client"

import * as React from "react"
import { ChevronDown, Search } from "lucide-react"
import ReactCountryFlag from "react-country-flag"

import { countries, type Country } from "@/src/data/countries"
import { maskPhone } from "@/src/lib/masks"
import { cn } from "@/src/lib/utils"

export interface PhoneInputValue {
  dialCode: string
  number: string
}

export interface PhoneInputProps {
  value: PhoneInputValue
  onChange: (value: PhoneInputValue) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
}

export function PhoneInput({
  value,
  onChange,
  placeholder = "(00) 0 0000-0000",
  disabled = false,
  error,
  className,
}: PhoneInputProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(() => {
    return (
      countries.find((c) => c.dialCode === value?.dialCode) || countries[0]
    )
  })

  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (value?.dialCode && selectedCountry.dialCode !== value.dialCode) {
      const match = countries.find((c) => c.dialCode === value.dialCode)
      if (match) setSelectedCountry(match)
    }
  }, [value?.dialCode, selectedCountry.dialCode])

  const filteredCountries = React.useMemo(() => {
    if (!searchQuery.trim()) return countries
    const query = searchQuery.toLowerCase().trim()
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query)
    )
  }, [searchQuery])

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [dropdownOpen])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = maskPhone(e.target.value)
    onChange({ ...value, number: formatted })
  }

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country)
    onChange({ ...value, dialCode: country.dialCode })
    setDropdownOpen(false)
    setSearchQuery("")
  }

  return (
    <div className={cn("relative w-full flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2 w-full" ref={dropdownRef}>
        <div className="relative">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={cn(
              "h-11 px-3 rounded-sm border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-2 min-w-[96px] text-sm font-semibold transition-colors cursor-pointer outline-none",
              dropdownOpen
                ? "border-brand-primary ring-2 ring-brand-primary/20"
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Selecionar código de país"
          >
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={selectedCountry.code}
                svg
                style={{
                  width: "1.25em",
                  height: "0.95em",
                }}
                className="rounded-[2px] object-cover shrink-0"
                aria-label={selectedCountry.name}
              />
              <span>+{selectedCountry.dialCode}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="relative flex items-center mb-2 px-2">
                <Search className="w-4 h-4 absolute left-4 text-zinc-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar país..."
                  className="w-full h-9 pl-8 pr-3 text-xs rounded-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
                />
              </div>

              <div className="max-h-56 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/50 pr-1">
                {filteredCountries.length === 0 ? (
                  <div className="py-4 text-center text-xs text-zinc-400">
                    Nenhum país encontrado
                  </div>
                ) : (
                  filteredCountries.map((country) => {
                    const isSelected =
                      country.code === selectedCountry.code &&
                      country.dialCode === value.dialCode
                    return (
                      <button
                        key={`${country.code}-${country.dialCode}`}
                        type="button"
                        onClick={() => handleSelectCountry(country)}
                        className={cn(
                          "w-full px-3 py-2 text-xs flex items-center justify-between rounded-sm transition-colors text-left cursor-pointer",
                          isSelected
                            ? "bg-brand-primary/10 text-brand-primary font-bold"
                            : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{
                              width: "1.25em",
                              height: "0.95em",
                            }}
                            className="rounded-[2px] object-cover shrink-0"
                            aria-label={country.name}
                          />
                          <span className="truncate">{country.name}</span>
                        </div>
                        <span className="text-zinc-400 dark:text-zinc-500 font-mono font-medium shrink-0">
                          +{country.dialCode}
                        </span>
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <input
          type="tel"
          value={value.number}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 h-11 px-3.5 rounded-sm border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm transition-colors outline-none",
            error
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-zinc-200 dark:border-zinc-800 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
