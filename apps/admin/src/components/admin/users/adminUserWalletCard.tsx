"use client"

import * as React from "react"
import Image from "next/image"
import { Copy, Check, ArrowSquareOut, Wallet, ShieldCheck, ArrowsLeftRight, LockKey } from "@phosphor-icons/react"
import { toast } from "@clubkey/ui"
import type { AdminUser } from "@clubkey/types"
import { cn } from "@clubkey/utils"

export interface AdminUserWalletCardProps {
  user: AdminUser
  className?: string
}

export function AdminUserWalletCard({ user, className }: AdminUserWalletCardProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (user.walletFireblocks) {
      navigator.clipboard.writeText(user.walletFireblocks)
      setCopied(true)
      toast.success("Endereço da carteira copiado!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatBalance = (val: number) => {
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
    })
  }

  const shortWallet = user.walletFireblocks
    ? `${user.walletFireblocks.slice(0, 10)}...${user.walletFireblocks.slice(-6)}`
    : "Não vinculada"

  return (
    <div className={cn("p-4 bg-zinc-50/70 dark:bg-zinc-900/60 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3.5", className)}>
      
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            WALLET
          </span>
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800 px-2.5 py-1 rounded-xs border border-zinc-200 dark:border-zinc-700 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
            <Wallet size={13} className="text-zinc-400 shrink-0" />
            <span>{shortWallet}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="ml-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title="Copiar endereço completo"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            </button>
            <a
              href={`https://etherscan.io/address/${user.walletFireblocks}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              title="Ver no Explorer"
            >
              <ArrowSquareOut size={12} />
            </a>
          </div>
        </div>

        
        <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>Tipo: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{user.documentType} ({user.documentNumber})</strong></span>
          <span>•</span>
          <span>Tel: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{user.phone || "Não informado"}</strong></span>
          <span>•</span>
          <span>Local: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{user.city ? `${user.city}/${user.state}` : "Brasil"}</strong></span>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <div className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 rounded-sm p-3 space-y-1 shadow-2xs">
          <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
            DISPONÍVEL
          </p>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-900 dark:text-white">
            <span>{formatBalance(user.balances?.available || 0)}</span>
            <div className="relative w-3.5 h-3.5 shrink-0 inline-block">
              <Image
                src="/utils/gamification/utils/RIB.svg"
                alt="RIB"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        
        <div className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 rounded-sm p-3 space-y-1 shadow-2xs">
          <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
            BLOQUEADO
          </p>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-900 dark:text-white">
            <span>{formatBalance(user.balances?.blocked || 0)}</span>
            <div className="relative w-3.5 h-3.5 shrink-0 inline-block opacity-75">
              <Image
                src="/utils/gamification/utils/RIB.svg"
                alt="RIB"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        
        <div className="bg-white dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 rounded-sm p-3 space-y-1 shadow-2xs">
          <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-400">
            TOTAL
          </p>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-900 dark:text-white">
            <span>{formatBalance(user.balances?.total || 0)}</span>
            <div className="relative w-3.5 h-3.5 shrink-0 inline-block">
              <Image
                src="/utils/gamification/utils/RIB.svg"
                alt="RIB"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
