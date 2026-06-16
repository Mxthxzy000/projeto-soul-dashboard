import { cn } from "../../lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
}

export function Card({ children, className, padding = "md" }: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
  action,
}: {
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)}>
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-sm text-gray-500", className)}>{children}</p>
  )
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn(className)}>{children}</div>
}
