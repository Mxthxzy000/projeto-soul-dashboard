"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

export function FinanceCard() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Financeiro</h2>
      
      <div className="space-y-4">
        {/* Revenue */}
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

        {/* Expenses */}
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
  )
}
