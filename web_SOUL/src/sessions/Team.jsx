const team = [
  {
    name: "Luiz Paulo",
    role: "Product Owner / Dev FullStack",
    initials: "LP",
    image: "../luizfoto.png",
    github: "https://github.com/luixppereira"
  },
  {
    name: "Matheus Quirino",
    role: "Scrum Master / Tech Lead",
    initials: "MQ",
    image: "../matheusfoto.png",
    github: "https://github.com/Mxthxzy000"
  },
  {
    name: "Otavio Goncalez",
    role: "Dev FullStack / Systems Analyst",
    initials: "OG",
    image: "../otaviofoto.png",
    github: "https://github.com/OGoncalez"
  },
  {
    name: "Arthur Andrade",
    role: "UI/UX Designer",
    initials: "AA",
    image: "../arthurfoto.png",
    github: "https://github.com/THUrbinando"
  },
]

export function TeamSection() {
  return (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-code">{"</>"}</span>
            <span>Conheça nossa equipe</span>
          </div>
          <h2 className="section-title">
            Quem está por trás do{" "}
            <span className="text-accent">S.O.U.L</span>
          </h2>
          <p className="section-desc">
            Uma equipe apaixonada por tecnologia, criando soluções digitais que
            transformam negócios e impulsionam resultados.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <a
              key={member.name}
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`team-card card-animate-up card-hover-scale`}
              style={{ animationDelay: `${index * 0.12}s` }}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
