import * as React from "react"

import { cn } from "@clubkey/utils"

export interface AdminContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}

export const AdminContainer = React.forwardRef<
  HTMLElement,
  AdminContainerProps
>(({ as: Component = "div", className, children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn("w-full p-4 sm:p-6 lg:p-8", className)}
      {...props}
    >
      {children}
    </Component>
  )
})

AdminContainer.displayName = "AdminContainer"

export const Container = AdminContainer
export type ContainerProps = AdminContainerProps
