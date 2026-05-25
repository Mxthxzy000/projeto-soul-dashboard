import { Shield, Zap, Clock } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Segurança de Dados",
    description: "Seus dados protegidos com criptografia de ponta à ponta.",
  },
  {
    icon: Zap,
    title: "Alta Performance",
    description: "Sistema rápido e responsivo para máxima produtividade.",
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Automatize processos e reduza trabalho manual.",
  },
]

export function WhyChooseSection() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Por que escolher a{" "}
            <span className="text-accent">S.O.U.L</span>?
          </h2>
        </div>

        <div className="why-grid">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className={`why-card card-animate-left card-hover-lift`} style={{ animationDelay: `${index * 0.14}s` }}>
              <div className="why-icon">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="why-title">
                {benefit.title}
              </h3>
              <p className="why-desc">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
