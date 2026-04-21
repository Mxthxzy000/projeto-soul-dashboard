
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Modal } from "@/components/ui/modal"
import { FileText, Download, Filter, TrendingUp, TrendingDown, Plus, Trash2, Eye } from "lucide-react"
import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface Report {
  id: number
  name: string
  date: string
  type: string
  description?: string
  status: "ready" | "processing" | "error"
}

const reportTypes = ["Vendas", "Financeiro", "Estoque", "RH", "Transporte", "Geral"]

const initialReports: Report[] = [
  { id: 1, name: "Relatório de Vendas - Abril 2024", date: "22/04/2024", type: "Vendas", description: "Análise completa de vendas do mês de abril", status: "ready" },
  { id: 2, name: "Relatório Financeiro Q1 2024", date: "15/04/2024", type: "Financeiro", description: "Balanço trimestral com análise de receitas e despesas", status: "ready" },
  { id: 3, name: "Análise de Estoque", date: "10/04/2024", type: "Estoque", description: "Inventário completo e produtos para reposição", status: "ready" },
  { id: 4, name: "Performance de Funcionários", date: "05/04/2024", type: "RH", description: "Métricas de desempenho da equipe", status: "ready" },
  { id: 5, name: "Relatório de Logística", date: "01/04/2024", type: "Transporte", description: "Análise de entregas e rotas", status: "ready" },
]

const salesData = [
  { name: "Jan", vendas: 12000, meta: 15000 },
  { name: "Fev", vendas: 19000, meta: 15000 },
  { name: "Mar", vendas: 15000, meta: 18000 },
  { name: "Abr", vendas: 28000, meta: 20000 },
  { name: "Mai", vendas: 22000, meta: 22000 },
  { name: "Jun", vendas: 25000, meta: 25000 },
  { name: "Jul", vendas: 32000, meta: 28000 },
  { name: "Ago", vendas: 38000, meta: 30000 },
]

const categoryData = [
  { name: "Eletrônicos", value: 45000 },
  { name: "Vestuário", value: 32000 },
  { name: "Alimentos", value: 28000 },
  { name: "Móveis", value: 18000 },
  { name: "Outros", value: 12000 },
]

export default function RelatorioPage() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [filterType, setFilterType] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "Vendas",
    description: "",
  })

  const filteredReports = useMemo(() => {
    if (filterType === "all") return reports
    return reports.filter(r => r.type === filterType)
  }, [reports, filterType])

  const stats = useMemo(() => {
    const totalSales = salesData.reduce((sum, d) => sum + d.vendas, 0)
    const totalOrders = 1045
    const avgTicket = totalSales / totalOrders
    return { totalSales, totalOrders, avgTicket }
  }, [])

  const getCurrentDate = () => {
    const now = new Date()
    return `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`
  }

  const handleGenerateReport = () => {
    if (!formData.name) return

    const newReport: Report = {
      id: Date.now(),
      name: formData.name,
      date: getCurrentDate(),
      type: formData.type,
      description: formData.description,
      status: "processing",
    }
    setReports([newReport, ...reports])
    setIsModalOpen(false)
    setFormData({ name: "", type: "Vendas", description: "" })

    // Simular processamento
    setTimeout(() => {
      setReports(prev => prev.map(r => r.id === newReport.id ? { ...r, status: "ready" as const } : r))
    }, 2000)
  }

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter(r => r.id !== id))
    setIsDetailModalOpen(false)
    setSelectedReport(null)
  }

  const handleDownload = (report: Report) => {
    // Simular download
    const element = document.createElement("a")
    const content = `Relatório: ${report.name}\nData: ${report.date}\nTipo: ${report.type}\n\n${report.description || "Sem descrição"}`
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${report.name.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <span className="inline-flex rounded-full bg-[#10b981]/10 px-2.5 py-1 text-xs font-medium text-[#10b981]">Pronto</span>
      case "processing":
        return <span className="inline-flex rounded-full bg-[#e67e22]/10 px-2.5 py-1 text-xs font-medium text-[#e67e22]">Processando...</span>
      case "error":
        return <span className="inline-flex rounded-full bg-[#ef4444]/10 px-2.5 py-1 text-xs font-medium text-[#ef4444]">Erro</span>
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-sm text-gray-500">Visualize análises e métricas do negócio</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-[#e67e22] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
            >
              <Plus className="h-4 w-4" />
              Gerar Relatório
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm text-gray-500">Vendas Totais</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">R$ {stats.totalSales.toLocaleString()}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#10b981]">
              <TrendingUp className="h-3 w-3" />
              <span>+18.5% vs período anterior</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm text-gray-500">Ticket Médio</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">R$ {stats.avgTicket.toFixed(2)}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#10b981]">
              <TrendingUp className="h-3 w-3" />
              <span>+5.2% vs período anterior</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm text-gray-500">Total de Pedidos</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#10b981]">
              <TrendingUp className="h-3 w-3" />
              <span>+12.8% vs período anterior</span>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm text-gray-500">Taxa de Conversão</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">3.8%</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#ef4444]">
              <TrendingDown className="h-3 w-3" />
              <span>-0.5% vs período anterior</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sales vs Target */}
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Vendas vs Meta</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="vendas" stroke="#e67e22" strokeWidth={2} dot={{ r: 4 }} name="Vendas" />
                  <Line type="monotone" dataKey="meta" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Meta" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Vendas por Categoria</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} />
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  />
                  <Bar dataKey="value" fill="#e67e22" radius={[0, 4, 4, 0]} name="Vendas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Relatórios Gerados</h2>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                <option value="all">Todos os Tipos</option>
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {filteredReports.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Nenhum relatório encontrado.
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="group flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-[#e67e22]/30 hover:bg-orange-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#e67e22]/10 p-2">
                      <FileText className="h-5 w-5 text-[#e67e22]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(report.status)}
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {report.type}
                    </span>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => { setSelectedReport(report); setIsDetailModalOpen(true); }}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-all duration-200 hover:border-[#3b82f6] hover:text-[#3b82f6]"
                        title="Ver detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {report.status === "ready" && (
                        <button
                          onClick={() => handleDownload(report)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-all duration-200 hover:border-[#e67e22] hover:text-[#e67e22]"
                          title="Baixar"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-all duration-200 hover:border-[#ef4444] hover:text-[#ef4444]"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Generate Report Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Gerar Novo Relatório"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Nome do Relatório</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Relatório de Vendas - Maio 2024"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            >
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Descrição (opcional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o conteúdo do relatório..."
              rows={3}
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
              onClick={handleGenerateReport}
              className="flex-1 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
            >
              Gerar Relatório
            </button>
          </div>
        </div>
      </Modal>

      {/* Report Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedReport(null); }}
        title="Detalhes do Relatório"
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedReport.name}</h3>
                <p className="text-sm text-gray-500">Gerado em {selectedReport.date}</p>
              </div>
              {getStatusBadge(selectedReport.status)}
            </div>
            
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-3">
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium text-gray-900">{selectedReport.type}</p>
              </div>
              {selectedReport.description && (
                <div>
                  <p className="text-sm text-gray-500">Descrição</p>
                  <p className="text-gray-700">{selectedReport.description}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleDeleteReport(selectedReport.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444] py-2.5 text-sm font-medium text-[#ef4444] transition-all duration-200 hover:bg-[#ef4444] hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
              {selectedReport.status === "ready" && (
                <button
                  onClick={() => { handleDownload(selectedReport); setIsDetailModalOpen(false); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
                >
                  <Download className="h-4 w-4" />
                  Baixar
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
