"use client"

import * as React from "react"

import { usePortalStore } from "@/src/store/usePortalStore"
import type { Member } from "@/src/types"
import {
  Check,
  Hourglass,
  PaperPlaneRight,
  PencilSimple,
  Plus,
  Tag,
  UserPlus,
} from "@phosphor-icons/react"

import { Textarea } from "@/src/components/ui/textarea/textarea"

import { CtaButton } from "@/src/components/common/ctaButton"
import { MemberCustomTagsDialog } from "@/src/components/portal/memberCustomTagsDialog"

import { cn } from "@/src/lib/utils"

import { isModuleEnabled } from "@/src/config/brand.config"

interface MemberProfileSidebarProps {
  member: Member
  status: "connected" | "pending" | "none"
  memberEventsCount: number
  messageText: string
  onMessageTextChange: (text: string) => void
  onConnectToggle: () => void
  onSendMessage: () => void
}

export function MemberProfileSidebar({
  member,
  status,
  memberEventsCount,
  messageText,
  onMessageTextChange,
  onConnectToggle,
  onSendMessage,
}: MemberProfileSidebarProps): React.JSX.Element {
  const { customTags } = usePortalStore()
  const [isTagDialogOpen, setIsTagDialogOpen] = React.useState(false)
  const firstName = member.firstName
  const memberTags = customTags?.[member.id] || []

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
            Conexão Direta • Canal do Clube
          </span>
          <div className="flex items-baseline justify-between gap-2 pt-1">
            <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading leading-none">
              {status === "connected"
                ? "Conectado"
                : status === "pending"
                  ? "Aguardando"
                  : "Disponível"}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              {member.memberSince
                ? `Desde ${member.memberSince}`
                : "Membro Ativo"}
            </span>
          </div>
          <p className="text-xs text-zinc-900 dark:text-white pt-1 leading-relaxed font-normal">
            Ao conectar, {firstName} receberá seu perfil com suas tags de busca
            e oferta para abertura de diálogo.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {status === "connected" ? (
            <CtaButton
              type="button"
              variant="filled"
              size="md"
              isFullWidth
              onClick={onConnectToggle}
              className="h-12 text-xs shadow-none hover:shadow-none border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              sliderClassName="bg-emerald-500/25"
              textClassName="text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
            >
              <Check className="w-4 h-4 mr-2 shrink-0" />
              <span>Conectado • Desconectar</span>
            </CtaButton>
          ) : status === "pending" ? (
            <CtaButton
              type="button"
              variant="filled"
              size="md"
              isFullWidth
              onClick={onConnectToggle}
              className="h-12 text-xs shadow-none hover:shadow-none border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400"
              sliderClassName="bg-sky-500/25"
              textClassName="text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors"
            >
              <Hourglass className="w-4 h-4 mr-2 shrink-0 text-sky-500" />
              <span>Solicitação enviada • Cancelar</span>
            </CtaButton>
          ) : (
            <CtaButton
              type="button"
              variant="primary"
              size="md"
              isFullWidth
              onClick={onConnectToggle}
              className="h-12 text-xs shadow-none hover:shadow-none"
            >
              <UserPlus className="w-4 h-4 mr-2 shrink-0" />
              <span>Solicitar conexão</span>
            </CtaButton>
          )}
        </div>

        <div className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
            Enviar Mensagem
          </span>
          <Textarea
            placeholder={`Escreva uma mensagem para ${firstName}...`}
            value={messageText}
            onChange={(e) => onMessageTextChange(e.target.value)}
            size="sm"
            radius="sm"
            minRows={3}
            autoResize
          />
          <CtaButton
            type="button"
            variant="primary"
            size="sm"
            isFullWidth
            onClick={onSendMessage}
            className="h-10 text-xs shadow-none hover:shadow-none"
          >
            <PaperPlaneRight className="w-3.5 h-3.5 mr-2 shrink-0" />
            Enviar mensagem
          </CtaButton>
        </div>

        
        {status === "connected" && (
          <div className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                <span>Minhas Tags Privadas</span>
              </span>
              <button
                type="button"
                onClick={() => setIsTagDialogOpen(true)}
                className="text-[10px] font-bold text-brand-primary hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                {memberTags.length > 0 ? (
                  <PencilSimple className="w-2.5 h-2.5" />
                ) : (
                  <Plus className="w-2.5 h-2.5" />
                )}
                <span>{memberTags.length > 0 ? "Gerenciar" : "Adicionar"}</span>
              </button>
            </div>

            {memberTags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {memberTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => setIsTagDialogOpen(true)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium border border-zinc-200/60 dark:border-zinc-700/60 hover:border-brand-primary/50 transition-colors cursor-pointer"
                    title="Clique para editar tags"
                  >
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p
                onClick={() => setIsTagDialogOpen(true)}
                className="text-xs text-zinc-400 dark:text-zinc-500 italic hover:text-brand-primary transition-colors cursor-pointer pt-1"
              >
                + Adicionar identificação privada...
              </p>
            )}
          </div>
        )}

        <div
          className={cn(
            "grid gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center",
            isModuleEnabled("events") ? "grid-cols-2" : "grid-cols-1"
          )}
        >
          {isModuleEnabled("events") && (
            <div className="p-2 space-y-0.5">
              <span className="text-xl font-heading font-black text-zinc-900 dark:text-white block">
                {memberEventsCount}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                Eventos
              </span>
            </div>
          )}

          <div className="p-2 space-y-0.5">
            <span className="text-xl font-heading font-black text-brand-primary block">
              {member.memberSince || 2021}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              Membro desde
            </span>
          </div>
        </div>
      </div>

      <MemberCustomTagsDialog
        member={member}
        open={isTagDialogOpen}
        onOpenChange={setIsTagDialogOpen}
      />
    </div>
  )
}
