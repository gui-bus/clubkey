import * as React from "react"

import { cn } from "@/src/lib/utils/utils"

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("w-full px-6 md:px-12", className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = "Container"
