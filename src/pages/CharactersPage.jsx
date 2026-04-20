import { useState, useMemo } from 'react'
import { useModal } from '../context/ModalContext'
import charactersData from '../data/characters.json'
import CharacterCard from '../components/CharacterCard'
import './CategoryPage.css'

const CharactersPage = () => {
  const { openModal } = useModal()
  const [filters, setFilters] = useState({
    race: '',
    class: '',
    subclass: '',
    origin: '',
    session: '',
    kingdom: '',
    society: '',
    alignment: ''
  })

  const characters = Array.isArray(charactersData) ? charactersData : []

  const filterOptions = useMemo(() => {
    const options = {
      race: new Set(),
      class: new Set(),
      subclass: new Set(),
      origin: new Set(),
      session: new Set(),
      kingdom: new Set(),
      society: new Set(),
      alignment: new Set()
    }
    characters.forEach(char => {
      if (char.race) options.race.add(char.race)
      if (char.class) options.class.add(char.class)
      if (char.subclass) options.subclass.add(char.subclass)
      if (char.origin) options.origin.add(char.origin)
      if (char.session) options.session.add(char.session)
      if (char.kingdom) options.kingdom.add(char.kingdom)
      if (char.society) {
        const societies = Array.isArray(char.society) ? char.society : [char.society]
        societies.forEach(s => s && options.society.add(s))
      }
      if (char.alignment) options.alignment.add(char.alignment)
    })
    return {
      race: Array.from(options.race).sort(),
      class: Array.from(options.class).sort(),
      subclass: Array.from(options.subclass).sort(),
      origin: Array.from(options.origin).sort(),
      session: Array.from(options.session).sort(),
      kingdom: Array.from(options.kingdom).sort(),
      society: Array.from(options.society).sort(),
      alignment: Array.from(options.alignment).sort()
    }
  }, [characters])

  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      return (
        (!filters.race || char.race === filters.race) &&
        (!filters.class || char.class === filters.class) &&
        (!filters.subclass || char.subclass === filters.subclass) &&
        (!filters.origin || char.origin === filters.origin) &&
        (!filters.session || char.session === filters.session) &&
        (!filters.kingdom || char.kingdom === filters.kingdom) &&
        (!filters.society || (Array.isArray(char.society) ? char.society.includes(filters.society) : char.society === filters.society)) &&
        (!filters.alignment || char.alignment === filters.alignment)
      )
    })
  }, [characters, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      race: '',
      class: '',
      subclass: '',
      origin: '',
      session: '',
      kingdom: '',
      society: '',
      alignment: ''
    })
  }

  return (
    <div className="category-page">
      <h2 className="category-title">
        <span>◈</span> Персонажи <span>◈</span>
      </h2>

      <div className="filters-panel">
        <div className="filters-row">
          <select value={filters.race} onChange={e => handleFilterChange('race', e.target.value)}>
            <option value="">Все расы</option>
            {filterOptions.race.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.class} onChange={e => handleFilterChange('class', e.target.value)}>
            <option value="">Все классы</option>
            {filterOptions.class.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.subclass} onChange={e => handleFilterChange('subclass', e.target.value)}>
            <option value="">Все подклассы</option>
            {filterOptions.subclass.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.origin} onChange={e => handleFilterChange('origin', e.target.value)}>
            <option value="">Все происхождения</option>
            {filterOptions.origin.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="filters-row">
          <select value={filters.session} onChange={e => handleFilterChange('session', e.target.value)}>
            <option value="">Все сессии</option>
            {filterOptions.session.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.kingdom} onChange={e => handleFilterChange('kingdom', e.target.value)}>
            <option value="">Все королевства</option>
            {filterOptions.kingdom.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.society} onChange={e => handleFilterChange('society', e.target.value)}>
            <option value="">Все общества</option>
            {filterOptions.society.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.alignment} onChange={e => handleFilterChange('alignment', e.target.value)}>
            <option value="">Все мировоззрения</option>
            {filterOptions.alignment.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </div>

      <div className="characters-grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => openModal('character', character.id, character)}
            />
          ))
        ) : (
          <p className="no-results">Персонажи не найдены</p>
        )}
      </div>
    </div>
  )
}

export default CharactersPage