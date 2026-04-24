import { useModal } from '../context/ModalContext'
import EntityCard from '../components/EntityCard'
import FilterPanel from '../components/FilterPanel'
import { useEntityFilters } from '../hooks/useEntityFilters'
import { categoryPages } from '../config/categoryPages'
import './CategoryPage.css'

const GenericCategoryPage = ({ pageKey }) => {
  const config = categoryPages[pageKey]
  const { openModal } = useModal()

  const { filters, filterOptions, filteredData, handleFilterChange, clearFilters } = useEntityFilters({
    data: config.data,
    filterFields: config.filterConfig.fields,
    extraFilterFields: config.filterConfig.extraFields || [],
    sortOrders: config.filterConfig.sortOrders || {}
  })

  return (
    <div className="category-page">
      <h2 className="category-title">
        <span>◈</span> {config.title} <span>◈</span>
      </h2>

      <FilterPanel
        filters={filters}
        filterOptions={filterOptions}
        filterConfig={config.filterConfig}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />

      <div className="entity-grid">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <EntityCard
              key={item.id}
              item={item}
              config={config.cardConfig}
              onClick={() => openModal(config.modalType, item.id, item)}
            />
          ))
        ) : (
          <p className="no-results">{config.title} не найдены</p>
        )}
      </div>
    </div>
  )
}

export default GenericCategoryPage