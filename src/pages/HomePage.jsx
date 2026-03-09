import Mario from "../components/Mario/Mario";
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Prizes from '../components/Prizes/Prizes'
import Themes from '../components/Themes/Themes'
import Timeline from '../components/Timeline/Timeline'
import Organizers from '../components/Organizers/Organizers'
import Contact from '../components/Contact/Contact'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Prizes />
      <Themes />
      <Timeline />
      <Organizers />
      <Contact />
      <Mario/>
    </>
  )
}

export default HomePage
