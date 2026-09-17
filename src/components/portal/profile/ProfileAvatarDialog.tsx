"use client"

import * as React from "react"

import { PencilSimple } from "@phosphor-icons/react"

import { Button } from "@/src/components/ui/button/button"
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
import {
  ImageCropper,
  type ImageCropperRef,
} from "@/src/components/ui/imageCropper/imageCropper"

import { CtaButton } from "@/src/components/common/ctaButton"

export interface ProfileAvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveAvatar: (base64Avatar: string) => void
}

export function ProfileAvatarDialog({
  open,
  onOpenChange,
  onSaveAvatar,
}: ProfileAvatarDialogProps): React.JSX.Element {
  const [uploadedAvatarSrc, setUploadedAvatarSrc] = React.useState<
    string | null
  >(null)
  const [croppedAvatarBase64, setCroppedAvatarBase64] = React.useState<
    string | null
  >(null)
  const cropperRef = React.useRef<ImageCropperRef>(null)

  const handleAvatarFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setUploadedAvatarSrc(event.target.result)
          setCroppedAvatarBase64(null)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const cropped =
      cropperRef.current?.crop() || croppedAvatarBase64 || uploadedAvatarSrc
    if (cropped) {
      onSaveAvatar(cropped)
      setUploadedAvatarSrc(null)
      setCroppedAvatarBase64(null)
      onOpenChange(false)
    }
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setUploadedAvatarSrc(null)
      setCroppedAvatarBase64(null)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <PencilSimple className="w-4 h-4" />
            </div>
            <span>Editar Foto de Perfil</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Selecione uma imagem e ajuste o enquadramento circular para o seu
            avatar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {!uploadedAvatarSrc ? (
            <FileUpload
              label="Foto de Perfil"
              description="Arraste ou selecione uma foto (PNG, JPG, WEBP até 10MB)"
              accept="image/*"
              maxSizeMB={10}
              showPreviews={false}
              simulateProgress={false}
              onFilesSelected={handleAvatarFilesSelected}
              variant="default"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Ajustar Enquadramento
                </span>
                <Button
                  type="button"
                  variant="light"
                  size="xs"
                  onClick={() => {
                    setUploadedAvatarSrc(null)
                    setCroppedAvatarBase64(null)
                  }}
                  className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
                >
                  Escolher outra foto
                </Button>
              </div>

              <ImageCropper
                ref={cropperRef}
                src={uploadedAvatarSrc}
                aspectRatio={1}
                circular={true}
                showCropButton={false}
                onCrop={(base64) => setCroppedAvatarBase64(base64)}
              />
            </div>
          )}
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
            disabled={!uploadedAvatarSrc}
            onClick={handleSave}
            className="text-xs disabled:opacity-50 disabled:pointer-events-none"
          >
            Salvar Foto
          </CtaButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
