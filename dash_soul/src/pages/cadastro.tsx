import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import './global.css'

interface FormData {
  nome: string
  sobrenome: string
  dataNascimento: string
  celular: string
  email: string
  senha: string
  confirmarSenha: string
}

function Cadastro() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    celular: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })
  const [erroSenha, setErroSenha] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'senha' || name === 'confirmarSenha') {
      setErroSenha('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.nome || !formData.sobrenome || !formData.dataNascimento ||
      !formData.celular || !formData.email || !formData.senha || !formData.confirmarSenha
    ) {
      alert('Preencha todos os campos!')
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErroSenha('As senhas não coincidem!')
      return
    }

    if (formData.senha.length < 6) {
      setErroSenha('A senha deve ter pelo menos 6 caracteres!')
      return
    }

    const usuario = {
      nome: formData.nome,
      sobrenome: formData.sobrenome,
      dataNascimento: formData.dataNascimento,
      celular: formData.celular,
      email: formData.email,
      senha: formData.senha,
    }

    localStorage.setItem('usuario', JSON.stringify(usuario))
    alert('Cadastro realizado com sucesso!')
    navigate('/')
  }

  return (
    <div className="page-container">
      <Header />

      <main className="main-content">
        <div className="form-card">
          <div className="form-header">
            <div className="form-logo">LOGO</div>
            <h2 className="form-title">Solicitar Cadastro</h2>
          </div>

          <div className="form-divider" />

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="text"
                name="sobrenome"
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="tel"
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="form-input form-grid-full"
                required
              />
            </div>

            <div className="form-divider" />

            <div className="form-grid">
              <input
                type="password"
                name="senha"
                placeholder="Crie sua senha"
                value={formData.senha}
                onChange={handleChange}
                className="form-input"
                required
              />
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {erroSenha && (
              <p className="error-message" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                {erroSenha}
              </p>
            )}

            <div style={{ marginTop: '1.5rem' }}>
              <button type="submit" className="form-button">
                Solicitar Cadastro
              </button>
            </div>

            <div className="form-divider" />

            <p style={{ textAlign: 'center' }}>
              <Link to="/">Já tem uma conta?</Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Cadastro
