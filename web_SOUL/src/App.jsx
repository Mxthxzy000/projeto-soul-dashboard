// src/App.jsx
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Header } from './components/Header.jsx'
import { HeroSection } from './sessions/Hero.jsx'
import { FeaturesSection } from './sessions/Features.jsx'
import { WhyChooseSection } from './sessions/WhyChoose.jsx'
import { PortfolioSection } from './sessions/Portfolio.jsx'
import { PricingSection } from './sessions/Pricing.jsx'
import { TeamSection } from './sessions/Team.jsx'
import { Footer } from './components/Footer.jsx'
import { CheckoutPage } from './sessions/Checkout.jsx'
import { AccountPage } from './sessions/Account.jsx'

function HomePage() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/conta" element={<AccountPage />} />
    </Routes>
  )
}

export default App
