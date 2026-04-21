"use client"

import Link from "next/link"

const stockItems = [
  {
    label: "Produtos em Estoque",
    value: "1,245",
    color: "text-[#10b981]",
    bgColor: "bg-[#10b981]",
  },
  {
    label: "Produtos para Repor",
    value: "345",
    color: "text-[#e67e22]",
    bgColor: "bg-[#e67e22]",
  },
  {
    label: "Produtos Esgotados",
    value: "28",
    color: "text-[#ef4444]",
    bgColor: "bg-[#ef4444]",
  },
]

export function StockCard() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Estoque</h2>
      
      <div className="space-y-3">
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
  )
}
