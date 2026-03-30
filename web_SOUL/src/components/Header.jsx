import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="logo-text">S.O.U.L</span>
        </Link>

        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#equipe" className="nav-link">Sobre Nós</a>
          <a href="#planos" className="nav-link">Planos</a>
          <a href="#planos" className="btn-primary">Começar Agora</a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile">
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#equipe" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</a>
          <a href="#planos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Planos</a>
          <a href="#planos" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>Começar Agora</a>
        </div>
      )}
    </header>
  )
}
