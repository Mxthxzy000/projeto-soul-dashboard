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
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhyChooseSection />
        <PortfolioSection />
        <PricingSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  )
}

export default App