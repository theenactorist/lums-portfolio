"use client"

import * as React from "react"
import { cn } from "cn"
import { Select as SelectPrimitive } from "radix-ui"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

function Select({
  ...props
}) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("cg:scroll-my-1 cg:p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "cg:flex cg:w-fit cg:items-center cg:justify-between cg:gap-1.5 cg:rounded-lg cg:border cg:border-input cg:bg-transparent cg:py-2 cg:pr-2 cg:pl-2.5 cg:text-sm cg:whitespace-nowrap cg:transition-colors cg:outline-none cg:select-none cg:focus-visible:border-ring cg:focus-visible:ring-3 cg:focus-visible:ring-ring/50 cg:disabled:cursor-not-allowed cg:disabled:opacity-50 cg:aria-invalid:border-destructive cg:aria-invalid:ring-3 cg:aria-invalid:ring-destructive/20 cg:data-placeholder:text-muted-foreground cg:data-[size=default]:h-8 cg:data-[size=sm]:h-7 cg:data-[size=sm]:rounded-[min(var(--radius-md),10px)] cg:*:data-[slot=select-value]:line-clamp-1 cg:*:data-[slot=select-value]:flex cg:*:data-[slot=select-value]:items-center cg:*:data-[slot=select-value]:gap-1.5 cg:dark:bg-input/30 cg:dark:hover:bg-input/50 cg:dark:aria-invalid:border-destructive/50 cg:dark:aria-invalid:ring-destructive/40 cg:[&_svg]:pointer-events-none cg:[&_svg]:shrink-0 cg:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="cg:pointer-events-none cg:size-4 cg:text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "start",
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn("cg: cg: cg:relative cg:z-50 cg:max-h-(--radix-select-content-available-height) cg:min-w-36 cg:origin-(--radix-select-content-transform-origin) cg:overflow-x-hidden cg:overflow-y-auto cg:rounded-lg cg:bg-popover cg:text-popover-foreground cg:shadow-md cg:ring-1 cg:ring-foreground/10 cg:duration-100 cg:data-[align-trigger=true]:animate-none cg:data-[side=bottom]:slide-in-from-top-2 cg:data-[side=left]:slide-in-from-right-2 cg:data-[side=right]:slide-in-from-left-2 cg:data-[side=top]:slide-in-from-bottom-2 cg:data-open:animate-in cg:data-open:fade-in-0 cg:data-open:zoom-in-95 cg:data-closed:animate-out cg:data-closed:fade-out-0 cg:data-closed:zoom-out-95", position ==="popper"&&"cg:data-[side=bottom]:translate-y-1 cg:data-[side=left]:-translate-x-1 cg:data-[side=right]:translate-x-1 cg:data-[side=top]:-translate-y-1", className )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "cg:data-[position=popper]:h-(--radix-select-trigger-height) cg:data-[position=popper]:w-full cg:data-[position=popper]:min-w-(--radix-select-trigger-width)",
            position === "popper" && "cg:"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("cg:px-1.5 cg:py-1 cg:text-xs cg:text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "cg:relative cg:flex cg:w-full cg:cursor-default cg:items-center cg:gap-1.5 cg:rounded-md cg:py-1 cg:pr-8 cg:pl-1.5 cg:text-sm cg:outline-hidden cg:select-none cg:focus:bg-accent cg:focus:text-accent-foreground cg:not-data-[variant=destructive]:focus:**:text-accent-foreground cg:data-disabled:pointer-events-none cg:data-disabled:opacity-50 cg:[&_svg]:pointer-events-none cg:[&_svg]:shrink-0 cg:[&_svg:not([class*=size-])]:size-4 cg:*:[span]:last:flex cg:*:[span]:last:items-center cg:*:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="cg:pointer-events-none cg:absolute cg:right-2 cg:flex cg:size-4 cg:items-center cg:justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="cg:pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("cg:pointer-events-none cg:-mx-1 cg:my-1 cg:h-px cg:bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "cg:z-10 cg:flex cg:cursor-default cg:items-center cg:justify-center cg:bg-popover cg:py-1 cg:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "cg:z-10 cg:flex cg:cursor-default cg:items-center cg:justify-center cg:bg-popover cg:py-1 cg:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
