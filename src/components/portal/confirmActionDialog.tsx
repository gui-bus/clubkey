"use client"

import {
  AlertDialog,
  AlertDialogAction,
  type AlertDialogActionColor,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alertDialog/alertDialog"

export interface ConfirmActionDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmColor?: AlertDialogActionColor
  onConfirm: () => void
  onCancel?: () => void
}

export function ConfirmActionDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "danger",
  onConfirm,
  onCancel,
}: ConfirmActionDialogProps): React.JSX.Element {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction color={confirmColor} onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
