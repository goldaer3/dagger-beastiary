// src/pages/LocationsPage.jsx
import { useState, useMemo } from 'react';
import { useModal } from '../context/ModalContext';
import locationsData from '../data/locations.json';
import LocationCard from '../components/LocationCard';
import './CategoryPage.css';

const LocationsPage = () => {
  const { openModal } = useModal();
  const [filters, setFilters] = useState({
    type: '',
    rarity: '',
    danger: ''
  });

  const locations = Array.isArray(locationsData) ? locationsData : [];

  const filterOptions = useMemo(() => {
    const types = new Set();
    const rarities = new Set();
    const dangers = new Set();

    locations.forEach(loc => {
      if (loc.type) types.add(loc.type);
      if (loc.rarity) rarities.add(loc.rarity);
      if (loc.danger) dangers.add(loc.danger);
    });

    return {
      types: Array.from(types).sort(),
      rarities: Array.from(rarities).sort(),
      dangers: Array.from(dangers).sort((a, b) => {
        // Сортировка опасности по возрастанию (Низкая, Средняя, Высокая...)
        const order = { 'Низкая': 1, 'Средняя': 2, 'Высокая': 3 };
        return (order[a] || 99) - (order[b] || 99);
      })
    };
  }, [locations]);

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      return (
        (!filters.type || loc.type === filters.type) &&
        (!filters.rarity || loc.rarity === filters.rarity) &&
        (!filters.danger || loc.danger === filters.danger)
      );
    });
  }, [locations, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ type: '', rarity: '', danger: '' });
  };

  const handleLocationClick = (location) => {
    openModal('location', location.id, location);
  };

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
          <select value={filters.rarity} onChange={e => handleFilterChange('rarity', e.target.value)}>
            <option value="">Любая редкость</option>
            {filterOptions.rarities.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select value={filters.danger} onChange={e => handleFilterChange('danger', e.target.value)}>
            <option value="">Любая опасность</option>
            {filterOptions.dangers.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Сбросить фильтры
        </button>
      </div>

      <div className="items-grid">
        {filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => handleLocationClick(location)}
            />
          ))
        ) : (
          <p className="no-results">Локации не найдены</p>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;