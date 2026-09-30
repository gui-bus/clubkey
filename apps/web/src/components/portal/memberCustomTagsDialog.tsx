"use client"

import * as React from "react"

import { usePortalStore } from "@/src/store/usePortalStore"
import type { Member } from "@/src/types"
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DotsSixVertical, LockKey, Plus, Tag, X } from "@phosphor-icons/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog/dialog"
import { Input } from "@/src/components/ui/input/input"
import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

interface SortableTagItemProps {
  id: string
  tag: string
  onRemove: (tag: string) => void
}

function SortableTagItem({ id, tag, onRemove }: SortableTagItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-white dark:bg-zinc-800 border text-xs font-medium text-zinc-900 dark:text-zinc-100 shadow-xs select-none transition-all group/tag touch-none",
        isDragging
          ? "opacity-95 ring-2 ring-brand-primary border-transparent shadow-xl z-50 scale-105 cursor-grabbing bg-white dark:bg-zinc-800"
          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 cursor-grab"
      )}
      {...attributes}
      {...listeners}
    >
      <DotsSixVertical className="w-3.5 h-3.5 text-zinc-400 group-hover/tag:text-brand-primary shrink-0" />
      <Tag className="w-3 h-3 text-brand-primary shrink-0" />
      <span className="truncate max-w-[180px]">{tag}</span>
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onRemove(tag)
        }}
        className="ml-0.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors p-0.5 rounded-xs cursor-pointer"
        title={`Remover "${tag}"`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

interface MemberCustomTagsDialogProps {
  member: Member
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MemberCustomTagsDialog({
  member,
  open,
  onOpenChange,
}: MemberCustomTagsDialogProps): React.JSX.Element {
  const { customTags, addCustomTag, removeCustomTag, setCustomTags } =
    usePortalStore()
  const [inputValue, setInputValue] = React.useState("")

  const memberTags = customTags?.[member.id] || []
  const fullName = `${member.firstName} ${member.lastName}`.trim()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = memberTags.indexOf(String(active.id))
    const newIndex = memberTags.indexOf(String(over.id))

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(memberTags, oldIndex, newIndex)
      setCustomTags(member.id, reordered)
    }
  }

  const handleAdd = (tagText?: string) => {
    const raw = tagText !== undefined ? tagText : inputValue
    const trimmed = raw.trim()
    if (!trimmed) return

    if (memberTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      toast.info(`A tag "${trimmed}" já está adicionada a ${member.firstName}.`)
      return
    }

    addCustomTag(member.id, trimmed)
    setInputValue("")
    toast.success(`Tag adicionada: "${trimmed}"`, {
      description: "Esta identificação é privada e visível apenas para você.",
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  const handleRemove = (tag: string) => {
    removeCustomTag(member.id, tag)
    toast.info(`Tag "${tag}" removida de ${member.firstName}.`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="md"
        className="p-6 sm:p-8 bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-sm max-w-lg space-y-4"
      >
        <DialogHeader className="space-y-1.5 pb-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-sm bg-brand-primary/10 text-brand-primary">
              <Tag className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Notas & Identificação Pessoal
            </span>
          </div>

          <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Tags de {fullName}
          </DialogTitle>

          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            Adicione e organize etiquetas personalizadas para categorizar suas
            conexões.
          </DialogDescription>
        </DialogHeader>

        
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <LockKey className="w-3.5 h-3.5 text-brand-primary shrink-0" />
          <span>
            Identificação{" "}
            <strong className="font-semibold text-zinc-700 dark:text-zinc-200">
              100% confidencial
            </strong>{" "}
            — visível exclusivamente na sua conta.
          </span>
        </div>

        
        <div className="space-y-2 pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white block">
            Nova Etiqueta
          </label>
          <div className="flex items-center gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Frontend developer, Investidora, Parceria Estratégica..."
              size="sm"
              className="flex-1 text-xs rounded-sm"
              startIcon={<Tag className="w-3.5 h-3.5" />}
            />
            <CtaButton
              type="button"
              variant="primary"
              size="xs"
              onClick={() => handleAdd()}
              className="h-9 px-4 text-xs font-bold rounded-sm shadow-none hover:shadow-none shrink-0"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Adicionar</span>
            </CtaButton>
          </div>
        </div>

        
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-white block">
              Etiquetas Atribuídas ({memberTags.length})
            </span>
            {memberTags.length > 1 && (
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                Arraste para reordenar
              </span>
            )}
          </div>

          {memberTags.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={memberTags}
                strategy={rectSortingStrategy}
              >
                <div className="flex flex-wrap gap-2 p-3 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 min-h-[60px] items-center">
                  {memberTags.map((tag) => (
                    <SortableTagItem
                      key={tag}
                      id={tag}
                      tag={tag}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="p-4 rounded-sm border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
              Nenhuma etiqueta criada ainda para esta conexão.
            </div>
          )}
        </div>

        
        <div className="pt-2 flex justify-end">
          <CtaButton
            type="button"
            variant="outline"
            size="xs"
            onClick={() => onOpenChange(false)}
            className="text-xs px-5 h-9"
          >
            <span>Concluir</span>
          </CtaButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
