import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PrizesPage from './pages/PrizesPage'
import ThemesPage from './pages/ThemesPage'
import TimelinePage from './pages/TimelinePage'
import OrganizersPage from './pages/OrganizersPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="prizes" element={<PrizesPage />} />
        <Route path="themes" element={<ThemesPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="organizers" element={<OrganizersPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

export default App
