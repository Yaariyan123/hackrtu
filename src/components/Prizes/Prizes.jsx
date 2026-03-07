import { motion } from 'framer-motion'
import './Prizes.css'

const prizeData = [
  {
    rank: '2ND PRIZE',
    amount: '$2,500',
    details: 'Mentorship Track + Partner Credits',
  },
  {
    rank: '1ST PRIZE',
    amount: '$5,000',
    details: 'Trophy + Featured Interview + Fast-track Incubation',
  },
  {
    rank: '3RD PRIZE',
    amount: '$1,000',
    details: 'Swag Box + Community Highlight',
  },
]

function Prizes() {
  return (
    <section className="prizes" id="prizes">
      <div className="prizes-bg-grid" />
      <div className="prizes-content">
        <h2 className="prizes-title">PRIZE POOL</h2>
        <p className="prizes-desc">
          Compete for high-impact rewards, direct mentorship access, and spotlight opportunities
          across the builder ecosystem.
        </p>
        <motion.div
          className="prizes-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {prizeData.map((prize, i) => (
            <motion.div
              key={i}
              className={`prize-card prize-${i + 1}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <span className="prize-rank">{prize.rank}</span>
              <span className="prize-amount">{prize.amount}</span>
              <p className="prize-details">{prize.details}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="participation-card">
          <h3 className="participation-title">Participation Certificate</h3>
          <p className="participation-desc">
            Every verified participant receives a digital completion certificate, open-source badge,
            and community contributor profile.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Prizes
