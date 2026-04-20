import { useState, useMemo } from 'react'
import spellsData from '../data/spells.json'
import SpellCard from '../components/SpellCard'
import SpellModal from '../components/SpellModal'
import './CategoryPage.css'

const SpellsPage = () => {
  const [selectedSpell, setSelectedSpell] = useState(null)
  const [filters, setFilters] = useState({
    type: '',
    school: '',
    difficulty: '',
    applicationMethod: ''   // новый фильтр
  })

  const spells = Array.isArray(spellsData) ? spellsData : []

  const filterOptions = useMemo(() => {
    const types = new Set()
    const schools = new Set()
    const difficulties = new Set()
    const methods = new Set()   // для способа применения
    spells.forEach(s => {
      if (s.type) types.add(s.type)
      if (s.school) schools.add(s.school)
      if (s.difficulty) difficulties.add(s.difficulty)
      if (s.applicationMethod) methods.add(s.applicationMethod)
    })
    return {
      types: Array.from(types).sort(),
      schools: Array.from(schools).sort(),
      difficulties: Array.from(difficulties).sort(),
      methods: Array.from(methods).sort()
    }
  }, [spells])

  const filteredSpells = useMemo(() => {
    return spells.filter(s => {
      return (
        (!filters.type || s.type === filters.type) &&
        (!filters.school || s.school === filters.school) &&
        (!filters.difficulty || s.difficulty === filters.difficulty) &&
        (!filters.applicationMethod || s.applicationMethod === filters.applicationMethod)
      )
    })
  }, [spells, filters])

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }))
  const clearFilters = () => setFilters({ type: '', school: '', difficulty: '', applicationMethod: '' })

  return (
    <div className="category-page">
      <h2 className="category-title">
        <span>◈</span> Магия <span>◈</span>
      </h2>

      <div className="filters-panel">
        <div className="filters-row">
          <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
            <option value="">Все типы</option>
            {filterOptions.types.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.school} onChange={e => handleFilterChange('school', e.target.value)}>
            <option value="">Все школы</option>
            {filterOptions.schools.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.difficulty} onChange={e => handleFilterChange('difficulty', e.target.value)}>
            <option value="">Любая сложность</option>
            {filterOptions.difficulties.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.applicationMethod} onChange={e => handleFilterChange('applicationMethod', e.target.value)}>
            <option value="">Все способы</option>
            {filterOptions.methods.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </div>

      <div className="items-grid">
        {filteredSpells.length > 0 ? (
          filteredSpells.map(spell => (
            <SpellCard key={spell.id} spell={spell} onClick={() => setSelectedSpell(spell)} />
          ))
        ) : (
          <p className="no-results">Заклинания не найдены</p>
        )}
      </div>

      {selectedSpell && (
        <SpellModal spell={selectedSpell} onClose={() => setSelectedSpell(null)} />
      )}
    </div>
  )
}

export default SpellsPage