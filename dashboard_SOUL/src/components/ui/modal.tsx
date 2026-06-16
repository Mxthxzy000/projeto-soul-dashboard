"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizeClasses[size]} animate-in fade-in-0 zoom-in-95 rounded-xl border border-gray-200 bg-white shadow-2xl transition-all duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

/* Botões padrão para modais */
export function ModalActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
      {children}
    </div>
  )
}

export function ModalButton({
  variant = "primary",
  children,
  onClick,
  type = "button",
  disabled = false,
}: {
  variant?: "primary" | "secondary" | "danger"
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}) {
  const variants = {
    primary: "bg-[#e67e22] text-white hover:bg-[#d35400] disabled:bg-orange-300",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${variants[variant]} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
