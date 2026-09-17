"use client"

import * as React from "react"
import { TagInput } from "@/src/components/ui/tagInput/tagInput"

export interface ProfileNetworkingSectionProps {
  seeking: string[]
  offering: string[]
  onUpdateSeeking: (tags: string[]) => void
  onUpdateOffering: (tags: string[]) => void
}

export function ProfileNetworkingSection({
  seeking,
  offering,
  onUpdateSeeking,
  onUpdateOffering,
}: ProfileNetworkingSectionProps): React.JSX.Element {
  return (
    <div className="space-y-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            O que estou procurando (Networking & Negócios)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Outros membros saberão onde podem agregar valor ao conectar com você
          </p>
        </div>

        <TagInput
          value={seeking}
          onChange={onUpdateSeeking}
          tagColor="default"
          tagVariant="flat"
          radius="sm"
          placeholder="Digite uma busca e pressione Enter..."
        />
      </div>

      <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            O que posso oferecer
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Seus pontos fortes, experiência, conexões e mentorias disponíveis
          </p>
        </div>

        <TagInput
          value={offering}
          onChange={onUpdateOffering}
          tagColor="default"
          tagVariant="flat"
          radius="sm"
          placeholder="Digite uma oferta e pressione Enter..."
        />
      </div>
    </div>
  )
}
