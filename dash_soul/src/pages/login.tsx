import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import './global.css'
import soullogo from '../assets/soullogo.png';

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const usuarioSalvo = localStorage.getItem('usuario')
    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado. Cadastre-se primeiro.')
      return
    }

    const usuario = JSON.parse(usuarioSalvo)

    if (email === usuario.email && senha === usuario.senha) {
      localStorage.setItem('logado', 'true')
      navigate('/home')
    } else {
      alert('Email ou senha incorretos.')
    }
  }

  return (
    <div className="page-container">
      <Header />

      <main className="main-content">
        <div className="form-card">
          <div className="form-header">
            <div className="form-logo"><img src={soullogo} className="logo" alt="Logo" /></div>
            <h2 className="form-title">Login</h2>
          </div>

          <div className="form-divider" />

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input form-grid-full"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form-input form-grid-full"
                required
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button type="submit" className="form-button">
                Entrar
              </button>
            </div>

            <div className="form-divider" />

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              <Link to="/cadastro">Criar conta</Link>
              <span className="separator"> | </span>
              <Link to="/redefinir">Esqueci minha senha</Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
