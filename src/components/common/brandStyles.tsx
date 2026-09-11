import * as React from "react"

import { brandConfig, generateBrandCssVariables } from "@/src/config/brand.config"

export function BrandStyles(): React.JSX.Element {
  const css = generateBrandCssVariables(brandConfig)

  return (
    <style
      id="whitelabel-brand-styles"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  )
}
