import { motion } from 'framer-motion'
import './About.css'

const cards = [
  {
    title: '24-Hour Build Sprint',
    description:
      'A non-stop product hacking arena where makers convert ideas into usable prototypes under pressure.',
  },
  {
    title: 'Mentors + Live Reviews',
    description:
      'Domain experts guide teams in real-time on architecture, pitch storytelling, and fast experimentation.',
  },
  {
    title: 'Recruiter Spotlight',
    description:
      'Top companies and startup founders scout standout builders with practical solutions and execution speed.',
  },
  {
    title: 'Global Community',
    description:
      'Connect with developers, designers, and product minds from different backgrounds to ship together.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function About() {
  return (
    <section className="about" id="about">
      <div className="about-bg-grid" />
      <div className="about-content">
        <h2 className="about-title">ABOUT THE HACKATHON</h2>
        
        <p className="about-desc">
          This is where speed meets engineering excellence. Build quickly, validate with mentors,
          and present solutions that solve meaningful real-world problems.
        </p>
        <motion.div
          className="about-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="about-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 215, 0, 0.2)' }}
            >
              <h3 className="about-card-title">{card.title}</h3>
              <p className="about-card-desc">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
