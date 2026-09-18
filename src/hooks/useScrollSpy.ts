import * as React from "react"

export interface UseScrollSpyOptions {
  offset?: number
  defaultActive?: string
  updateUrlHash?: boolean
}

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
): string {
  const { offset = 250, defaultActive = "", updateUrlHash = true } = options
  const [activeSection, setActiveSection] =
    React.useState<string>(defaultActive)

  React.useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + offset
        let currentId = ""

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i]
          const el = document.getElementById(id)
          if (el) {
            const top = el.offsetTop
            if (scrollPosition >= top) {
              currentId = id
              break
            }
          }
        }

        if (window.scrollY < 150) {
          currentId = ""
        }

        if (currentId) {
          const hashVal = `#${currentId}`
          setActiveSection(hashVal)
          if (
            updateUrlHash &&
            (window.location.hash !== hashVal || window.location.search)
          ) {
            window.history.replaceState(
              null,
              "",
              window.location.pathname + hashVal
            )
          }
        } else {
          setActiveSection("")
          if (
            updateUrlHash &&
            (window.location.hash || window.location.search)
          ) {
            window.history.replaceState(null, "", window.location.pathname)
          }
        }

        ticking = false
      })
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds, offset, updateUrlHash])

  return activeSection
}
