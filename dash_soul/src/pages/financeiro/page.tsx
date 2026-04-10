import { DashboardLayout } from '../components/dashboard/dashboard-layout'

const stats = [
  { label: 'Receita Total (Mês)', value: 'R$ 458.750,00', badge: '+12,5% vs mês anterior', color: '#10b981', bg: 'rgba(16,185,129,0.1)', trend: 'up' },
  { label: 'Despesas (Mês)', value: 'R$ 189.320,00', badge: '+3,2% vs mês anterior', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', trend: 'down' },
  { label: 'Lucro Líquido', value: 'R$ 269.430,00', badge: '+18,4% vs mês anterior', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', trend: 'up' },
  { label: 'A Receber', value: 'R$ 87.200,00', badge: '12 faturas pendentes', color: '#E67E22', bg: 'rgba(230,126,34,0.1)', trend: 'neutral' },
]

const transactions = [
  { id: 1, desc: 'Venda — Loja Centro', value: 12500, type: 'income', date: '22/04/2024' },
  { id: 2, desc: 'Pagamento Fornecedor', value: 8200, type: 'expense', date: '22/04/2024' },
  { id: 3, desc: 'Venda — E-commerce', value: 4800, type: 'income', date: '21/04/2024' },
  { id: 4, desc: 'Frete — Transportadora', value: 1500, type: 'expense', date: '21/04/2024' },
  { id: 5, desc: 'Venda — Distribuidora', value: 28000, type: 'income', date: '20/04/2024' },
  { id: 6, desc: 'Salários', value: 45000, type: 'expense', date: '20/04/2024' },
]

const monthlyData = [
  { name: 'Jan', receita: 320, despesa: 180 },
  { name: 'Fev', receita: 380, despesa: 190 },
  { name: 'Mar', receita: 350, despesa: 175 },
  { name: 'Abr', receita: 459, despesa: 189 },
]

const maxBar = 500

export default function FinanceiroPage() {
  return (
    <DashboardLayout>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Financeiro</h1>
            <p className="page-subtitle">Acompanhe suas receitas e despesas</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.bg }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" width="20" height="20">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <p className="stat-label">{s.label}</p>
              <p className="stat-value" style={{ fontSize: '1.1rem' }}>{s.value}</p>
              <p className="stat-badge" style={{ color: s.trend === 'up' ? '#10b981' : s.trend === 'down' ? '#ef4444' : '#888' }}>
                {s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '•'} {s.badge}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Simple bar chart */}
          <div className="card">
            <h2 className="card-title">Receita vs Despesa (Mensal)</h2>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, padding: '0 8px' }}>
              {monthlyData.map((d) => (
                <div key={d.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 140 }}>
                    <div
                      style={{
                        width: 20,
                        height: `${(d.receita / maxBar) * 140}px`,
                        background: '#10b981',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s',
                      }}
                      title={`Receita: R$${d.receita}k`}
                    />
                    <div
                      style={{
                        width: 20,
                        height: `${(d.despesa / maxBar) * 140}px`,
                        background: '#ef4444',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s',
                      }}
                      title={`Despesa: R$${d.despesa}k`}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>{d.name}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
                <div style={{ width: 12, height: 12, background: '#10b981', borderRadius: 2 }} />
                Receita
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
                <div style={{ width: 12, height: 12, background: '#ef4444', borderRadius: 2 }} />
                Despesa
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="card">
            <h2 className="card-title">Últimas Transações</h2>
            {transactions.map((t) => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid #f5f5f5',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1a1a1a' }}>{t.desc}</p>
                  <p style={{ fontSize: '0.75rem', color: '#aaa' }}>{t.date}</p>
                </div>
                <span style={{ fontWeight: 600, color: t.type === 'income' ? '#10b981' : '#ef4444' }}>
                  {t.type === 'income' ? '+' : '-'} R$ {t.value.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
