"use client"

import * as React from "react"

import {
  type BrandModulesConfig,
  SYSTEM_MODULE_REGISTRY,
  type SystemModule,
  brandConfig,
  getEnabledModulesList,
  isModuleEnabled,
  isPathAllowed,
} from "@/src/config/brand.config"

export interface UseBrandModulesReturn {
  modules: BrandModulesConfig
  enabledModules: SystemModule[]
  isEnabled: (module: SystemModule) => boolean
  hasAnyModule: (modules: SystemModule[]) => boolean
  hasAllModules: (modules: SystemModule[]) => boolean
  isPathAllowed: (pathname: string) => boolean
  registry: typeof SYSTEM_MODULE_REGISTRY
}

export function useBrandModules(): UseBrandModulesReturn {
  const modules = brandConfig.modules

  const enabledModules = React.useMemo(() => {
    return getEnabledModulesList(modules)
  }, [modules])

  const isEnabled = React.useCallback((module: SystemModule): boolean => {
    return isModuleEnabled(module)
  }, [])

  const hasAnyModule = React.useCallback(
    (moduleList: SystemModule[]): boolean => {
      return moduleList.some((m) => isModuleEnabled(m))
    },
    []
  )

  const hasAllModules = React.useCallback(
    (moduleList: SystemModule[]): boolean => {
      return moduleList.every((m) => isModuleEnabled(m))
    },
    []
  )

  const checkPathAllowed = React.useCallback(
    (pathname: string): boolean => {
      return isPathAllowed(pathname, modules)
    },
    [modules]
  )

  return {
    modules,
    enabledModules,
    isEnabled,
    hasAnyModule,
    hasAllModules,
    isPathAllowed: checkPathAllowed,
    registry: SYSTEM_MODULE_REGISTRY,
  }
}
