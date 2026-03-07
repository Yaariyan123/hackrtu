import { motion } from 'framer-motion'
import './Organizers.css'

const leadOrganizers = [
  { name: 'Aisha Verma', role: 'Program Director', initial: 'A' },
  { name: 'Rohan Iyer', role: 'Tech Lead', initial: 'R' },
  { name: 'Mira Kapoor', role: 'Community Head', initial: 'M' },
]

const organizingTeam = [
  { name: 'Nikhil', role: 'Operations' },
  { name: 'Zara', role: 'Partnerships' },
  { name: 'Arjun', role: 'Platform' },
  { name: 'Fatima', role: 'Events' },
  { name: 'Kabir', role: 'Marketing' },
  { name: 'Sana', role: 'Design' },
]

function Organizers() {
  return (
    <section className="organizers" id="organizers">
      <div className="organizers-bg-grid" />
      <div className="organizers-content">
        <h2 className="organizers-title">ORGANIZERS</h2>
        <p className="organizers-desc">
          Built by a focused team that runs engineering, partnerships, and community operations at
          scale.
        </p>

        <h3 className="organizers-subtitle">Lead Organizers</h3>
        <motion.div
          className="organizers-lead"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {leadOrganizers.map((person, i) => (
            <motion.div
              key={i}
              className="organizer-card lead-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="organizer-avatar">{person.initial}</div>
              <h4 className="organizer-name">{person.name}</h4>
              <p className="organizer-role">{person.role}</p>
            </motion.div>
          ))}
        </motion.div>

        <h3 className="organizers-subtitle">Organizing Team</h3>
        <motion.div
          className="organizers-team"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          {organizingTeam.map((person, i) => (
            <motion.div
              key={i}
              className="organizer-card team-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h4 className="organizer-name">{person.name}</h4>
              <p className="organizer-role">{person.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Organizers
