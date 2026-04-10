import { useState } from "react"
import { ArrowRight, Clock, BarChart3, Truck, Users, Monitor } from "lucide-react"

export function HeroSection() {
  const [imageError, setImageError] = useState(false)
  
  const scrollToPlanos = (e) => {
    e.preventDefault()
    const element = document.getElementById('planos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <Clock className="h-4 w-4" />
              <span>Sistema completo de gestao empresarial</span>
            </div>

            <h1 className="hero-title">
              Gestao Inteligente{" "}
              <br />
              para sua{" "}
              <span className="text-accent">Empresa</span>
            </h1>

            <p className="hero-desc">
              Transforme a administracao, logistica e supervisao do seu negocio com
              dashboards visuais e ferramentas poderosas. Tudo em uma unica
              plataforma.
            </p>

            <div className="hero-actions">
              <a href="#planos" className="btn-primary" onClick={scrollToPlanos}>
                Experimente Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <button className="btn-outline">
                Ver Demonstracao
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
                <p className="stat-label">Satisfacao</p>
              </div>
              <div>
                <p className="stat-number">24/7</p>
                <p className="stat-label">Suporte</p>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="hero-visual">
            <div className="dashboard-image-container">
              {!imageError ? (
                <img 
                  src="/dashboard-preview.png" 
                  alt="Dashboard S.O.U.L - Sistema de Gestao Empresarial"
                  className="dashboard-image"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="dashboard-placeholder">
                  <div className="dashboard-placeholder-icon">
                    <Monitor className="h-8 w-8" />
                  </div>
                  <p className="dashboard-placeholder-text">
                    Adicione sua imagem do dashboard
                  </p>
                  <code className="dashboard-placeholder-path">
                    /public/dashboard-preview.png
                  </code>
                </div>
              )}
            </div>

            {/* Floating Cards */}
            <div className="floating-card card-top">
              <div className="float-icon float-icon--orange">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <p className="float-title">Relatorios</p>
                <p className="float-sub">Em tempo real</p>
              </div>
            </div>

            <div className="floating-card card-right">
              <div className="float-icon float-icon--orange">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <p className="float-title">Logistica</p>
                <p className="float-sub">Rastreamento</p>
              </div>
            </div>

            <div className="floating-card card-bottom">
              <div className="float-icon float-icon--orange">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="float-title">Equipe</p>
                <p className="float-sub">Gestao completa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
