import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const shipments = [
  { id: 'TN-003', date: '22/04/2024', carrier: 'Transportadora Rápido', origin: 'CD São Paulo', destination: 'Loja Santo André', status: 'Em trânsito', statusCls: 'badge badge-orange', eta: '24/04/2024' },
  { id: 'TN-022', date: '20/04/2024', carrier: 'Transportadora Velox', origin: 'Fábrica Campinas', destination: 'Distribuidora Mena', status: 'Em trânsito', statusCls: 'badge badge-orange', eta: '23/04/2024' },
  { id: 'TN-001', date: '16/04/2024', carrier: 'Transportadora Expressa', origin: 'CD São Paulo', destination: 'Eltai Ribeirão', status: 'Entregue', statusCls: 'badge badge-green', eta: '18/04/2024' },
  { id: 'TN-000', date: '15/04/2024', carrier: 'Transportadora Sul', origin: 'Fábrica Campinas', destination: 'Loja Centro', status: 'Entregue', statusCls: 'badge badge-green', eta: '17/04/2024' },
  { id: 'TN-005', date: '23/04/2024', carrier: 'Transportadora Norte', origin: 'CD São Paulo', destination: 'Loja Osasco', status: 'Aguardando', statusCls: 'badge badge-blue', eta: '25/04/2024' },
]

const stats = [
  { label: 'Em Trânsito', value: '12', color: '#E67E22', bg: 'rgba(230,126,34,0.1)' },
  { label: 'Aguardando', value: '5', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Entregues (Mês)', value: '87', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { label: 'Transportadoras', value: '6', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
]

export default function TransportePage() {
  return (
    <DashboardLayout>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Transporte</h1>
            <p className="page-subtitle">Acompanhe suas entregas e transportadoras</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nova Entrega
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" width="20" height="20">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Shipments table */}
        <div className="card">
          <h2 className="card-title">Rastreamento de Entregas</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Transportadora</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Previsão</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.id}>
                    <td style={{ color: '#888', fontWeight: 500 }}>{s.id}</td>
                    <td>{s.date}</td>
                    <td style={{ fontWeight: 500 }}>{s.carrier}</td>
                    <td style={{ color: '#666' }}>{s.origin}</td>
                    <td style={{ color: '#666' }}>{s.destination}</td>
                    <td style={{ color: '#888' }}>{s.eta}</td>
                    <td><span className={s.statusCls}>{s.status}</span></td>
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
