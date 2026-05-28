import { Link } from "react-router-dom"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 12000 },
  { name: "Fev", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Abr", value: 28000 },
  { name: "Mai", value: 22000 },
  { name: "Jun", value: 25000 },
  { name: "Jul", value: 32000 },
  { name: "Ago", value: 38000 },
]

export function ReportCard() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Relatório</h2>
        <span className="text-sm text-gray-500">Vendas Mensais</span>
      </div>
      <div className="mb-4 flex justify-end">
        <span className="text-sm font-medium text-gray-700">R$ 38K</span>
      </div>
      <div className="h-32 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e67e22" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#e67e22" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "12px" }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Vendas"]}
            />
            <Area type="monotone" dataKey="value" stroke="#e67e22" strokeWidth={2} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#e67e22]"></span>
          <span className="text-gray-600">Receita Mensal</span>
          <span className="font-semibold text-gray-900">R$ 58K</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
          <span className="text-gray-600">Total de Pedidos</span>
          <span className="font-semibold text-gray-900">1,045</span>
          <span className="text-gray-400">(Pedidos)</span>
        </div>
      </div>
      <Link
        to="/financeiro"
        className="mt-auto block w-full rounded-lg bg-[#10b981] py-2.5 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-[#059669] hover:shadow-lg hover:shadow-[#10b981]/30"
      >
        Gerenciar Finanças
      </Link>
    </div>
  )
}
