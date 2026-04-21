"use client"

import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="flex items-center justify-between bg-[#2d2d2d] px-6 py-4">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full rounded-lg bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e67e22]"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-white">Greggori</p>
          <p className="text-xs text-gray-400">greggori@gmail.com</p>
        </div>
        <Avatar className="h-10 w-10 border-2 border-[#e67e22]">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Greggori" />
          <AvatarFallback className="bg-[#e67e22] text-white">GR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
