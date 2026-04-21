import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../app/globals.css'

import HomePage from '../app/page'
import AgendaPage from '../app/agenda/page'
import FinanceiroPage from '../app/financeiro/page'
import TransportePage from '../app/transporte/page'
import RelatorioPage from '../app/relatorio/page'
import EstoquePage from '../app/estoque/page'
import RelacoesPage from '../app/relacoes/page'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/financeiro" element={<FinanceiroPage />} />
        <Route path="/transporte" element={<TransportePage />} />
        <Route path="/relatorio" element={<RelatorioPage />} />
        <Route path="/estoque" element={<EstoquePage />} />
        <Route path="/relacoes" element={<RelacoesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
