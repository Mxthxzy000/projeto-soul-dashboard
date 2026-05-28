import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import AgendaPage from './pages/Agenda'
import FinanceiroPage from './pages/Financeiro'
import TransportePage from './pages/Transporte'
import RelatorioPage from './pages/Relatorio'
import EstoquePage from './pages/Estoque'
import RelacoesPage from './pages/Relacoes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/agenda" element={<AgendaPage />} />
      <Route path="/financeiro" element={<FinanceiroPage />} />
      <Route path="/transporte" element={<TransportePage />} />
      <Route path="/relatorio" element={<RelatorioPage />} />
      <Route path="/estoque" element={<EstoquePage />} />
      <Route path="/relacoes" element={<RelacoesPage />} />
    </Routes>
  )
}

export default App
