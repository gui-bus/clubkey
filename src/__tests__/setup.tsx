import * as React from "react"

import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

if (typeof window !== "undefined") {
  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false
  }
  if (!window.HTMLElement.prototype.setPointerCapture) {
    window.HTMLElement.prototype.setPointerCapture = () => {}
  }
  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {}
  }
  if (!window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = () => {}
  }
}

process.env.NEXT_PUBLIC_SITE_URL = "https://example.com"
process.env.NEXT_PUBLIC_TENANT = "viverde"

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
}))

const MockLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children?: React.ReactNode; [key: string]: unknown }
>(({ href, children, ...props }, ref) =>
  React.createElement(
    "a",
    { href, ref, ...(props as Record<string, unknown>) },
    children as React.ReactNode
  )
)
MockLink.displayName = "MockLink"

vi.mock("next/link", () => ({
  default: MockLink,
}))

const IMAGE_PROPS = new Set(["fill", "priority"])

const MockImage = React.forwardRef<
  HTMLImageElement,
  { src: string | { src: string }; alt?: string; [key: string]: unknown }
>(({ src, alt, ...props }, ref) => {
  const srcStr =
    typeof src === "object" && src !== null && "src" in src
      ? src.src
      : String(src || "")
  const rest: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if (!IMAGE_PROPS.has(key)) {
      rest[key] = value
    }
  }
  return React.createElement("img", {
    src: srcStr,
    alt: alt || "",
    ref,
    ...rest,
  })
})
MockImage.displayName = "MockImage"

vi.mock("next/image", () => ({
  default: MockImage,
}))

vi.mock("nuqs", () => ({
  useQueryState: () => {
    const [state, setState] = React.useState<number | string | null>(null)
    return [state, setState]
  },
  parseAsInteger: {
    withOptions: () => ({}),
  },
  parseAsString: {
    withOptions: () => ({}),
  },
}))

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "variants",
  "whileHover",
  "whileTap",
  "whileInView",
  "viewport",
])

vi.mock("framer-motion", () => {
  const createMockComponent = (tag: string) => {
    const Comp = React.forwardRef<HTMLElement, Record<string, unknown>>(
      ({ children, ...props }, ref) => {
        const validHtmlProps: Record<string, unknown> = {}
        for (const [key, value] of Object.entries(props)) {
          if (!MOTION_PROPS.has(key)) {
            validHtmlProps[key] = value
          }
        }
        return React.createElement(
          tag,
          { ref, ...validHtmlProps },
          children as React.ReactNode
        )
      }
    )
    Comp.displayName = `motion.${tag}`
    return Comp
  }

  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string | symbol) => {
        if (typeof prop !== "string") return undefined
        if (prop === "default" || prop === "__esModule") return undefined
        return createMockComponent(prop)
      },
    }
  )

  return {
    motion,
    AnimatePresence: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  }
})
