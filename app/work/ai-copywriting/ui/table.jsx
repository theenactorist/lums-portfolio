"use client"

import * as React from "react"
import { cn } from "cn"

function Table({
  className,
  ...props
}) {
  return (
    <div
      data-slot="table-container"
      className="cg:relative cg:w-full cg:overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("cg:w-full cg:caption-bottom cg:text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className,
  ...props
}) {
  return (
    <thead
      data-slot="table-header"
      className={cn("cg:[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({
  className,
  ...props
}) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("cg:[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({
  className,
  ...props
}) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "cg:border-t cg:bg-muted/50 cg:font-medium cg:[&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({
  className,
  ...props
}) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "cg:border-b cg:transition-colors cg:hover:bg-muted/50 cg:has-aria-expanded:bg-muted/50 cg:data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  ...props
}) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "cg:h-10 cg:px-2 cg:text-left cg:align-middle cg:font-medium cg:whitespace-nowrap cg:text-foreground cg:[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({
  className,
  ...props
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "cg:p-2 cg:align-middle cg:whitespace-nowrap cg:[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("cg:mt-4 cg:text-sm cg:text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
