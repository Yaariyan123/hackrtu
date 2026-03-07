import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Themes.css'

const themes = [
  {
    title: 'Fintech for All',
    shortDesc: 'Create accessible financial products for emerging and underserved users.',
    fullDesc:
      'Think copilots for learning, code quality, operations, or content systems that improve decision making in real time.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
  },
  {
    title: 'Healthtech Next',
    shortDesc: 'Transform diagnostics, patient engagement, and medical workflows.',
    fullDesc:
      'Build tools that bridge the gap between healthcare providers and patients, enabling better outcomes through technology.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop',
  },
  {
    title: 'AI x Humans',
    shortDesc: 'Build tools where humans stay in control while AI scales creativity.',
    fullDesc:
      'Think copilots for learning, code quality, operations, or content systems that improve decision making in real time.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
  },
  {
    title: 'Climate Tech',
    shortDesc: 'Solutions that connect to meaningful sustainability outcomes.',
    fullDesc:
      'Build products that help measure, reduce, or offset carbon and drive environmental impact at scale.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop',
  },
  {
    title: 'Web3 & DeFi',
    shortDesc: 'Decentralized systems that enable trust and transparency.',
    fullDesc:
      'Create protocols and interfaces that make blockchain accessible and useful for real-world applications.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
  },
]

function Themes() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section className="themes" id="themes">
      <div className="themes-bg-grid" />
      <div className="themes-content">
        <h2 className="themes-title">HACK THEMES</h2>
        <p className="themes-desc">
          Pick a challenge track and go deep. Click any card to expand details.
        </p>
        <p className="themes-subdesc">
          The stream keeps moving until your team locks in a direction.
        </p>

        <div className="themes-carousel-wrapper">
          <motion.div
            className="themes-carousel"
            animate={{ x: [0, -1200] }}
            transition={{
              x: { repeat: Infinity, repeatType: 'loop', duration: 20, ease: 'linear' },
            }}
          >
            {[...themes, ...themes].map((theme, i) => (
              <motion.div
                key={`${theme.title}-${i}`}
                className={`theme-card ${expanded === theme.title && i < themes.length ? 'active' : ''}`}
                onClick={() => setExpanded(expanded === theme.title ? null : theme.title)}
                whileHover={{ scale: 1.03 }}
              >
                <div className="theme-card-image">
                  <img src={theme.image} alt={theme.title} />
                </div>
                <h3 className="theme-card-title">{theme.title}</h3>
                <p className="theme-card-desc">{theme.shortDesc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="theme-expanded"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              {themes
                .filter((t) => t.title === expanded)
                .map((theme) => (
                  <div key={theme.title}>
                    <h3 className="theme-expanded-title">{theme.title}</h3>
                    <p className="theme-expanded-desc">{theme.fullDesc}</p>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Themes
