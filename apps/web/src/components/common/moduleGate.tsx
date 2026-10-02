import * as React from "react"

import { type SystemModule, isModuleEnabled } from "@/src/config/brand.config"

export interface ModuleGateProps {
  module?: SystemModule
  modules?: SystemModule[]
  requireAll?: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ModuleGate({
  module,
  modules,
  requireAll = false,
  children,
  fallback = null,
}: ModuleGateProps): React.JSX.Element | null {
  let isAllowed = true

  if (module) {
    isAllowed = isModuleEnabled(module)
  } else if (modules && modules.length > 0) {
    isAllowed = requireAll
      ? modules.every((m) => isModuleEnabled(m))
      : modules.some((m) => isModuleEnabled(m))
  }

  if (!isAllowed) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
