"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  Bed,
  Buildings,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Coffee,
  Copy,
  Info,
  MapPin,
  ShieldCheck,
  ShieldWarning,
  Ticket,
  Users,
  Wine,
  XCircle,
} from "@phosphor-icons/react"

import { formatBRL } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Container } from "@/src/components/common/container"
import { BackButton } from "@/src/components/portal/BackButton"
import { GlassBadge } from "@/src/components/portal/GlassBadge"
import { ShareButton } from "@/src/components/portal/ShareButton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alertDialog/alertDialog"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"

export default function MinhaHospedagemDetailPage(): React.JSX.Element {
  const params = useParams()
  const router = useRouter()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const stayReservationId = String(idParam)
  const { memberStays, cancelStay, resetStays, userProfile } = usePortalStore()

  const stay = memberStays.find((s) => s.id === stayReservationId)

  if (!stay) {
    notFound()
  }

  const [copied, setCopied] = React.useState(false)

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText(stay.confirmationCode)
    setCopied(true)
    toast.success("Código do voucher copiado!", {
      description: `Código ${stay.confirmationCode} copiado para a área de transferência.`,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCancel = () => {
    cancelStay(stay.id)
    router.push("/hospedagens/minhas-hospedagens")
    toast.info(`Reserva em ${stay.stayName} cancelada.`, {
      description: "Nossa equipe foi notificada para o cancelamento e estorno.",
      action: {
        label: "Desfazer",
        onClick: () => resetStays(),
      },
    })
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-24 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <BackButton
          fallbackHref="/hospedagens/minhas-hospedagens"
          label="Voltar para Minhas Hospedagens"
        />
        <ShareButton title={`Minha Reserva em ${stay.stayName}`} />
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-brand-primary tracking-wider uppercase mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{stay.location}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight leading-tight">
          {stay.stayName}
        </h1>
        <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1.5 flex items-center gap-2 flex-wrap">
          <span>{stay.roomType}</span>
          <span>•</span>
          <span>{stay.guests} hóspedes</span>
          <span>•</span>
          <span>{stay.nights} {stay.nights === 1 ? "diária" : "diárias"}</span>
          <span>•</span>
          <span className="font-mono text-brand-primary font-bold">Voucher: {stay.confirmationCode}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="relative rounded-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-950 aspect-[16/9] w-full shadow-xs">
            <Image
              src={stay.image}
              alt={stay.stayName}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

            <div className="absolute top-4 left-4 z-10">
              <GlassBadge icon={<Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />}>
                Reserva Confirmada
              </GlassBadge>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3 p-3 rounded-sm bg-black/60 backdrop-blur-md border border-white/15 text-white">
              <div className="flex flex-col items-center justify-center min-w-12 px-2.5 py-1.5 rounded-sm bg-brand-primary text-white text-center shrink-0">
                <span className="text-xl font-black font-heading leading-none">
                  {stay.nights}
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider leading-none mt-0.5">
                  {stay.nights === 1 ? "noite" : "noites"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white uppercase tracking-wider truncate">
                  Período Confirmado: {stay.checkIn} — {stay.checkOut}
                </p>
                <p className="text-[11px] text-zinc-300 flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span>Check-in a partir das 15h00 • Check-out até às 12h00</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="relative overflow-hidden p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-1 shadow-xs">
              <MapPin className="absolute -right-2 -bottom-2 w-16 h-16 text-zinc-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block relative z-10">
                Destino
              </span>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate relative z-10">
                {stay.location}
              </p>
            </div>

            <div className="relative overflow-hidden p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-1 shadow-xs">
              <Bed className="absolute -right-2 -bottom-2 w-16 h-16 text-zinc-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block relative z-10">
                Suíte
              </span>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate relative z-10">
                {stay.roomType}
              </p>
            </div>

            <div className="relative overflow-hidden p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-1 shadow-xs">
              <Calendar className="absolute -right-2 -bottom-2 w-16 h-16 text-zinc-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block relative z-10">
                Duração
              </span>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate relative z-10">
                {stay.nights} noites
              </p>
            </div>

            <div className="relative overflow-hidden p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-1 shadow-xs">
              <Users className="absolute -right-2 -bottom-2 w-16 h-16 text-zinc-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block relative z-10">
                Capacidade
              </span>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate relative z-10">
                {stay.guests} pessoas
              </p>
            </div>
          </div>

          <section className="p-6 sm:p-7 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Sobre a acomodação reservada
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Sua estadia na propriedade {stay.stayName} foi garantida através do benefício exclusivo de membro ClubKey. O empreendimento oferece curadoria premium de hospitalidade, privacidade absoluta e infraestrutura de alta gastronomia, bem-estar e lazer.
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              No momento do check-in, apresente o voucher oficial impresso ou em formato digital no smartphone acompanhado de um documento de identidade com foto do titular da reserva.
            </p>
          </section>

          <section className="p-6 sm:p-7 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Benefícios Exclusivos Inclusos na Reserva</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 dark:text-zinc-300 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800/60">
                <Coffee className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Café da manhã à la carte cortesia</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800/60">
                <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Early check-in & late check-out prioritário</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800/60">
                <Wine className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Boas-vindas especial na acomodação</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800/60">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Upgrade de categoria sujeito a disponibilidade</span>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-7 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Instruções de Check-in & Políticas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  <span>Horários</span>
                </div>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5 leading-relaxed">
                  <li>• Check-in: a partir das 15:00</li>
                  <li>• Check-out: até às 12:00</li>
                  <li>• Recepção 24 horas disponível para recepção</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm">
                  <ShieldWarning className="w-4 h-4 text-brand-primary" />
                  <span>Cancelamento & Reagendamento</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Cancelamento gratuito e sem ônus com até 7 dias de antecedência da data de entrada. Para alteração de datas, utilize os canais oficiais do portal.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-5 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                  Status da Reserva
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Confirmada</span>
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                Benefício ClubKey
              </span>
            </div>

            <div className="space-y-2 text-center p-4 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
                Código Oficial do Voucher
              </span>
              <span className="font-mono text-2xl font-black text-zinc-900 dark:text-white block tracking-widest">
                {stay.confirmationCode}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
                Titular: <strong className="text-zinc-900 dark:text-white font-semibold">{userProfile.name}</strong>
              </span>
            </div>

            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div className="flex justify-between items-center">
                <span>Check-in:</span>
                <strong className="text-zinc-900 dark:text-white font-semibold">{stay.checkIn.split(",")[0]}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Check-out:</span>
                <strong className="text-zinc-900 dark:text-white font-semibold">{stay.checkOut.split(",")[0]}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Total de diárias:</span>
                <strong className="text-zinc-900 dark:text-white font-semibold">{stay.nights} noites</strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Hóspedes:</span>
                <strong className="text-zinc-900 dark:text-white font-semibold">{stay.guests} pessoas</strong>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                <span>Total da reserva:</span>
                <span className="text-base font-heading font-black text-zinc-900 dark:text-white">
                  {formatBRL(stay.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                <span>Status financeiro:</span>
                <span>Quitado ✓</span>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={handleCopyVoucher}
                className={cn(
                  "relative w-full h-11 rounded-sm font-black uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]",
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-brand-primary hover:bg-brand-primary/90 text-white"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: 3, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -3, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Código Copiado!</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, y: 3, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -3, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copiar Código do Voucher</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full text-center text-xs font-semibold text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors py-2 cursor-pointer flex items-center justify-center gap-1.5 rounded-sm hover:bg-rose-500/5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Solicitar cancelamento da reserva</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Cancelar reserva em {stay.stayName}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja solicitar o cancelamento desta reserva ({stay.roomType} • {stay.checkIn})? Nossa equipe de atendimento será notificada para o processo de estorno.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Manter reserva</AlertDialogCancel>
                    <AlertDialogAction
                      color="danger"
                      onClick={handleCancel}
                    >
                      Confirmar cancelamento
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
