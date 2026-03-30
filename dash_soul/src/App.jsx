import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import RecuperarSenha from './pages/redefinir';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/redefinir" element={<RecuperarSenha />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;