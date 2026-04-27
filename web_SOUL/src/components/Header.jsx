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
          <img src="../DashboardSoulLogo.png" alt="S.O.U.L" className="header-logo-img" />
          <p className="oi">S.O.U.L</p>
        </a>

        <nav className="nav-desktop">
          <a href="#hero" className="nav-link" onClick={scrollToTop}>Home</a>
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
