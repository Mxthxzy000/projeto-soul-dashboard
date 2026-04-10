import { Sidebar } from './sidebar'
import '../../dashboard.css'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const usuario = localStorage.getItem('usuario')
  const nome = usuario ? JSON.parse(usuario).nome : 'Usuário'
  const iniciais = nome.charAt(0).toUpperCase()

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-main">
        {/* Top bar */}
        <header className="dashboard-header">
          <span className="dashboard-header-title">BitLayer</span>
          <div className="dashboard-header-user">
            <span>Olá, {nome}</span>
            <div className="dashboard-header-avatar">{iniciais}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-content">
          {children}
        </main>

        <footer className="dashboard-footer">
          ©2026 BitLayer. Todos os direitos reservados | Caçapava-SP
        </footer>
      </div>
    </div>
  )
}
