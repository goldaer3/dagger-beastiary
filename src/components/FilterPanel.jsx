const FilterPanel = ({ filters, filterOptions, filterConfig, onFilterChange, onClear }) => {
  const { fields, extraFields = [], labels = {}, rows = [] } = filterConfig

  const allFields = [...fields, ...extraFields]

  if (rows.length === 0) {
    rows.push(allFields)
  }

  return (
    <div className="filters-panel">
      {rows.map((rowFields, rowIdx) => (
        <div key={rowIdx} className="filters-row">
          {rowFields.map(field => (
            <select
              key={field}
              value={filters[field] || ''}
              onChange={e => onFilterChange(field, e.target.value)}
            >
              <option value="">{labels[field] || `Все ${field}`}</option>
              {(filterOptions[field] || []).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      ))}
      <button className="clear-filters-btn" onClick={onClear}>
        Сбросить фильтры
      </button>
    </div>
  )
}

export default FilterPanel