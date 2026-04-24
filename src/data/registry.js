import charactersData from '../data/characters.json'
import locationsData from '../data/locations.json'
import itemsData from '../data/items.json'
import enemiesData from '../data/enemies.json'
import spellsData from '../data/spells.json'

const toArray = (data) => Array.isArray(data) ? data : []

export const dataRegistry = {
  character: {
    data: toArray(charactersData),
    findById: (id) => dataRegistry.character.data.find(c => c.id === id),
    findByName: (name) => dataRegistry.character.data.find(c => c.name === name)
  },
  location: {
    data: toArray(locationsData),
    findById: (id) => dataRegistry.location.data.find(l => l.id === id),
    findByName: (name) => dataRegistry.location.data.find(l => l.name === name || l.id === name)
  },
  item: {
    data: toArray(itemsData),
    findById: (id) => dataRegistry.item.data.find(i => i.id === id),
    findByName: (name) => dataRegistry.item.data.find(i => i.name === name)
  },
  enemy: {
    data: toArray(enemiesData),
    findById: (id) => dataRegistry.enemy.data.find(e => e.id === id),
    findByName: (name) => dataRegistry.enemy.data.find(e => e.name === name)
  },
  spell: {
    data: toArray(spellsData),
    findById: (id) => dataRegistry.spell.data.find(s => s.id === id),
    findByName: (name) => dataRegistry.spell.data.find(s => s.name === name)
  }
}

export const getDataById = (type, id) => {
  const registry = dataRegistry[type]
  if (!registry) return null
  return registry.findById(id)
}

export const getDataByName = (type, name) => {
  const registry = dataRegistry[type]
  if (!registry) return null
  return registry.findByName(name)
}

export const getAllData = (type) => {
  const registry = dataRegistry[type]
  if (!registry) return []
  return registry.data
}

export const findInField = (type, field, value) => {
  const data = getAllData(type)
  if (!data.length) return []
  if (Array.isArray(value)) {
    return data.filter(item => {
      const fieldValue = item[field]
      if (!fieldValue) return false
      const fieldArray = Array.isArray(fieldValue) ? fieldValue : [fieldValue]
      return value.some(v => fieldArray.includes(v) || fieldArray.includes(String(v)))
    })
  }
  return data.filter(item => {
    const fieldValue = item[field]
    if (!fieldValue) return false
    if (Array.isArray(fieldValue)) return fieldValue.includes(value) || fieldValue.includes(String(value))
    return fieldValue === value || fieldValue === String(value)
  })
}