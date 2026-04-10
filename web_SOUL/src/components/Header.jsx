import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(sectionId)
    }
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#home" className="header-logo" onClick={scrollToTop}>
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="logo-text">S.O.U.L</span>
        </a>

        <nav className="nav-desktop">
          <a href="#home" className="nav-link" onClick={scrollToTop}>Home</a>
          <a href="#sobre" className="nav-link" onClick={(e) => handleNavClick(e, 'sobre')}>Sobre Nos</a>
          <a href="#planos" className="nav-link" onClick={(e) => handleNavClick(e, 'planos')}>Planos</a>
          <a href="#planos" className="btn-primary" onClick={(e) => handleNavClick(e, 'planos')}>Comecar Agora</a>
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
          <a href="#home" className="nav-link" onClick={scrollToTop}>Home</a>
          <a href="#sobre" className="nav-link" onClick={(e) => handleNavClick(e, 'sobre')}>Sobre Nos</a>
          <a href="#planos" className="nav-link" onClick={(e) => handleNavClick(e, 'planos')}>Planos</a>
          <a href="#planos" className="btn-primary" onClick={(e) => handleNavClick(e, 'planos')}>Comecar Agora</a>
        </div>
      )}
    </header>
  )
}
