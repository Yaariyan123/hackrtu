import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    date: 'MAY 05, 2026',
    title: 'Registration Opens',
    description: 'Applications open worldwide with team matching and idea board enabled.',
  },
  {
    date: 'MAY 20, 2026',
    title: 'Shortlist Announcement',
    description: 'Selected teams receive challenge briefs and mentor office-hour slots.',
  },
  {
    date: 'JUNE 01, 2026',
    title: 'Hackathon Day',
    description: '24-hour sprint starts. Live mentor checkpoints and dev streams go on.',
  },
  {
    date: 'JUNE 02, 2026',
    title: 'Finale Day',
    description: 'Top finalists pitch live to judges and the winners are crowned.',
  },
]

function Timeline() {
  const barRef = useRef(null)
  const circleRef = useRef(null)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const circle = circleRef.current
    if (!section || !circle) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 30%',
        end: 'bottom 70%',
        scrub: 1,
      },
    })
    tl.to(circle, {
      top: '100%',
      ease: 'none',
    })
  }, [])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (cards.length === 0) return

    const updateActive = () => {
      const vh = window.innerHeight * 0.35
      let current = 0
      cards.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= vh) current = i
      })
      setActiveIndex(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  return (
    <section className="timeline" id="timeline" ref={sectionRef}>
      <div className="timeline-bg-grid" />
      <div className="timeline-content">
        <h2 className="timeline-title">TIMELINE</h2>
        <p className="timeline-desc">
          Track every milestone, from registrations to the final showdown.
        </p>

        <div className="timeline-layout">
          <div className="timeline-bar-wrapper" ref={barRef}>
            <div className="timeline-bar" />
            <div className="timeline-circle" ref={circleRef} />
          </div>

          <div className="timeline-cards">
            {events.map((event, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                data-index={i}
                className={`timeline-card ${i === activeIndex ? 'timeline-card-active' : ''} ${i > activeIndex ? 'timeline-card-below' : ''}`}
              >
                <span className="timeline-card-date">{event.date}</span>
                <h3 className="timeline-card-title">{event.title}</h3>
                <p className="timeline-card-desc">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline
