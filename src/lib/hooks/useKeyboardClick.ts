import * as React from "react"

export function useKeyboardClick<T extends HTMLElement = HTMLElement>(
  enabled: boolean = true
) {
  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<T>) => {
      if (!enabled) return
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        ;(event.currentTarget as HTMLElement).click()
      }
    },
    [enabled]
  )

  return enabled
    ? {
        tabIndex: 0,
        onKeyDown,
      }
    : {}
}
