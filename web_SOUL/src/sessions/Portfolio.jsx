import { ExternalLink } from "lucide-react"

const projects = [
  {
    type: "Web Application",
    name: "TitanPower Academia",
    description: "Sistema completo para gestão de academias com controle de alunos, planos e treinos.",
  },
  {
    type: "E-commerce",
    name: "TechForge E-commerce",
    description: "Plataforma de e-commerce robusta com gestão de produtos, pedidos e pagamentos.",
  },
]

export function PortfolioSection() {
  return (
    <section className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>📊</span>
            <span>Nosso Portfólio</span>
          </div>
          <h2 className="section-title">
            Projetos que entregamos
          </h2>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div
              key={project.name}
              className="portfolio-card"
            >
              <div className="portfolio-card-header">
                <span className="portfolio-type">
                  {project.type}
                </span>
                <ExternalLink className="portfolio-link-icon h-5 w-5" />
              </div>
              <h3 className="portfolio-name">
                {project.name}
              </h3>
              <p className="portfolio-desc">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}