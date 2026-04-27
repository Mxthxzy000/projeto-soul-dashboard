import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Shield, Download, Headphones, CreditCard, Check, X, Lock } from "lucide-react"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"

const plans = [
  {
    id: "essencial",
    name: "Essencial",
    price: 250,
    features: [
      "Dashboard basico",
      "Gestao de estoque",
      "Controle de funcionarios",
      "Agenda integrada",
      "Relatorios mensais",
    ],
  },
  {
    id: "profissional",
    name: "Profissional",
    price: 600,
    features: [
      "Tudo do Essencial",
      "Dashboard avancado",
      "Gestao de transporte",
      "Relatorios em tempo real",
      "Suporte prioritario",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1250,
    features: [
      "Tudo do Profissional",
      "Usuarios ilimitados",
      "API personalizada",
      "Integracoes avancadas",
      "Gerente de conta dedicado",
    ],
  },
]

export function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const planParam = searchParams.get("plano") || "profissional"
  
  const [selectedPlan, setSelectedPlan] = useState(planParam)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeEmpresa: "",
    email: "",
    telefone: "",
    cpfCnpj: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
  })

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    // Formatacoes
    if (name === "telefone") {
      formattedValue = formatPhone(value)
    } else if (name === "cpfCnpj") {
      formattedValue = formatCpfCnpj(value)
    } else if (name === "numeroCartao") {
      formattedValue = formatCardNumber(value)
    } else if (name === "validade") {
      formattedValue = formatExpiry(value)
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return `(${numbers}`
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatCpfCnpj = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      // CPF
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
      if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
    } else {
      // CNPJ
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
      if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
      if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
    }
  }

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, "")
    const groups = numbers.match(/.{1,4}/g) || []
    return groups.join(" ").slice(0, 19)
  }

  const formatExpiry = (value) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccessModal(true)
  }

  const handleDownload = () => {
    // Simula download do arquivo
    const link = document.createElement("a")
    link.href = "/DashBoardSOUL.zip"
    link.download = "DashBoardSOUL.zip"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const scrollToSection = (sectionId) => {
    navigate("/")
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <>
      <Header onNavigate={scrollToSection} />
      <main className="checkout-main">
        {/* Banner de Seguranca */}
        <div className="checkout-security-banner">
          <div className="container">
            <div className="security-content">
              <div className="security-left">
                <div className="security-icon">
                  <Shield size={24} />
                </div>
                <div className="security-text">
                  <h3>Compra 100% Segura</h3>
                  <p>Seus dados estao protegidos com criptografia SSL</p>
                </div>
              </div>
              <div className="security-right">
                <div className="security-badge">
                  <Download size={16} />
                  <span>Download imediato</span>
                </div>
                <div className="security-badge">
                  <Headphones size={16} />
                  <span>Suporte incluso</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteudo Principal */}
        <div className="checkout-container">
          <div className="container">
            <div className="checkout-grid">
              {/* Formulario */}
              <div className="checkout-form-wrapper">
                <div className="checkout-form-card">
                  <div className="form-header">
                    <CreditCard size={20} />
                    <h2>Finalizar Compra</h2>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Selecao de Plano */}
                    <div className="form-section">
                      <h3 className="form-section-title">Selecione seu plano</h3>
                      <div className="plan-selector">
                        {plans.map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            className={`plan-option ${selectedPlan === plan.id ? "plan-option--selected" : ""}`}
                            onClick={() => setSelectedPlan(plan.id)}
                          >
                            <span className="plan-option-name">{plan.name}</span>
                            <span className="plan-option-price">R$ {plan.price.toLocaleString("pt-BR")}</span>
                            <span className="plan-option-period">/mes</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dados da Empresa */}
                    <div className="form-section">
                      <h3 className="form-section-title">Dados da Empresa</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="nomeCompleto">Nome Completo</label>
                          <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            placeholder="Seu nome"
                            value={formData.nomeCompleto}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="nomeEmpresa">Nome da Empresa</label>
                          <input
                            type="text"
                            id="nomeEmpresa"
                            name="nomeEmpresa"
                            placeholder="Sua empresa"
                            value={formData.nomeEmpresa}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email Corporativo</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@empresa.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="telefone">Telefone/WhatsApp</label>
                          <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            placeholder="(11) 99999-9999"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group form-group--full">
                        <label htmlFor="cpfCnpj">CPF/CNPJ</label>
                        <input
                          type="text"
                          id="cpfCnpj"
                          name="cpfCnpj"
                          placeholder="000.000.000-00 ou 00.000.000/0000-00"
                          value={formData.cpfCnpj}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Dados do Cartao */}
                    <div className="form-section">
                      <div className="form-section-header">
                        <Lock size={16} />
                        <h3 className="form-section-title">Dados do Cartao</h3>
                      </div>
                      <div className="form-group form-group--full">
                        <label htmlFor="numeroCartao">Numero do Cartao</label>
                        <input
                          type="text"
                          id="numeroCartao"
                          name="numeroCartao"
                          placeholder="0000 0000 0000 0000"
                          value={formData.numeroCartao}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="validade">Validade</label>
                          <input
                            type="text"
                            id="validade"
                            name="validade"
                            placeholder="MM/AA"
                            value={formData.validade}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="checkout-submit-btn">
                      <Lock size={18} />
                      Finalizar Pagamento - R$ {currentPlan.price.toLocaleString("pt-BR")}/mes
                    </button>
                  </form>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="checkout-summary">
                <div className="summary-card">
                  <h3 className="summary-title">Resumo do Pedido</h3>
                  
                  <div className="summary-plan">
                    <div className="summary-plan-icon">
                      <Shield size={24} />
                    </div>
                    <div className="summary-plan-info">
                      <h4>BitLayer {currentPlan.name}</h4>
                      <span>Licenca Mensal</span>
                    </div>
                  </div>

                  <ul className="summary-features">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index}>
                        <Check size={16} className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="summary-pricing">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>R$ {currentPlan.price.toLocaleString("pt-BR")},00</span>
                    </div>
                    <div className="summary-row">
                      <span>Instalacao</span>
                      <span className="summary-highlight">Gratis</span>
                    </div>
                    <div className="summary-row">
                      <span>Suporte</span>
                      <span className="summary-highlight">Incluso</span>
                    </div>
                    <div className="summary-total">
                      <span>Total</span>
                      <span className="total-price">R$ {currentPlan.price.toLocaleString("pt-BR")},00/mes</span>
                    </div>
                  </div>

                  <div className="summary-info-box">
                    <div className="info-box-header">
                      <Shield size={16} />
                      <span>Apos o Pagamento</span>
                    </div>
                    <ul className="info-box-list">
                      <li>
                        <Download size={14} />
                        <span>Download imediato do instalador</span>
                      </li>
                      <li>
                        <Headphones size={14} />
                        <span>Contato da equipe de suporte em ate 24h para auxiliar na instalacao</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer onNavigate={scrollToSection} />

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setShowSuccessModal(false)}
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            
            <div className="modal-icon modal-icon--success">
              <Check size={48} />
            </div>
            
            <h2 className="modal-title">Compra Realizada com Sucesso!</h2>
            <p className="modal-description">
              Obrigado por escolher o S.O.U.L! Sua licenca do plano {currentPlan.name} foi ativada.
              Clique no botao abaixo para fazer o download do instalador.
            </p>
            
            <div className="modal-actions">
              <button className="modal-download-btn" onClick={handleDownload}>
                <Download size={20} />
                Baixar DashBoard SOUL
              </button>
              <button 
                className="modal-secondary-btn"
                onClick={() => {
                  setShowSuccessModal(false)
                  navigate("/")
                }}
              >
                Voltar para o Inicio
              </button>
            </div>
            
            <p className="modal-note">
              Voce tambem recebera um email com as instrucoes de instalacao.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
