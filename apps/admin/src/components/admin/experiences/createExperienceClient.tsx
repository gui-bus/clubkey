"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { ADMIN_EXPERIENCES } from "@/src/data/mocks/experiences.data"
import type { AdminExperience } from "@clubkey/types"
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
  "Gastronomia & Vinhos",
  "Aviação & Lifestyle",
  "Náutica & Vela",
  "Esportes & Lifestyle",
  "Gastronomia & Destilados",
  "Ecoturismo & Aventura",
  "Arte & Cultura",
  "Alta Gastronomia",
]

const TIERS = [
  "Todos os Membros",
  "Investidor & Incorporador",
  "Black & Diamante",
  "Patrono Exclusive",
]

export function CreateExperienceClient(): React.JSX.Element {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [title, setTitle] = React.useState("")
  const [sub, setSub] = React.useState("12 vagas")
  const [category, setCategory] = React.useState("Gastronomia & Vinhos")
  const [tierRequired, setTierRequired] = React.useState("Todos os Membros")
  const [desc, setDesc] = React.useState("")

  const [expDate, setExpDate] = React.useState<Date | undefined>(new Date())
  const [time, setTime] = React.useState("20h00")
  const [place, setPlace] = React.useState("")
  const [city, setCity] = React.useState("São Paulo, SP")

  const [capacity, setCapacity] = React.useState("12")
  const [confirmed, setConfirmed] = React.useState("0")
  const [price, setPrice] = React.useState("780")
  const [xp, setXp] = React.useState("450")

  const [image, setImage] = React.useState(
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=80"
  )

  const [includes, setIncludes] = React.useState<string[]>([
    "Sommelier dedicado",
    "Harmonização em 5 tempos",
    "Traslado executivo",
  ])
  const [newIncludeText, setNewIncludeText] = React.useState("")

  const handleAddInclude = () => {
    if (!newIncludeText.trim()) return
    setIncludes((prev) => [...prev, newIncludeText.trim()])
    setNewIncludeText("")
  }

  const handleRemoveInclude = (idx: number) => {
    setIncludes((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Por favor, informe o título da experiência.")
      return
    }

    if (!place.trim()) {
      toast.error("Por favor, informe o local da experiência.")
      return
    }

    setIsSubmitting(true)

    const dateObj = expDate || new Date()
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

    const newExp: AdminExperience = {
      id: ADMIN_EXPERIENCES.length + 1,
      code: `EXP-2026-${String(ADMIN_EXPERIENCES.length + 1).padStart(3, "0")}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      sub,
      category,
      tierRequired,
      desc,
      day: String(dateObj.getDate()).padStart(2, "0"),
      month: months[dateObj.getMonth()] || "OUT",
      weekday: weekdays[dateObj.getDay()] || "Sexta",
      date: dateObj.toISOString().split("T")[0] || "2026-10-15",
      time,
      place,
      city,
      capacity: Number(capacity) || 12,
      confirmed: Number(confirmed) || 0,
      price: Number(price) || 0,
      xp: Number(xp) || 450,
      status: "DISPONIVEL",
      image,
      includes: includes.filter((inc) => inc.trim()),
      participants: [],
      createdAt: new Date().toISOString().split("T")[0],
    }

    ADMIN_EXPERIENCES.unshift(newExp)

    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Experiência cadastrada com sucesso!", {
        description: `A experiência "${title}" foi publicada no catálogo.`,
      })
      router.push("/experiencias")
    }, 400)
  }

  return (
    <Container className="space-y-6 py-6 sm:py-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <Link
          href="/experiencias"
          className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <CaretLeft size={14} weight="bold" />
          <span>Experiências</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
          Nova Experiência
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-5">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
            Cadastrar Nova Experiência
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Preencha a curadoria de lifestyle, itinerário, benefícios inclusos e
            precificação da experiência.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <CtaButton href="/experiencias" variant="outline" size="sm">
            Cancelar
          </CtaButton>
          <CtaButton
            type="submit"
            variant="primary"
            size="sm"
            form="create-experience-form"
            disabled={isSubmitting}
          >
            <FloppyDiskBack size={14} weight="bold" />
            <span>{isSubmitting ? "Criando..." : "Criar Experiência"}</span>
          </CtaButton>
        </div>
      </div>

      <form
        id="create-experience-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible">
          <div className="space-y-10">
            <div className="space-y-5">
              <FormSectionTitle
                title="Informações Básicas"
                description="Dados principais, categoria, subtítulo e elegibilidade por tier."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Título da Experiência *
                  </label>
                  <Input
                    placeholder="Ex: Degustação Privada & Harmonização de Vinhos"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Subtítulo / Destaque
                  </label>
                  <Input
                    placeholder="Ex: 12 vagas exclusivas"
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
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

                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Descrição Detalhada
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Descreva a experiência, história, itinerário e diferenciais..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <FormSectionTitle
                title="Data, Horário & Localização"
                description="Localização e agenda da realização da experiência."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Data da Experiência
                  </label>
                  <DatePicker
                    mode="single"
                    className="w-full"
                    value={expDate}
                    onChange={(d?: Date) => d && setExpDate(d)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Horário
                  </label>
                  <Input
                    placeholder="Ex: 20h00 ou Sob agendamento"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Espaço / Local *
                  </label>
                  <Input
                    placeholder="Ex: Adega Gran Cru, Jardins"
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
                title="Capacidade, Valores & Gamificação"
                description="Lotação máxima, custo por participante e pontuação distribuída."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Vagas Totais
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
                    value={confirmed}
                    onChange={(e) => setConfirmed(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Valor por Pessoa (R$)
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
                title="Mídia & Imagem Principal"
                description="Imagem de exibição da experiência no catálogo."
              />

              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    URL da Imagem
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
                title="O que está Incluso"
                description="Serviços, degustações, transportes e amenidades inclusas."
              />

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ex: Sommelier dedicado, traslado executivo..."
                    value={newIncludeText}
                    onChange={(e) => setNewIncludeText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddInclude()
                      }
                    }}
                  />
                  <CtaButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddInclude}
                    className="shrink-0"
                  >
                    <Plus size={14} weight="bold" />
                    <span>Incluir</span>
                  </CtaButton>
                </div>

                <div className="space-y-1.5 pt-2">
                  {includes.map((item, idx) => (
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
                        onClick={() => handleRemoveInclude(idx)}
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
            onClick={() => router.push("/experiencias")}
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
            <span>{isSubmitting ? "Criando..." : "Criar Experiência"}</span>
          </CtaButton>
        </div>
      </form>
    </Container>
  )
}
