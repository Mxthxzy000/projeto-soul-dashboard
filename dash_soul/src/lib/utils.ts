// Utility to merge class names conditionally
// Note: install clsx and tailwind-merge if you add Tailwind CSS
// For now, a lightweight version without extra deps:
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ')
}
