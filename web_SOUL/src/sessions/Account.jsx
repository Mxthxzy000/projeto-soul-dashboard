import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import {
  User, CreditCard, Calendar, Shield, ChevronRight,
  CheckCircle, AlertCircle, ArrowUpRight, LogOut, Bell,
  Building2, Mail, Phone, Download, Clock
} from "lucide-react"

// Dados simulados do usuário — em produção, viriam de um contexto/API
const mockUser = {
  name: "Empresa Demo Ltda",
  email: "contato@empresademo.com.br",
  phone: "(12) 99999-9999",
  cnpj: "12.345.678/0001-99",
  plan: "Profissional",
  planSlug: "profissional",
  planPrice: 600,
  status: "active",
  subscriptionStart: "2025-03-15",
  nextBilling: "2026-06-15",
  paymentMethod: {
    type: "credit_card",
    brand: "Visa",
    last4: "4242",
    expiry: "08/27",
  },
  invoices: [
    { id: "FAT-2026-05", date: "2026-05-15", amount: 600, status: "paid" },
    { id: "FAT-2026-04", date: "2026-04-15", amount: 600, status: "paid" },
    { id: "FAT-2026-03", date: "2026-03-15", amount: 600, status: "paid" },
  ],
}

const planFeatures = {
  essencial: ["Dashboard basico", "Gestao de estoque", "Controle de funcionarios", "Agenda integrada", "Relatorios mensais"],
  profissional: ["Tudo do Essencial", "Dashboard avancado", "Gestao de logistica", "Relatorios em tempo real", "Multi-usuarios (ate 10)", "Suporte prioritario", "App mobile"],
  enterprise: ["Tudo do Profissional", "Usuarios ilimitados", "API personalizada", "Integracoes avancadas", "Gerente de conta dedicado", "SLA garantido"],
}

const planColors = {
  essencial: "#6B7280",
  profissional: "#F38512",
  enterprise: "#8B5CF6",
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

export function AccountPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  const scrollToSection = (sectionId) => {
    navigate("/")
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const features = planFeatures[mockUser.planSlug] || []
  const accentColor = planColors[mockUser.planSlug] || "#F38512"

  return (
    <>
      <Header onNavigate={scrollToSection} />
      <main className="account-main">
        {/* Hero da conta */}
        <div className="account-hero">
          <div className="container">
            <div className="account-hero-inner">
              <div className="account-avatar">
                <Building2 size={32} />
              </div>
              <div className="account-hero-info">
                <div className="account-hero-top">
                  <h1 className="account-hero-name">{mockUser.name}</h1>
                  <span className={`account-status-badge account-status-badge--${mockUser.status}`}>
                    <CheckCircle size={13} />
                    Assinatura ativa
                  </span>
                </div>
                <p className="account-hero-email">{mockUser.email}</p>
              </div>
              <button
                className="account-upgrade-btn"
                onClick={() => navigate("/checkout?plano=enterprise")}
              >
                Fazer upgrade
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="account-tabs-bar">
          <div className="container">
            <div className="account-tabs">
              {[
                { id: "overview", label: "Visao Geral", icon: Shield },
                { id: "plan", label: "Meu Plano", icon: CheckCircle },
                { id: "billing", label: "Pagamento", icon: CreditCard },
                { id: "profile", label: "Perfil", icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`account-tab ${activeTab === tab.id ? "account-tab--active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo das tabs */}
        <div className="account-content">
          <div className="container">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="account-grid">
                {/* Cards de stat */}
                <div className="account-stats-row">
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: `${accentColor}18`, color: accentColor }}>
                      <Shield size={22} />
                    </div>
                    <div>
                      <p className="account-stat-label">Plano atual</p>
                      <p className="account-stat-value">{mockUser.plan}</p>
                    </div>
                  </div>
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E" }}>
                      <Calendar size={22} />
                    </div>
                    <div>
                      <p className="account-stat-label">Proximo vencimento</p>
                      <p className="account-stat-value">{formatDate(mockUser.nextBilling)}</p>
                    </div>
                  </div>
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}>
                      <CreditCard size={22} />
                    </div>
                    <div>
                      <p className="account-stat-label">Forma de pagamento</p>
                      <p className="account-stat-value">{mockUser.paymentMethod.brand} •••• {mockUser.paymentMethod.last4}</p>
                    </div>
                  </div>
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: `${accentColor}18`, color: accentColor }}>
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className="account-stat-label">Cliente desde</p>
                      <p className="account-stat-value">{formatDate(mockUser.subscriptionStart)}</p>
                    </div>
                  </div>
                </div>

                {/* Plano + Faturas */}
                <div className="account-two-col">
                  <div className="account-card">
                    <div className="account-card-header">
                      <h3 className="account-card-title">Plano {mockUser.plan}</h3>
                      <button
                        className="account-card-action"
                        onClick={() => setActiveTab("plan")}
                      >
                        Ver detalhes <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="account-plan-price-row">
                      <span className="account-plan-price">R$ {mockUser.planPrice.toLocaleString("pt-BR")}</span>
                      <span className="account-plan-period">/mês</span>
                    </div>
                    <ul className="account-features-list">
                      {features.slice(0, 4).map((f) => (
                        <li key={f}>
                          <CheckCircle size={14} style={{ color: accentColor }} />
                          {f}
                        </li>
                      ))}
                      {features.length > 4 && (
                        <li className="account-features-more">+{features.length - 4} recursos inclusos</li>
                      )}
                    </ul>
                    <button
                      className="account-upgrade-card-btn"
                      onClick={() => navigate("/checkout?plano=enterprise")}
                    >
                      Fazer upgrade para Enterprise
                      <ArrowUpRight size={15} />
                    </button>
                  </div>

                  <div className="account-card">
                    <div className="account-card-header">
                      <h3 className="account-card-title">Ultimas faturas</h3>
                      <button
                        className="account-card-action"
                        onClick={() => setActiveTab("billing")}
                      >
                        Ver todas <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="account-invoices-list">
                      {mockUser.invoices.map((inv) => (
                        <div key={inv.id} className="account-invoice-row">
                          <div className="account-invoice-info">
                            <span className="account-invoice-id">{inv.id}</span>
                            <span className="account-invoice-date">{formatDate(inv.date)}</span>
                          </div>
                          <div className="account-invoice-right">
                            <span className="account-invoice-amount">R$ {inv.amount.toLocaleString("pt-BR")},00</span>
                            <span className="account-invoice-status account-invoice-status--paid">
                              <CheckCircle size={12} /> Pago
                            </span>
                          </div>
                          <button className="account-invoice-download" title="Baixar fatura">
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── PLAN ── */}
            {activeTab === "plan" && (
              <div className="account-section">
                <div className="account-card account-card--wide">
                  <div className="account-card-header">
                    <h3 className="account-card-title">Seu plano atual</h3>
                    <span className="account-active-badge">
                      <CheckCircle size={13} /> Ativo
                    </span>
                  </div>

                  <div className="account-plan-detail-header">
                    <div>
                      <h2 className="account-plan-detail-name" style={{ color: accentColor }}>
                        {mockUser.plan}
                      </h2>
                      <div className="account-plan-price-row">
                        <span className="account-plan-price">R$ {mockUser.planPrice.toLocaleString("pt-BR")}</span>
                        <span className="account-plan-period">/mês</span>
                      </div>
                    </div>
                    <div className="account-plan-dates">
                      <div className="account-plan-date-item">
                        <span className="account-plan-date-label">Inicio da assinatura</span>
                        <span className="account-plan-date-value">{formatDate(mockUser.subscriptionStart)}</span>
                      </div>
                      <div className="account-plan-date-item">
                        <span className="account-plan-date-label">Proximo vencimento</span>
                        <span className="account-plan-date-value" style={{ color: accentColor }}>{formatDate(mockUser.nextBilling)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="account-plan-features-grid">
                    {features.map((f) => (
                      <div key={f} className="account-plan-feature-item">
                        <CheckCircle size={16} style={{ color: accentColor }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="account-plan-upgrade-banner">
                    <div>
                      <h4>Precisa de mais recursos?</h4>
                      <p>Faca upgrade para o Enterprise e tenha usuarios ilimitados, API personalizada e gerente dedicado.</p>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/checkout?plano=enterprise")}
                    >
                      Upgrade para Enterprise <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── BILLING ── */}
            {activeTab === "billing" && (
              <div className="account-section">
                <div className="account-two-col">
                  <div className="account-card">
                    <div className="account-card-header">
                      <h3 className="account-card-title">Metodo de pagamento</h3>
                    </div>
                    <div className="account-payment-card">
                      <div className="account-payment-card-art">
                        <div className="account-payment-card-brand">{mockUser.paymentMethod.brand}</div>
                        <div className="account-payment-card-number">•••• •••• •••• {mockUser.paymentMethod.last4}</div>
                        <div className="account-payment-card-expiry">
                          <span>Validade</span>
                          <span>{mockUser.paymentMethod.expiry}</span>
                        </div>
                      </div>
                      <div className="account-payment-meta">
                        <div className="account-payment-meta-row">
                          <span>Bandeira</span>
                          <span>{mockUser.paymentMethod.brand}</span>
                        </div>
                        <div className="account-payment-meta-row">
                          <span>Final</span>
                          <span>•••• {mockUser.paymentMethod.last4}</span>
                        </div>
                        <div className="account-payment-meta-row">
                          <span>Vencimento</span>
                          <span>{mockUser.paymentMethod.expiry}</span>
                        </div>
                      </div>
                    </div>
                    <button className="account-change-btn">
                      <CreditCard size={15} /> Alterar forma de pagamento
                    </button>
                  </div>

                  <div className="account-card">
                    <div className="account-card-header">
                      <h3 className="account-card-title">Resumo de cobranca</h3>
                    </div>
                    <div className="account-billing-summary">
                      <div className="account-billing-row">
                        <span>Plano {mockUser.plan}</span>
                        <span>R$ {mockUser.planPrice.toLocaleString("pt-BR")},00/mês</span>
                      </div>
                      <div className="account-billing-row">
                        <span>Proximo debito</span>
                        <span style={{ color: accentColor, fontWeight: 700 }}>{formatDate(mockUser.nextBilling)}</span>
                      </div>
                      <div className="account-billing-divider" />
                      <div className="account-billing-row account-billing-row--total">
                        <span>Total mensal</span>
                        <span>R$ {mockUser.planPrice.toLocaleString("pt-BR")},00</span>
                      </div>
                    </div>
                    <div className="account-billing-note">
                      <Bell size={14} />
                      <span>Voce recebera um email 3 dias antes de cada cobranca.</span>
                    </div>
                  </div>
                </div>

                {/* Histórico de faturas */}
                <div className="account-card account-card--wide" style={{ marginTop: 24 }}>
                  <div className="account-card-header">
                    <h3 className="account-card-title">Historico de faturas</h3>
                  </div>
                  <div className="account-invoices-table">
                    <div className="account-invoices-table-header">
                      <span>Fatura</span>
                      <span>Data</span>
                      <span>Valor</span>
                      <span>Status</span>
                      <span></span>
                    </div>
                    {mockUser.invoices.map((inv) => (
                      <div key={inv.id} className="account-invoices-table-row">
                        <span className="account-invoice-id">{inv.id}</span>
                        <span>{formatDate(inv.date)}</span>
                        <span>R$ {inv.amount.toLocaleString("pt-BR")},00</span>
                        <span>
                          <span className="account-invoice-status account-invoice-status--paid">
                            <CheckCircle size={12} /> Pago
                          </span>
                        </span>
                        <button className="account-invoice-download">
                          <Download size={14} /> Baixar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── PROFILE ── */}
            {activeTab === "profile" && (
              <div className="account-section">
                <div className="account-card account-card--wide">
                  <div className="account-card-header">
                    <h3 className="account-card-title">Dados da conta</h3>
                  </div>
                  <div className="account-profile-grid">
                    <div className="account-profile-field">
                      <label><Building2 size={14} /> Empresa</label>
                      <input type="text" defaultValue={mockUser.name} readOnly />
                    </div>
                    <div className="account-profile-field">
                      <label><User size={14} /> CNPJ</label>
                      <input type="text" defaultValue={mockUser.cnpj} readOnly />
                    </div>
                    <div className="account-profile-field">
                      <label><Mail size={14} /> Email</label>
                      <input type="email" defaultValue={mockUser.email} readOnly />
                    </div>
                    <div className="account-profile-field">
                      <label><Phone size={14} /> Telefone</label>
                      <input type="text" defaultValue={mockUser.phone} readOnly />
                    </div>
                  </div>
                  <div className="account-profile-note">
                    <AlertCircle size={14} />
                    Para alterar seus dados, entre em contato com nosso suporte em <strong>contato@bitlayer.com</strong>
                  </div>
                </div>

                <div className="account-card account-card--wide account-danger-card" style={{ marginTop: 24 }}>
                  <div className="account-card-header">
                    <h3 className="account-card-title account-danger-title">Zona de perigo</h3>
                  </div>
                  <p className="account-danger-desc">
                    Cancelar sua assinatura encerrara o acesso ao sistema ao final do periodo vigente.
                  </p>
                  <button className="account-cancel-btn">
                    <LogOut size={15} /> Cancelar assinatura
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer onNavigate={scrollToSection} />
    </>
  )
}
