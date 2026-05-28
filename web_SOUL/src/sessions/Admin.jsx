import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase.js"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import Swal from "sweetalert2"
import jsPDF from "jspdf"
import {
  Users,
  PieChart,
  BarChart3,
  Shield,
  FileText,
  Settings2,
  Download,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCcw,
} from "lucide-react"
import "./Admin.css"

const ADMIN_EMAIL = "admin@gmail.com"

const planDetails = {
  essencial: { name: "Essencial", price: 250 },
  profissional: { name: "Profissional", price: 600 },
  enterprise: { name: "Enterprise", price: 1250 },
}

const defaultSettings = {
  site_title: "Soul Dashboard",
  seo_description: "Sistema de gestão empresarial completo.",
  payment_method: "Pix, Cartão de Crédito, Boleto",
  email_provider: "SMTP / SendGrid",
  notifications_enabled: true,
  domain: "www.souldashboard.com",
}

function formatCurrency(value) {
  return `R$ ${Number(value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
}

function formatDate(value) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("pt-BR")
}

function downloadCsv(filename, rows) {
  const csvRows = [Object.keys(rows[0]).join(",")]
  for (const row of rows) {
    const values = Object.values(row).map((value) => {
      const safe = `${value ?? ""}`.replace(/"/g, '""')
      return `"${safe}"`
    })
    csvRows.push(values.join(","))
  }
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function AdminPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [adminUser, setAdminUser] = useState(null)
  const [users, setUsers] = useState([])
  const [contentItems, setContentItems] = useState([])
  const [settings, setSettings] = useState(defaultSettings)
  const [activeSection, setActiveSection] = useState("overview")
  const [contentForm, setContentForm] = useState({
    id: null,
    title: "",
    slug: "",
    status: "draft",
    category: "Geral",
    type: "page",
    excerpt: "",
    body: "",
    media_url: "",
  })
  const [contentError, setContentError] = useState(null)
  const [settingsError, setSettingsError] = useState(null)
  const [usersError, setUsersError] = useState(null)
  const [savingContent, setSavingContent] = useState(false)
  const [savingSettings, setSavingSettings] = useState(false)

  const loadAdminData = async () => {
    setLoading(true)
    setError(null)
    setContentError(null)
    setSettingsError(null)
    setUsersError(null)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        navigate("/login?next=/admin")
        return
      }

      if (session.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        navigate("/conta")
        return
      }

      setAdminUser(session.user)

      // Removido o 'created_at' que não existe no banco
      const [usersRes, pagesRes, settingsRes] = await Promise.all([
        supabase
          .from("usuario")
          .select("id, email, nome, status, plan_slug, subscription_start, next_billing, invoices"),
        supabase
          .from("cms_pages")
          .select("id, title, slug, status, category, type, excerpt, media_url, updated_at, created_at"),
        supabase
          .from("system_settings")
          .select("*")
          .limit(1)
          .single(),
      ])

      if (usersRes.error) {
        setUsersError(usersRes.error.message)
        setUsers([])
      } else {
        setUsers(usersRes.data || [])
      }

      if (pagesRes.error) {
        setContentError(pagesRes.error.message)
        setContentItems([])
      } else {
        setContentItems(pagesRes.data || [])
      }

      if (settingsRes.error) {
        setSettingsError(settingsRes.error.message)
        setSettings(defaultSettings)
      } else if (settingsRes.data) {
        setSettings({ ...defaultSettings, ...settingsRes.data })
      }
    } catch (err) {
      console.error(err)
      setError("Não foi possível carregar os dados administrativos. Verifique a conexão.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "active" && user.plan_slug).length
  const planCounts = users.reduce((acc, user) => {
    if (user.plan_slug) {
      acc[user.plan_slug] = (acc[user.plan_slug] || 0) + 1
    }
    return acc
  }, {})
  const revenueFromInvoices = users.reduce((sum, user) => {
    const invoices = Array.isArray(user.invoices) ? user.invoices : []
    return sum + invoices.reduce((subtotal, invoice) => subtotal + (Number(invoice.amount) || 0), 0)
  }, 0)
  const revenueFromPlans = users.reduce((sum, user) => {
    const plan = planDetails[user.plan_slug]
    return sum + (user.status === "active" && plan ? plan.price : 0)
  }, 0)
  const totalRevenue = Math.max(revenueFromInvoices, revenueFromPlans)

  const exportUsersCsv = () => {
    if (!users.length) return
    const rows = users.map((user) => ({
      id: user.id,
      nome: user.nome || "-",
      email: user.email,
      role: user.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user",
      status: user.status || "inactive",
      plano: planDetails[user.plan_slug]?.name || "Nenhum",
      cliente_desde: formatDate(user.subscription_start),
    }))
    downloadCsv("admin_usuarios.csv", rows)
  }

  const exportSummaryPdf = () => {
    const doc = new jsPDF({ unit: "pt" })
    doc.setFontSize(20)
    doc.text("Relatório Admin", 40, 40)
    doc.setFontSize(12)
    doc.text(`Usuários cadastrados: ${totalUsers}`, 40, 80)
    doc.text(`Planos ativos: ${activeUsers}`, 40, 100)
    doc.text(`Faturamento estimado: ${formatCurrency(totalRevenue)}`, 40, 120)
    doc.text("Usuários por plano:", 40, 160)
    Object.entries(planCounts).forEach(([slug, count], index) => {
      doc.text(`- ${planDetails[slug]?.name || slug}: ${count}`, 60, 180 + index * 18)
    })
    doc.save("relatorio_admin.pdf")
  }

  const handleSelectPage = (page) => {
    setContentForm({
      id: page.id,
      title: page.title,
      slug: page.slug,
      status: page.status,
      category: page.category,
      type: page.type,
      excerpt: page.excerpt,
      body: page.body,
      media_url: page.media_url,
    })
    setActiveSection("content")
  }

  const resetContentForm = () => {
    setContentForm({
      id: null,
      title: "",
      slug: "",
      status: "draft",
      category: "Geral",
      type: "page",
      excerpt: "",
      body: "",
      media_url: "",
    })
  }

  const saveContent = async (e) => {
    e.preventDefault()
    setSavingContent(true)
    try {
      const payload = {
        title: contentForm.title,
        slug: contentForm.slug,
        status: contentForm.status,
        category: contentForm.category,
        type: contentForm.type,
        excerpt: contentForm.excerpt,
        body: contentForm.body,
        media_url: contentForm.media_url,
      }
      let response
      if (contentForm.id) {
        response = await supabase
          .from("cms_pages")
          .update(payload)
          .eq("id", contentForm.id)
      } else {
        response = await supabase.from("cms_pages").insert([payload])
      }
      if (response.error) throw response.error
      await loadAdminData()
      resetContentForm()
      Swal.fire("Sucesso!", "Página salva com sucesso.", "success")
    } catch (err) {
      Swal.fire("Erro", err.message || "Não foi possível salvar o conteúdo.", "error")
    } finally {
      setSavingContent(false)
    }
  }

  const deleteContent = async (id) => {
    const result = await Swal.fire({
      title: "Excluir conteúdo?",
      text: "Esta ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    })
    if (!result.isConfirmed) return
    const { error } = await supabase.from("cms_pages").delete().eq("id", id)
    if (error) {
      Swal.fire("Erro", error.message, "error")
      return
    }
    await loadAdminData()
    Swal.fire("Removido", "Conteúdo excluído com sucesso.", "success")
  }

  const updateSetting = async (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const saveSettings = async (e) => {
    e.preventDefault()
    setSavingSettings(true)
    try {
      const payload = { ...settings }
      const { error } = await supabase.from("system_settings").upsert([payload])
      if (error) throw error
      Swal.fire("Sucesso", "Configurações salvas.", "success")
    } catch (err) {
      Swal.fire("Erro", err.message || "Não foi possível salvar as configurações.", "error")
    } finally {
      setSavingSettings(false)
    }
  }

  const toggleUserStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === "blocked" ? "active" : "blocked"
    const { error } = await supabase.from("usuario").update({ status: nextStatus }).eq("id", userId)
    if (error) {
      Swal.fire("Erro", error.message, "error")
      return
    }
    await loadAdminData()
    Swal.fire("Sucesso", `Usuário ${nextStatus === "blocked" ? "bloqueado" : "ativado"}.`, "success")
  }

  const sendResetLink = async (email) => {
    try {
      // Usando a sintaxe correta do Supabase v2 para reset de senha
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      Swal.fire("Enviado", "Link de redefinição de senha enviado com sucesso.", "success")
    } catch (err) {
      Swal.fire("Erro", err.message || "Não foi possível enviar o link.", "error")
    }
  }

  const exportAllData = () => {
    if (!users.length) return
    const rows = users.map((user) => ({
      id: user.id,
      nome: user.nome || "-",
      email: user.email,
      role: user.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user",
      status: user.status || "inactive",
      plano: planDetails[user.plan_slug]?.name || "Nenhum",
    }))
    downloadCsv("admin_dados.csv", rows)
  }

  if (loading) {
    return (
      <div className="admin-page">
        <Header />
        <main className="admin-main">
          <div className="admin-loading">Carregando painel administrativo...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-page">
        <Header />
        <main className="admin-main">
          <div className="admin-error">{error}</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="admin-page">
      <Header />
      <main className="admin-main">
        <section className="admin-hero">
          <div>
            <p className="admin-badge">Administração</p>
            <h1>Painel de Controle</h1>
            <p>Monitoramento de usuários, assinaturas, faturamento e conteúdo do site.</p>
          </div>
          <div className="admin-actions">
            <button className="btn-secondary" onClick={() => setActiveSection("overview")}>Visão Geral</button>
            <button className="btn-secondary" onClick={() => setActiveSection("users")}>Usuários</button>
            <button className="btn-secondary" onClick={() => setActiveSection("reports")}>Relatórios</button>
          </div>
        </section>

        <section className="admin-grid">
          <div className="admin-card card-highlight">
            <div className="card-icon card-icon--blue"><Users size={24} /></div>
            <div>
              <p className="card-label">Usuários cadastrados</p>
              <p className="card-value">{totalUsers}</p>
            </div>
          </div>
          <div className="admin-card card-highlight">
            <div className="card-icon card-icon--green"><Shield size={24} /></div>
            <div>
              <p className="card-label">Planos ativos</p>
              <p className="card-value">{activeUsers}</p>
            </div>
          </div>
          <div className="admin-card card-highlight">
            <div className="card-icon card-icon--orange"><PieChart size={24} /></div>
            <div>
              <p className="card-label">Receita estimada</p>
              <p className="card-value">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="admin-card card-highlight">
            <div className="card-icon card-icon--violet"><BarChart3 size={24} /></div>
            <div>
              <p className="card-label">Planos por tipo</p>
              <p className="card-value">{Object.values(planCounts).reduce((sum, value) => sum + value, 0)}</p>
            </div>
          </div>
        </section>

        {activeSection === "overview" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Visão Geral</h2>
              <div className="admin-section-actions">
                <button className="btn-secondary" onClick={exportUsersCsv}><Download size={16} /> Exportar CSV</button>
                <button className="btn-secondary" onClick={exportSummaryPdf}><Download size={16} /> Exportar PDF</button>
              </div>
            </div>

            <div className="overview-grid">
              {Object.entries(planDetails).map(([slug, plan]) => (
                <div key={slug} className="overview-card">
                  <p>{plan.name}</p>
                  <strong>{planCounts[slug] || 0} usuários</strong>
                </div>
              ))}
            </div>

            <div className="admin-note">
              <strong>Importante:</strong> este painel só deve ser acessado pelo administrador
            </div>
          </section>
        )}

        {activeSection === "users" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Gestão de Usuários</h2>
              <div className="admin-section-actions">
                <button className="btn-secondary" onClick={exportAllData}><Download size={16} /> Exportar usuários</button>
                <button className="btn-secondary" onClick={loadAdminData}><RefreshCcw size={16} /> Atualizar</button>
              </div>
            </div>

            {usersError && <div className="admin-warning">Erro ao carregar usuários: {usersError}</div>}

            <div className="admin-table-wrap">
              <div className="admin-table-row admin-table-header">
                <span>Nome</span>
                <span>Email</span>
                <span>Plano</span>
                <span>Status</span>
                <span>Função</span>
                <span>Ações</span>
              </div>
              {users.map((user) => (
                <div key={user.id} className="admin-table-row">
                  <span>{user.nome || "—"}</span>
                  <span>{user.email}</span>
                  <span>{planDetails[user.plan_slug]?.name || "Nenhum"}</span>
                  <span>{user.status || "inactive"}</span>
                  <span>{user.email?.toLowerCase() === ADMIN_EMAIL ? "Administrador" : "Usuário"}</span>
                  <span className="admin-table-actions">
                    <button className="btn-icon" onClick={() => toggleUserStatus(user.id, user.status)}>
                      {user.status === "blocked" ? "Ativar" : "Bloquear"}
                    </button>
                    {/* BOTÃO DE RESET RESTAURADO */}
                    <button className="btn-icon" onClick={() => sendResetLink(user.email)}>
                      Reset Senha
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "content" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Gestão de Conteúdo</h2>
              <div className="admin-section-actions">
                <button className="btn-secondary" onClick={resetContentForm}><Plus size={16} /> Novo conteúdo</button>
                <button className="btn-secondary" onClick={loadAdminData}><RefreshCcw size={16} /> Atualizar</button>
              </div>
            </div>

            {contentError && <div className="admin-warning">Não foi possível carregar conteúdo: {contentError}</div>}

            <div className="content-manager-grid">
              <div className="content-list-card">
                <h3>Páginas e Postagens</h3>
                {contentItems.length ? (
                  contentItems.map((page) => (
                    <div key={page.id} className="content-card">
                      <div>
                        <strong>{page.title}</strong>
                        <p>{page.slug}</p>
                        <small>{page.category} • {page.type}</small>
                      </div>
                      <div className="content-card-actions">
                        <button className="btn-icon" onClick={() => handleSelectPage(page)}><Edit size={16} /></button>
                        <button className="btn-icon btn-icon--danger" onClick={() => deleteContent(page.id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="admin-empty">Nenhum conteúdo encontrado.</div>
                )}
              </div>

              <div className="content-editor-card">
                <h3>{contentForm.id ? "Editar conteúdo" : "Novo conteúdo"}</h3>
                <form className="content-form" onSubmit={saveContent}>
                  <label>Título</label>
                  <input
                    value={contentForm.title}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Título da página"
                    required
                  />
                  <label>Slug</label>
                  <input
                    value={contentForm.slug}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="/nome-da-pagina"
                    required
                  />
                  <label>Categoria</label>
                  <input
                    value={contentForm.category}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Categoria"
                  />
                  <label>Status</label>
                  <select
                    value={contentForm.status}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="draft">Rascunho</option>
                    <option value="review">Em revisão</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Arquivado</option>
                  </select>
                  <label>Tipo</label>
                  <select
                    value={contentForm.type}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="page">Página</option>
                    <option value="post">Postagem</option>
                    <option value="video">Vídeo</option>
                    <option value="image">Imagem</option>
                  </select>
                  <label>Resumo</label>
                  <textarea
                    value={contentForm.excerpt}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    placeholder="Resumo curto"
                  />
                  <label>Link de mídia</label>
                  <input
                    value={contentForm.media_url}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, media_url: e.target.value }))}
                    placeholder="URL da imagem ou vídeo"
                  />
                  <label>Corpo do conteúdo</label>
                  <textarea
                    value={contentForm.body}
                    onChange={(e) => setContentForm((prev) => ({ ...prev, body: e.target.value }))}
                    rows={6}
                    placeholder="Texto completo do conteúdo"
                  />
                  <button className="btn-primary" type="submit" disabled={savingContent}>
                    {savingContent ? "Salvando..." : "Salvar conteúdo"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {activeSection === "settings" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Configurações do Sistema</h2>
            </div>

            {settingsError && <div className="admin-warning">Não foi possível carregar configurações: {settingsError}</div>}

            <form className="settings-form" onSubmit={saveSettings}>
              <label>Título do site</label>
              <input value={settings.site_title} onChange={(e) => updateSetting("site_title", e.target.value)} required />
              <label>Descrição SEO</label>
              <textarea value={settings.seo_description} onChange={(e) => updateSetting("seo_description", e.target.value)} rows={3} />
              <label>Métodos de pagamento</label>
              <input value={settings.payment_method} onChange={(e) => updateSetting("payment_method", e.target.value)} />
              <label>Integração de e-mail</label>
              <input value={settings.email_provider} onChange={(e) => updateSetting("email_provider", e.target.value)} />
              <label>Domínio</label>
              <input value={settings.domain} onChange={(e) => updateSetting("domain", e.target.value)} />
              <button className="btn-primary" type="submit" disabled={savingSettings}>
                {savingSettings ? "Salvando..." : "Salvar configurações"}
              </button>
            </form>
          </section>
        )}

        {activeSection === "reports" && (
          <section className="admin-section">
            <div className="admin-section-header">
              <h2>Relatórios e Exportação</h2>
            </div>

            <div className="reports-grid">
              <div className="report-card">
                <div className="report-card-title"><FileText size={20} /> Usuários por plano</div>
                {Object.entries(planCounts).map(([slug, count]) => (
                  <div key={slug} className="report-line">
                    <span>{planDetails[slug]?.name || slug}</span>
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>
              <div className="report-card">
                <div className="report-card-title"><BarChart3 size={20} /> Receita estimada</div>
                <p>{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="report-card report-card--actions">
                <p>Exportar relatórios e planilhas</p>
                <div className="report-actions">
                  <button className="btn-secondary" onClick={exportUsersCsv}><Download size={16} /> Exportar Usuários</button>
                  <button className="btn-secondary" onClick={exportSummaryPdf}><Download size={16} /> Exportar Relatório</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}