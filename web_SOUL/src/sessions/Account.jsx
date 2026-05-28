import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { supabase } from "../lib/supabase.js"
import Swal from "sweetalert2"
import jsPDF from "jspdf"
import {
  User, CreditCard, Calendar, Shield, ChevronRight,
  CheckCircle, AlertCircle, ArrowUpRight, LogOut, Bell,
  Building2, Mail, Phone, Download, Clock, X,
} from "lucide-react"

/* ── PLANOS DISPONÍVEIS ── */
const planDetails = {
  essencial: {
    name: "Essencial",
    price: 250,
    features: [
      "Dashboard básico",
      "Gestão de estoque",
      "Controle de funcionários",
      "Agenda integrada",
      "Relatórios mensais",
    ],
  },
  profissional: {
    name: "Profissional",
    price: 600,
    features: [
      "Tudo do Essencial",
      "Dashboard avançado",
      "Gestão de logística",
      "Relatórios em tempo real",
      "Multi‑usuários (até 10)",
      "Suporte prioritário",
      "App mobile",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 1200,
    features: [
      "Tudo do Profissional",
      "Usuários ilimitados",
      "API personalizada",
      "Integrações avançadas",
      "Gerente de conta dedicado",
      "SLA garantido",
    ],
  },
}

const ADMIN_EMAIL = "admin@gmail.com"

const planColors = {
  essencial: "#6B7280",
  profissional: "#F38512",
  enterprise: "#8B5CF6",
}

/* ── HELPERS ── */
function formatDate(dateStr) {
  if (!dateStr) return "—"
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}

function maskCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  const parts = digits.match(/.{1,4}/g)
  return parts ? parts.join(" ") : digits
}

/* ── COMPONENTE ── */
export function AccountPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cnpj: "",
    plan: "Nenhum",
    planSlug: null,
    planPrice: 0,
    status: "inactive",
    subscriptionStart: null,
    nextBilling: null,
    paymentMethod: null,
    invoices: [],
    role: "user",
  })
  const [loading, setLoading] = useState(true)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    brand: "",
    number: "",
    expiry: "",
  })

  /* ── BUSCAR DADOS DO SUPABASE ── */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (!session?.user) {
          navigate("/login")
          return
        }

        const { data: usuario, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (error || !usuario) {
          setUserData((prev) => ({
            ...prev,
            name: "Usuário",
            email: session.user.email,
            role: "user",
          }))
        } else {
          const currentPlan = planDetails[usuario.plan_slug] || null
          setUserData({
            name: usuario.nome || "Usuário",
            email: usuario.email,
            phone: usuario.phone || "",
            cpf: usuario.cpf || "",
            cnpj: usuario.cnpj || "",
            plan: currentPlan ? currentPlan.name : "Nenhum",
            planSlug: usuario.plan_slug || null,
            planPrice: currentPlan ? currentPlan.price : 0,
            status: usuario.status || "inactive",
            subscriptionStart: usuario.subscription_start || null,
            nextBilling: usuario.next_billing || null,
            paymentMethod: usuario.payment_method || null,
            invoices: usuario.invoices || [],
            role: usuario.role || "user",
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [navigate])

  /* ── COMPRA / UPGRADE / REATIVAÇÃO ── */
  const handlePurchasePlan = async (planSlug) => {
    const plan = planDetails[planSlug]
    if (!plan) return

    const currentPlan = userData.planSlug ? planDetails[userData.planSlug] : null
    const isUpgrade = currentPlan && plan.price > currentPlan.price
    const isDowngrade = currentPlan && plan.price < currentPlan.price
    const isNewSubscription = !currentPlan || userData.status !== "active"

    let message = ""
    let amountToCharge = plan.price

    if (isNewSubscription) {
      message = `Valor: R$ ${plan.price}/mês. Deseja assinar agora?`
    } else if (isUpgrade) {
      const today = new Date()
      const nextBilling = userData.nextBilling ? new Date(userData.nextBilling + "T00:00:00") : today
      const startDate = userData.subscriptionStart ? new Date(userData.subscriptionStart + "T00:00:00") : today
      const daysInCycle = Math.ceil((nextBilling - startDate) / (1000 * 60 * 60 * 24))
      const daysLeft = Math.ceil((nextBilling - today) / (1000 * 60 * 60 * 24))
      const proportionUsed = daysInCycle > 0 ? (daysInCycle - daysLeft) / daysInCycle : 0
      const creditForUnused = currentPlan.price * (1 - proportionUsed)
      const debitForNew = plan.price * (daysLeft / daysInCycle)
      amountToCharge = Math.max(0, debitForNew - creditForUnused)

      message = `Upgrade para ${plan.name}. Você pagará a diferença proporcional de aproximadamente R$ ${amountToCharge.toFixed(2)} agora. O ciclo atual (até ${formatDate(userData.nextBilling)}) será mantido.`
    } else if (isDowngrade) {
      message = `Downgrade para ${plan.name}. A alteração será aplicada no próximo ciclo (em ${formatDate(userData.nextBilling)}). Nenhuma cobrança agora.`
    }

    const result = await Swal.fire({
      title: isNewSubscription ? `Assinar ${plan.name}` : `Alterar para ${plan.name}`,
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isDowngrade ? "Agendar downgrade" : "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: planColors[planSlug],
    })
    if (!result.isConfirmed) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { Swal.fire("Erro", "Não autenticado", "error"); return }

      const hoje = new Date()
      let updateData = {}
      let newState = {}

      if (isNewSubscription) {
        const proxCobranca = new Date(hoje)
        proxCobranca.setMonth(proxCobranca.getMonth() + 1)

        updateData = {
          status: "active",
          plan_slug: planSlug,
          subscription_start: hoje.toISOString().split("T")[0],
          next_billing: proxCobranca.toISOString().split("T")[0],
          payment_method: {
            type: "credit_card", brand: "Visa", last4: "4242", expiry: "08/27",
          },
        }

        newState = {
          status: "active",
          plan: plan.name,
          planSlug,
          planPrice: plan.price,
          subscriptionStart: hoje.toISOString().split("T")[0],
          nextBilling: proxCobranca.toISOString().split("T")[0],
          paymentMethod: {
            type: "credit_card", brand: "Visa", last4: "4242", expiry: "08/27",
          },
          invoices: [
            {
              id: `FAT-${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`,
              date: hoje.toISOString().split("T")[0],
              amount: plan.price,
              status: "paid",
            },
            ...userData.invoices,
          ],
        }
      } else if (isUpgrade) {
        updateData = {
          plan_slug: planSlug,
        }

        newState = {
          ...userData,
          plan: plan.name,
          planSlug,
          planPrice: plan.price,
          invoices: [
            {
              id: `UPG-${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`,
              date: hoje.toISOString().split("T")[0],
              amount: parseFloat(amountToCharge.toFixed(2)),
              status: "paid",
            },
            ...userData.invoices,
          ],
        }
      } else if (isDowngrade) {
        Swal.fire("Agendado!", `Seu plano será alterado para ${plan.name} em ${formatDate(userData.nextBilling)}.`, "success")
        setShowPlanModal(false)
        return
      }

      const { error } = await supabase
        .from("usuario")
        .update(updateData)
        .eq("id", session.user.id)

      if (error) throw error

      setUserData((prev) => ({ ...prev, ...newState }))
      Swal.fire("Sucesso!", `Plano ${plan.name} ${isNewSubscription ? "ativado" : "alterado"}.`, "success")
      setShowPlanModal(false)
    } catch (err) {
      Swal.fire("Erro", err.message || "Erro ao processar", "error")
    }
  }

  /* ── CANCELAR ── */
  const handleCancelSubscription = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Cancelar assinatura?",
      text: "Seu acesso será encerrado ao final do ciclo atual.",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, cancelar",
      cancelButtonText: "Voltar",
    })
    if (!result.isConfirmed) return

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) { Swal.fire("Erro", "Não autenticado", "error"); return }

      const { error } = await supabase
        .from("usuario")
        .update({
          status: "cancelled",
          plan_slug: null,
          subscription_start: null,
          next_billing: null,
          payment_method: null,
        })
        .eq("id", session.user.id)

      if (error) throw error

      setUserData((prev) => ({
        ...prev,
        status: "cancelled",
        plan: "Nenhum",
        planSlug: null,
        planPrice: 0,
        subscriptionStart: null,
        nextBilling: null,
        paymentMethod: null,
        invoices: [],
      }))

      Swal.fire("Cancelada", "Sua assinatura foi cancelada.", "success")
    } catch (err) {
      Swal.fire("Erro", err.message, "error")
    }
  }

  /* ── DOWNLOADS ── */
  const handleDownloadInvoice = (invoice) => {
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold").setFontSize(22)
    doc.text("FATURA", 105, 30, { align: "center" })
    doc.setDrawColor(220).line(20, 38, 190, 38)
    doc.setFontSize(10).setFont("helvetica", "normal")
    doc.text("Emitido por: Soul Dashboard Ltda", 20, 50)
    doc.text("CNPJ: 00.000.000/0000-00", 20, 56)
    doc.text("Email: contato@souldashboard.com", 20, 62)
    doc.text(`Cliente: ${userData.name}`, 120, 50)
    doc.text(`Email: ${userData.email}`, 120, 56)
    if (userData.cnpj) doc.text(`CNPJ: ${userData.cnpj}`, 120, 62)
    doc.line(20, 72, 190, 72)
    doc.setFontSize(12).setFont("helvetica", "bold")
    doc.text("Detalhes da Fatura", 20, 84)
    doc.setFontSize(10).setFont("helvetica", "normal")
    doc.text(`Número: ${invoice.id}`, 20, 94)
    doc.text(`Data: ${formatDate(invoice.date)}`, 20, 102)
    doc.text(`Valor: R$ ${invoice.amount.toLocaleString("pt-BR")},00`, 20, 110)
    doc.text(`Status: ${invoice.status === "paid" ? "Pago" : "Pendente"}`, 20, 118)
    doc.setFontSize(8).text("Documento gerado automaticamente.", 105, 280, { align: "center" })
    doc.save(`fatura_${invoice.id}.pdf`)
  }

  const handleDownloadSystem = () => {
    const doc = new jsPDF()
    doc.setFontSize(22).setFont("helvetica", "bold")
    doc.text("Soul Dashboard", 105, 30, { align: "center" })
    doc.setFontSize(14).text("Guia Rápido de Instalação", 105, 40, { align: "center" })
    doc.setDrawColor(220).line(20, 46, 190, 46)
    doc.setFontSize(11).setFont("helvetica", "normal")
    const lines = [
      "Obrigado por escolher o Soul Dashboard!",
      "",
      "Para instalar:",
      "1. Acesse https://souldashboard.com/download",
      "2. Faça login.",
      "3. Baixe o instalador.",
      "",
      "Requisitos:",
      "- Windows 10/11 ou macOS 10.15+",
      "- 4 GB de RAM",
      "- Internet",
      "",
      "Suporte: contato@souldashboard.com",
      "Versão 1.0.0",
    ]
    let y = 56
    lines.forEach((line) => {
      doc.text(line, 20, y)
      y += 7
    })
    doc.save("Soul_Dashboard_Guia.pdf")
  }

  /* ── MODAL PAGAMENTO ── */
  const openPaymentModal = () => {
    if (userData.paymentMethod) {
      setPaymentForm({
        brand: userData.paymentMethod.brand,
        number: maskCardNumber(`411111111111${userData.paymentMethod.last4}`),
        expiry: userData.paymentMethod.expiry,
      })
    }
    setShowPaymentModal(true)
  }
  const closePaymentModal = () => setShowPaymentModal(false)
  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target
    if (name === "number") {
      setPaymentForm((prev) => ({ ...prev, [name]: maskCardNumber(value) }))
    } else {
      setPaymentForm((prev) => ({ ...prev, [name]: value }))
    }
  }
  const submitPaymentChange = (e) => {
    e.preventDefault()
    const digits = paymentForm.number.replace(/\D/g, "")
    if (digits.length < 13 || digits.length > 16) {
      return Swal.fire("Erro", "Número de cartão inválido.", "error")
    }
    const last4 = digits.slice(-4)
    const newMethod = {
      type: "credit_card",
      brand: paymentForm.brand || userData.paymentMethod?.brand || "Visa",
      last4,
      expiry: paymentForm.expiry,
    }
    setUserData((prev) => ({ ...prev, paymentMethod: newMethod }))
    setShowPaymentModal(false)
    Swal.fire("Atualizado!", "Forma de pagamento alterada.", "success")
  }

  const scrollToSection = (sectionId) => {
    if (window.location.pathname === "/") {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      navigate("/")
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 300)
    }
  }

  /* ── DERIVADOS ── */
  const features = userData.planSlug ? planDetails[userData.planSlug]?.features || [] : []
  const accentColor = userData.planSlug ? planColors[userData.planSlug] : "#9ca3af"

  if (loading) {
    return (
      <>
        <Header onNavigate={scrollToSection} />
        <main className="account-main">
          <div className="container"><p>Carregando...</p></div>
        </main>
        <Footer onNavigate={scrollToSection} />
      </>
    )
  }

  return (
    <>
      <Header onNavigate={scrollToSection} />
      <main className="account-main">
        {/* ── HERO ── */}
        <div className="account-hero">
          <div className="container">
            <div className="account-hero-inner">
              <div className="account-avatar"><Building2 size={32} /></div>
              <div className="account-hero-info">
                <div className="account-hero-top">
                  <h1 className="account-hero-name">{userData.name}</h1>
                  <span className={`account-status-badge account-status-badge--${userData.status}`}>
                    {userData.status === "active" && <><CheckCircle size={13} /> Ativa</>}
                    {userData.status === "inactive" && <><AlertCircle size={13} /> Sem plano</>}
                    {userData.status === "cancelled" && <><AlertCircle size={13} /> Cancelado</>}
                  </span>
                </div>
                <p className="account-hero-email">{userData.email}</p>
              </div>
              <button className="account-upgrade-btn" onClick={() => setShowPlanModal(true)}>
                {userData.status === "active" ? "Fazer upgrade" : "Assinar agora"} <ArrowUpRight size={16} />
              </button>
              {userData.email?.toLowerCase() === ADMIN_EMAIL && (
                <button className="account-admin-btn" onClick={() => navigate("/admin")}>Painel Admin</button>
              )}
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="account-tabs-bar">
          <div className="container">
            <div className="account-tabs">
              {[
                { id: "overview", label: "Visão Geral", icon: Shield },
                { id: "plan", label: "Meu Plano", icon: CheckCircle },
                { id: "billing", label: "Pagamento", icon: CreditCard },
                { id: "profile", label: "Perfil", icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`account-tab ${activeTab === tab.id ? "account-tab--active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTEÚDO ── */}
        <div className="account-content">
          <div className="container">
            {/* ========== OVERVIEW ========== */}
            {activeTab === "overview" && (
              <div className="account-grid">
                <div className="account-stats-row">
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: `${accentColor}18`, color: accentColor }}><Shield size={22} /></div>
                    <div><p className="account-stat-label">Plano atual</p><p className="account-stat-value">{userData.plan}</p></div>
                  </div>
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E" }}><Calendar size={22} /></div>
                    <div><p className="account-stat-label">Próximo vencimento</p><p className="account-stat-value">{formatDate(userData.nextBilling)}</p></div>
                  </div>
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}><CreditCard size={22} /></div>
                    <div><p className="account-stat-label">Pagamento</p><p className="account-stat-value">{userData.paymentMethod ? `${userData.paymentMethod.brand} •••• ${userData.paymentMethod.last4}` : "—"}</p></div>
                  </div>
                  <div className="account-stat-card">
                    <div className="account-stat-icon" style={{ background: `${accentColor}18`, color: accentColor }}><Clock size={22} /></div>
                    <div><p className="account-stat-label">Cliente desde</p><p className="account-stat-value">{formatDate(userData.subscriptionStart)}</p></div>
                  </div>
                </div>

                {userData.status === "active" && (
                  <div className="account-two-col">
                    <div className="account-card">
                      <div className="account-card-header">
                        <h3 className="account-card-title">Plano {userData.plan}</h3>
                        <button className="account-card-action" onClick={() => setActiveTab("plan")}>Ver detalhes <ChevronRight size={14} /></button>
                      </div>
                      <div className="account-plan-price-row">
                        <span className="account-plan-price">R$ {userData.planPrice.toLocaleString("pt-BR")}</span>
                        <span className="account-plan-period">/mês</span>
                      </div>
                      <ul className="account-features-list">
                        {features.slice(0, 4).map((f) => (
                          <li key={f}><CheckCircle size={14} style={{ color: accentColor }} />{f}</li>
                        ))}
                      </ul>
                      <button className="account-upgrade-card-btn" onClick={() => setShowPlanModal(true)}>Upgrade para Enterprise <ArrowUpRight size={15} /></button>
                    </div>

                    <div className="account-card">
                      <div className="account-card-header">
                        <h3 className="account-card-title">Últimas faturas</h3>
                        <button className="account-card-action" onClick={() => setActiveTab("billing")}>Ver todas <ChevronRight size={14} /></button>
                      </div>
                      <div className="account-invoices-list">
                        {userData.invoices.slice(0, 3).map((inv) => (
                          <div key={inv.id} className="account-invoice-row">
                            <div className="account-invoice-info">
                              <span className="account-invoice-id">{inv.id}</span>
                              <span className="account-invoice-date">{formatDate(inv.date)}</span>
                            </div>
                            <div className="account-invoice-right">
                              <span className="account-invoice-amount">R$ {inv.amount},00</span>
                              <span className="account-invoice-status--paid"><CheckCircle size={12} /> Pago</span>
                            </div>
                            <button className="account-invoice-download" onClick={() => handleDownloadInvoice(inv)}><Download size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(userData.status === "inactive" || userData.status === "cancelled") && (
                  <div className="account-card account-card--wide">
                    <div className="account-plan-upgrade-banner">
                      <div>
                        <h4>{userData.status === "inactive" ? "Você ainda não possui um plano ativo." : "Sua assinatura foi cancelada."}</h4>
                        <p>Escolha um plano para começar.</p>
                      </div>
                      <button className="btn-primary" onClick={() => setShowPlanModal(true)}>Escolher plano <ArrowUpRight size={16} /></button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========== PLAN ========== */}
            {activeTab === "plan" && (
              <div className="account-section">
                {userData.status === "active" ? (
                  <div className="account-card account-card--wide">
                    <div className="account-card-header">
                      <h3 className="account-card-title">Seu plano atual</h3>
                      <span className="account-active-badge"><CheckCircle size={13} /> Ativo</span>
                    </div>
                    <div className="account-plan-detail-header">
                      <div>
                        <h2 className="account-plan-detail-name" style={{ color: accentColor }}>{userData.plan}</h2>
                        <div className="account-plan-price-row">
                          <span className="account-plan-price">R$ {userData.planPrice.toLocaleString("pt-BR")}</span>
                          <span className="account-plan-period">/mês</span>
                        </div>
                      </div>
                      <div className="account-plan-dates">
                        <div className="account-plan-date-item"><span className="account-plan-date-label">Início</span><span className="account-plan-date-value">{formatDate(userData.subscriptionStart)}</span></div>
                        <div className="account-plan-date-item"><span className="account-plan-date-label">Próximo vencimento</span><span className="account-plan-date-value" style={{ color: accentColor }}>{formatDate(userData.nextBilling)}</span></div>
                      </div>
                    </div>
                    <div className="account-plan-features-grid">
                      {features.map((f) => (
                        <div key={f} className="account-plan-feature-item"><CheckCircle size={16} style={{ color: accentColor }} /> <span>{f}</span></div>
                      ))}
                    </div>
                    <div className="account-plan-upgrade-banner">
                      <div><h4>Precisa de mais recursos?</h4><p>Faça upgrade para o Enterprise.</p></div>
                      <button className="btn-primary" onClick={() => setShowPlanModal(true)}>Upgrade para Enterprise <ArrowUpRight size={16} /></button>
                    </div>
                  </div>
                ) : (
                  <div className="account-card account-card--wide">
                    <h3>{userData.status === "cancelled" ? "Assinatura cancelada" : "Nenhum plano ativo"}</h3>
                    <p>{userData.status === "cancelled" ? "Seu plano foi cancelado. Você ainda pode acessar até o fim do ciclo atual." : "Escolha um plano para começar a usar o Soul Dashboard."}</p>
                    <button className="btn-primary" onClick={() => setShowPlanModal(true)}>
                      {userData.status === "cancelled" ? "Reativar plano" : "Ver planos"} <ArrowUpRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ========== BILLING ========== */}
            {activeTab === "billing" && (
              <div className="account-section">
                {userData.status === "active" && userData.paymentMethod ? (
                  <>
                    <div className="account-two-col">
                      <div className="account-card">
                        <div className="account-card-header"><h3 className="account-card-title">Método de pagamento</h3></div>
                        <div className="account-payment-card">
                          <div className="account-payment-card-art">
                            <div className="account-payment-card-brand">{userData.paymentMethod.brand}</div>
                            <div className="account-payment-card-number">•••• •••• •••• {userData.paymentMethod.last4}</div>
                            <div className="account-payment-card-expiry"><span>Validade</span><span>{userData.paymentMethod.expiry}</span></div>
                          </div>
                          <div className="account-payment-meta">
                            <div className="account-payment-meta-row"><span>Bandeira</span><span>{userData.paymentMethod.brand}</span></div>
                            <div className="account-payment-meta-row"><span>Final</span><span>•••• {userData.paymentMethod.last4}</span></div>
                            <div className="account-payment-meta-row"><span>Vencimento</span><span>{userData.paymentMethod.expiry}</span></div>
                          </div>
                        </div>
                        <button className="account-change-btn" onClick={openPaymentModal}><CreditCard size={15} /> Alterar forma de pagamento</button>
                      </div>

                      <div className="account-card">
                        <div className="account-card-header"><h3 className="account-card-title">Resumo de cobrança</h3></div>
                        <div className="account-billing-summary">
                          <div className="account-billing-row"><span>Plano {userData.plan}</span><span>R$ {userData.planPrice}/mês</span></div>
                          <div className="account-billing-row"><span>Próximo débito</span><span style={{ color: accentColor, fontWeight: 700 }}>{formatDate(userData.nextBilling)}</span></div>
                        </div>
                        <div className="account-billing-note"><Bell size={14} /><span>Você receberá um e-mail 3 dias antes de cada cobrança.</span></div>
                      </div>
                    </div>

                    <div className="account-card account-card--wide" style={{ marginTop: 24 }}>
                      <div className="account-card-header"><h3 className="account-card-title">Histórico de faturas</h3></div>
                      <div className="account-invoices-table">
                        <div className="account-invoices-table-header"><span>Fatura</span><span>Data</span><span>Valor</span><span>Status</span><span></span></div>
                        {userData.invoices.map((inv) => (
                          <div key={inv.id} className="account-invoices-table-row">
                            <span className="account-invoice-id">{inv.id}</span>
                            <span>{formatDate(inv.date)}</span>
                            <span>R$ {inv.amount},00</span>
                            <span className="account-invoice-status--paid"><CheckCircle size={12} /> Pago</span>
                            <button className="account-invoice-download" onClick={() => handleDownloadInvoice(inv)}><Download size={14} /> Baixar</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="account-card account-card--wide"><p>Nenhum plano ativo para exibir dados de pagamento.</p></div>
                )}
              </div>
            )}

            {/* ========== PROFILE ========== */}
            {activeTab === "profile" && (
              <div className="account-section">
                <div className="account-card account-card--wide">
                  <div className="account-card-header"><h3 className="account-card-title">Dados da conta</h3></div>
                  <div className="account-profile-grid">
                    <div className="account-profile-field"><label><Building2 size={14} /> Empresa</label><input type="text" defaultValue={userData.name} readOnly /></div>
                    <div className="account-profile-field"><label><User size={14} /> CNPJ</label><input type="text" defaultValue={userData.cnpj || "—"} readOnly /></div>
                    <div className="account-profile-field"><label><Mail size={14} /> Email</label><input type="email" defaultValue={userData.email} readOnly /></div>
                    <div className="account-profile-field"><label><Phone size={14} /> Telefone</label><input type="text" defaultValue={userData.phone || "—"} readOnly /></div>
                  </div>
                  <div className="account-profile-note"><AlertCircle size={14} /> Para alterar dados, contate suporte@souldashboard.com.</div>
                </div>

                <div className="account-card account-card--wide account-danger-card" style={{ marginTop: 24 }}>
                  <div className="account-card-header"><h3 className="account-card-title account-danger-title">Zona de perigo</h3></div>
                  <p className="account-danger-desc">Cancelar sua assinatura encerrará o acesso ao final do ciclo atual.</p>
                  {userData.status === "active" ? (
                    <button className="account-cancel-btn" onClick={handleCancelSubscription}><LogOut size={15} /> Cancelar assinatura</button>
                  ) : (
                    <p style={{ color: "#9ca3af", fontSize: "14px" }}>Nenhuma assinatura ativa para cancelar.</p>
                  )}
                </div>

                <div className="account-card account-card--wide" style={{ marginTop: 24 }}>
                  <div className="account-card-header"><h3 className="account-card-title">Download do sistema</h3></div>
                  <p>Baixe o guia de instalação e acesso ao Soul Dashboard.</p>
                  <button className="btn-primary" onClick={handleDownloadSystem}><Download size={16} /> Baixar sistema</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ========== MODAL DE PLANOS ========== */}
      {showPlanModal && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal-card plan-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "700px" }}>
            <div className="modal-header">
              <h3>Escolha seu plano</h3>
              <button className="modal-close-btn" onClick={() => setShowPlanModal(false)}><X size={20} /></button>
            </div>
            <div className="plan-cards">
              {Object.entries(planDetails).map(([slug, plan]) => (
                <div key={slug} className={`plan-card ${userData.planSlug === slug ? "plan-card--current" : ""}`}>
                  <h4 style={{ color: planColors[slug] }}>{plan.name}</h4>
                  <div className="plan-card-price">R$ {plan.price}<span>/mês</span></div>
                  <ul>{plan.features.map((f) => <li key={f}><CheckCircle size={14} style={{ color: planColors[slug] }} /> {f}</li>)}</ul>
                  <button
                    className="btn-primary"
                    disabled={userData.planSlug === slug}
                    onClick={() => handlePurchasePlan(slug)}
                  >
                    {userData.planSlug === slug ? "Plano atual" : "Selecionar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL DE PAGAMENTO ========== */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Alterar forma de pagamento</h3>
            <form onSubmit={submitPaymentChange} className="modal-form">
              <div className="modal-row"><label>Bandeira</label><input name="brand" value={paymentForm.brand} onChange={handlePaymentFormChange} placeholder="Visa, Mastercard..." /></div>
              <div className="modal-row"><label>Número do cartão</label><input name="number" value={paymentForm.number} onChange={handlePaymentFormChange} placeholder="0000 0000 0000 0000" maxLength={19} /></div>
              <div className="modal-row"><label>Validade (MM/AA)</label><input name="expiry" value={paymentForm.expiry} onChange={handlePaymentFormChange} placeholder="08/27" maxLength={5} /></div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={closePaymentModal}>Cancelar</button>
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer onNavigate={scrollToSection} />
    </>
  )
}

export default AccountPage