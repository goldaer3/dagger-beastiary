import { useState, useMemo } from 'react'

export const useEntityFilters = ({
  data,
  filterFields = [],
  extraFilterFields = [],
  sortOrders = {}
}) => {
  const defaultFilters = Object.fromEntries(filterFields.map(f => [f, '']))
  const [filters, setFilters] = useState(defaultFilters)

  const filterOptions = useMemo(() => {
    const options = {}
    filterFields.forEach(field => {
      options[field] = new Set()
    })
    extraFilterFields.forEach(field => {
      options[field] = new Set()
    })

    data.forEach(item => {
      filterFields.forEach(field => {
        if (item[field]) {
          const value = item[field]
          if (Array.isArray(value)) {
            value.forEach(v => v && options[field].add(v))
          } else {
            options[field].add(value)
          }
        }
      })
      extraFilterFields.forEach(field => {
        if (Array.isArray(item[field])) {
          item[field].forEach(v => v && options[field].add(v))
        }
      })
    })

    const result = {}
    filterFields.forEach(field => {
      let arr = Array.from(options[field]).sort()
      if (sortOrders[field]) {
        arr = arr.sort((a, b) => (sortOrders[field][a] || 99) - (sortOrders[field][b] || 99))
      }
      result[field] = arr
    })
    extraFilterFields.forEach(field => {
      result[field] = Array.from(options[field]).sort()
    })
    return result
  }, [data, filterFields, extraFilterFields, sortOrders])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      for (const field of filterFields) {
        if (filters[field]) {
          if (Array.isArray(item[field])) {
            if (!item[field].includes(filters[field])) return false
          } else {
            if (item[field] !== filters[field]) return false
          }
        }
      }
      for (const field of extraFilterFields) {
        if (filters[field]) {
          if (!Array.isArray(item[field]) || !item[field].includes(filters[field])) return false
        }
      }
      return true
    })
  }, [data, filters, filterFields, extraFilterFields])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => setFilters(defaultFilters)

  return {
    filters,
    setFilters,
    filterOptions,
    filteredData,
    handleFilterChange,
    clearFilters,
    defaultFilters
  }
}