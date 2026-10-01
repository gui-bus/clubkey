"use client"

import * as React from "react"

import type { PolicyDocument } from "@clubkey/types"
import { CtaButton, TableTitle } from "@clubkey/ui"
import { DownloadSimple, FilePdf } from "@phosphor-icons/react"

export interface SinistrosDocumentsSectionProps {
  documents: PolicyDocument[]
}

export function SinistrosDocumentsSection({
  documents,
}: SinistrosDocumentsSectionProps): React.JSX.Element {

  return (
    <section className="space-y-4">
      <TableTitle
        title="Documentos Importantes"
        description="Termos, apólices, manuais operacionais e guias de acionamento rápido."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-2xs flex flex-col justify-between items-center text-center gap-4 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <div className="size-16 rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <FilePdf size={32} weight="duotone" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                {doc.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm">
                {doc.description}
              </p>
            </div>

            <CtaButton
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              className="mt-1"
            >
              <DownloadSimple size={14} weight="bold" className="mr-1.5" />
              <span>Baixar PDF</span>
            </CtaButton>
          </div>
        ))}
      </div>
    </section>
  )
}
