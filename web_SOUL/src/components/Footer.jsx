import { Mail, Phone, MapPin } from "lucide-react"

export function Footer({ onNavigate }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(sectionId)
    }
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon logo-icon--amber">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="footer-logo-text">BitLayer</span>
            </div>
            <p className="footer-tagline">
              Sistema completo de gestao empresarial para administracao, logistica
              e supervisao. Transforme seu negocio com tecnologia.
            </p>
            <div className="footer-contacts">
              <div className="footer-contact">
                <Mail size={16} />
                <span>contato@bitlayer.com</span>
              </div>
              <div className="footer-contact">
                <Phone size={16} />
                <span>(12) 99999-9999</span>
              </div>
              <div className="footer-contact">
                <MapPin size={16} />
                <span>Cacapava - SP</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Navegacao</h3>
            <nav className="footer-nav">
              <a href="#home" className="footer-link" onClick={scrollToTop}>Home</a>
              <a href="#sobre" className="footer-link" onClick={(e) => handleNavClick(e, 'sobre')}>Sobre Nos</a>
              <a href="#planos" className="footer-link" onClick={(e) => handleNavClick(e, 'planos')}>Planos</a>
            </nav>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Nossos Planos</h3>
            <nav className="footer-nav">
              <a href="#planos" className="footer-link" onClick={(e) => handleNavClick(e, 'planos')}>Essencial - R$ 250/mes</a>
              <a href="#planos" className="footer-link" onClick={(e) => handleNavClick(e, 'planos')}>Profissional - R$ 600/mes</a>
              <a href="#planos" className="footer-link" onClick={(e) => handleNavClick(e, 'planos')}>Enterprise - R$ 1.250/mes</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>2026 BitLayer. Todos os direitos reservados. | Cacapava-SP</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link">Termos de Uso</a>
            <a href="#" className="footer-link">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
