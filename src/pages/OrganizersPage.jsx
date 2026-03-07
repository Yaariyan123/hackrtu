import { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Organizers from '../components/Organizers/Organizers'

function OrganizersPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Organizers />
    </>
  )
}

export default OrganizersPage
