import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const [countdown, setCountdown] = useState({ days: 86, hours: 13, minutes: 58 })
  const targetDate = new Date('2026-06-01T00:00:00')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = targetDate - now
      if (diff <= 0) return
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" data-testid="hero">
       <img
        src="https://images.unsplash.com/photo-1657901945977-e41b4091586b?crop=entropy&cs=srgb&fm=jpg&q=85"
        alt="Futuristic city background"
        className="hero-bg"
        data-testid="hero-background-image"
      />
      <div className="hero-overlay" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-bg-pattern" />
      <div className="hero-content">
        <p className="hero-tagline">THE ULTIMATE STUDENT + BUILDER HACKATHON</p>
        <h1 className="hero-title">
          DISRUPT DEV HACKATHON <span className="year">2077</span>
        </h1>
        <p className="hero-slogan">Innovate • Build • Disrupt</p>
        <Link to="/register" className="hero-cta">
          REGISTER
        </Link>
        <div className="hero-countdown">
          <div className="countdown-card">
            <span className="countdown-value">{countdown.days}</span>
            <span className="countdown-label">DAYS</span>
          </div>
          <div className="countdown-card">
            <span className="countdown-value">{countdown.hours}</span>
            <span className="countdown-label">HOURS</span>
          </div>
          <div className="countdown-card">
            <span className="countdown-value">{countdown.minutes}</span>
            <span className="countdown-label">MINUTES</span>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hero