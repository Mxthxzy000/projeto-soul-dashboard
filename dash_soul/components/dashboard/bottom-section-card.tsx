"use client"

import Link from "next/link"
import { TrendingUp, TrendingDown } from "lucide-react"

const shipments = [
  {
    id: "TN-003",
    date: "22/04/2024",
    carrier: "Transportadora Rápido",
    destination: "Loja Sto Pa...",
    status: "Em trânsito",
    statusColor: "bg-[#e67e22]",
  },
  {
    id: "TN-022",
    date: "20/04/2024",
    carrier: "Transportadora Velox",
    destination: "Distribuid. Mena",
    status: "Em trânsito",
    statusColor: "bg-[#e67e22]",
  },
  {
    id: "TN-001",
    date: "16/04/2024",
    carrier: "Transportadora Expressa",
    destination: "Eltai Rij...",
    status: "Entregue",
    statusColor: "bg-[#10b981]",
  },
  {
    id: "TN-000",
    date: "15/04/2024",
    carrier: "Transportadora Sul",
    destination: "Loja Centro",
    status: "Entregue",
    statusColor: "bg-[#10b981]",
  },
]

const stockItems = [
  {
    label: "Produtos em Estoque",
    value: "1,245",
    bgColor: "bg-[#10b981]",
  },
  {
    label: "Produtos para Repor",
    value: "345",
    bgColor: "bg-[#e67e22]",
  },
  {
    label: "Produtos Esgotados",
    value: "28",
    bgColor: "bg-[#ef4444]",
  },
]

export function BottomSectionCard() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Financeiro */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Financeiro</h2>
          <div className="space-y-4">
            {/* Receita */}
            <div className="rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-[#10b981]/30 hover:bg-emerald-50/30">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>
                <span className="text-sm text-gray-600">Receita Total (Mês)</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">R$ 458.750,00</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-[#10b981]">
                <TrendingUp className="h-3 w-3" />
                <span>+12.5% vs mês anterior</span>
              </div>
            </div>

            {/* Despesas */}
            <div className="rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-[#ef4444]/30 hover:bg-red-50/30">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#ef4444]"></div>
                <span className="text-sm text-gray-600">Despesas (Mês)</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">R$ 189.320,00</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-[#ef4444]">
                <TrendingDown className="h-3 w-3" />
                <span>+3.2% vs mês anterior</span>
              </div>
            </div>
          </div>
        </div>

        {/* Em Trânsito */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Em Trânsito</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 text-left font-medium text-gray-500">Data</th>
                  <th className="pb-2 text-left font-medium text-gray-500">Transportadora</th>
                  <th className="pb-2 text-left font-medium text-gray-500">Destino</th>
                  <th className="pb-2 text-left font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="group border-b border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    <td className="py-2">
                      <span className="text-xs text-gray-500">{shipment.id}</span>
                      <p className="font-medium text-gray-900">{shipment.date}</p>
                    </td>
                    <td className="py-2 text-gray-700">{shipment.carrier}</td>
                    <td className="py-2 text-gray-700">{shipment.destination}</td>
                    <td className="py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium text-white ${shipment.statusColor}`}
                      >
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estoque */}
        <div className="flex flex-col">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Estoque</h2>
          <div className="flex-1 space-y-3">
            {stockItems.map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-between rounded-lg border border-gray-100 p-3 transition-all duration-200 hover:border-gray-200 hover:bg-gray-50"
              >
                <span className="text-sm text-gray-600">{item.label}</span>
                <span
                  className={`rounded-lg px-3 py-1 text-sm font-bold text-white ${item.bgColor}`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/estoque"
            className="mt-4 block w-full rounded-lg bg-[#e67e22] py-2.5 text-center text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
          >
            Gerenciar Estoque
          </Link>
        </div>
      </div>
    </div>
  )
}
