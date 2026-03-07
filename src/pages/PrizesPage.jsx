import { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Prizes from '../components/Prizes/Prizes'

function PrizesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Prizes />
    </>
  )
}

export default PrizesPage
