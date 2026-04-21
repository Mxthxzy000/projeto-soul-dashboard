
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Modal } from "@/components/ui/modal"
import { Truck, Plus, MapPin, Clock, CheckCircle, AlertCircle, Eye, Edit, Trash2 } from "lucide-react"
import { useState, useMemo } from "react"

interface Shipment {
  id: string
  date: string
  carrier: string
  origin: string
  destination: string
  status: "transit" | "delivered" | "pending" | "delayed"
  eta: string
  notes?: string
}

const statusConfig = {
  transit: { label: "Em trânsito", color: "bg-[#e67e22]" },
  delivered: { label: "Entregue", color: "bg-[#10b981]" },
  pending: { label: "Aguardando", color: "bg-[#3b82f6]" },
  delayed: { label: "Atrasado", color: "bg-[#ef4444]" },
}

const carriers = ["Transportadora Rápido", "Transportadora Velox", "Transportadora Expressa", "Transportadora Sul", "Transportadora Norte"]
const locations = ["Centro de Distribuição SP", "Fábrica Campinas", "Loja Santo André", "Loja Centro", "Loja Osasco", "Distribuidora Mena", "Eltai Ribeirão"]

const initialShipments: Shipment[] = [
  { id: "TN-003", date: "22/04/2024", carrier: "Transportadora Rápido", origin: "Centro de Distribuição SP", destination: "Loja Santo André", status: "transit", eta: "24/04/2024", notes: "Carga frágil, manusear com cuidado" },
  { id: "TN-022", date: "20/04/2024", carrier: "Transportadora Velox", origin: "Fábrica Campinas", destination: "Distribuidora Mena", status: "transit", eta: "23/04/2024" },
  { id: "TN-001", date: "16/04/2024", carrier: "Transportadora Expressa", origin: "Centro de Distribuição SP", destination: "Eltai Ribeirão", status: "delivered", eta: "18/04/2024" },
  { id: "TN-000", date: "15/04/2024", carrier: "Transportadora Sul", origin: "Fábrica Campinas", destination: "Loja Centro", status: "delivered", eta: "17/04/2024" },
  { id: "TN-005", date: "23/04/2024", carrier: "Transportadora Norte", origin: "Centro de Distribuição SP", destination: "Loja Osasco", status: "pending", eta: "25/04/2024" },
  { id: "TN-006", date: "18/04/2024", carrier: "Transportadora Rápido", origin: "Fábrica Campinas", destination: "Loja Santo André", status: "delayed", eta: "20/04/2024", notes: "Problema mecânico no veículo" },
]

export default function TransportePage() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    carrier: carriers[0],
    origin: locations[0],
    destination: locations[2],
    eta: "",
    notes: "",
  })

  const filteredShipments = useMemo(() => {
    if (filterStatus === "all") return shipments
    return shipments.filter(s => s.status === filterStatus)
  }, [shipments, filterStatus])

  const stats = useMemo(() => {
    return [
      { label: "Em Trânsito", value: shipments.filter(s => s.status === "transit").length.toString(), icon: Truck, color: "text-[#e67e22]", bg: "bg-[#e67e22]/10", filter: "transit" },
      { label: "Entregues", value: shipments.filter(s => s.status === "delivered").length.toString(), icon: CheckCircle, color: "text-[#10b981]", bg: "bg-[#10b981]/10", filter: "delivered" },
      { label: "Aguardando", value: shipments.filter(s => s.status === "pending").length.toString(), icon: Clock, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", filter: "pending" },
      { label: "Atrasados", value: shipments.filter(s => s.status === "delayed").length.toString(), icon: AlertCircle, color: "text-[#ef4444]", bg: "bg-[#ef4444]/10", filter: "delayed" },
    ]
  }, [shipments])

  const generateId = () => {
    const num = Math.floor(Math.random() * 1000)
    return `TN-${num.toString().padStart(3, "0")}`
  }

  const getCurrentDate = () => {
    const now = new Date()
    return `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`
  }

  const handleAddShipment = () => {
    if (!formData.carrier || !formData.origin || !formData.destination || !formData.eta) return

    if (isEditing && selectedShipment) {
      setShipments(shipments.map(s => s.id === selectedShipment.id ? {
        ...s,
        carrier: formData.carrier,
        origin: formData.origin,
        destination: formData.destination,
        eta: formData.eta,
        notes: formData.notes,
      } : s))
    } else {
      const newShipment: Shipment = {
        id: generateId(),
        date: getCurrentDate(),
        carrier: formData.carrier,
        origin: formData.origin,
        destination: formData.destination,
        status: "pending",
        eta: formData.eta,
        notes: formData.notes,
      }
      setShipments([newShipment, ...shipments])
    }
    
    closeModal()
  }

  const handleDeleteShipment = (id: string) => {
    setShipments(shipments.filter(s => s.id !== id))
    setIsDetailModalOpen(false)
    setSelectedShipment(null)
  }

  const handleEditShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment)
    setFormData({
      carrier: shipment.carrier,
      origin: shipment.origin,
      destination: shipment.destination,
      eta: shipment.eta,
      notes: shipment.notes || "",
    })
    setIsEditing(true)
    setIsDetailModalOpen(false)
    setIsModalOpen(true)
  }

  const handleUpdateStatus = (id: string, newStatus: Shipment["status"]) => {
    setShipments(shipments.map(s => s.id === id ? { ...s, status: newStatus } : s))
    setIsDetailModalOpen(false)
    setSelectedShipment(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setFormData({ carrier: carriers[0], origin: locations[0], destination: locations[2], eta: "", notes: "" })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transporte</h1>
            <p className="text-sm text-gray-500">Gerencie suas entregas e transportes</p>
          </div>
          <button
            onClick={() => { setIsEditing(false); setIsModalOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-[#e67e22] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
          >
            <Plus className="h-4 w-4" />
            Nova Entrega
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <button
              key={stat.label}
              onClick={() => setFilterStatus(filterStatus === stat.filter ? "all" : stat.filter)}
              className={`group rounded-xl bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                filterStatus === stat.filter ? "ring-2 ring-[#e67e22]" : ""
              }`}
            >
              <div className={`w-fit rounded-lg ${stat.bg} p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-3 text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </button>
          ))}
        </div>

        {/* Shipments Table */}
        <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Todas as Entregas
              {filterStatus !== "all" && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (Filtrado: {statusConfig[filterStatus as keyof typeof statusConfig]?.label})
                </span>
              )}
            </h2>
            {filterStatus !== "all" && (
              <button
                onClick={() => setFilterStatus("all")}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
              >
                Limpar filtro
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left font-medium text-gray-500">ID</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Data</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Transportadora</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Origem</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Destino</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Previsão</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-left font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      Nenhuma entrega encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredShipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="group border-b border-gray-100 transition-colors hover:bg-gray-50"
                    >
                      <td className="py-3 font-medium text-gray-900">{shipment.id}</td>
                      <td className="py-3 text-gray-500">{shipment.date}</td>
                      <td className="py-3 text-gray-700">{shipment.carrier}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1 text-gray-700">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="max-w-[150px] truncate">{shipment.origin}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1 text-gray-700">
                          <MapPin className="h-3 w-3 text-[#e67e22]" />
                          <span className="max-w-[150px] truncate">{shipment.destination}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-500">{shipment.eta}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium text-white ${statusConfig[shipment.status].color}`}>
                          {statusConfig[shipment.status].label}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setSelectedShipment(shipment); setIsDetailModalOpen(true); }}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditShipment(shipment)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#e67e22]/10 hover:text-[#e67e22]"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteShipment(shipment.id)}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Shipment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Entrega" : "Nova Entrega"}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Transportadora</label>
            <select
              value={formData.carrier}
              onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            >
              {carriers.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Origem</label>
              <select
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Destino</label>
              <select
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Previsão de Entrega</label>
            <input
              type="text"
              value={formData.eta}
              onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
              placeholder="Ex: 25/04/2024"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Observações (opcional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Adicione observações sobre a entrega..."
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={closeModal}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddShipment}
              className="flex-1 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
            >
              {isEditing ? "Salvar Alterações" : "Criar Entrega"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Shipment Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedShipment(null); }}
        title="Detalhes da Entrega"
        size="lg"
      >
        {selectedShipment && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedShipment.id}</h3>
                <p className="text-sm text-gray-500">Criado em {selectedShipment.date}</p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium text-white ${statusConfig[selectedShipment.status].color}`}>
                {statusConfig[selectedShipment.status].label}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-500">Transportadora</p>
                <p className="font-medium text-gray-900">{selectedShipment.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Previsão</p>
                <p className="font-medium text-gray-900">{selectedShipment.eta}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Origem</p>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="font-medium text-gray-900">{selectedShipment.origin}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Destino</p>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-[#e67e22]" />
                  <p className="font-medium text-gray-900">{selectedShipment.destination}</p>
                </div>
              </div>
            </div>

            {selectedShipment.notes && (
              <div>
                <p className="mb-1 text-sm text-gray-500">Observações</p>
                <p className="rounded-lg bg-orange-50 p-3 text-gray-700">{selectedShipment.notes}</p>
              </div>
            )}

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Atualizar Status:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleUpdateStatus(selectedShipment.id, key as Shipment["status"])}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      selectedShipment.status === key
                        ? `${config.color} text-white`
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleDeleteShipment(selectedShipment.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444] py-2.5 text-sm font-medium text-[#ef4444] transition-all duration-200 hover:bg-[#ef4444] hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
              <button
                onClick={() => handleEditShipment(selectedShipment)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
              >
                <Edit className="h-4 w-4" />
                Editar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}
