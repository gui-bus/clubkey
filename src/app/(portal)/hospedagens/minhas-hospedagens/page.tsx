"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowCounterClockwise, ArrowRight, Buildings, Calendar, MagnifyingGlass } from "@phosphor-icons/react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { MemberStayReservation, MONTH_MAP, MONTH_OPTIONS } from "@/src/data/portalData"
import { toast } from "@/src/components/ui/toast/toast"
import { Button } from "@/src/components/ui/button/button"
import { Container } from "@/src/components/common/container"
import { PortalHero } from "@/src/components/portal/PortalHero"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"
import { ReservationCard } from "@/src/components/portal/ReservationCard"

function getStayMonth(checkIn: string): { key: string; label: string } {
  const parts = checkIn.split(" de ")
  if (parts.length >= 2) {
    const monthYear = parts[1].replace(",", "").trim()
    const [monthName, year] = monthYear.split(" ")
    if (monthName) {
      const formattedMonth =
        monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase()
      const label = year ? `${formattedMonth} ${year}` : formattedMonth
      return {
        key: label.toUpperCase(),
        label,
      }
    }
  }
  return { key: "OUTROS", label: "Outras Datas" }
}

export default function MinhasHospedagensPage(): React.JSX.Element {
  const [activeMonth, setActiveMonth] = React.useState("todos")
  const [searchQuery, setSearchQuery] = React.useState("")
  const { memberStays, cancelStay, resetStays } = usePortalStore()

  const handleCancel = (id: string, name: string) => {
    cancelStay(id)
    toast.info(`Reserva em ${name} cancelada.`, {
      description: "Nossa equipe foi notificada para o estorno.",
      action: {
        label: "Desfazer",
        onClick: () => resetStays(),
      },
    })
  }

  const monthFilterOptions = React.useMemo(() => {
    return MONTH_OPTIONS.map((opt) => ({
      value: opt.value,
      label: opt.label,
      count:
        opt.value === "todos"
          ? memberStays.length
          : memberStays.filter(
              (s) =>
                MONTH_MAP[opt.value] &&
                s.checkIn.toLowerCase().includes(MONTH_MAP[opt.value])
            ).length,
    }))
  }, [memberStays])

  const filteredStays = React.useMemo(() => {
    let list = memberStays
    if (activeMonth !== "todos" && MONTH_MAP[activeMonth]) {
      const monthName = MONTH_MAP[activeMonth]
      list = list.filter((s) => s.checkIn.toLowerCase().includes(monthName))
    }

    const q = searchQuery.trim().toLowerCase()
    if (!q) return list

    return list.filter((s) => {
      const fullText = [
        s.stayName,
        s.location,
        s.roomType,
        s.checkIn,
        s.checkOut,
        s.confirmationCode,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [activeMonth, memberStays, searchQuery])

  const groupedStaysByMonth = React.useMemo(() => {
    const groups: {
      monthKey: string
      monthLabel: string
      stays: MemberStayReservation[]
    }[] = []

    for (const stay of filteredStays) {
      const { key, label } = getStayMonth(stay.checkIn)
      let group = groups.find((g) => g.monthKey === key)
      if (!group) {
        group = {
          monthKey: key,
          monthLabel: label,
          stays: [],
        }
        groups.push(group)
      }
      group.stays.push(stay)
    }

    return groups
  }, [filteredStays])

  const hasActiveFilters = activeMonth !== "todos" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveMonth("todos")
    setSearchQuery("")
  }

  return (
    <div className="w-full flex flex-col">
      <PortalHero
        badge="Minhas Reservas • Benefício de Membro"
        title={
          <>
            Minhas <span className="text-brand-primary">Hospedagens</span>
          </>
        }
        description="Gerencie suas estadias confirmadas, comprovantes oficiais e detalhes das suas reservas exclusivas."
        imageSrc="/utils/banners/img_01.png"
        imageAlt="Minhas Hospedagens"
      >
        <PortalHeroFilterBar
          categoryLabel="Mês"
          categoryIcon={Calendar}
          activeCategory={activeMonth}
          onCategoryChange={setActiveMonth}
          categories={monthFilterOptions}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchPlaceholder="Buscar por hotel, destino, tipo de acomodação ou código..."
        />
      </PortalHero>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Filtros aplicados:
              </span>
              {activeMonth !== "todos" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {MONTH_OPTIONS.find((v) => v.value === activeMonth)?.label}
                  </span>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <MagnifyingGlass className="w-3 h-3" />
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-zinc-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Estadias Confirmadas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Exibindo {filteredStays.length}{" "}
              {filteredStays.length === 1
                ? "reserva ativa programada"
                : "reservas ativas programadas"}
            </p>
          </div>

          <Link
            href="/hospedagens"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5"
          >
            <span>Reservar nova estadia</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {memberStays.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4">
            <div className="w-14 h-14 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Buildings className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Nenhuma reserva ativa no momento
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Você ainda não possui estadias agendadas. Explore nossa curadoria de hotéis boutique e resorts com tarifas exclusivas para associados.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/hospedagens"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-brand-primary text-white text-xs font-black uppercase tracking-wider transition-all hover:bg-brand-primary/90"
              >
                <span>Explorar catálogo de hospedagens</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={resetStays}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ArrowCounterClockwise className="w-4 h-4 text-brand-primary" />
                <span>Restaurar reservas de demonstração</span>
              </button>
            </div>
          </div>
        ) : filteredStays.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-3">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Buildings className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
              Nenhuma reserva encontrada
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              Não encontramos reservas para o mês ou termo de busca selecionado. Tente ajustar os filtros.
            </p>
            <Button
              type="button"
              color="primary"
              radius="sm"
              size="sm"
              onClick={handleClearFilters}
              className="mt-2 text-xs font-black uppercase tracking-wider"
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {groupedStaysByMonth.map((group) => (
              <div key={group.monthKey} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shadow-xs" />
                    <h2 className="text-base sm:text-lg font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                      {group.monthLabel}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    {group.stays.length}{" "}
                    {group.stays.length === 1
                      ? "reserva confirmada"
                      : "reservas confirmadas"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {group.stays.map((stay) => (
                    <ReservationCard
                      key={stay.id}
                      stay={stay}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

