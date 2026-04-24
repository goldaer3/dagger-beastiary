import { Routes, Route } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext'
import ModalRenderer from './components/ModalRenderer'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GenericCategoryPage from './pages/GenericCategoryPage'
import CountriesPage from './pages/CountriesPage'
import SocietiesPage from './pages/SocietiesPage'
import SettingsPage from './pages/SettingsPage'
import SpeciesPage from './pages/SpeciesPage'
import EventsPage from './pages/EventsPage'

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="characters" element={<GenericCategoryPage pageKey="characters" />} />
          <Route path="enemies" element={<GenericCategoryPage pageKey="enemies" />} />
          <Route path="items" element={<GenericCategoryPage pageKey="items" />} />
          <Route path="spells" element={<GenericCategoryPage pageKey="spells" />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="societies" element={<SocietiesPage />} />
          <Route path="locations" element={<GenericCategoryPage pageKey="locations" />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="events" element={<EventsPage />} />
        </Route>
      </Routes>
      <ModalRenderer />
    </ModalProvider>
  )
}

export default App