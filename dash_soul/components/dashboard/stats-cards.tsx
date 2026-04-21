
import { Calendar, Package, TrendingUp, Users } from "lucide-react"

const stats = [
  {
    label: "Atividades de Hoje",
    value: "8",
    icon: Calendar,
    color: "text-[#e67e22]",
    bgColor: "bg-orange-50",
  },
  {
    label: "Produtos para Repor",
    value: "345",
    icon: Package,
    color: "text-[#e67e22]",
    bgColor: "bg-orange-50",
  },
  {
    label: "Vendas do Mês",
    value: "R$ 58,765",
    icon: TrendingUp,
    color: "text-[#e67e22]",
    bgColor: "bg-orange-50",
  },
  {
    label: "Funcionários Ativos",
    value: "142",
    icon: Users,
    color: "text-[#e67e22]",
    bgColor: "bg-orange-50",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Stats */}
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className={`rounded-lg ${stat.bgColor} p-2.5 transition-transform duration-300 group-hover:scale-110`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
