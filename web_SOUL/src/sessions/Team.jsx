const team = [
  {
    name: "Luiz Paulo",
    role: "Full Stack Developer",
    initials: "LP"
  },
  {
    name: "Matheus Quirino",
    role: "Backend Developer",
    initials: "MQ"
  },
  {
    name: "Otavio Gonçalez",
    role: "Frontend Developer",
    initials: "OG"
  },
  {
    name: "Arthur Andrade",
    role: "UI/UX Designer",
    initials: "AA"
  },
]

export function TeamSection() {
  return (
    <section id="equipe" className="team-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-code">&lt;/&gt;</span>
            <span>Conheça nossa equipe</span>
          </div>
          <h2 className="section-title">
            Somos a{" "}
            <span className="text-accent">BitLayer</span>
          </h2>
          <p className="section-desc">
            Uma equipe apaixonada por tecnologia, criando soluções digitais que
            transformam negócios e impulsionam resultados.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <div
              key={member.name}
              className="team-card"
            >
              <div className="team-avatar">
                {member.initials}
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}