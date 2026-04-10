import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const salesData = [
  { name: 'Jan', vendas: 12000, meta: 15000 },
  { name: 'Fev', vendas: 19000, meta: 15000 },
  { name: 'Mar', vendas: 15000, meta: 18000 },
  { name: 'Abr', vendas: 28000, meta: 20000 },
  { name: 'Mai', vendas: 22000, meta: 22000 },
  { name: 'Jun', vendas: 25000, meta: 25000 },
  { name: 'Jul', vendas: 32000, meta: 28000 },
  { name: 'Ago', vendas: 38000, meta: 30000 },
]

const reports = [
  { name: 'Relatório de Vendas — Abril 2024', date: '22/04/2024', type: 'Vendas' },
  { name: 'Relatório Financeiro Q1 2024', date: '15/04/2024', type: 'Financeiro' },
  { name: 'Inventário de Estoque — Março 2024', date: '10/04/2024', type: 'Estoque' },
  { name: 'Relatório de RH — Q1 2024', date: '05/04/2024', type: 'RH' },
  { name: 'Análise de Transportes — Março 2024', date: '01/04/2024', type: 'Transporte' },
]

const typeColors: Record<string, string> = {
  Vendas: 'badge-green',
  Financeiro: 'badge-orange',
  Estoque: 'badge-blue',
  RH: 'badge badge-blue',
  Transporte: 'badge-red',
}

const maxVal = Math.max(...salesData.map((d) => Math.max(d.vendas, d.meta)))

export default function RelatorioPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Relatórios</h1>
            <p className="page-subtitle">Análises e exportações de dados</p>
          </div>
          <button className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar Relatório
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          {/* Chart */}
          <div className="card">
            <h2 className="card-title">Vendas vs Meta (2024)</h2>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, padding: '0 4px' }}>
              {salesData.map((d) => (
                <div key={d.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 160 }}>
                    <div
                      style={{
                        width: 14,
                        height: `${(d.vendas / maxVal) * 160}px`,
                        background: '#E67E22',
                        borderRadius: '3px 3px 0 0',
                        title: `Vendas: R$${d.vendas.toLocaleString()}`,
                      }}
                    />
                    <div
                      style={{
                        width: 14,
                        height: `${(d.meta / maxVal) * 160}px`,
                        background: '#3b82f6',
                        borderRadius: '3px 3px 0 0',
                        opacity: 0.5,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>{d.name}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
                <div style={{ width: 12, height: 12, background: '#E67E22', borderRadius: 2 }} /> Vendas
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
                <div style={{ width: 12, height: 12, background: '#3b82f6', borderRadius: 2, opacity: 0.5 }} /> Meta
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="card">
            <h2 className="card-title">Indicadores Chave</h2>
            {[
              { label: 'Taxa de Conversão', value: '12.8%', color: '#10b981' },
              { label: 'Ticket Médio', value: 'R$ 1.248', color: '#3b82f6' },
              { label: 'Crescimento (MoM)', value: '+18.4%', color: '#E67E22' },
              { label: 'Satisfação (NPS)', value: '87/100', color: '#8b5cf6' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid #f5f5f5',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#666' }}>{kpi.label}</span>
                <span style={{ fontWeight: 700, color: kpi.color }}>{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reports list */}
        <div className="card">
          <h2 className="card-title">Relatórios Gerados</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.name}>
                  <td style={{ fontWeight: 500 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" width="14" height="14" style={{ marginRight: 8, verticalAlign: 'middle' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {r.name}
                  </td>
                  <td style={{ color: '#888' }}>{r.date}</td>
                  <td>
                    <span className={`badge ${typeColors[r.type] || 'badge-blue'}`}>{r.type}</span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ fontSize: '0.75rem' }}>
                      ↓ Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
