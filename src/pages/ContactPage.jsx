import { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Contact from '../components/Contact/Contact'

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Contact />
    </>
  )
}

export default ContactPage
