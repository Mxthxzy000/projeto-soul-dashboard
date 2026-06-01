import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Header } from "../components/Header.jsx"
import { Footer } from "../components/Footer.jsx"
import { supabase } from "../lib/supabase.js"

// ── MÁSCARAS ──
function maskCPF(value) {
  value = value.replace(/\D/g, "").slice(0, 11)
  return value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

function maskCNPJ(value) {
  value = value.replace(/\D/g, "").slice(0, 14)
  return value
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
}

function maskPhone(value) {
  value = value.replace(/\D/g, "").slice(0, 11)
  if (value.length <= 10) {
    return value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
  }
  return value.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3")
}

function capitalizeName(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nextParam = searchParams.get('next') || null
  const [form, setForm] = useState({
    email: "",
    password: "",
    nome: "",
    cpf: "",
    cnpj: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mode, setMode] = useState("login") // "login" ou "signup"

  // NOVA REGRA: Redireciona imediatamente se já estiver logado
  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/conta");
      }
    };
    checkUserStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target
    let newValue = value

    if (name === "cpf") newValue = maskCPF(value)
    else if (name === "cnpj") newValue = maskCNPJ(value)
    else if (name === "phone") newValue = maskPhone(value)

    setForm((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleNomeBlur = () => {
    setForm((prev) => ({ ...prev, nome: capitalizeName(prev.nome) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Limpa pontuação antes de enviar
    const cpfNumerico = form.cpf.replace(/\D/g, "")
    const cnpjNumerico = form.cnpj.replace(/\D/g, "")
    const phoneNumerico = form.phone.replace(/\D/g, "")

    try {
      if (mode === "login") {
        const { data: usuario, error: usuarioError } = await supabase
          .from("usuario")
          .select("status")
          .eq("email", form.email)
          .maybeSingle()

        if (usuarioError) {
          console.warn("Erro ao verificar status do usuário:", usuarioError.message)
        }

        if (usuario?.status === "blocked") {
          setError("Conta bloqueada. Entre em contato com o suporte.")
          setLoading(false)
          return
        }

        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })

        if (authError) {
          setError(authError.message || "Erro ao fazer login")
          setLoading(false)
          return
        }
        Swal.fire({
          icon: "success",
          title: "Login efetuado!",
          text: "Redirecionando...",
          timer: 1200,
          showConfirmButton: false,
        }).then(() => navigate(nextParam || "/conta"))
      } else {
        // Validações de cadastro
        if (!cpfNumerico || cpfNumerico.length !== 11) {
          setError("CPF inválido. Certifique-se de digitar 11 dígitos.")
          setLoading(false)
          return
        }
        if (cnpjNumerico && cnpjNumerico.length !== 14) {
          setError("CNPJ inválido. Deve ter 14 dígitos.")
          setLoading(false)
          return
        }

        // Cadastro
        const { data, error: signupError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              nome: capitalizeName(form.nome),
              cpf: cpfNumerico,
              cnpj: cnpjNumerico || "",
              phone: phoneNumerico || "",
            },
          },
        })

        if (signupError) {
          if (
            signupError.message.includes("duplicate key") &&
            signupError.message.includes("cpf")
          ) {
            setError("Este CPF já está cadastrado.")
          } else if (
            signupError.message.includes("duplicate key") &&
            signupError.message.includes("cnpj")
          ) {
            setError("Este CNPJ já está cadastrado.")
          } else {
            setError(signupError.message || "Erro ao registrar")
          }
          setLoading(false)
          return
        }

        if (data?.user) {
          await supabase.from("usuario").upsert([
            {
              id: data.user.id,
              email: form.email,
              nome: capitalizeName(form.nome),
              cpf: cpfNumerico,
              cnpj: cnpjNumerico || "",
              phone: phoneNumerico || "",
              status: "active",
              plan_slug: null,
              subscription_start: null,
              next_billing: null,
              payment_method: null,
              invoices: [],
            },
          ])
        }

        // Se o email de confirmação estiver desabilitado, a sessão é retornada
        if (data.session) {
          // Login automático
          Swal.fire({
            icon: "success",
            title: "Conta criada!",
            text: "Bem-vindo ao Soul Dashboard.",
            timer: 1200,
            showConfirmButton: false,
          }).then(() => navigate(nextParam || "/conta"))
        } else {
          // Fallback: confirmação de email ainda ativa
          setError("")
          setMode("login")
          setForm({ email: form.email, password: "", nome: "", cpf: "", cnpj: "", phone: "" })
          Swal.fire({
            icon: "success",
            title: "Cadastro realizado!",
            text: "Faça login com suas credenciais.",
            confirmButtonColor: "#3085d6",
          })
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro inesperado",
        text: "Tente novamente mais tarde.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="login-main">
        <div className="container">
          <div className="login-card">
            <h2>{mode === "login" ? "Entrar" : "Cadastro"}</h2>
            <p>
              {mode === "login"
                ? "Faça login para acessar sua conta e dados de faturamento."
                : "Preencha os dados para criar sua conta."}
            </p>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              {mode === "signup" && (
                <>
                  <label>Nome</label>
                  <input
                    name="nome"
                    type="text"
                    value={form.nome}
                    onChange={handleChange}
                    onBlur={handleNomeBlur}
                    placeholder="Seu nome completo"
                    required
                  />

                  <label>CPF</label>
                  <input
                    name="cpf"
                    type="text"
                    value={form.cpf}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />

                  <label>CNPJ (opcional)</label>
                  <input
                    name="cnpj"
                    type="text"
                    value={form.cnpj}
                    onChange={handleChange}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                  />

                  <label>Telefone (opcional)</label>
                  <input
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(12) 99999-9999"
                    maxLength={15}
                  />
                </>
              )}

              <label>E-mail</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />

              <label>Senha</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />

              <div className="login-actions">
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
                <button className="btn-primary" type="submit" disabled={loading}>
                  {loading
                    ? "Processando..."
                    : mode === "login"
                    ? "Entrar"
                    : "Cadastrar"}
                </button>
              </div>
              {mode === "login" && (
                <div className="login-forgot">
                  <button type="button" className="toggle-btn" onClick={() => navigate("/forgot-password")}>Esqueci minha senha</button>
                </div>
              )}
            </form>

            <div className="login-toggle">
              {mode === "login" ? (
                <p>
                  Não tem conta?{" "}
                  <button
                    className="toggle-btn"
                    onClick={() => {
                      setMode("signup")
                      setError("")
                      setForm({ email: "", password: "", nome: "", cpf: "", cnpj: "", phone: "" })
                    }}
                  >
                    Cadastre-se aqui
                  </button>
                </p>
              ) : (
                <p>
                  Já tem conta?{" "}
                  <button
                    className="toggle-btn"
                    onClick={() => {
                      setMode("login")
                      setError("")
                      setForm({ email: "", password: "", nome: "", cpf: "", cnpj: "", phone: "" })
                    }}
                  >
                    Faça login
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default LoginPage