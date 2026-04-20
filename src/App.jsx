import { Routes, Route } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext'
import ModalRenderer from './components/ModalRenderer'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CharactersPage from './pages/CharactersPage'
import EnemiesPage from './pages/EnemiesPage'
import ItemsPage from './pages/ItemsPage'
import SpellsPage from './pages/SpellsPage'
import CountriesPage from './pages/CountriesPage'
import SocietiesPage from './pages/SocietiesPage'
import LocationsPage from './pages/LocationsPage'
import SettingsPage from './pages/SettingsPage'
import SpeciesPage from './pages/SpeciesPage'
import EventsPage from './pages/EventsPage'




function App() {
  return (
    <ModalProvider>
      <Routes>
          <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
          <Route path="characters" element={<CharactersPage />} />
           <Route path="enemies" element={<EnemiesPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="spells" element={<SpellsPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="societies" element={<SocietiesPage />} />
          <Route path="locations" element={<LocationsPage />} />
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