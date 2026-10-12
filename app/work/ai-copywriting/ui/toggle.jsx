"use client"

import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

const toggleVariants = cva(
  "cg:group/toggle cg:inline-flex cg:items-center cg:justify-center cg:gap-1 cg:rounded-lg cg:text-sm cg:font-medium cg:whitespace-nowrap cg:transition-all cg:outline-none cg:hover:bg-muted cg:hover:text-foreground cg:focus-visible:border-ring cg:focus-visible:ring-[3px] cg:focus-visible:ring-ring/50 cg:disabled:pointer-events-none cg:disabled:opacity-50 cg:aria-invalid:border-destructive cg:aria-invalid:ring-destructive/20 cg:aria-pressed:bg-muted cg:data-[state=on]:bg-muted cg:dark:aria-invalid:ring-destructive/40 cg:[&_svg]:pointer-events-none cg:[&_svg]:shrink-0 cg:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "cg:bg-transparent",
        outline: "cg:border cg:border-input cg:bg-transparent cg:hover:bg-muted",
      },
      size: {
        default:
          "cg:h-8 cg:min-w-8 cg:px-2.5 cg:has-data-[icon=inline-end]:pr-2 cg:has-data-[icon=inline-start]:pl-2",
        sm: "cg:h-7 cg:min-w-7 cg:rounded-[min(var(--radius-md),12px)] cg:px-2.5 cg:text-[0.8rem] cg:has-data-[icon=inline-end]:pr-1.5 cg:has-data-[icon=inline-start]:pl-1.5 cg:[&_svg:not([class*=size-])]:size-3.5",
        lg: "cg:h-9 cg:min-w-9 cg:px-2.5 cg:has-data-[icon=inline-end]:pr-2 cg:has-data-[icon=inline-start]:pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
