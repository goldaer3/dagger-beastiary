import { useState, useMemo } from 'react'
import enemiesData from '../data/enemies.json'
import EnemyCard from '../components/EnemyCard'
import EnemyModal from '../components/EnemyModal'
import './CategoryPage.css'

const EnemiesPage = () => {
  const [selectedEnemy, setSelectedEnemy] = useState(null)
  const [filters, setFilters] = useState({
    type: '',
    species: '',
    location: '',
    status: '',
    behavior: '',          // новое
    intellect: '',         // новое (выбор конкретного тега)
    society: ''            // новое
  })

  const enemies = Array.isArray(enemiesData) ? enemiesData : []

  const filterOptions = useMemo(() => {
    const types = new Set()
    const species = new Set()
    const locations = new Set()
    const statuses = new Set()
    const behaviors = new Set()
    const intellectTags = new Set()
    const societyTags = new Set()

    enemies.forEach(e => {
      if (e.type) types.add(e.type)
      if (e.species) species.add(e.species)
      if (e.location) {
        (Array.isArray(e.location) ? e.location : [e.location]).forEach(loc => locations.add(loc))
      }
      if (e.status) statuses.add(e.status)
      if (e.behavior) behaviors.add(e.behavior)
      if (e.intellect) {
        e.intellect.forEach(tag => intellectTags.add(tag))
      }
      if (e.society) {
        e.society.forEach(tag => societyTags.add(tag))
      }
    })

    return {
      types: Array.from(types).sort(),
      species: Array.from(species).sort(),
      locations: Array.from(locations).sort(),
      statuses: Array.from(statuses).sort(),
      behaviors: Array.from(behaviors).sort(),
      intellectTags: Array.from(intellectTags).sort(),
      societyTags: Array.from(societyTags).sort()
    }
  }, [enemies])

  const filteredEnemies = useMemo(() => {
    return enemies.filter(e => {
      // базовые фильтры
      const typeMatch = !filters.type || e.type === filters.type
      const speciesMatch = !filters.species || e.species === filters.species
      const locationMatch = !filters.location ||
        (Array.isArray(e.location) ? e.location.includes(filters.location) : e.location === filters.location)
      const statusMatch = !filters.status || e.status === filters.status

      // новые фильтры
      const behaviorMatch = !filters.behavior || e.behavior === filters.behavior
      const intellectMatch = !filters.intellect ||
        (e.intellect && e.intellect.includes(filters.intellect))
      const societyMatch = !filters.society ||
        (e.society && e.society.includes(filters.society))

      return typeMatch && speciesMatch && locationMatch && statusMatch &&
             behaviorMatch && intellectMatch && societyMatch
    })
  }, [enemies, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      species: '',
      location: '',
      status: '',
      behavior: '',
      intellect: '',
      society: ''
    })
  }

  return (
    <div className="category-page">
      <h2 className="category-title">
        <span>◈</span> Мобы <span>◈</span>   {/* заголовок изменён */}
      </h2>

      <div className="filters-panel">
        <div className="filters-row">
          <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
            <option value="">Все типы</option>
            {filterOptions.types.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.species} onChange={e => handleFilterChange('species', e.target.value)}>
            <option value="">Все виды</option>
            {filterOptions.species.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.location} onChange={e => handleFilterChange('location', e.target.value)}>
            <option value="">Все локации</option>
            {filterOptions.locations.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.status} onChange={e => handleFilterChange('status', e.target.value)}>
            <option value="">Любой статус</option>
            {filterOptions.statuses.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="filters-row">
          <select value={filters.behavior} onChange={e => handleFilterChange('behavior', e.target.value)}>
            <option value="">Любое поведение</option>
            {filterOptions.behaviors.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.intellect} onChange={e => handleFilterChange('intellect', e.target.value)}>
            <option value="">Любой интеллект</option>
            {filterOptions.intellectTags.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.society} onChange={e => handleFilterChange('society', e.target.value)}>
            <option value="">Любое общество</option>
            {filterOptions.societyTags.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </div>

      <div className="items-grid">
        {filteredEnemies.length > 0 ? (
          filteredEnemies.map(enemy => (
            <EnemyCard
              key={enemy.id}
              enemy={enemy}
              onClick={() => setSelectedEnemy(enemy)}
            />
          ))
        ) : (
          <p className="no-results">Мобы не найдены</p>
        )}
      </div>

      {selectedEnemy && (
        <EnemyModal
          enemy={selectedEnemy}
          onClose={() => setSelectedEnemy(null)}
          allEnemies={enemies}
          onOpenEnemy={setSelectedEnemy}
        />
      )}
    </div>
  )
}

export default EnemiesPage