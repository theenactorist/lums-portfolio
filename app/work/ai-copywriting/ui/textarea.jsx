import * as React from "react"
import { cn } from "cn"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "cg:flex cg:field-sizing-content cg:min-h-16 cg:w-full cg:rounded-lg cg:border cg:border-input cg:bg-transparent cg:px-2.5 cg:py-2 cg:text-base cg:transition-colors cg:outline-none cg:placeholder:text-muted-foreground cg:focus-visible:border-ring cg:focus-visible:ring-3 cg:focus-visible:ring-ring/50 cg:disabled:cursor-not-allowed cg:disabled:bg-input/50 cg:disabled:opacity-50 cg:aria-invalid:border-destructive cg:aria-invalid:ring-3 cg:aria-invalid:ring-destructive/20 cg:md:text-sm cg:dark:bg-input/30 cg:dark:disabled:bg-input/80 cg:dark:aria-invalid:border-destructive/50 cg:dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
