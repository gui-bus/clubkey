"use client"

import * as React from "react"

import Image from "next/image"

import { Check, Image as ImageIcon } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog/dialog"
import { FileUpload } from "@/src/components/ui/fileUpload/fileUpload"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

export const PRESET_COVERS = [
  { label: "Membros & Networking", src: "/utils/banners/pessoas.webp" },
  { label: "Agenda & Eventos", src: "/utils/banners/agenda.webp" },
  { label: "Benefícios Exclusivos", src: "/utils/banners/beneficios.webp" },
  {
    label: "Experiências & Lifestyle",
    src: "/utils/banners/experiencias.webp",
  },
]

export interface ProfileCoverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pendingCover: string
  onSelectCover: (src: string) => void
  onApplyCover: () => void
  userAvatar?: string
  userName: string
  userRole?: string
  userCompany?: string
  userInitials: string
}

export function ProfileCoverDialog({
  open,
  onOpenChange,
  pendingCover,
  onSelectCover,
  onApplyCover,
  userAvatar,
  userName,
  userRole,
  userCompany,
  userInitials,
}: ProfileCoverDialogProps): React.JSX.Element {
  const handleCoverFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          onSelectCover(event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
              Personalização do Perfil
            </span>
          </div>
          <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span>Alterar Capa do Perfil</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Faça o upload de uma imagem personalizada ou escolha um dos temas
            oficiais do clube.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Upload de Imagem Personalizada
              </label>
              <span className="text-[11px] text-zinc-400">
                Recomendado: 1920x600 px (até 25MB)
              </span>
            </div>
            <FileUpload
              accept="image/*"
              maxSizeMB={25}
              showPreviews
              simulateProgress
              label="Enviar foto de capa"
              description="Arraste e solte uma imagem aqui ou clique para selecionar (JPG, PNG ou WebP até 25MB)"
              onFilesSelected={handleCoverFilesSelected}
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Ou escolha uma capa oficial do clube
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_COVERS.map((preset) => {
                const isSelected = pendingCover === preset.src
                return (
                  <button
                    key={preset.src}
                    type="button"
                    onClick={() => onSelectCover(preset.src)}
                    className={cn(
                      "relative group rounded-sm overflow-hidden border text-left transition-all cursor-pointer",
                      isSelected
                        ? "border-brand-primary ring-2 ring-brand-primary/40 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className="relative h-20 w-full bg-zinc-950 overflow-hidden">
                      <Image
                        src={preset.src}
                        alt={preset.label}
                        fill
                        className={cn(
                          "object-cover transition-transform duration-300 group-hover:scale-105",
                          isSelected
                            ? "opacity-80"
                            : "opacity-55 group-hover:opacity-75"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
                          <Check className="w-3 h-3 text-white" weight="bold" />
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                      <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">
                        {preset.label}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Pré-visualização da Capa
            </label>
            <div className="relative w-full h-32 sm:h-36 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-inner">
              {pendingCover ? (
                <Image
                  src={pendingCover}
                  alt="Pré-visualização da capa"
                  fill
                  className="object-cover object-center opacity-70"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              <div className="absolute bottom-3.5 left-4 flex items-center gap-3 z-10">
                <div className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-700 overflow-hidden bg-zinc-900 relative shadow-md">
                  <Avatar size="md" radius="full" className="w-full h-full">
                    {userAvatar && (
                      <AvatarImage src={userAvatar} alt={userName} />
                    )}
                    <AvatarFallback className="text-xs font-bold bg-zinc-900 text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {userName}
                  </p>
                  <p className="text-[10px] text-zinc-300">
                    {userRole} {userCompany ? `• ${userCompany}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2.5">
          <DialogClose asChild>
            <CtaButton
              type="button"
              variant="secondary"
              size="xs"
              className="text-xs"
            >
              Cancelar
            </CtaButton>
          </DialogClose>
          <CtaButton
            type="button"
            variant="primary"
            size="xs"
            onClick={onApplyCover}
            className="text-xs"
          >
            Salvar Capa
          </CtaButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
