"use client"

import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "cg:group/tabs cg:flex cg:gap-2 cg:data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "cg:group/tabs-list cg:inline-flex cg:w-fit cg:items-center cg:justify-center cg:rounded-lg cg:p-[3px] cg:text-muted-foreground cg:group-data-horizontal/tabs:h-8 cg:group-data-vertical/tabs:h-fit cg:group-data-vertical/tabs:flex-col cg:data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "cg:bg-muted",
        line: "cg:gap-1 cg:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cg:relative cg:inline-flex cg:h-[calc(100%-1px)] cg:flex-1 cg:items-center cg:justify-center cg:gap-1.5 cg:rounded-md cg:border cg:border-transparent cg:px-1.5 cg:py-0.5 cg:text-sm cg:font-medium cg:whitespace-nowrap cg:text-foreground/60 cg:transition-all cg:group-data-vertical/tabs:w-full cg:group-data-vertical/tabs:justify-start cg:hover:text-foreground cg:focus-visible:border-ring cg:focus-visible:ring-[3px] cg:focus-visible:ring-ring/50 cg:focus-visible:outline-1 cg:focus-visible:outline-ring cg:disabled:pointer-events-none cg:disabled:opacity-50 cg:has-data-[icon=inline-end]:pr-1 cg:has-data-[icon=inline-start]:pl-1 cg:dark:text-muted-foreground cg:dark:hover:text-foreground cg:group-data-[variant=default]/tabs-list:data-active:shadow-sm cg:group-data-[variant=line]/tabs-list:data-active:shadow-none cg:[&_svg]:pointer-events-none cg:[&_svg]:shrink-0 cg:[&_svg:not([class*=size-])]:size-4",
        "cg:group-data-[variant=line]/tabs-list:bg-transparent cg:group-data-[variant=line]/tabs-list:data-active:bg-transparent cg:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent cg:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "cg:data-active:bg-background cg:data-active:text-foreground cg:dark:data-active:border-input cg:dark:data-active:bg-input/30 cg:dark:data-active:text-foreground",
        "cg:after:absolute cg:after:bg-foreground cg:after:opacity-0 cg:after:transition-opacity cg:group-data-horizontal/tabs:after:inset-x-0 cg:group-data-horizontal/tabs:after:bottom-[-5px] cg:group-data-horizontal/tabs:after:h-0.5 cg:group-data-vertical/tabs:after:inset-y-0 cg:group-data-vertical/tabs:after:-right-1 cg:group-data-vertical/tabs:after:w-0.5 cg:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("cg:flex-1 cg:text-sm cg:outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
