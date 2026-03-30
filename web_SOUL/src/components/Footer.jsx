import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
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
              Sistema completo de gestão empresarial para administração, logística
              e supervisão.
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
                <span>Caçapava - SP</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Navegação</h3>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">Home</Link>
              <a href="#equipe" className="footer-link">Sobre Nós</a>
              <a href="#planos" className="footer-link">Planos</a>
            </nav>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Nossos Planos</h3>
            <nav className="footer-nav">
              <a href="#planos" className="footer-link">Essencial — R$ 250/mês</a>
              <a href="#planos" className="footer-link">Profissional — R$ 600/mês</a>
              <a href="#planos" className="footer-link">Enterprise — R$ 1.250/mês</a>
            </nav>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Legal</h3>
            <nav className="footer-nav">
              <a href="#" className="footer-link">Termos de Uso</a>
              <a href="#" className="footer-link">Privacidade</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 BitLayer. Todos os direitos reservados. | Caçapava-SP</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link">Termos de Uso</a>
            <a href="#" className="footer-link">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
