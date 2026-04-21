
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Modal } from "@/components/ui/modal"
import { Calendar, Plus, Clock, Trash2, Edit, X } from "lucide-react"
import { useState } from "react"

interface Event {
  id: number
  time: string
  title: string
  date: string
  type: string
  description?: string
}

const initialEvents: Event[] = [
  { id: 1, time: "08:00", title: "Abertura do Expediente", date: "Segunda-feira, 22 abril", type: "daily", description: "Início das atividades do dia" },
  { id: 2, time: "10:00", title: "Reunião com equipe de produção", date: "Terça-feira, 24 abril", type: "meeting", description: "Discutir metas do trimestre" },
  { id: 3, time: "13:00", title: "Auditoria da contabilidade", date: "Terça-feira, 24 abril", type: "audit", description: "Revisão fiscal Q1" },
  { id: 4, time: "09:00", title: "Treinamento de segurança", date: "Quarta-feira, 25 abril", type: "training", description: "Treinamento obrigatório para todos" },
  { id: 5, time: "14:00", title: "Revisão de metas trimestrais", date: "Quinta-feira, 26 abril", type: "meeting", description: "Análise de KPIs" },
  { id: 6, time: "11:00", title: "Entrevista com candidatos", date: "Sexta-feira, 27 abril", type: "interview", description: "3 candidatos para vaga de desenvolvedor" },
]

const eventTypes = [
  { value: "meeting", label: "Reunião", color: "bg-[#3b82f6]" },
  { value: "training", label: "Treinamento", color: "bg-[#10b981]" },
  { value: "audit", label: "Auditoria", color: "bg-[#8b5cf6]" },
  { value: "interview", label: "Entrevista", color: "bg-[#e67e22]" },
  { value: "daily", label: "Rotina", color: "bg-[#6b7280]" },
]

export default function AgendaPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    time: "09:00",
    date: "",
    type: "meeting",
    description: "",
  })

  const handleAddEvent = () => {
    if (!formData.title || !formData.date) return

    if (isEditing && selectedEvent) {
      setEvents(events.map(e => e.id === selectedEvent.id ? {
        ...e,
        title: formData.title,
        time: formData.time,
        date: formData.date,
        type: formData.type,
        description: formData.description,
      } : e))
    } else {
      const newEvent: Event = {
        id: Date.now(),
        title: formData.title,
        time: formData.time,
        date: formData.date,
        type: formData.type,
        description: formData.description,
      }
      setEvents([...events, newEvent])
    }
    
    setIsModalOpen(false)
    setIsEditing(false)
    setFormData({ title: "", time: "09:00", date: "", type: "meeting", description: "" })
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id))
    setIsDetailModalOpen(false)
    setSelectedEvent(null)
  }

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setFormData({
      title: event.title,
      time: event.time,
      date: event.date,
      type: event.type,
      description: event.description || "",
    })
    setIsEditing(true)
    setIsDetailModalOpen(false)
    setIsModalOpen(true)
  }

  const openEventDetail = (event: Event) => {
    setSelectedEvent(event)
    setIsDetailModalOpen(true)
  }

  const getTypeColor = (type: string) => {
    return eventTypes.find(t => t.value === type)?.color || "bg-gray-500"
  }

  const getTypeLabel = (type: string) => {
    return eventTypes.find(t => t.value === type)?.label || type
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
            <p className="text-sm text-gray-500">Gerencie seus eventos e compromissos</p>
          </div>
          <button
            onClick={() => {
              setIsEditing(false)
              setFormData({ title: "", time: "09:00", date: "", type: "meeting", description: "" })
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2 rounded-lg bg-[#e67e22] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
          >
            <Plus className="h-4 w-4" />
            Novo Evento
          </button>
        </div>

        {/* Calendar Preview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Mini Calendar */}
          <div className="rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#e67e22]" />
              <h2 className="text-lg font-semibold text-gray-900">Abril 2024</h2>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day} className="py-2 font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day === selectedDate ? null : day)}
                  className={`rounded-lg py-2 text-sm transition-all duration-200 ${
                    selectedDate === day
                      ? "bg-[#d35400] font-medium text-white ring-2 ring-[#e67e22] ring-offset-2"
                      : [22, 24, 25, 26, 27].includes(day)
                      ? "bg-[#e67e22] font-medium text-white hover:bg-[#d35400]"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            {selectedDate && (
              <div className="mt-4 rounded-lg bg-orange-50 p-3 text-sm text-[#e67e22]">
                Selecionado: {selectedDate}/04/2024
              </div>
            )}
          </div>

          {/* Events List */}
          <div className="lg:col-span-2 rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Próximos Eventos ({events.length})</h2>
            </div>
            <div className="max-h-[400px] space-y-3 overflow-y-auto pr-2">
              {events.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  Nenhum evento cadastrado. Clique em &quot;Novo Evento&quot; para adicionar.
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => openEventDetail(event)}
                    className="group flex cursor-pointer items-start gap-4 rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:border-[#e67e22]/30 hover:bg-orange-50/50 hover:shadow-md"
                  >
                    <div className="flex flex-col items-center rounded-lg bg-[#e67e22]/10 px-3 py-2">
                      <Clock className="h-4 w-4 text-[#e67e22]" />
                      <span className="mt-1 text-sm font-bold text-[#e67e22]">{event.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${getTypeColor(event.type)}`}></span>
                        <p className="font-medium text-gray-900 transition-colors group-hover:text-[#e67e22]">
                          {event.title}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">{event.date}</p>
                      <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {getTypeLabel(event.type)}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditEvent(event); }}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#e67e22]/10 hover:text-[#e67e22]"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                        className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setIsEditing(false); }}
        title={isEditing ? "Editar Evento" : "Novo Evento"}
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Reunião de equipe"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Horário</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
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
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Data</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="Ex: Segunda-feira, 22 abril"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Descrição (opcional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Adicione detalhes sobre o evento..."
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => { setIsModalOpen(false); setIsEditing(false); }}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddEvent}
              className="flex-1 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
            >
              {isEditing ? "Salvar Alterações" : "Adicionar Evento"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Event Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedEvent(null); }}
        title="Detalhes do Evento"
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${getTypeColor(selectedEvent.type)}`}></span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {getTypeLabel(selectedEvent.type)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
              <p className="mt-1 text-gray-500">{selectedEvent.date} às {selectedEvent.time}</p>
            </div>
            {selectedEvent.description && (
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-700">{selectedEvent.description}</p>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444] py-2.5 text-sm font-medium text-[#ef4444] transition-all duration-200 hover:bg-[#ef4444] hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
              <button
                onClick={() => handleEditEvent(selectedEvent)}
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
