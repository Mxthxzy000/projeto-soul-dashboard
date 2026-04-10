/// <reference types="vite/client" />

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import './global.css'
import soullogo from '../assets/soullogo.png';

function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [etapa, setEtapa] = useState(1)
  const navigate = useNavigate()

  const handleVerificarEmail = (e: React.FormEvent) => {
    e.preventDefault()

    const usuarioSalvo = localStorage.getItem('usuario')
    if (!usuarioSalvo) {
      alert('Nenhum usuário cadastrado. Cadastre-se primeiro.')
      return
    }

    const usuario = JSON.parse(usuarioSalvo)

    if (email === usuario.email) {
      setEtapa(2)
    } else {
      alert('Email não encontrado. Verifique se está cadastrado.')
    }
  }

  const handleRedefinirSenha = (e: React.FormEvent) => {
    e.preventDefault()

    if (!novaSenha || !confirmarSenha) {
      alert('Preencha os dois campos de senha.')
      return
    }

    if (novaSenha !== confirmarSenha) {
      alert('As senhas não conferem.')
      return
    }

    if (novaSenha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    const usuarioSalvo = localStorage.getItem('usuario')
    if (!usuarioSalvo) return

    const usuario = JSON.parse(usuarioSalvo)
    usuario.senha = novaSenha
    localStorage.setItem('usuario', JSON.stringify(usuario))

    alert('Senha alterada com sucesso! Faça login novamente.')
    navigate('/')
  }

  return (
    <div className="page-container">
      <Header />

      <main className="main-content">
        <div className="form-card">
          <div className="form-header">
            <div className="form-logo"><img src={soullogo} className="logo" alt="Logo" /></div>
            <h2 className="form-title">
              {etapa === 1 ? 'Recuperar Senha' : 'Definir Nova Senha'}
            </h2>
          </div>

          <div className="form-divider" />

          {etapa === 1 && (
            <form onSubmit={handleVerificarEmail}>
              <div className="form-grid">
                <input
                  type="email"
                  placeholder="Digite seu email cadastrado"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input form-grid-full"
                  required
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="form-button">
                  Verificar Email
                </button>
              </div>

              <div className="form-divider" />

              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Lembrou sua senha? <Link to="/">Faça login</Link>
              </p>
            </form>
          )}

          {etapa === 2 && (
            <form onSubmit={handleRedefinirSenha}>
              <div className="form-grid">
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="form-input form-grid-full"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="form-input form-grid-full"
                  required
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="form-button">
                  Redefinir Senha
                </button>
              </div>

              <div className="form-divider" />

              <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button type="button" className="secondary" onClick={() => setEtapa(1)}>
                  Voltar
                </button>
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RecuperarSenha
