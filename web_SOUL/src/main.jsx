import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './sessions/Hero.css'
import './sessions/Features.css'
import './sessions/WhyChoose.css'
import './sessions/Portfolio.css'
import './sessions/Pricing.css'
import './sessions/Team.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
