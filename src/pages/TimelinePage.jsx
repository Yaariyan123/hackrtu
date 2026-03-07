import { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Timeline from '../components/Timeline/Timeline'

function TimelinePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Timeline />
    </>
  )
}

export default TimelinePage
