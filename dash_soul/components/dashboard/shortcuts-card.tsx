import { Link } from "react-router-dom"
import { Calendar, Package, Truck, Users } from "lucide-react"

const shortcuts = [
  { icon: Calendar, label: "+ Adicionar Evento", href: "/agenda" },
  { icon: Package, label: "+ Adicionar Produto", href: "/estoque" },
  { icon: Truck, label: "+ Adicionar Transporte", href: "/transporte" },
  { icon: Users, label: "+ Adicionar Funcionário", href: "/relacoes" },
]

export function ShortcutsCard() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Atalhos</h2>
      <div className="grid grid-cols-2 gap-3">
        {shortcuts.map((shortcut, index) => (
          <Link
            key={index}
            to={shortcut.href}
            className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-[#e67e22] hover:bg-orange-50 hover:shadow-md"
          >
            <div className="rounded-lg bg-gray-100 p-3 transition-all duration-200 group-hover:bg-[#e67e22]/10">
              <shortcut.icon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-[#e67e22]" />
            </div>
            <span className="text-center text-xs font-medium text-gray-600 transition-colors group-hover:text-[#e67e22]">
              {shortcut.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
