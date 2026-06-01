import { useState } from "react"
import { Menu, X, UserCircle } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

export function Header({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { userAuth, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === "/"

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (isHome) {
      // já está na home, só scrolla
      if (onNavigate) {
        onNavigate(sectionId)
      } else {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      // está em outra rota — vai pra home e depois scrolla
      navigate("/")
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  const handleHome = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate("/")
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
    }
  }

  const goToAccount = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    navigate("/conta")
  }

  const goToLogin = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    navigate("/login")
  }

  const handleLogout = async (e) => {
    e && e.preventDefault()
    await logout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-logo" onClick={handleHome}>
          <img src="/DashboardSoulLogo.png" alt="S.O.U.L" className="header-logo-img" />
          <p className="oi">S.O.U.L</p>
        </a>

        <nav className="nav-desktop">
          <a href="/" className="nav-link" onClick={handleHome}>Home</a>
          <a href="#sobre" className="nav-link" onClick={(e) => handleNavClick(e, "sobre")}>Sobre Nós</a>
          <a href="#planos" className="nav-link" onClick={(e) => handleNavClick(e, "planos")}>Planos</a>
          {userAuth ? (
            <>
              <a href="/conta" className="nav-link nav-link--account" onClick={goToAccount}>
                <UserCircle size={17} />
                Minha Conta
              </a>
              <a href="#" className="nav-link" onClick={handleLogout}>Sair</a>
            </>
          ) : (
            <a href="/login" className="nav-link nav-link--account" onClick={goToLogin}>
              <UserCircle size={17} />
              Entrar
            </a>
          )}
          <a href="#planos" className="btn-primary" onClick={(e) => handleNavClick(e, "planos")}>Começar Agora</a>
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
          <a href="/" className="nav-link" onClick={handleHome}>Home</a>
          <a href="#sobre" className="nav-link" onClick={(e) => handleNavClick(e, "sobre")}>Sobre Nós</a>
          <a href="#planos" className="nav-link" onClick={(e) => handleNavClick(e, "planos")}>Planos</a>
          {userAuth ? (
            <>
              <a href="/conta" className="nav-link nav-link--account" onClick={goToAccount}>
                <UserCircle size={17} />
                Minha Conta
              </a>
              <a href="#" className="nav-link" onClick={handleLogout}>Sair</a>
            </>
          ) : (
            <a href="/login" className="nav-link nav-link--account" onClick={goToLogin}>
              <UserCircle size={17} />
              Entrar
            </a>
          )}
          <a href="#planos" className="btn-primary" onClick={(e) => handleNavClick(e, "planos")}>Começar Agora</a>
        </div>
      )}
    </header>
  )
}
