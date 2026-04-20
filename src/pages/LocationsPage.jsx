// src/pages/LocationsPage.jsx
import { useState, useMemo } from 'react'
import locationsData from '../data/locations.json'
import LocationCard from '../components/LocationCard'
import LocationModal from '../components/LocationModal'
import './CategoryPage.css'

const LocationsPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filters, setFilters] = useState({
    type: '',
    region: '',
    climate: ''
  })

  const locations = Array.isArray(locationsData) ? locationsData : []

  const filterOptions = useMemo(() => {
    const types = new Set()
    const regions = new Set()
    const climates = new Set()

    locations.forEach(loc => {
      if (loc.type) types.add(loc.type)
      if (loc.region) regions.add(loc.region)
      if (loc.climate) climates.add(loc.climate)
    })

    return {
      types: Array.from(types).sort(),
      regions: Array.from(regions).sort(),
      climates: Array.from(climates).sort()
    }
  }, [locations])

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      return (
        (!filters.type || loc.type === filters.type) &&
        (!filters.region || loc.region === filters.region) &&
        (!filters.climate || loc.climate === filters.climate)
      )
    })
  }, [locations, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ type: '', region: '', climate: '' })
  }

  return (
    <div className="category-page">
      <h2 className="category-title">
        <span>◈</span> Локации <span>◈</span>
      </h2>

      <div className="filters-panel">
        <div className="filters-row">
          <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
            <option value="">Все типы</option>
            {filterOptions.types.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.region} onChange={e => handleFilterChange('region', e.target.value)}>
            <option value="">Все регионы</option>
            {filterOptions.regions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.climate} onChange={e => handleFilterChange('climate', e.target.value)}>
            <option value="">Любой климат</option>
            {filterOptions.climates.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </div>

      <div className="items-grid">
        {filteredLocations.length > 0 ? (
          filteredLocations.map(loc => (
            <LocationCard
              key={loc.id}
              location={loc}
              onClick={() => setSelectedLocation(loc)}
            />
          ))
        ) : (
          <p className="no-results">Локации не найдены</p>
        )}
      </div>

      {selectedLocation && (
        <LocationModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </div>
  )
}

export default LocationsPage    