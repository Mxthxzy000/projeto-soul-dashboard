import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { WhyChooseSection } from './components/WhyChooseSection'
import { PortfolioSection } from './components/PortfolioSection'
import { PricingSection } from './components/PricingSection'
import { TeamSection } from './components/TeamSection'
import { Footer } from './components/Footer'

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
