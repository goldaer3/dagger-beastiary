const VALID_TYPES = ['item', 'enemy', 'location', 'character', 'spell']

export const parseLink = (link) => {
  if (!link || link === '#' || link.trim() === '') return null
  const parts = link.split(':')
  if (parts.length < 2) return null
  const type = parts[0]
  const id = parts.slice(1).join(':')
  if (!VALID_TYPES.includes(type) || !id) return null
  return { type, id }
}

export const isModalLink = (link) => {
  return parseLink(link) !== null
}

export const formatLink = (type, id) => {
  if (!type || !id || !VALID_TYPES.includes(type)) return null
  return `${type}:${id}`
}

export const getLinkType = (link) => {
  const parsed = parseLink(link)
  return parsed ? parsed.type : null
}

export const getLinkId = (link) => {
  const parsed = parseLink(link)
  return parsed ? parsed.id : null
}