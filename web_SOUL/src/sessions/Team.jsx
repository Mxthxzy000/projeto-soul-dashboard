const team = [
  {
    name: "Luiz Paulo",
    role: "Full Stack Developer",
    initials: "LP",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Matheus Quirino",
    role: "Backend Developer",
    initials: "MQ",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Otavio Goncalez",
    role: "Frontend Developer",
    initials: "OG",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  {
    name: "Arthur Andrade",
    role: "UI/UX Designer",
    initials: "AA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
  },
]

export function TeamSection() {
  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-code">{"</>"}</span>
            <span>Conheca nossa equipe</span>
          </div>
          <h2 className="section-title">
            Somos a{" "}
            <span className="text-accent">BitLayer</span>
          </h2>
          <p className="section-desc">
            Uma equipe apaixonada por tecnologia, criando solucoes digitais que
            transformam negocios e impulsionam resultados.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <div
              key={member.name}
              className="team-card"
            >
              <div className="team-avatar">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  member.initials
                )}
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
