import { ExternalLink, BarChart3 } from "lucide-react"

const projects = [
  {
    type: "Web Application",
    name: "TitanPower Academia",
    description: "Sistema completo para gestao de academias com controle de alunos, planos e treinos.",
    link: null,
  },
  {
    type: "E-commerce",
    name: "TechForge E-commerce",
    description: "Plataforma de e-commerce robusta com gestao de produtos, pedidos e pagamentos.",
    link: "https://github.com/Mxthxzy000/techforge-ecommerce",
  },
]

export function PortfolioSection() {
  return (
    <section className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <BarChart3 className="h-4 w-4" />
            <span>Nosso Portfolio</span>
          </div>
          <h2 className="section-title">
            Projetos que entregamos
          </h2>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => {
            const CardWrapper = project.link ? 'a' : 'div'
            const cardProps = project.link ? {
              href: project.link,
              target: "_blank",
              rel: "noopener noreferrer"
            } : {}
            
            return (
              <CardWrapper
                key={project.name}
                className={`portfolio-card ${project.link ? 'portfolio-card--clickable' : ''}`}
                {...cardProps}
              >
                <div className="portfolio-card-header">
                  <span className="portfolio-type">
                    {project.type}
                  </span>
                  {project.link && <ExternalLink className="portfolio-link-icon h-5 w-5" />}
                </div>
                <h3 className="portfolio-name">
                  {project.name}
                </h3>
                <p className="portfolio-desc">
                  {project.description}
                </p>
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
