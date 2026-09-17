"use client"

import * as React from "react"

import {
  BRAZILIAN_CITIES_BY_UF,
  BRAZILIAN_STATES,
  type StateOption,
} from "@/src/data/brazilianCities"
import {
  CaretDown,
  Check,
  MagnifyingGlass,
  MapPin,
} from "@phosphor-icons/react"

import { cn } from "@/src/lib/utils"

const citiesCache: Record<string, string[]> = {}

export interface CitySelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function CitySelect({
  value,
  onChange,
  disabled = false,
  className,
  placeholder = "Selecione o estado e busque a cidade...",
}: CitySelectProps): React.JSX.Element {
  const [selectedUf, setSelectedUf] = React.useState<string>("SP")
  const [cityName, setCityName] = React.useState<string>("")
  const [isStateDropdownOpen, setIsStateDropdownOpen] = React.useState(false)
  const [isCityDropdownOpen, setIsCityDropdownOpen] = React.useState(false)
  const [isTyping, setIsTyping] = React.useState(false)
  const [stateSearchQuery, setStateSearchQuery] = React.useState("")
  const [citySearchQuery, setCitySearchQuery] = React.useState("")
  const [cities, setCities] = React.useState<string[]>(() => {
    return BRAZILIAN_CITIES_BY_UF["SP"] || []
  })

  const stateDropdownRef = React.useRef<HTMLDivElement>(null)
  const cityDropdownRef = React.useRef<HTMLDivElement>(null)
  const stateSearchInputRef = React.useRef<HTMLInputElement>(null)
  const cityInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (value && value.trim()) {
      const parts = value.split(",").map((s) => s.trim())
      if (parts.length >= 2) {
        const foundUf = BRAZILIAN_STATES.find(
          (s) => s.uf.toLowerCase() === parts[1].toLowerCase()
        )
        if (foundUf) {
          setSelectedUf(foundUf.uf)
          setCityName(parts[0])
          setCitySearchQuery(parts[0])
          setIsTyping(false)
          return
        }
      }
      setCityName(value)
      setCitySearchQuery(value)
      setIsTyping(false)
    }
  }, [value])

  React.useEffect(() => {
    let isCancelled = false

    const initialCities =
      citiesCache[selectedUf] || BRAZILIAN_CITIES_BY_UF[selectedUf] || []
    setCities(initialCities)

    const fetchIbgeCities = async () => {
      if (citiesCache[selectedUf]) return

      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        )
        if (!response.ok) return
        const data = await response.json()
        const fetchedList: string[] = data.map(
          (item: { nome: string }) => item.nome
        )
        fetchedList.sort((a, b) => a.localeCompare(b, "pt-BR"))

        const combined = Array.from(
          new Set([
            ...(BRAZILIAN_CITIES_BY_UF[selectedUf] || []),
            ...fetchedList,
          ])
        ).sort((a, b) => a.localeCompare(b, "pt-BR"))

        citiesCache[selectedUf] = combined

        if (!isCancelled) {
          setCities(combined)
        }
      } catch {
        citiesCache[selectedUf] =
          BRAZILIAN_CITIES_BY_UF[selectedUf] || initialCities
      }
    }

    fetchIbgeCities()

    return () => {
      isCancelled = true
    }
  }, [selectedUf])

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(e.target as Node)
      ) {
        setIsStateDropdownOpen(false)
      }
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCityDropdownOpen(false)
        setIsTyping(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  const filteredStates = React.useMemo(() => {
    if (!stateSearchQuery.trim()) return BRAZILIAN_STATES
    const q = stateSearchQuery.toLowerCase().trim()
    return BRAZILIAN_STATES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.uf.toLowerCase().includes(q)
    )
  }, [stateSearchQuery])

  const filteredCities = React.useMemo(() => {
    if (!isTyping || !citySearchQuery.trim()) return cities
    const q = citySearchQuery.toLowerCase().trim()
    return cities.filter((c) => c.toLowerCase().includes(q))
  }, [cities, citySearchQuery, isTyping])

  const handleSelectState = (state: StateOption) => {
    setSelectedUf(state.uf)
    setIsStateDropdownOpen(false)
    setStateSearchQuery("")
    setCityName("")
    setCitySearchQuery("")
    setIsTyping(false)
    setIsCityDropdownOpen(true)
    setTimeout(() => {
      cityInputRef.current?.focus()
    }, 50)
  }

  const handleSelectCity = (city: string) => {
    setCityName(city)
    setCitySearchQuery(city)
    setIsTyping(false)
    setIsCityDropdownOpen(false)
    onChange(`${city}, ${selectedUf}`)
  }

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setIsTyping(true)
    setCitySearchQuery(val)
    setCityName(val)
    setIsCityDropdownOpen(true)
    if (val.trim()) {
      onChange(`${val.trim()}, ${selectedUf}`)
    } else {
      onChange("")
    }
  }

  return (
    <div className={cn("relative w-full flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-2 w-full">
        <div className="relative shrink-0" ref={stateDropdownRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setIsStateDropdownOpen((prev) => !prev)
              setIsCityDropdownOpen(false)
              if (!isStateDropdownOpen) {
                setTimeout(() => stateSearchInputRef.current?.focus(), 50)
              }
            }}
            className={cn(
              "h-11 px-3.5 rounded-sm border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-2 min-w-[90px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer outline-none",
              isStateDropdownOpen
                ? "border-brand-primary ring-2 ring-brand-primary/20"
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Selecionar Estado (UF)"
          >
            <span className="text-zinc-900 dark:text-white">{selectedUf}</span>
            <CaretDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>

          {isStateDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="relative flex items-center mb-2 px-1">
                <MagnifyingGlass className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
                <input
                  ref={stateSearchInputRef}
                  type="text"
                  value={stateSearchQuery}
                  onChange={(e) => setStateSearchQuery(e.target.value)}
                  placeholder="Buscar estado..."
                  className="w-full h-8 pl-7 pr-2.5 text-xs rounded-sm bg-[#F1F1F1] dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-brand-primary"
                />
              </div>

              <div className="max-h-52 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/50 pr-1">
                {filteredStates.length === 0 ? (
                  <div className="py-3 text-center text-xs text-zinc-400">
                    Nenhum estado encontrado
                  </div>
                ) : (
                  filteredStates.map((state) => {
                    const isSelected = state.uf === selectedUf
                    return (
                      <button
                        key={state.uf}
                        type="button"
                        onClick={() => handleSelectState(state)}
                        className={cn(
                          "w-full px-2.5 py-1.5 text-xs flex items-center justify-between rounded-sm transition-colors text-left cursor-pointer",
                          isSelected
                            ? "bg-brand-primary/10 text-brand-primary font-bold"
                            : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-bold text-[11px] w-6 uppercase text-zinc-900 dark:text-white">
                            {state.uf}
                          </span>
                          <span className="truncate text-xs">{state.name}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        )}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex-1" ref={cityDropdownRef}>
          <div className="relative flex items-center w-full">
            <input
              ref={cityInputRef}
              type="text"
              value={citySearchQuery}
              onChange={handleCityInputChange}
              onFocus={(e) => {
                setIsCityDropdownOpen(true)
                setIsStateDropdownOpen(false)
                setIsTyping(false)
                e.target.select()
              }}
              onClick={() => {
                setIsCityDropdownOpen(true)
                setIsStateDropdownOpen(false)
              }}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "w-full h-11 pl-3.5 pr-8 rounded-sm border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-xs transition-colors outline-none",
                isCityDropdownOpen
                  ? "border-brand-primary ring-2 ring-brand-primary/20"
                  : "border-zinc-200 dark:border-zinc-800 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            <button
              type="button"
              onClick={() => {
                setIsCityDropdownOpen((prev) => !prev)
                setIsTyping(false)
              }}
              className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <CaretDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {isCityDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/50 pr-1">
                {filteredCities.length === 0 ? (
                  <div className="py-3 text-center text-xs text-zinc-400">
                    Nenhuma cidade encontrada para &quot;{citySearchQuery}&quot;
                  </div>
                ) : (
                  filteredCities.map((city) => {
                    const isSelected =
                      city.toLowerCase() === cityName.toLowerCase()
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => handleSelectCity(city)}
                        className={cn(
                          "w-full px-3 py-2 text-xs flex items-center justify-between rounded-sm transition-colors text-left cursor-pointer",
                          isSelected
                            ? "bg-brand-primary/10 text-brand-primary font-bold"
                            : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span className="truncate">{city}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        )}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
