"use client"

import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "cn"

import { Button } from "@/app/work/ai-copywriting/ui/button"
import { Input } from "@/app/work/ai-copywriting/ui/input"
import { Textarea } from "@/app/work/ai-copywriting/ui/textarea"

function InputGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "cg:group/input-group cg:relative cg:flex cg:h-8 cg:w-full cg:min-w-0 cg:items-center cg:rounded-lg cg:border cg:border-input cg:transition-colors cg:outline-none cg:in-data-[slot=combobox-content]:focus-within:border-inherit cg:in-data-[slot=combobox-content]:focus-within:ring-0 cg:has-disabled:bg-input/50 cg:has-disabled:opacity-50 cg:has-[[data-slot=input-group-control]:focus-visible]:border-ring cg:has-[[data-slot=input-group-control]:focus-visible]:ring-3 cg:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 cg:has-[[data-slot][aria-invalid=true]]:border-destructive cg:has-[[data-slot][aria-invalid=true]]:ring-3 cg:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 cg:has-[>[data-align=block-end]]:h-auto cg:has-[>[data-align=block-end]]:flex-col cg:has-[>[data-align=block-start]]:h-auto cg:has-[>[data-align=block-start]]:flex-col cg:has-[>textarea]:h-auto cg:dark:bg-input/30 cg:dark:has-disabled:bg-input/80 cg:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 cg:has-[>[data-align=block-end]]:[&>input]:pt-3 cg:has-[>[data-align=block-start]]:[&>input]:pb-3 cg:has-[>[data-align=inline-end]]:[&>input]:pr-1.5 cg:has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "cg:flex cg:h-auto cg:cursor-text cg:items-center cg:justify-center cg:gap-2 cg:py-1.5 cg:text-sm cg:font-medium cg:text-muted-foreground cg:select-none cg:group-data-[disabled=true]/input-group:opacity-50 cg:[&>kbd]:rounded-[calc(var(--radius)-5px)] cg:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "cg:order-first cg:pl-2 cg:has-[>button]:ml-[-0.3rem] cg:has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "cg:order-last cg:pr-2 cg:has-[>button]:mr-[-0.3rem] cg:has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "cg:order-first cg:w-full cg:justify-start cg:px-2.5 cg:pt-2 cg:group-has-[>input]/input-group:pt-2 cg:[.border-b]:pb-2",
        "block-end":
          "cg:order-last cg:w-full cg:justify-start cg:px-2.5 cg:pb-2 cg:group-has-[>input]/input-group:pb-2 cg:[.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  "cg:flex cg:items-center cg:gap-2 cg:text-sm cg:shadow-none",
  {
    variants: {
      size: {
        xs: "cg:h-6 cg:gap-1 cg:rounded-[calc(var(--radius)-3px)] cg:px-1.5 cg:[&>svg:not([class*=size-])]:size-3.5",
        sm: "cg:",
        "icon-xs":
          "cg:size-6 cg:rounded-[calc(var(--radius)-3px)] cg:p-0 cg:has-[>svg]:p-0",
        "icon-sm": "cg:size-8 cg:p-0 cg:has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "cg:flex cg:items-center cg:gap-2 cg:text-sm cg:text-muted-foreground cg:[&_svg]:pointer-events-none cg:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "cg:flex-1 cg:rounded-none cg:border-0 cg:bg-transparent cg:shadow-none cg:ring-0 cg:focus-visible:ring-0 cg:disabled:bg-transparent cg:aria-invalid:ring-0 cg:dark:bg-transparent cg:dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "cg:flex-1 cg:resize-none cg:rounded-none cg:border-0 cg:bg-transparent cg:py-2 cg:shadow-none cg:ring-0 cg:focus-visible:ring-0 cg:disabled:bg-transparent cg:aria-invalid:ring-0 cg:dark:bg-transparent cg:dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
