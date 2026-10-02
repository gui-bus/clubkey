"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { MOCK_CLAIMS } from "@/src/data/mocks/sinistros.data"
import type { AdminClaim, ClaimMessage, ClaimStatus } from "@clubkey/types"
import {
  Card,
  CtaButton,
  FormSectionTitle,
  Input,
  Select,
  type SelectOption,
  TableStatusBadge,
  toast,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  CalendarBlank,
  CaretLeft,
  CheckCircle,
  ClockCountdown,
  DownloadSimple,
  FilePdf,
  FloppyDiskBack,
  Image as ImageIcon,
  MapPin,
  PaperPlaneRight,
  ShieldCheck,
  ShieldWarning,
  Tag,
  User,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

export interface SinistroDetailClientProps {
  slug: string
}

const STATUS_SELECT_OPTIONS: SelectOption[] = [
  { value: "ABERTO", label: "Aberto" },
  { value: "EM_ANALISE", label: "Em Análise" },
  { value: "PAGO", label: "Pago / Indenizado" },
  { value: "RECUSADO", label: "Recusado" },
]

export function SinistroDetailClient({
  slug,
}: SinistroDetailClientProps): React.JSX.Element {
  const router = useRouter()

  const initialClaim = React.useMemo(() => {
    return (
      MOCK_CLAIMS.find(
        (c) =>
          c.slug.toLowerCase() === slug.toLowerCase() ||
          c.id === slug ||
          c.code.toLowerCase() === slug.toLowerCase()
      ) || null
    )
  }, [slug])

  const [claim, setClaim] = React.useState<AdminClaim | null>(initialClaim)
  const [selectedStatus, setSelectedStatus] = React.useState<ClaimStatus>(
    initialClaim?.status || "ABERTO"
  )
  const [statusNote, setStatusNote] = React.useState("")
  const [newMessage, setNewMessage] = React.useState("")
  const [isSubmittingStatus, setIsSubmittingStatus] = React.useState(false)

  if (!claim) {
    return (
      <Container className="space-y-6 py-6 sm:py-8">
        <div className="flex items-center gap-2">
          <Link
            href="/sinistros"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <CaretLeft size={16} weight="bold" />
            <span>Voltar para Sinistros</span>
          </Link>
        </div>

        <Card className="p-12 text-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] rounded-sm shadow-2xs">
          <div className="space-y-4 max-w-md mx-auto">
            <div className="size-12 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <WarningCircle size={24} weight="bold" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Sinistro não encontrado
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                O identificador ou código{" "}
                <code className="font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-xs">
                  {slug}
                </code>{" "}
                não corresponde a nenhum sinistro registrado no sistema.
              </p>
            </div>
            <CtaButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push("/sinistros")}
              className="mt-2"
            >
              Retornar à Listagem
            </CtaButton>
          </div>
        </Card>
      </Container>
    )
  }

  const getClaimStatusBadge = (st: ClaimStatus) => {
    switch (st) {
      case "ABERTO":
        return (
          <TableStatusBadge
            variant="warning"
            label="Aberto"
            icon={<WarningCircle size={36} weight="fill" />}
          />
        )
      case "EM_ANALISE":
        return (
          <TableStatusBadge
            variant="info"
            label="Em Análise"
            icon={<ClockCountdown size={36} weight="bold" />}
          />
        )
      case "PAGO":
        return (
          <TableStatusBadge
            variant="success"
            label="Pago"
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "RECUSADO":
        return (
          <TableStatusBadge
            variant="danger"
            label="Recusado"
            icon={<XCircle size={36} weight="fill" />}
          />
        )
      default:
        return null
    }
  }

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingStatus(true)

    setTimeout(() => {
      setClaim((prev) => {
        if (!prev) return prev
        const updatedTimeline = [...prev.timeline]
        if (statusNote.trim()) {
          updatedTimeline.push({
            id: `msg-${Date.now()}`,
            authorName: "Regulação ClubKey",
            authorRole: "Regulador Admin",
            content: `Status alterado para "${selectedStatus}". Observação: ${statusNote.trim()}`,
            createdAt: "Agora mesmo",
          })
        }
        return {
          ...prev,
          status: selectedStatus,
          timeline: updatedTimeline,
        }
      })

      setIsSubmittingStatus(false)
      setStatusNote("")
      toast.success("Status atualizado com sucesso!", {
        description: `O sinistro ${claim.code} agora está marcado como ${selectedStatus}.`,
      })
    }, 500)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const messageObj: ClaimMessage = {
      id: `msg-${Date.now()}`,
      authorName: "Equipe de Regulação",
      authorRole: "Admin",
      content: newMessage.trim(),
      createdAt: "Agora mesmo",
    }

    setClaim((prev) =>
      prev ? { ...prev, timeline: [...prev.timeline, messageObj] } : prev
    )
    setNewMessage("")
    toast.success("Mensagem enviada no histórico de acompanhamento.")
  }

  return (
    <Container className="space-y-6 py-6 sm:py-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <Link
          href="/sinistros"
          className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <CaretLeft size={14} weight="bold" />
          <span>Sinistros</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold font-mono">
          {claim.code}
        </span>
        <span>/</span>
        <span className="text-zinc-500 capitalize">Detalhes</span>
      </div>

      <div className="w-full py-1">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 min-w-0 flex-1">
            <div className="relative shrink-0">
              <div className="size-20 sm:size-24 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-xs">
                <ShieldWarning size={42} weight="duotone" />
              </div>
            </div>

            <div className="space-y-3 min-w-0 flex-1 pt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
                    {claim.typeLabel} — {claim.propertyTitle}
                  </h2>
                  <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-xs">
                    {claim.code}
                  </span>
                  {claim.reservationCode && (
                    <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-xs">
                      Reserva #{claim.reservationCode}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {getClaimStatusBadge(claim.status)}
                </div>
              </div>

              <div className="flex items-center gap-y-1.5 gap-x-4 text-xs text-zinc-600 dark:text-zinc-400 font-medium flex-wrap">
                <div className="inline-flex items-center gap-1.5">
                  <User size={14} className="text-zinc-400 shrink-0" weight="bold" />
                  <span>
                    Segurado:{" "}
                    <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                      {claim.insuredName}
                    </strong>
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <CalendarBlank size={14} className="text-zinc-400 shrink-0" weight="bold" />
                  <span>
                    Ocorrência:{" "}
                    <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                      {claim.occurredDate}
                    </strong>
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-zinc-400 shrink-0" weight="bold" />
                  <span>{claim.propertyLocation}</span>
                </div>

                {claim.guestName && (
                  <div className="inline-flex items-center gap-1.5">
                    <Tag size={14} className="text-zinc-400 shrink-0" weight="bold" />
                    <span>
                      Hóspede:{" "}
                      <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                        {claim.guestName}
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {claim.estimatedAmount && (
            <div className="shrink-0 w-full lg:w-auto self-start lg:self-center">
              <div className="space-y-1.5 text-left lg:text-right">
                <div className="flex items-center lg:justify-end gap-1.5 text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={13} weight="bold" className="text-orange-500" />
                  <span>Prejuízo Estimado</span>
                </div>

                <div className="flex items-center lg:justify-end gap-1.5">
                  <span className="font-mono font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-tight">
                    {formatCurrency(claim.estimatedAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible">
        <div className="space-y-10">
          <div className="space-y-5">
            <FormSectionTitle
              title="Informações da Ocorrência & Imóvel"
              description="Dados cadastrais do imóvel segurado, reserva associada e descrição do incidente."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Imóvel / Acomodação
                </label>
                <Input value={claim.propertyTitle} readOnly />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Localidade
                </label>
                <Input value={claim.propertyLocation} readOnly />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Tipo de Cobertura
                </label>
                <Input value={claim.typeLabel} readOnly />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Data da Ocorrência
                </label>
                <Input value={claim.occurredDate} readOnly />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Segurado Responsável
                </label>
                <Input
                  value={`${claim.insuredName} ${claim.insuredDocument ? `(${claim.insuredDocument})` : ""}`}
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Reserva & Hóspede
                </label>
                <Input
                  value={
                    claim.reservationCode
                      ? `Reserva #${claim.reservationCode}${claim.guestName ? ` • Hóspede: ${claim.guestName}` : ""}`
                      : "Não informada"
                  }
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-1.5 col-span-full">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Relato Detalhado do Incidente
                </label>
                <div className="p-4 rounded-sm bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {claim.description}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <FormSectionTitle
              title={`Documentos & Evidências Anexadas (${claim.documents.length})`}
              description="Laudos periciais, relatórios de vistoria e fotografias comprobatórias."
            />

            {claim.documents.length === 0 ? (
              <div className="py-6 text-center text-xs text-zinc-400">
                Nenhum documento ou foto anexado a este sinistro.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {claim.documents.map((doc) => {
                  const isImg =
                    doc.fileType === "image" ||
                    doc.fileName.endsWith(".jpg") ||
                    doc.fileName.endsWith(".png")

                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3.5 rounded-sm bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-9 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                          {isImg ? (
                            <ImageIcon size={18} weight="bold" />
                          ) : (
                            <FilePdf size={18} weight="bold" />
                          )}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                            {doc.title || doc.fileName}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
                            {doc.fileName} • {doc.fileSize}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          toast.success(`Baixando anexo: ${doc.fileName}`)
                        }
                        className="size-8 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
                        title="Baixar anexo"
                      >
                        <DownloadSimple size={14} weight="bold" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <FormSectionTitle
              title="Regulação Pericial & Atualização de Status"
              description="Defina o parecer regulatório e o status atualizado do processo de indenização."
            />

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Status da Regulação
                  </label>
                  <Select
                    options={STATUS_SELECT_OPTIONS}
                    value={selectedStatus}
                    onValueChange={(val) =>
                      setSelectedStatus(val as ClaimStatus)
                    }
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Valor Indenizado / Aprovado (R$)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    defaultValue={claim.approvedAmount || ""}
                  />
                </div>

                <div className="flex flex-col gap-1.5 col-span-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Despacho Pericial / Observação
                  </label>
                  <textarea
                    rows={3}
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="Registre aqui as conclusões da vistoria pericial ou motivos de aprovação/recusa..."
                    className="w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-3 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-2">
                <CtaButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmittingStatus}
                  className="w-full sm:w-auto"
                >
                  <FloppyDiskBack size={15} weight="bold" className="mr-1.5" />
                  <span>
                    {isSubmittingStatus ? "Salvando..." : "Salvar Alterações"}
                  </span>
                </CtaButton>
              </div>
            </form>
          </div>

          <div className="space-y-5">
            <FormSectionTitle
              title="Histórico de Acompanhamento & Mensagens"
              description="Registro cronológico de despachos, comunicados e interações regulatórias."
            />

            <div className="space-y-4">
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 [scrollbar-width:thin]">
                {claim.timeline.length === 0 ? (
                  <div className="py-6 text-center text-xs text-zinc-400">
                    Nenhum despacho ou mensagem registrado ainda.
                  </div>
                ) : (
                  claim.timeline.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-sm bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-zinc-900 dark:text-white">
                          {msg.authorName}{" "}
                          <span className="text-[10px] text-zinc-400 font-normal">
                            ({msg.authorRole})
                          </span>
                        </span>
                        <span className="text-zinc-400 font-mono text-[10px]">
                          {msg.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {msg.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800"
              >
                <div className="relative">
                  <textarea
                    rows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Envie uma nova mensagem no histórico..."
                    className="w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-3 pr-12 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="absolute right-3 bottom-3 size-7 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Enviar mensagem"
                  >
                    <PaperPlaneRight size={14} weight="bold" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  )
}
