"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { ADMIN_EVENTS } from "@/src/data/mocks/events.data"
import type { AdminEvent } from "@clubkey/types"
import {
  Card,
  CtaButton,
  DatePicker,
  FormSectionTitle,
  Input,
  Select,
  Textarea,
} from "@clubkey/ui"
import {
  CaretLeft,
  Check,
  FloppyDiskBack,
  Lightning,
  Plus,
  Trash,
} from "@phosphor-icons/react"
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

export function CreateEventClient(): React.JSX.Element {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("Networking")
  const [format, setFormat] = React.useState("Mesa Redonda Sem Palco")
  const [dressCode, setDressCode] = React.useState("Smart Casual / Business")
  const [tierRequired, setTierRequired] = React.useState("Todos os Membros")
  const [desc, setDesc] = React.useState("")

  const [eventDate, setEventDate] = React.useState<Date | undefined>(new Date())
  const [time, setTime] = React.useState("20h00")
  const [place, setPlace] = React.useState("")
  const [city, setCity] = React.useState("São Paulo, SP")

  const [capacity, setCapacity] = React.useState("15")
  const [initialConfirmed, setInitialConfirmed] = React.useState("0")
  const [price, setPrice] = React.useState("0")
  const [xp, setXp] = React.useState("300")

  const [image, setImage] = React.useState(
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
  )

  const [hostFirstName, setHostFirstName] = React.useState("William")
  const [hostLastName, setHostLastName] = React.useState("Albuquerque")
  const [hostRole, setHostRole] = React.useState(
    "Presidente Executivo • ClubKey"
  )
  const [hostAvatar, setHostAvatar] = React.useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
  )

  const [highlights, setHighlights] = React.useState<
    { title: string; desc: string }[]
  >([
    {
      title: "Mesa Redonda Exclusiva",
      desc: "Debate focado em estratégias de expansão e oportunidades conjuntas.",
    },
    {
      title: "Regra Chatham House",
      desc: "Sigilo absoluto para compartilhamento sincero de informações.",
    },
  ])

  const [inclusions, setInclusions] = React.useState<string[]>([
    "Acesso ao salão privativo",
    "Menu autoral e carta de vinhos",
    "Suporte e atendimento dedicado ClubKey",
  ])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Por favor, preencha o título do evento.")
      return
    }

    if (!place.trim()) {
      toast.error("Por favor, preencha o local do evento.")
      return
    }

    setIsSubmitting(true)

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

    const newEvent: AdminEvent = {
      id: ADMIN_EVENTS.length + 1,
      code: `EVT-2026-${String(ADMIN_EVENTS.length + 1).padStart(3, "0")}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      category,
      format,
      dressCode,
      tierRequired,
      desc,
      day: String(dateObj.getDate()).padStart(2, "0"),
      month: months[dateObj.getMonth()] || "OUT",
      weekday: weekdays[dateObj.getDay()] || "Sexta",
      date: dateObj.toISOString().split("T")[0] || "2026-10-15",
      time,
      place,
      city,
      capacity: Number(capacity) || 15,
      initialConfirmed: Number(initialConfirmed) || 0,
      price: Number(price) || 0,
      xp: Number(xp) || 300,
      status: "PUBLICADO",
      image,
      highlights: highlights.filter((h) => h.title.trim()),
      inclusions: inclusions.filter((inc) => inc.trim()),
      participants: [],
      organizerId: 0,
      host: {
        firstName: hostFirstName,
        lastName: hostLastName,
        role: hostRole,
        avatar: hostAvatar,
      },
      createdAt: new Date().toISOString().split("T")[0],
    }

    ADMIN_EVENTS.unshift(newEvent)

    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Evento cadastrado com sucesso!", {
        description: `O evento "${title}" foi publicado na plataforma.`,
      })
      router.push("/eventos")
    }, 400)
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
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
          Novo Evento
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
            Cadastrar Novo Evento
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Preencha todos os parâmetros de realização, curadoria de anfitrião,
            lotação e gamificação.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <CtaButton href="/eventos" variant="outline" size="sm">
            Cancelar
          </CtaButton>
          <CtaButton
            type="submit"
            variant="primary"
            size="sm"
            form="create-event-form"
            disabled={isSubmitting}
          >
            <FloppyDiskBack size={14} weight="bold" />
            <span>{isSubmitting ? "Criando..." : "Criar Evento"}</span>
          </CtaButton>
        </div>
      </div>

      <form
        id="create-event-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible">
          <div className="space-y-10">
            <div className="space-y-5">
              <FormSectionTitle
                title="Informações Básicas"
                description="Dados de identificação, classificação, formato e visibilidade por tier."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Título do Evento *
                  </label>
                  <Input
                    placeholder="Ex: Jantar de Networking & Negócios"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
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
                    placeholder="Ex: Smart Casual / Business"
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
                    placeholder="Descreva a dinâmica, objetivos, regras e tópicos abordados no encontro..."
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
                    Data do Evento *
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
                    Horário de Início
                  </label>
                  <Input
                    placeholder="Ex: 20h00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Espaço / Local *
                  </label>
                  <Input
                    placeholder="Ex: Casa Alpha, Jardins"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Cidade / UF
                  </label>
                  <Input
                    placeholder="Ex: São Paulo, SP"
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
                      placeholder="Título do destaque (ex: Regra Chatham House)"
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
            disabled={isSubmitting}
          >
            <FloppyDiskBack size={14} weight="bold" />
            <span>{isSubmitting ? "Criando..." : "Criar Evento"}</span>
          </CtaButton>
        </div>
      </form>
    </Container>
  )
}
