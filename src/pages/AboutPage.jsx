import { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <About />
    </>
  )
}

export default AboutPage
