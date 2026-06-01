import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { supabase } from "../lib/supabase.js"

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Falha ao enviar",
        text: error.message || "Não foi possível enviar o link de recuperação.",
      })
      setLoading(false)
      return
    }

    Swal.fire({
      icon: "success",
      title: "Verifique seu e-mail",
      text: "Enviamos um link para redefinir sua senha.",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      setLoading(false)
      navigate("/login")
    })
  }

  return (
    <>
      <Header />
      <main className="login-main">
        <div className="container">
          <div className="login-card">
            <h2>Recuperar senha</h2>
            <p>Digite o e-mail associado à sua conta para receber um link de redefinição.</p>
            <form onSubmit={handleSubmit} className="login-form">
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
              <div className="login-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => navigate("/login")}
                >
                  Voltar
                </button>
                <button className="btn-primary" type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
