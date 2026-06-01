import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { supabase } from "../lib/supabase.js"

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionExists, setSessionExists] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSessionFromUrl({ url: window.location.href })
      if (!error && session?.user) {
        setSessionExists(true)
        return
      }

      const { data: { session: existingSession }, error: sessionError } = await supabase.auth.getSession()
      if (!sessionError && existingSession?.user) {
        setSessionExists(true)
      }
    }

    checkSession()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    if (!sessionExists) {
      Swal.fire({
        icon: "warning",
        title: "Sessão inválida",
        text: "Acesse o link enviado por e-mail para redefinir a senha.",
      })
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.updateUser({ password })

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Não foi possível atualizar",
        text: error.message || "Tente novamente mais tarde.",
      })
      setLoading(false)
      return
    }

    Swal.fire({
      icon: "success",
      title: "Senha atualizada",
      text: "Sua senha foi redefinida com sucesso.",
      confirmButtonColor: "#3085d6",
    }).then(() => navigate("/login"))
  }

  return (
    <>
      <Header />
      <main className="login-main">
        <div className="container">
          <div className="login-card">
            <h2>Redefinir senha</h2>
            {sessionExists ? (
              <>
                <p>Digite sua nova senha para continuar.</p>
                <form onSubmit={handleSubmit} className="login-form">
                  <label>Senha</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
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
                      {loading ? "Atualizando..." : "Redefinir senha"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <p>Estamos verificando sua sessão de recuperação. Caso não tenha recebido o link, peça novamente na página de recuperação de senha.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
