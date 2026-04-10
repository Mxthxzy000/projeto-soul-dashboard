import { useState } from 'react'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const employees = [
  { id: 1, name: 'Ana Silva', email: 'ana.silva@empresa.com', phone: '(11) 99999-1111', department: 'Vendas', role: 'Gerente', status: 'active' },
  { id: 2, name: 'Carlos Santos', email: 'carlos.santos@empresa.com', phone: '(11) 99999-2222', department: 'TI', role: 'Desenvolvedor', status: 'active' },
  { id: 3, name: 'Maria Oliveira', email: 'maria.oliveira@empresa.com', phone: '(11) 99999-3333', department: 'RH', role: 'Analista', status: 'active' },
  { id: 4, name: 'João Pereira', email: 'joao.pereira@empresa.com', phone: '(11) 99999-4444', department: 'Logística', role: 'Coordenador', status: 'active' },
  { id: 5, name: 'Fernanda Costa', email: 'fernanda.costa@empresa.com', phone: '(11) 99999-5555', department: 'Financeiro', role: 'Analista', status: 'inactive' },
  { id: 6, name: 'Pedro Lima', email: 'pedro.lima@empresa.com', phone: '(11) 99999-6666', department: 'Vendas', role: 'Vendedor', status: 'active' },
  { id: 7, name: 'Juliana Martins', email: 'juliana.martins@empresa.com', phone: '(11) 99999-7777', department: 'Marketing', role: 'Designer', status: 'active' },
  { id: 8, name: 'Ricardo Alves', email: 'ricardo.alves@empresa.com', phone: '(11) 99999-8888', department: 'Produção', role: 'Supervisor', status: 'active' },
]

const stats = [
  { label: 'Total de Funcionários', value: '142', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Ativos', value: '138', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { label: 'Inativos', value: '4', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  { label: 'Departamentos', value: '8', color: '#E67E22', bg: 'rgba(230,126,34,0.1)' },
]

const avatarColors = ['#E67E22', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444']

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function getAvatarColor(name: string) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length]
}

export default function RelacoesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Relações</h1>
            <p className="page-subtitle">Gerencie funcionários e equipes</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Funcionário
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" width="20" height="20">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 className="card-title" style={{ margin: 0 }}>Funcionários</h2>
            <div className="search-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Buscar funcionário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Funcionário</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Departamento</th>
                  <th>Cargo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          className="avatar"
                          style={{ background: getAvatarColor(e.name) }}
                        >
                          {getInitials(e.name)}
                        </div>
                        <span style={{ fontWeight: 500 }}>{e.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#666' }}>{e.email}</td>
                    <td style={{ color: '#666' }}>{e.phone}</td>
                    <td>{e.department}</td>
                    <td>{e.role}</td>
                    <td>
                      <span className={e.status === 'active' ? 'badge badge-green' : 'badge badge-red'}>
                        {e.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
