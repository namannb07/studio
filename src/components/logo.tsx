import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <h1 className={cn("text-5xl font-bold font-headline text-primary", className)}>
      CookItUp
    </h1>
  )
}
