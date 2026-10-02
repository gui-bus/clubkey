"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { ADMIN_EVENTS } from "@/src/data/mocks/events.data"
import { getMemberById } from "@/src/data/mocks/members.data"
import type { AdminEvent, AdminEventStatus } from "@clubkey/types"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CtaButton,
  DatePicker,
  FormSectionTitle,
  Input,
  Select,
  TableStatusBadge,
  Textarea,
} from "@clubkey/ui"
import {
  CalendarBlank,
  CalendarCheck,
  CaretDown,
  CaretLeft,
  CaretUp,
  CaretUpDown,
  Check,
  CheckCircle,
  FloppyDiskBack,
  Lightning,
  Plus,
  Trash,
  Users,
} from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"
import { toast } from "sonner"

import { Container } from "@/src/components/common/container"

const CATEGORIES = [
  "Networking",
  "Investimentos",
  "Governança",
  "Agribusiness",
  "Gastronomia",
  "Internacional",
  "Summit",
  "Lifestyle",
]

const TIERS = [
  "Todos os Membros",
  "Investidor & Incorporador",
  "Black & Diamante",
  "Patrono Exclusive",
]

const FORMATS = [
  "Mesa Redonda Sem Palco",
  "Almoço Fechado • Sala Privativa",
  "Roda de Conversa & Coquetel",
  "Field Day • Visita Técnica",
  "Degustação Guiada • Sala Climatizada",
  "Painel Estratégico & Foyer VIP",
  "Convenção & Jantar de Gala",
  "Breakfast & Pitching",
]

const STATUS_OPTIONS = [
  { value: "PUBLICADO", label: "Publicado" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "EM_BREVE", label: "Em Breve" },
  { value: "ESGOTADO", label: "Esgotado" },
  { value: "CONCLUIDO", label: "Concluído" },
  { value: "CANCELADO", label: "Cancelado" },
]

export interface EventDetailClientProps {
  slug: string
}

export function EventDetailClient({
  slug,
}: EventDetailClientProps): React.JSX.Element {
  const router = useRouter()
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringLiteral(["editar", "participantes"] as const).withDefault(
      "editar"
    )
  )
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withOptions({ shallow: true, scroll: false })
  )
  const [sortOrder, setSortOrder] = useQueryState(
    "order",
    parseAsStringLiteral(["asc", "desc"] as const).withOptions({
      shallow: true,
      scroll: false,
    })
  )

  const initialEvent = React.useMemo(() => {
    return (
      ADMIN_EVENTS.find(
        (e) =>
          e.slug === slug ||
          String(e.id) === slug ||
          e.code.toLowerCase() === slug.toLowerCase()
      ) || null
    )
  }, [slug])

  const [event, setEvent] = React.useState<AdminEvent | null>(initialEvent)
  const [isSaving, setIsSaving] = React.useState(false)

  const [title, setTitle] = React.useState(initialEvent?.title || "")
  const [category, setCategory] = React.useState(
    initialEvent?.category || "Networking"
  )
  const [format, setFormat] = React.useState(
    initialEvent?.format || "Mesa Redonda Sem Palco"
  )
  const [dressCode, setDressCode] = React.useState(
    initialEvent?.dressCode || "Smart Casual / Business"
  )
  const [tierRequired, setTierRequired] = React.useState(
    initialEvent?.tierRequired || "Todos os Membros"
  )
  const [status, setStatus] = React.useState<AdminEventStatus>(
    initialEvent?.status || "PUBLICADO"
  )
  const [desc, setDesc] = React.useState(initialEvent?.desc || "")

  const [eventDate, setEventDate] = React.useState<Date | undefined>(
    initialEvent?.date ? new Date(`${initialEvent.date}T12:00:00`) : new Date()
  )
  const [time, setTime] = React.useState(initialEvent?.time || "20h00")
  const [place, setPlace] = React.useState(initialEvent?.place || "")
  const [city, setCity] = React.useState(initialEvent?.city || "São Paulo, SP")

  const [capacity, setCapacity] = React.useState(
    String(initialEvent?.capacity || 15)
  )
  const [initialConfirmed, setInitialConfirmed] = React.useState(
    String(initialEvent?.initialConfirmed || 0)
  )
  const [price, setPrice] = React.useState(String(initialEvent?.price || 0))
  const [xp, setXp] = React.useState(String(initialEvent?.xp || 300))

  const [image, setImage] = React.useState(initialEvent?.image || "")

  const [hostFirstName, setHostFirstName] = React.useState(
    initialEvent?.host?.firstName || "William"
  )
  const [hostLastName, setHostLastName] = React.useState(
    initialEvent?.host?.lastName || "Albuquerque"
  )
  const [hostRole, setHostRole] = React.useState(
    initialEvent?.host?.role || "Presidente Executivo • ClubKey"
  )
  const [hostAvatar, setHostAvatar] = React.useState(
    initialEvent?.host?.avatar || ""
  )

  const [highlights, setHighlights] = React.useState(
    initialEvent?.highlights || []
  )
  const [inclusions, setInclusions] = React.useState(
    initialEvent?.inclusions || []
  )
  const [newInclusionText, setNewInclusionText] = React.useState("")

  const handleAddHighlight = () => {
    setHighlights((prev) => [...prev, { title: "", desc: "" }])
  }

  const handleRemoveHighlight = (idx: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleUpdateHighlight = (
    idx: number,
    field: "title" | "desc",
    val: string
  ) => {
    setHighlights((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [field]: val } : h))
    )
  }

  const handleAddInclusion = () => {
    if (!newInclusionText.trim()) return
    setInclusions((prev) => [...prev, newInclusionText.trim()])
    setNewInclusionText("")
  }

  const handleRemoveInclusion = (idx: number) => {
    setInclusions((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!event) return
    setIsSaving(true)

    const dateObj = eventDate || new Date()
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ]
    const weekdays = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ]

    const updatedEvent: AdminEvent = {
      ...event,
      title,
      category,
      format,
      dressCode,
      tierRequired,
      status,
      desc,
      day: String(dateObj.getDate()).padStart(2, "0"),
      month: months[dateObj.getMonth()] || event.month,
      weekday: weekdays[dateObj.getDay()] || event.weekday,
      date: dateObj.toISOString().split("T")[0] || event.date,
      time,
      place,
      city,
      capacity: Number(capacity) || event.capacity,
      initialConfirmed: Number(initialConfirmed) || event.initialConfirmed,
      price: Number(price) || 0,
      xp: Number(xp) || event.xp,
      image,
      highlights: highlights.filter((h) => h.title.trim()),
      inclusions: inclusions.filter((inc) => inc.trim()),
      host: {
        firstName: hostFirstName,
        lastName: hostLastName,
        role: hostRole,
        avatar: hostAvatar,
      },
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setEvent(updatedEvent)

    const idx = ADMIN_EVENTS.findIndex((e) => e.id === event.id)
    if (idx !== -1) {
      ADMIN_EVENTS[idx] = updatedEvent
    }

    setTimeout(() => {
      setIsSaving(false)
      toast.success("Alterações salvas com sucesso!", {
        description: `O evento "${title}" foi atualizado na plataforma.`,
      })
    }, 400)
  }

  const participantMembers = React.useMemo(() => {
    return (event?.participants || [])
      .map((id) => getMemberById(id))
      .filter((m): m is NonNullable<typeof m> => Boolean(m))
  }, [event?.participants])

  const handleSort = (
    column: "name" | "company" | "city" | "tier" | "status"
  ) => {
    if (sortBy === column) {
      if (sortOrder === "asc" || !sortOrder) {
        void setSortOrder("desc")
      } else {
        void setSortBy(null)
        void setSortOrder(null)
      }
    } else {
      void setSortBy(column)
      void setSortOrder("asc")
    }
  }

  const renderSortIndicator = (
    column: "name" | "company" | "city" | "tier" | "status"
  ) => {
    if (sortBy === column) {
      return sortOrder === "asc" || !sortOrder ? (
        <CaretUp size={12} weight="bold" className="text-brand-primary" />
      ) : (
        <CaretDown size={12} weight="bold" className="text-brand-primary" />
      )
    }
    return (
      <CaretUpDown
        size={12}
        weight="bold"
        className="text-zinc-400 group-hover/sort:text-zinc-700 dark:group-hover/sort:text-zinc-300 transition-colors opacity-60"
      />
    )
  }

  const sortedParticipants = React.useMemo(() => {
    if (!sortBy) return participantMembers

    const effectiveOrder = sortOrder || "asc"

    return [...participantMembers].sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        const aName = `${a.firstName} ${a.lastName}`
        const bName = `${b.firstName} ${b.lastName}`
        comparison = aName.localeCompare(bName, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "company") {
        comparison = (a.company || "").localeCompare(b.company || "", "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "city") {
        comparison = (a.city || "").localeCompare(b.city || "", "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "tier") {
        comparison = (a.tierId || "").localeCompare(b.tierId || "")
      } else if (sortBy === "status") {
        comparison = 0
      }
      return effectiveOrder === "asc" ? comparison : -comparison
    })
  }, [participantMembers, sortBy, sortOrder])

  if (!event) {
    return (
      <Container className="space-y-6 py-6 sm:py-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <CaretLeft size={14} weight="bold" />
            <span>Eventos</span>
          </Link>
        </div>

        <Card className="p-12 text-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] rounded-sm shadow-2xs">
          <div className="space-y-4 max-w-md mx-auto">
            <div className="size-12 mx-auto rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <CalendarBlank size={24} weight="bold" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Evento não encontrado
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                O identificador ou slug{" "}
                <code className="font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-xs">
                  {slug}
                </code>{" "}
                não corresponde a nenhum evento cadastrado no sistema.
              </p>
            </div>
            <CtaButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push("/eventos")}
              className="mt-2"
            >
              Retornar à Listagem
            </CtaButton>
          </div>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="space-y-6 py-6 sm:py-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <Link
          href="/eventos"
          className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <CaretLeft size={14} weight="bold" />
          <span>Eventos</span>
        </Link>
        <span>/</span>
        <span className="font-mono text-zinc-600 dark:text-zinc-300 font-bold">
          {event.code}
        </span>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
          Detalhes
        </span>
      </div>

      <div className="w-full py-1">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 min-w-0 flex-1">
            <div className="relative shrink-0 size-24 sm:size-28 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800">
              {image ? (
                <Image src={image} alt={title} fill className="object-cover" />
              ) : (
                <div className="size-full flex items-center justify-center text-zinc-400">
                  <CalendarCheck size={32} weight="bold" />
                </div>
              )}
            </div>

            <div className="space-y-2 min-w-0 flex-1 pt-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
                  {title}
                </h1>
                <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-xs">
                  {event.code}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {place} • {city}
                </span>
                <span>•</span>
                <span>{time}</span>
                <span>•</span>
                <span>
                  Anfitrião: {hostFirstName} {hostLastName}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-0.5">
                <TableStatusBadge
                  label={status}
                  variant={
                    status === "PUBLICADO" || status === "CONFIRMADO"
                      ? "success"
                      : status === "ESGOTADO"
                        ? "warning"
                        : status === "CANCELADO"
                          ? "danger"
                          : "neutral"
                  }
                />
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {tierRequired}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <CtaButton href="/eventos" variant="outline" size="sm">
              Voltar
            </CtaButton>

            <CtaButton
              type="button"
              variant="primary"
              size="sm"
              onClick={() => handleSave()}
              disabled={isSaving}
            >
              <FloppyDiskBack size={14} weight="bold" />
              <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
            </CtaButton>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => void setActiveTab("editar")}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === "editar"
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <CalendarCheck size={16} weight="bold" />
            <span>Editar Informações</span>
          </button>

          <button
            type="button"
            onClick={() => void setActiveTab("participantes")}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === "participantes"
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Users size={16} weight="bold" />
            <span>Participantes Confirmados ({participantMembers.length})</span>
          </button>
        </div>
      </div>

      {activeTab === "editar" ? (
        <form onSubmit={handleSave} className="space-y-6">
          <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible">
            <div className="space-y-10">
              <div className="space-y-5">
                <FormSectionTitle
                  title="Informações Básicas"
                  description="Status, títulos, categoria, formato e visibilidade por tier."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Título do Evento
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Status do Evento
                    </label>
                    <Select
                      value={status}
                      onValueChange={(val) =>
                        setStatus(val as AdminEventStatus)
                      }
                      options={STATUS_OPTIONS}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Categoria
                    </label>
                    <Select
                      value={category}
                      onValueChange={(val) => setCategory(val as string)}
                      options={CATEGORIES.map((c) => ({ value: c, label: c }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Tier Mínimo Requerido
                    </label>
                    <Select
                      value={tierRequired}
                      onValueChange={(val) => setTierRequired(val as string)}
                      options={TIERS.map((t) => ({ value: t, label: t }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Formato da Sessão
                    </label>
                    <Select
                      value={format}
                      onValueChange={(val) => setFormat(val as string)}
                      options={FORMATS.map((f) => ({ value: f, label: f }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Dress Code Recomendado
                    </label>
                    <Input
                      value={dressCode}
                      onChange={(e) => setDressCode(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Descrição & Pauta do Evento
                    </label>
                    <Textarea
                      rows={4}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <FormSectionTitle
                  title="Data, Horário & Localização"
                  description="Programação de agenda e endereço de realização do evento."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Data do Evento
                    </label>
                    <DatePicker
                      mode="single"
                      className="w-full"
                      value={eventDate}
                      onChange={(d?: Date) => d && setEventDate(d)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Horário
                    </label>
                    <Input
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Espaço / Local
                    </label>
                    <Input
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Cidade / UF
                    </label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <FormSectionTitle
                  title="Lotação, Valores & Gamificação"
                  description="Capacidade de participantes, valores de convite e distribuição de XP."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Capacidade Total
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Confirmados Iniciais
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={initialConfirmed}
                      onChange={(e) => setInitialConfirmed(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Valor por Membro (R$)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                        R$
                      </span>
                      <Input
                        type="number"
                        min="0"
                        className="pl-9"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Recompensa XP
                    </label>
                    <div className="relative">
                      <Lightning
                        size={14}
                        weight="fill"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
                      />
                      <Input
                        type="number"
                        min="0"
                        className="pl-9"
                        value={xp}
                        onChange={(e) => setXp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <FormSectionTitle
                  title="Anfitrião & Mídia"
                  description="Dados do host responsável pelo evento e imagem principal de capa."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Nome do Anfitrião
                    </label>
                    <Input
                      value={hostFirstName}
                      onChange={(e) => setHostFirstName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Sobrenome do Anfitrião
                    </label>
                    <Input
                      value={hostLastName}
                      onChange={(e) => setHostLastName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Cargo / Empresa
                    </label>
                    <Input
                      value={hostRole}
                      onChange={(e) => setHostRole(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Avatar URL
                    </label>
                    <Input
                      value={hostAvatar}
                      onChange={(e) => setHostAvatar(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      URL da Imagem de Capa
                    </label>
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <FormSectionTitle
                  title="Destaques do Evento"
                  description="Pontos altos do evento, diferenciais e regras de convivência."
                  action={
                    <CtaButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddHighlight}
                    >
                      <Plus size={14} weight="bold" />
                      <span>Adicionar Destaque</span>
                    </CtaButton>
                  }
                />

                <div className="space-y-3">
                  {highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Destaque #{idx + 1}
                        </span>
                        {highlights.length > 1 && (
                          <CtaButton
                            type="button"
                            variant="outline"
                            size="sm"
                            className="size-7 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border-zinc-200 dark:border-zinc-800"
                            onClick={() => handleRemoveHighlight(idx)}
                            title="Remover destaque"
                          >
                            <Trash size={13} weight="bold" />
                          </CtaButton>
                        )}
                      </div>

                      <Input
                        placeholder="Título do destaque"
                        value={hl.title}
                        onChange={(e) =>
                          handleUpdateHighlight(idx, "title", e.target.value)
                        }
                      />

                      <Textarea
                        rows={2}
                        placeholder="Breve descrição explicativa do destaque..."
                        value={hl.desc}
                        onChange={(e) =>
                          handleUpdateHighlight(idx, "desc", e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <FormSectionTitle
                  title="Incluso no Evento"
                  description="Itens, serviços, menus e cortesias inclusas para os participantes."
                />

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Ex: Acesso ao lounge executivo, carta de vinhos..."
                      value={newInclusionText}
                      onChange={(e) => setNewInclusionText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddInclusion()
                        }
                      }}
                    />
                    <CtaButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddInclusion}
                      className="shrink-0"
                    >
                      <Plus size={14} weight="bold" />
                      <span>Incluir</span>
                    </CtaButton>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {inclusions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Check
                            size={14}
                            weight="bold"
                            className="text-emerald-600 dark:text-emerald-400 shrink-0"
                          />
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                            {item}
                          </span>
                        </div>
                        <CtaButton
                          type="button"
                          variant="outline"
                          size="sm"
                          className="size-7 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border-zinc-200 dark:border-zinc-800"
                          onClick={() => handleRemoveInclusion(idx)}
                        >
                          <Trash size={13} weight="bold" />
                        </CtaButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-end gap-3 pt-2">
            <CtaButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push("/eventos")}
            >
              Cancelar
            </CtaButton>

            <CtaButton
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSaving}
            >
              <FloppyDiskBack size={14} weight="bold" />
              <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
            </CtaButton>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Lista de Participantes Confirmados
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Total de {participantMembers.length} membros com inscrições
                ativas e confirmadas.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                    <th
                      onClick={() => handleSort("name")}
                      className="py-3 px-4 text-left cursor-pointer group/sort select-none min-w-[240px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Membro</span>
                        {renderSortIndicator("name")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("company")}
                      className="py-3 px-4 text-left cursor-pointer group/sort select-none min-w-[200px]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Empresa & Cargo</span>
                        {renderSortIndicator("company")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("city")}
                      className="py-3 px-4 text-left cursor-pointer group/sort select-none w-px whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Cidade</span>
                        {renderSortIndicator("city")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("tier")}
                      className="py-3 px-4 text-left cursor-pointer group/sort select-none w-px whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Tier / Categoria</span>
                        {renderSortIndicator("tier")}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="py-3 px-4 text-center cursor-pointer group/sort select-none w-px whitespace-nowrap"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <span>Status Presença</span>
                        {renderSortIndicator("status")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {sortedParticipants.length > 0 ? (
                    sortedParticipants.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-2.5">
                            <Avatar size="sm">
                              {member.avatar ? (
                                <AvatarImage
                                  src={member.avatar}
                                  alt={`${member.firstName} ${member.lastName}`}
                                />
                              ) : null}
                              <AvatarFallback>
                                {member.firstName?.[0] || ""}
                                {member.lastName?.[0] || ""}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                                {member.firstName} {member.lastName}
                              </span>
                              <span className="text-[11px] text-zinc-400">
                                Membro desde {member.memberSince}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                              {member.company}
                            </span>
                            <span className="text-[11px] text-zinc-500">
                              {member.role}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 align-middle text-xs text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                          {member.city}
                        </td>

                        <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                            {member.tierId}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap">
                          <TableStatusBadge
                            label="Confirmado"
                            variant="success"
                            icon={<CheckCircle size={36} weight="fill" />}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-xs text-zinc-400"
                      >
                        Nenhum participante inscrito ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
