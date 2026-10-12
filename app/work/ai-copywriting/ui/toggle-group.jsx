"use client";
import * as React from "react"
import { cn } from "cn"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { toggleVariants } from "@/app/work/ai-copywriting/ui/toggle"

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{
        "--gap": spacing
      }}
      className={cn(
        "cg:group/toggle-group cg:flex cg:w-fit cg:flex-row cg:items-center cg:gap-[--spacing(var(--gap))] cg:rounded-lg cg:data-[size=sm]:rounded-[min(var(--radius-md),10px)] cg:data-vertical:flex-col cg:data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "cg:shrink-0 cg:group-data-[spacing=0]/toggle-group:rounded-none cg:group-data-[spacing=0]/toggle-group:px-2 cg:focus:z-10 cg:focus-visible:z-10 cg:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 cg:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 cg:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg cg:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg cg:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg cg:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg cg:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 cg:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 cg:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l cg:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
