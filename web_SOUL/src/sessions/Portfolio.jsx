import { BarChart3 } from "lucide-react"

const projects = [
  {
    type: "Web Application",
    name: "TitanPower Academia",
    description: "Sistema completo para gestão de academias com controle de alunos, planos e treinos.",
    video: "/videotitanpower.mp4",
  },
  {
    type: "E-commerce",
    name: "TechForge E-commerce",
    description: "Plataforma de e-commerce robusta com gestão de produtos, pedidos e pagamentos.",
    video: "/videotechforge.mp4",
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
          {projects.map((project) => (
            <div key={project.name} className="portfolio-card">
              <div className="portfolio-card-header">
                <span className="portfolio-type">
                  {project.type}
                </span>
              </div>

              <h3 className="portfolio-name">
                {project.name}
              </h3>

              <video
                className="portfolio-video"
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
              />

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
