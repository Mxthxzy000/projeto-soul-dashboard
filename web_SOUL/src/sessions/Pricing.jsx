import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Essencial",
    description: "Ideal para pequenas empresas que estao comecando a digitalizar sua gestao.",
    price: "250",
    features: [
      "Dashboard basico",
      "Gestao de estoque",
      "Controle de funcionarios",
      "Agenda integrada",
      "Relatorios mensais",
      "Suporte por email",
    ],
    cta: "Comecar Agora",
    popular: false,
    slug: "essencial",
  },
  {
    name: "Profissional",
    description: "Para empresas em crescimento que precisam de recursos avancados.",
    price: "600",
    features: [
      "Tudo do plano Essencial",
      "Gestao de logistica",
      "Controle financeiro completo",
      "Relatorios personalizados",
      "Multi-usuarios (ate 10)",
      "Suporte prioritario",
      "Integracoes basicas",
      "App mobile",
    ],
    cta: "Escolher Profissional",
    popular: true,
    slug: "profissional",
  },
  {
    name: "Enterprise",
    description: "Solucao completa para grandes empresas e industrias.",
    price: "1.250",
    features: [
      "Tudo do plano Profissional",
      "Usuarios ilimitados",
      "API personalizada",
      "Integracoes avancadas",
      "Treinamento da equipe",
      "Gerente de conta dedicado",
      "SLA garantido",
      "Customizacoes exclusivas",
      "Backup em tempo real",
    ],
    cta: "Falar com Vendas",
    popular: false,
    slug: "enterprise",
  },
]

export function PricingSection() {
  return (
    <section className="pricing-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Planos que cabem no seu{" "}
            <span className="text-accent">orcamento</span>
          </h2>
          <p className="section-desc">
            Escolha o plano ideal para o tamanho da sua empresa. Todos incluem
            atualizacoes gratuitas e suporte tecnico.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Star className="h-3 w-3 fill-current" />
                  Mais Popular
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">
                  {plan.name}
                </h3>
                <p className="plan-desc">
                  {plan.description}
                </p>
              </div>

              <div className="plan-price">
                <span className="price-currency">R$</span>
                <span className="price-value">{plan.price}</span>
                <span className="price-period">/mês</span>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature} className="plan-feature">
                    <Check className="feature-check h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`plan-cta ${plan.popular ? "plan-cta--popular" : ""}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          Precisa de um plano personalizado?{" "}
          <a href="mailto:contato@bitlayer.com" className="pricing-link">
            Entre em contato
          </a>
        </p>
      </div>
    </section>
  )
}
