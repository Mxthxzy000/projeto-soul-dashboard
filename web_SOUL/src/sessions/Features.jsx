import { BarChart3, Truck, Users, Calendar, Package, FileText } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Dashboards Inteligentes",
    description:
      "Visualize todos os dados do seu negocio em tempo real com graficos interativos e metricas personalizaveis.",
  },
  {
    icon: Truck,
    title: "Gestao de Logistica",
    description:
      "Controle total do transporte, rastreamento de entregas e gestao de frota em uma unica plataforma.",
  },
  {
    icon: Users,
    title: "Gestao de Equipe",
    description:
      "Gerencie funcionarios, controle ponto, escalas e produtividade com facilidade.",
  },
  {
    icon: Calendar,
    title: "Agenda Integrada",
    description:
      "Organize reunioes, tarefas e compromissos com notificacoes automaticas para toda a equipe.",
  },
  {
    icon: Package,
    title: "Controle de Estoque",
    description:
      "Monitore niveis de estoque, alertas de reposicao e historico de movimentacoes.",
  },
  {
    icon: FileText,
    title: "Relatorios Detalhados",
    description:
      "Gere relatorios personalizados com analises financeiras, operacionais e de desempenho.",
  },
]

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Tudo que sua empresa{" "}
            <br className="hidden sm:inline" />
            precisa em{" "}
            <span className="text-accent">um so lugar</span>
          </h2>
          <p className="section-desc">
            Ferramentas poderosas para administracao, logistica e supervisao que
            transformam a gestao do seu negocio.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card"
            >
              <div className="feature-icon">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
