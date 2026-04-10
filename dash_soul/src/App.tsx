import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Cadastro from './pages/cadastro'
import RecuperarSenha from './pages/redefinir'
import AgendaPage from './pages/agenda/page'
import EstoquePage from './pages/estoque/page'
import FinanceiroPage from './pages/financeiro/page'
import RelacoesPage from './pages/relacoes/page'
import RelatorioPage from './pages/relatorio/page'
import TransportePage from './pages/transporte/page'

// Route guard: redirects to login if not authenticated
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const logado = localStorage.getItem('logado') === 'true'
  return logado ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinir" element={<RecuperarSenha />} />

        {/* Protected dashboard routes */}
        <Route path="/home" element={<PrivateRoute><AgendaPage /></PrivateRoute>} />
        <Route path="/agenda" element={<PrivateRoute><AgendaPage /></PrivateRoute>} />
        <Route path="/estoque" element={<PrivateRoute><EstoquePage /></PrivateRoute>} />
        <Route path="/financeiro" element={<PrivateRoute><FinanceiroPage /></PrivateRoute>} />
        <Route path="/relacoes" element={<PrivateRoute><RelacoesPage /></PrivateRoute>} />
        <Route path="/relatorio" element={<PrivateRoute><RelatorioPage /></PrivateRoute>} />
        <Route path="/transporte" element={<PrivateRoute><TransportePage /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
