import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "cg:group/button cg:inline-flex cg:shrink-0 cg:items-center cg:justify-center cg:rounded-lg cg:border cg:border-transparent cg:bg-clip-padding cg:text-sm cg:font-medium cg:whitespace-nowrap cg:transition-all cg:outline-none cg:select-none cg:focus-visible:border-ring cg:focus-visible:ring-3 cg:focus-visible:ring-ring/50 cg:active:not-aria-[haspopup]:translate-y-px cg:disabled:pointer-events-none cg:disabled:opacity-50 cg:aria-invalid:border-destructive cg:aria-invalid:ring-3 cg:aria-invalid:ring-destructive/20 cg:dark:aria-invalid:border-destructive/50 cg:dark:aria-invalid:ring-destructive/40 cg:[&_svg]:pointer-events-none cg:[&_svg]:shrink-0 cg:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "cg:bg-primary cg:text-primary-foreground cg:hover:bg-primary/80",
        outline:
          "cg:border-border cg:bg-background cg:hover:bg-muted cg:hover:text-foreground cg:aria-expanded:bg-muted cg:aria-expanded:text-foreground cg:dark:border-input cg:dark:bg-input/30 cg:dark:hover:bg-input/50",
        secondary:
          "cg:bg-secondary cg:text-secondary-foreground cg:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] cg:aria-expanded:bg-secondary cg:aria-expanded:text-secondary-foreground",
        ghost:
          "cg:hover:bg-muted cg:hover:text-foreground cg:aria-expanded:bg-muted cg:aria-expanded:text-foreground cg:dark:hover:bg-muted/50",
        destructive:
          "cg:bg-destructive/10 cg:text-destructive cg:hover:bg-destructive/20 cg:focus-visible:border-destructive/40 cg:focus-visible:ring-destructive/20 cg:dark:bg-destructive/20 cg:dark:hover:bg-destructive/30 cg:dark:focus-visible:ring-destructive/40",
        link: "cg:text-primary cg:underline-offset-4 cg:hover:underline",
      },
      size: {
        default:
          "cg:h-8 cg:gap-1.5 cg:px-2.5 cg:has-data-[icon=inline-end]:pr-2 cg:has-data-[icon=inline-start]:pl-2",
        xs: "cg:h-6 cg:gap-1 cg:rounded-[min(var(--radius-md),10px)] cg:px-2 cg:text-xs cg:in-data-[slot=button-group]:rounded-lg cg:has-data-[icon=inline-end]:pr-1.5 cg:has-data-[icon=inline-start]:pl-1.5 cg:[&_svg:not([class*=size-])]:size-3",
        sm: "cg:h-7 cg:gap-1 cg:rounded-[min(var(--radius-md),12px)] cg:px-2.5 cg:text-[0.8rem] cg:in-data-[slot=button-group]:rounded-lg cg:has-data-[icon=inline-end]:pr-1.5 cg:has-data-[icon=inline-start]:pl-1.5 cg:[&_svg:not([class*=size-])]:size-3.5",
        lg: "cg:h-9 cg:gap-1.5 cg:px-2.5 cg:has-data-[icon=inline-end]:pr-2 cg:has-data-[icon=inline-start]:pl-2",
        icon: "cg:size-8",
        "icon-xs":
          "cg:size-6 cg:rounded-[min(var(--radius-md),10px)] cg:in-data-[slot=button-group]:rounded-lg cg:[&_svg:not([class*=size-])]:size-3",
        "icon-sm":
          "cg:size-7 cg:rounded-[min(var(--radius-md),12px)] cg:in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "cg:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
