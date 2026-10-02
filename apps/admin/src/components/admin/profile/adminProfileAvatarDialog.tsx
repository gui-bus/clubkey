"use client"

import * as React from "react"

import {
  Button,
  CtaButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FileUpload,
  ImageCropper,
  type ImageCropperRef,
} from "@clubkey/ui"
import { PencilSimple } from "@phosphor-icons/react"

export interface AdminProfileAvatarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveAvatar: (base64Avatar: string) => void
}

export function AdminProfileAvatarDialog({
  open,
  onOpenChange,
  onSaveAvatar,
}: AdminProfileAvatarDialogProps): React.JSX.Element {
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
            Selecione uma imagem e ajuste o enquadramento para o seu avatar
            administrativo.
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
              onFilesSelected={handleAvatarFilesSelected}
            />
          ) : (
            <div className="space-y-4">
              <div className="w-full flex justify-center">
                <ImageCropper
                  ref={cropperRef}
                  src={uploadedAvatarSrc}
                  aspectRatio={1}
                  circular={true}
                  onCrop={(croppedData: string) =>
                    setCroppedAvatarBase64(croppedData)
                  }
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="bordered"
                  size="sm"
                  onClick={() => {
                    setUploadedAvatarSrc(null)
                    setCroppedAvatarBase64(null)
                  }}
                >
                  Escolher outra foto
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="bordered" size="sm">
              Cancelar
            </Button>
          </DialogClose>
          <CtaButton
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={!uploadedAvatarSrc && !croppedAvatarBase64}
          >
            <span>Salvar Foto</span>
          </CtaButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
