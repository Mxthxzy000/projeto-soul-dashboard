
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Modal } from "@/components/ui/modal"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Plus, Trash2 } from "lucide-react"
import { useState, useMemo } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Transaction {
  id: number
  desc: string
  value: number
  type: "income" | "expense"
  date: string
  category: string
}

const initialTransactions: Transaction[] = [
  { id: 1, desc: "Venda - Loja Centro", value: 12500, type: "income", date: "22/04/2024", category: "Vendas" },
  { id: 2, desc: "Pagamento Fornecedor", value: 8200, type: "expense", date: "22/04/2024", category: "Fornecedores" },
  { id: 3, desc: "Venda - E-commerce", value: 4800, type: "income", date: "21/04/2024", category: "Vendas" },
  { id: 4, desc: "Frete - Transportadora", value: 1500, type: "expense", date: "21/04/2024", category: "Logística" },
  { id: 5, desc: "Venda - Distribuidora", value: 28000, type: "income", date: "20/04/2024", category: "Vendas" },
  { id: 6, desc: "Salários - Abril", value: 85000, type: "expense", date: "19/04/2024", category: "Salários" },
  { id: 7, desc: "Venda - Atacado", value: 18500, type: "income", date: "18/04/2024", category: "Vendas" },
  { id: 8, desc: "Marketing Digital", value: 3200, type: "expense", date: "17/04/2024", category: "Marketing" },
]

const expenseCategories = ["Salários", "Fornecedores", "Logística", "Marketing", "Outros"]
const incomeCategories = ["Vendas", "Serviços", "Comissões", "Outros"]

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [formData, setFormData] = useState({
    desc: "",
    value: 0,
    type: "income" as "income" | "expense",
    category: "Vendas",
    date: "",
  })

  const monthlyData = useMemo(() => {
    return [
      { name: "Jan", receita: 320000, despesa: 180000 },
      { name: "Fev", receita: 380000, despesa: 190000 },
      { name: "Mar", receita: 350000, despesa: 175000 },
      { name: "Abr", receita: transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.value, 0), 
             despesa: transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.value, 0) },
    ]
  }, [transactions])

  const expenseDistribution = useMemo(() => {
    const expensesByCategory: Record<string, number> = {}
    transactions.filter(t => t.type === "expense").forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.value
    })
    const colors = ["#e67e22", "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"]
    return Object.entries(expensesByCategory).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }))
  }, [transactions])

  const stats = useMemo(() => {
    const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.value, 0)
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.value, 0)
    const profit = totalIncome - totalExpense
    return { totalIncome, totalExpense, profit }
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") return transactions
    return transactions.filter(t => t.type === filterType)
  }, [transactions, filterType])

  const getCurrentDate = () => {
    const now = new Date()
    return `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`
  }

  const handleAddTransaction = () => {
    if (!formData.desc || !formData.value) return

    const newTransaction: Transaction = {
      id: Date.now(),
      desc: formData.desc,
      value: formData.value,
      type: formData.type,
      category: formData.category,
      date: formData.date || getCurrentDate(),
    }
    setTransactions([newTransaction, ...transactions])
    setIsModalOpen(false)
    setFormData({ desc: "", value: 0, type: "income", category: "Vendas", date: "" })
  }

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
            <p className="text-sm text-gray-500">Acompanhe suas receitas e despesas</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#e67e22] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
          >
            <Plus className="h-4 w-4" />
            Nova Transação
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[#10b981]/10 p-2.5">
                <TrendingUp className="h-5 w-5 text-[#10b981]" />
              </div>
              <span className="flex items-center gap-1 text-xs text-[#10b981]">
                <ArrowUpRight className="h-3 w-3" />
                +12.5%
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">Receita Total (Mês)</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">R$ {stats.totalIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="group rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[#ef4444]/10 p-2.5">
                <TrendingDown className="h-5 w-5 text-[#ef4444]" />
              </div>
              <span className="flex items-center gap-1 text-xs text-[#ef4444]">
                <ArrowDownRight className="h-3 w-3" />
                +3.2%
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">Despesas (Mês)</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">R$ {stats.totalExpense.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>

          <div className="group rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[#e67e22]/10 p-2.5">
                <DollarSign className="h-5 w-5 text-[#e67e22]" />
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500">Lucro Líquido</p>
            <p className={`mt-1 text-2xl font-bold ${stats.profit >= 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}>
              R$ {stats.profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="group rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-[#3b82f6]/10 p-2.5">
                <CreditCard className="h-5 w-5 text-[#3b82f6]" />
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500">Transações</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{transactions.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue vs Expenses */}
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Receitas vs Despesas</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  />
                  <Bar dataKey="receita" fill="#10b981" radius={[4, 4, 0, 0]} name="Receita" />
                  <Bar dataKey="despesa" fill="#ef4444" radius={[4, 4, 0, 0]} name="Despesa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Distribution */}
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Distribuição de Despesas</h2>
            <div className="flex items-center gap-4">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {expenseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {expenseDistribution.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      <span className="text-gray-600">{cat.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">R$ {cat.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Transações Recentes</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filterType === "all" ? "bg-[#e67e22] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterType("income")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filterType === "income" ? "bg-[#10b981] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => setFilterType("expense")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filterType === "expense" ? "bg-[#ef4444] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Despesas
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left font-medium text-gray-500">Descrição</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Categoria</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Data</th>
                  <th className="pb-3 text-right font-medium text-gray-500">Valor</th>
                  <th className="pb-3 text-right font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="group border-b border-gray-100 transition-colors hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-900">{tx.desc}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{tx.date}</td>
                      <td className={`py-3 text-right font-medium ${tx.type === "income" ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                        {tx.type === "income" ? "+" : "-"} R$ {tx.value.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteTransaction(tx.id)}
                          className="rounded-lg p-1.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Transação"
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFormData({ ...formData, type: "income", category: "Vendas" })}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                formData.type === "income"
                  ? "bg-[#10b981] text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Receita
            </button>
            <button
              onClick={() => setFormData({ ...formData, type: "expense", category: "Fornecedores" })}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                formData.type === "expense"
                  ? "bg-[#ef4444] text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Despesa
            </button>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              placeholder="Ex: Venda - Loja Centro"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Valor (R$)</label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                {(formData.type === "income" ? incomeCategories : expenseCategories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Data (opcional)</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="DD/MM/AAAA (padrão: hoje)"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddTransaction}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium text-white transition-all duration-200 ${
                formData.type === "income" ? "bg-[#10b981] hover:bg-[#059669]" : "bg-[#ef4444] hover:bg-[#dc2626]"
              }`}
            >
              Adicionar {formData.type === "income" ? "Receita" : "Despesa"}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}
