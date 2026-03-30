import { ArrowRight, CheckCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <CheckCircle size={16} />
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
              dashboards visuais e ferramentas poderosas. Tudo em uma única plataforma.
            </p>

            <div className="hero-actions">
              <a href="#planos" className="btn-primary btn-lg">
                Experimente Grátis
                <ArrowRight size={16} />
              </a>
              <a href="#funcionalidades" className="btn-outline btn-lg">
                Ver Funcionalidades
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <p className="stat-number">500+</p>
                <p className="stat-label">Empresas ativas</p>
              </div>
              <div className="stat">
                <p className="stat-number">98%</p>
                <p className="stat-label">Satisfação</p>
              </div>
              <div className="stat">
                <p className="stat-number">24/7</p>
                <p className="stat-label">Suporte</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="dashboard-mockup">
              <div className="mockup-topbar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="mockup-body">
                <div className="mockup-sidebar">
                  {["Dashboard", "Logística", "Estoque", "Equipe", "Relatórios"].map(item => (
                    <div key={item} className="sidebar-item">{item}</div>
                  ))}
                </div>
                <div className="mockup-main">
                  <div className="mockup-cards">
                    {[
                      { label: "Receita", value: "R$ 84k", up: true },
                      { label: "Entregas", value: "1.247", up: true },
                      { label: "Equipe", value: "32", up: false },
                    ].map(card => (
                      <div key={card.label} className="mockup-card">
                        <span className="card-label">{card.label}</span>
                        <span className="card-value">{card.value}</span>
                        <span className={`card-trend ${card.up ? "up" : "down"}`}>{card.up ? "↑" : "↓"}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mockup-chart">
                    {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                      <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
