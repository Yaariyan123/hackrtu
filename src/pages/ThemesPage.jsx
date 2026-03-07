import { useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Themes from '../components/Themes/Themes'

function ThemesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <Themes />
    </>
  )
}

export default ThemesPage
