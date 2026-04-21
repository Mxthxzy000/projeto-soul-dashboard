import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  Calendar,
  DollarSign,
  Truck,
  FileText,
  Package,
  Users,
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: LayoutGrid },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Financeiro", href: "/financeiro", icon: DollarSign },
  { name: "Transporte", href: "/transporte", icon: Truck },
  { name: "Relatório", href: "/relatorio", icon: FileText },
  { name: "Estoque", href: "/estoque", icon: Package },
  { name: "Relações", href: "/relacoes", icon: Users },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[200px] flex-col bg-[#2d2d2d]">
      <div className="flex items-center justify-center p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3d3d3d]">
          <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" stroke="#e67e22" strokeWidth="3" fill="none" />
            <path d="M16 24l6 6 12-12" stroke="#e67e22" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="8" r="4" fill="#e67e22" />
          </svg>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#e67e22] text-white shadow-lg shadow-[#e67e22]/30"
                  : "text-gray-400 hover:bg-[#3d3d3d] hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[#3d3d3d] p-4">
        <div className="mb-3 text-sm">
          <p className="font-medium text-white">Plano Atual:</p>
          <p className="text-gray-400">Completo - Sem Restrições</p>
        </div>
        <button className="w-full rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30">
          Gerenciar planos
        </button>
      </div>
    </aside>
  )
}
