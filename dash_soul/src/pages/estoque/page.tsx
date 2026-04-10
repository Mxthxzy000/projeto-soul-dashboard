import { useState } from 'react'
import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const products = [
  { id: 1, name: 'Notebook Dell Inspiron 15', sku: 'NB-001', category: 'Eletrônicos', stock: 45, minStock: 10, price: 3599.0, status: 'ok' },
  { id: 2, name: 'Mouse Logitech MX Master', sku: 'MS-002', category: 'Periféricos', stock: 120, minStock: 30, price: 499.0, status: 'ok' },
  { id: 3, name: 'Teclado Mecânico Redragon', sku: 'TC-003', category: 'Periféricos', stock: 8, minStock: 20, price: 289.0, status: 'low' },
  { id: 4, name: 'Monitor LG 27" 4K', sku: 'MN-004', category: 'Monitores', stock: 0, minStock: 5, price: 2199.0, status: 'out' },
  { id: 5, name: 'Headset HyperX Cloud', sku: 'HS-005', category: 'Áudio', stock: 32, minStock: 15, price: 399.0, status: 'ok' },
  { id: 6, name: 'Webcam Logitech C920', sku: 'WC-006', category: 'Periféricos', stock: 5, minStock: 10, price: 449.0, status: 'low' },
  { id: 7, name: 'SSD Samsung 1TB', sku: 'SD-007', category: 'Armazenamento', stock: 78, minStock: 25, price: 599.0, status: 'ok' },
  { id: 8, name: 'Memória RAM 16GB DDR4', sku: 'MM-008', category: 'Componentes', stock: 0, minStock: 20, price: 299.0, status: 'out' },
]

const stats = [
  { label: 'Total de Produtos', value: '1.245', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Em Estoque', value: '1.172', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { label: 'Estoque Baixo', value: '45', color: '#E67E22', bg: 'rgba(230,126,34,0.1)' },
  { label: 'Esgotados', value: '28', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
]

const statusConfig: Record<string, { label: string; cls: string }> = {
  ok: { label: 'Em estoque', cls: 'badge badge-green' },
  low: { label: 'Estoque baixo', cls: 'badge badge-orange' },
  out: { label: 'Esgotado', cls: 'badge badge-red' },
}

export default function EstoquePage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Estoque</h1>
            <p className="page-subtitle">Gerencie seus produtos e inventário</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Produto
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" width="20" height="20">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
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
            <h2 className="card-title" style={{ margin: 0 }}>Lista de Produtos</h2>
            <div className="search-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Buscar produto..."
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
                  <th>Produto</th>
                  <th>SKU</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td style={{ color: '#888' }}>{p.sku}</td>
                    <td>{p.category}</td>
                    <td>
                      <span style={{ fontWeight: 500, color: p.stock <= p.minStock ? '#ef4444' : '#1a1a1a' }}>
                        {p.stock}
                      </span>
                      <span style={{ color: '#aaa' }}> / {p.minStock} min</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <span className={statusConfig[p.status].cls}>
                        {statusConfig[p.status].label}
                      </span>
                    </td>
                    <td>
                      <button className="btn-secondary" style={{ marginRight: 6 }}>Editar</button>
                      <button className="btn-secondary" style={{ borderColor: '#ef4444', color: '#ef4444' }}>Excluir</button>
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
