
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Modal } from "@/components/ui/modal"
import { Users, Plus, Search, Mail, Phone, Building, UserCheck, UserX, Edit, Trash2 } from "lucide-react"
import { useState, useMemo } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  department: string
  role: string
  status: "active" | "inactive"
  hireDate?: string
  salary?: number
}

const departments = ["Vendas", "TI", "RH", "Logística", "Financeiro", "Marketing", "Produção"]
const roles = ["Gerente", "Coordenador", "Analista", "Desenvolvedor", "Designer", "Vendedor", "Supervisor", "Assistente"]

const initialEmployees: Employee[] = [
  { id: 1, name: "Ana Silva", email: "ana.silva@empresa.com", phone: "(11) 99999-1111", department: "Vendas", role: "Gerente", status: "active", hireDate: "15/03/2020", salary: 12000 },
  { id: 2, name: "Carlos Santos", email: "carlos.santos@empresa.com", phone: "(11) 99999-2222", department: "TI", role: "Desenvolvedor", status: "active", hireDate: "10/06/2021", salary: 8500 },
  { id: 3, name: "Maria Oliveira", email: "maria.oliveira@empresa.com", phone: "(11) 99999-3333", department: "RH", role: "Analista", status: "active", hireDate: "22/01/2019", salary: 6500 },
  { id: 4, name: "João Pereira", email: "joao.pereira@empresa.com", phone: "(11) 99999-4444", department: "Logística", role: "Coordenador", status: "active", hireDate: "05/09/2022", salary: 9000 },
  { id: 5, name: "Fernanda Costa", email: "fernanda.costa@empresa.com", phone: "(11) 99999-5555", department: "Financeiro", role: "Analista", status: "inactive", hireDate: "18/04/2018", salary: 7000 },
  { id: 6, name: "Pedro Lima", email: "pedro.lima@empresa.com", phone: "(11) 99999-6666", department: "Vendas", role: "Vendedor", status: "active", hireDate: "30/07/2023", salary: 4500 },
  { id: 7, name: "Juliana Martins", email: "juliana.martins@empresa.com", phone: "(11) 99999-7777", department: "Marketing", role: "Designer", status: "active", hireDate: "12/02/2021", salary: 7500 },
  { id: 8, name: "Ricardo Alves", email: "ricardo.alves@empresa.com", phone: "(11) 99999-8888", department: "Produção", role: "Supervisor", status: "active", hireDate: "25/11/2020", salary: 8000 },
]

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const getAvatarColor = (name: string) => {
  const colors = ["bg-[#e67e22]", "bg-[#10b981]", "bg-[#3b82f6]", "bg-[#8b5cf6]", "bg-[#ef4444]"]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export default function RelacoesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Vendas",
    role: "Analista",
    status: "active" as "active" | "inactive",
    hireDate: "",
    salary: 0,
  })

  const filteredEmployees = useMemo(() => {
    return employees.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.department.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = filterDepartment === "all" || e.department === filterDepartment
      const matchesStatus = filterStatus === "all" || e.status === filterStatus
      return matchesSearch && matchesDepartment && matchesStatus
    })
  }, [employees, searchTerm, filterDepartment, filterStatus])

  const stats = useMemo(() => {
    const total = employees.length
    const active = employees.filter(e => e.status === "active").length
    const inactive = employees.filter(e => e.status === "inactive").length
    const deptCount = new Set(employees.map(e => e.department)).size
    return [
      { label: "Total de Funcionários", value: total.toString(), icon: Users, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10" },
      { label: "Ativos", value: active.toString(), icon: UserCheck, color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
      { label: "Inativos", value: inactive.toString(), icon: UserX, color: "text-[#ef4444]", bg: "bg-[#ef4444]/10" },
      { label: "Departamentos", value: deptCount.toString(), icon: Building, color: "text-[#e67e22]", bg: "bg-[#e67e22]/10" },
    ]
  }, [employees])

  const handleAddEmployee = () => {
    if (!formData.name || !formData.email) return

    if (isEditing && selectedEmployee) {
      setEmployees(employees.map(e => e.id === selectedEmployee.id ? {
        ...e,
        ...formData,
      } : e))
    } else {
      const newEmployee: Employee = {
        id: Date.now(),
        ...formData,
      }
      setEmployees([...employees, newEmployee])
    }
    
    closeModal()
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id))
    setIsDetailModalOpen(false)
    setSelectedEmployee(null)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      role: employee.role,
      status: employee.status,
      hireDate: employee.hireDate || "",
      salary: employee.salary || 0,
    })
    setIsEditing(true)
    setIsDetailModalOpen(false)
    setIsModalOpen(true)
  }

  const handleToggleStatus = (id: number) => {
    setEmployees(employees.map(e => e.id === id ? {
      ...e,
      status: e.status === "active" ? "inactive" : "active"
    } : e))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setFormData({ name: "", email: "", phone: "", department: "Vendas", role: "Analista", status: "active", hireDate: "", salary: 0 })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relações</h1>
            <p className="text-sm text-gray-500">Gerencie funcionários e colaboradores</p>
          </div>
          <button
            onClick={() => { setIsEditing(false); setIsModalOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-[#e67e22] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400] hover:shadow-lg hover:shadow-[#e67e22]/30"
          >
            <Plus className="h-4 w-4" />
            Novo Funcionário
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`w-fit rounded-lg ${stat.bg} p-2.5`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-3 text-sm text-gray-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Funcionários</h2>
            <div className="flex flex-wrap gap-2">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                <option value="all">Todos os Departamentos</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar funcionário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full py-8 text-center text-gray-500">
              Nenhum funcionário encontrado.
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="group rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <Avatar className={`h-12 w-12 ${getAvatarColor(employee.name)}`}>
                    <AvatarFallback className="text-white">{getInitials(employee.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <button
                        onClick={() => handleToggleStatus(employee.id)}
                        className={`h-3 w-3 rounded-full transition-colors ${
                          employee.status === "active" ? "bg-[#10b981] hover:bg-[#059669]" : "bg-[#ef4444] hover:bg-[#dc2626]"
                        }`}
                        title={employee.status === "active" ? "Ativo - Clique para desativar" : "Inativo - Clique para ativar"}
                      ></button>
                    </div>
                    <p className="text-sm text-[#e67e22]">{employee.role}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Building className="h-4 w-4 text-gray-400" />
                    {employee.department}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {employee.phone}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => { setSelectedEmployee(employee); setIsDetailModalOpen(true); }}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-[#e67e22] hover:text-[#e67e22]"
                  >
                    Ver Perfil
                  </button>
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="flex-1 rounded-lg bg-[#e67e22]/10 py-2 text-sm font-medium text-[#e67e22] transition-all duration-200 hover:bg-[#e67e22] hover:text-white"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Editar Funcionário" : "Novo Funcionário"}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: João da Silva"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@empresa.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Telefone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Departamento</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Cargo</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Data de Contratação</label>
              <input
                type="text"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                placeholder="DD/MM/AAAA"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Salário (R$)</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                min="0"
                step="100"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-[#e67e22] focus:outline-none focus:ring-1 focus:ring-[#e67e22]"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={closeModal}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddEmployee}
              className="flex-1 rounded-lg bg-[#e67e22] py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#d35400]"
            >
              {isEditing ? "Salvar Alterações" : "Adicionar Funcionário"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Employee Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setSelectedEmployee(null); }}
        title="Perfil do Funcionário"
        size="lg"
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className={`h-16 w-16 ${getAvatarColor(selectedEmployee.name)}`}>
                <AvatarFallback className="text-xl text-white">{getInitials(selectedEmployee.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h3>
                <p className="text-[#e67e22]">{selectedEmployee.role}</p>
                <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  selectedEmployee.status === "active" ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#ef4444]/10 text-[#ef4444]"
                }`}>
                  {selectedEmployee.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-500">Departamento</p>
                <p className="font-medium text-gray-900">{selectedEmployee.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Contratação</p>
                <p className="font-medium text-gray-900">{selectedEmployee.hireDate || "Não informada"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E-mail</p>
                <p className="font-medium text-gray-900">{selectedEmployee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium text-gray-900">{selectedEmployee.phone}</p>
              </div>
              {selectedEmployee.salary && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Salário</p>
                  <p className="font-medium text-gray-900">R$ {selectedEmployee.salary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#ef4444] py-2.5 text-sm font-medium text-[#ef4444] transition-all duration-200 hover:bg-[#ef4444] hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
              <button
                onClick={() => handleEditEmployee(selectedEmployee)}
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
