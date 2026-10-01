"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { MOCK_CLAIMS } from "@/src/data/mocks/sinistros.data"
import type { AdminClaim, ClaimDocument, ClaimMessage, ClaimStatus } from "@clubkey/types"
import {
  Card,
  CardBody,
  CardHeader,
  CtaButton,
  Select,
  type SelectOption,
  TableStatusBadge,
  TableTitle,
  toast,
} from "@clubkey/ui"
import { cn, formatCurrency } from "@clubkey/utils"
import {
  CalendarBlank,
  CaretLeft,
  CheckCircle,
  ClockCountdown,
  DownloadSimple,
  FilePdf,
  HouseLine,
  Image as ImageIcon,
  PaperPlaneRight,
  ShieldCheck,
  Tag,
  UploadSimple,
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
      <Container className="space-y-6 py-8">
        <div className="flex items-center gap-2">
          <Link
            href="/sinistros"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <CaretLeft size={16} weight="bold" />
            <span>Voltar para Sinistros</span>
          </Link>
        </div>

        <div className="p-12 text-center border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] rounded-2xl shadow-2xs max-w-md mx-auto space-y-4">
          <div className="size-14 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
            <WarningCircle size={28} weight="bold" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Sinistro não encontrado
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              O identificador <code className="font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{slug}</code> não corresponde a nenhum sinistro registrado.
            </p>
          </div>
          <CtaButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/sinistros")}
          >
            Retornar à Listagem de Sinistros
          </CtaButton>
        </div>
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

    setClaim((prev) => (prev ? { ...prev, timeline: [...prev.timeline, messageObj] } : prev))
    setNewMessage("")
    toast.success("Mensagem enviada no histórico de acompanhamento.")
  }

  return (
    <div className="w-full flex flex-col pb-12">
      
      <div className="w-full bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-200/80 dark:border-zinc-800 py-6 mb-8">
        <Container className="space-y-4">
          
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <Link
                href="/sinistros"
                className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <CaretLeft size={14} weight="bold" />
                <span>Sinistros</span>
              </Link>
              <span>/</span>
              <span className="font-mono text-zinc-900 dark:text-white font-bold">
                {claim.code}
              </span>
              <span>/</span>
              <span className="text-zinc-400 dark:text-zinc-500">Detalhes</span>
            </div>

            <div>{getClaimStatusBadge(claim.status)}</div>
          </div>

          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
                  {claim.typeLabel} — {claim.propertyTitle}
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap">
                <span>Segurado: <strong className="text-zinc-900 dark:text-white font-bold">{claim.insuredName}</strong></span>
                <span>•</span>
                <span>Data do Ocorrido: <strong className="text-zinc-900 dark:text-white font-bold">{claim.occurredDate}</strong></span>
                <span>•</span>
                <span>Local: <strong className="text-zinc-900 dark:text-white font-bold">{claim.propertyLocation}</strong></span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Informações Gerais do Ocorrido
                </span>
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
                  {claim.code}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                    Tipo de Cobertura
                  </span>
                  <p className="font-bold text-zinc-900 dark:text-white text-xs">
                    {claim.typeLabel}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                    Data da Ocorrência
                  </span>
                  <p className="font-bold text-zinc-900 dark:text-white text-xs">
                    {claim.occurredDate}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                    Imóvel / Acomodação
                  </span>
                  <p className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                    {claim.propertyTitle}
                  </p>
                  <span className="text-[10px] text-zinc-400">
                    {claim.propertyLocation} {claim.propertyInternalCode && `• Cód: ${claim.propertyInternalCode}`}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                    Reserva & Hóspede
                  </span>
                  <p className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                    {claim.reservationCode ? `Reserva #${claim.reservationCode}` : "Não informada"}
                  </p>
                  {claim.guestName && (
                    <span className="text-[10px] text-zinc-400">
                      Hóspede: {claim.guestName}
                    </span>
                  )}
                </div>
              </div>

              
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Relato & Descrição do Dano
                </span>
                <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {claim.description}
                </div>
              </div>

              {claim.estimatedAmount && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 text-xs">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Valor Estimado do Prejuízo:
                  </span>
                  <span className="font-mono font-bold text-sm text-orange-600 dark:text-orange-400">
                    {formatCurrency(claim.estimatedAmount)}
                  </span>
                </div>
              )}
            </div>

            
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  Documentos & Evidências Anexadas ({claim.documents.length})
                </span>
              </div>

              {claim.documents.length === 0 ? (
                <div className="py-8 text-center text-zinc-400 dark:text-zinc-500 text-xs">
                  Nenhum documento ou foto anexado a este sinistro.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {claim.documents.map((doc) => {
                    const isImg = doc.fileType === "image" || doc.fileName.endsWith(".jpg") || doc.fileName.endsWith(".png")

                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-9 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
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
                          onClick={() => toast.success(`Baixando anexo: ${doc.fileName}`)}
                          className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
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
          </div>

          
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white block border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Regulação & Atualizar Status
              </span>

              <form onSubmit={handleSaveStatus} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Selecione o novo status
                  </label>
                  <Select
                    size="sm"
                    options={STATUS_SELECT_OPTIONS}
                    value={selectedStatus}
                    onValueChange={(val) => setSelectedStatus(val as ClaimStatus)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Observação Pericial / Despacho
                  </label>
                  <textarea
                    rows={3}
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="A observação será salva no histórico com a mudança de status..."
                    className="w-full rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-3 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <CtaButton
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={isSubmittingStatus}
                  className="w-full"
                >
                  <span>{isSubmittingStatus ? "Salvando..." : "Salvar Alterações"}</span>
                </CtaButton>
              </form>
            </div>

            
            <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white block border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  Acompanhamento & Histórico
                </span>

                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 [scrollbar-width:thin]">
                  {claim.timeline.length === 0 ? (
                    <div className="py-6 text-center text-xs text-zinc-400">
                      Nenhuma mensagem ou despacho registrado ainda.
                    </div>
                  ) : (
                    claim.timeline.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {msg.authorName}{" "}
                            <span className="text-[9px] text-zinc-400 font-normal">
                              ({msg.authorRole})
                            </span>
                          </span>
                          <span className="text-zinc-400 font-medium">
                            {msg.createdAt}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="relative">
                  <textarea
                    rows={2}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Envie uma mensagem de acompanhamento..."
                    className="w-full rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-3 pr-10 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="absolute right-2.5 bottom-3.5 size-7 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:pointer-events-none text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Enviar mensagem"
                  >
                    <PaperPlaneRight size={14} weight="bold" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
