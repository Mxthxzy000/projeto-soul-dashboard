import { cn } from "../../lib/utils"

interface TableProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-gray-200", className)}>
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  )
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-50 text-xs font-medium uppercase tracking-wider text-gray-500">
      {children}
    </thead>
  )
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
}

export function TableRow({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-gray-50",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <th className={cn("px-4 py-3 font-medium", className)}>{children}</th>
  )
}

export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <td className={cn("px-4 py-3 text-gray-900", className)}>{children}</td>
  )
}

/* Status Badge */
export function StatusBadge({
  status,
  variant = "default",
}: {
  status: string
  variant?: "success" | "warning" | "danger" | "info" | "default"
}) {
  const variants = {
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-red-100 text-red-700 border-red-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    default: "bg-gray-100 text-gray-700 border-gray-200",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant]
      )}
    >
      {status}
    </span>
  )
}
