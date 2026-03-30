import { BarChart3, Truck, Users, Calendar, Package, FileText } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Dashboards Inteligentes",
    description: "Visualize todos os dados do seu negócio em tempo real com gráficos interativos e métricas personalizáveis.",
  },
  {
    icon: Truck,
    title: "Gestão de Logística",
    description: "Controle total do transporte, rastreamento de entregas e gestão de frota em uma única plataforma.",
  },
  {
    icon: Users,
    title: "Gestão de Equipe",
    description: "Gerencie funcionários, controle ponto, escalas e produtividade com facilidade.",
  },
  {
    icon: Calendar,
    title: "Agenda Integrada",
    description: "Organize reuniões, tarefas e compromissos com notificações automáticas para toda a equipe.",
  },
  {
    icon: Package,
    title: "Controle de Estoque",
    description: "Monitore níveis de estoque, alertas de reposição e histórico de movimentações.",
  },
  {
    icon: FileText,
    title: "Relatórios Detalhados",
    description: "Gere relatórios personalizados com análises financeiras, operacionais e de desempenho.",
  },
]

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Tudo que sua empresa precisa em{" "}
            <span className="text-accent">um só lugar</span>
          </h2>
          <p className="section-desc">
            Ferramentas poderosas para administração, logística e supervisão que
            transformam a gestão do seu negócio.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={24} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
