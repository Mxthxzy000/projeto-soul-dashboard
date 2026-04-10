// src/App.jsx
import { Header } from './components/Header.jsx'
import { HeroSection } from './sessions/Hero.jsx'
import { FeaturesSection } from './sessions/Features.jsx'
import { WhyChooseSection } from './sessions/WhyChoose.jsx'
import { PortfolioSection } from './sessions/Portfolio.jsx'
import { PricingSection } from './sessions/Pricing.jsx'
import { TeamSection } from './sessions/Team.jsx'
import { Footer } from './components/Footer.jsx'

function App() {
  // Funcao para scroll suave para secao
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Header onNavigate={scrollToSection} />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <FeaturesSection />
        <WhyChooseSection />
        <section id="sobre">
          <TeamSection />
        </section>
        <PortfolioSection />
        <section id="planos">
          <PricingSection />
        </section>
      </main>
      <Footer onNavigate={scrollToSection} />
    </>
  )
}

export default App
