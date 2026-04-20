import { useState, useMemo } from 'react'
import itemsData from '../data/items.json'
import ItemCard from '../components/ItemCard'
import ItemModal from '../components/ItemModal'
import './CategoryPage.css'

const ItemsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [filters, setFilters] = useState({
    type: '',
    society: ''
  })

  const items = Array.isArray(itemsData) ? itemsData : []

  const filterOptions = useMemo(() => {
    const types = new Set()
    const societies = new Set()
    items.forEach(item => {
      if (item.type) {
        (Array.isArray(item.type) ? item.type : [item.type]).forEach(t => types.add(t))
      }
      if (item.relatedSociety) {
        (Array.isArray(item.relatedSociety) ? item.relatedSociety : [item.relatedSociety])
          .forEach(s => s && societies.add(s))
      }
    })
    return {
      types: Array.from(types).sort(),
      societies: Array.from(societies).sort()
    }
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const typeMatch = !filters.type || (
        Array.isArray(item.type) ? item.type.includes(filters.type) : item.type === filters.type
      )
      const societyMatch = !filters.society || (
        Array.isArray(item.relatedSociety)
          ? item.relatedSociety.includes(filters.society)
          : item.relatedSociety === filters.society
      )
      return typeMatch && societyMatch
    })
  }, [items, filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => setFilters({ type: '', society: '' })

  return (
    <div className="category-page">
      <h2 className="category-title">
        <span>◈</span> Предметы <span>◈</span>
      </h2>

      <div className="filters-panel">
        <div className="filters-row">
          <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)}>
            <option value="">Все типы</option>
            {filterOptions.types.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.society} onChange={e => handleFilterChange('society', e.target.value)}>
            <option value="">Все общества</option>
            {filterOptions.societies.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </div>

      <div className="items-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))
        ) : (
          <p className="no-results">Предметы не найдены</p>
        )}
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}

export default ItemsPage