import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"

export function Footer({ onNavigate }) {
  const [form, setForm] = useState({ email: "", titulo: "", mensagem: "" })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ email: "", titulo: "", mensagem: "" })
    setTimeout(() => setSent(false), 4000)
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/BitLayerLogo.png" alt="BitLayer" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">
              Sistema completo de gestao empresarial para administracao, logistica
              e supervisao. Transforme seu negocio com tecnologia.
            </p>
            <div className="footer-contacts">
              <div className="footer-contact">
                <Mail size={16} />
                <span>contato@bitlayer.com</span>
              </div>
              <div className="footer-contact">
                <Phone size={16} />
                <span>(12) 99999-9999</span>
              </div>
              <div className="footer-contact">
                <MapPin size={16} />
                <span>Cacapava - SP</span>
              </div>
            </div>
          </div>

          {/* Formulário de suporte */}
          <div className="footer-support">
            <h3 className="footer-col-title">Fale com o Suporte</h3>
            {sent ? (
              <div className="footer-support-success">
                <Send size={18} />
                <span>Mensagem enviada! Retornaremos em breve.</span>
              </div>
            ) : (
              <form className="footer-support-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="footer-input"
                />
                <input
                  type="text"
                  name="titulo"
                  placeholder="Titulo da mensagem"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                  className="footer-input"
                />
                <textarea
                  name="mensagem"
                  placeholder="Sua mensagem..."
                  value={form.mensagem}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="footer-input footer-textarea"
                />
                <button type="submit" className="footer-send-btn">
                  <Send size={15} />
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>2026 BitLayer. Todos os direitos reservados. | Cacapava-SP</p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-link">Termos de Uso</a>
            <a href="#" className="footer-link">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
