import { ArrowRight, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <CheckCircle className="h-4 w-4" />
              <span>Sistema completo de gestão empresarial</span>
            </div>

            <h1 className="hero-title">
              Gestão Inteligente{" "}
              <br />
              para sua{" "}
              <span className="text-accent">Empresa</span>
            </h1>

            <p className="hero-desc">
              Transforme a administração, logística e supervisão do seu negócio com
              dashboards visuais e ferramentas poderosas. Tudo em uma única
              plataforma.
            </p>

            <div className="hero-actions">
              <button className="btn-primary">
                Experimente Grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="btn-outline">
                Ver Demonstração
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div>
                <p className="stat-number">500+</p>
                <p className="stat-label">Empresas ativas</p>
              </div>
              <div>
                <p className="stat-number">98%</p>
                <p className="stat-label">Satisfação</p>
              </div>
              <div>
                <p className="stat-number">24/7</p>
                <p className="stat-label">Suporte</p>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="hero-visual">
            <div className="dashboard-mockup">
              <div className="mockup-topbar">
                <div className="dot dot-red"></div>
                <div className="dot dot-yellow"></div>
                <div className="dot dot-green"></div>
              </div>
              <div className="mockup-body">
                <div className="mockup-sidebar">
                  <div className="sidebar-item">Dashboard</div>
                  <div className="sidebar-item">Relatórios</div>
                  <div className="sidebar-item">Logística</div>
                  <div className="sidebar-item">Equipe</div>
                </div>
                <div className="mockup-main">
                  <div className="mockup-cards">
                    <div className="mockup-card">
                      <div className="card-label">Vendas</div>
                      <div className="card-value">R$ 45.890</div>
                      <div className="card-trend up">↑ 12%</div>
                    </div>
                    <div className="mockup-card">
                      <div className="card-label">Pedidos</div>
                      <div className="card-value">1.234</div>
                      <div className="card-trend up">↑ 8%</div>
                    </div>
                    <div className="mockup-card">
                      <div className="card-label">Clientes</div>
                      <div className="card-value">567</div>
                      <div className="card-trend up">↑ 15%</div>
                    </div>
                  </div>
                  <div className="mockup-chart">
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar" style={{ height: '65%' }}></div>
                    <div className="chart-bar" style={{ height: '55%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="floating-card card-top">
              <div className="float-icon">📊</div>
              <div>
                <p className="float-title">Relatórios</p>
                <p className="float-sub">Em tempo real</p>
              </div>
            </div>

            <div className="floating-card card-right">
              <div className="float-icon">🚚</div>
              <div>
                <p className="float-title">Logística</p>
                <p className="float-sub">Rastreamento</p>
              </div>
            </div>

            <div className="floating-card card-bottom">
              <div className="float-icon">👥</div>
              <div>
                <p className="float-title">Equipe</p>
                <p className="float-sub">Gestão completa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}