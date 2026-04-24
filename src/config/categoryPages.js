import charactersData from '../data/characters.json'
import locationsData from '../data/locations.json'
import itemsData from '../data/items.json'
import enemiesData from '../data/enemies.json'
import spellsData from '../data/spells.json'
import { cardConfigs } from './entityCards.js'

const dataMap = {
  characters: Array.isArray(charactersData) ? charactersData : [],
  locations: Array.isArray(locationsData) ? locationsData : [],
  items: Array.isArray(itemsData) ? itemsData : [],
  enemies: Array.isArray(enemiesData) ? enemiesData : [],
  spells: Array.isArray(spellsData) ? spellsData : []
}

export const categoryPages = {
  characters: {
    title: 'Персонажи',
    dataKey: 'characters',
    data: dataMap.characters,
    cardConfig: cardConfigs.character,
    filterConfig: {
      fields: ['race', 'class', 'subclass', 'origin', 'session', 'kingdom', 'alignment'],
      extraFields: ['society'],
      labels: {
        race: 'Все расы',
        class: 'Все классы',
        subclass: 'Все подклассы',
        origin: 'Все происхождения',
        session: 'Все сессии',
        kingdom: 'Все королевства',
        alignment: 'Все мировоззрения',
        society: 'Все общества'
      },
      rows: [['race', 'class', 'subclass', 'origin'], ['session', 'kingdom', 'alignment', 'society']]
    },
    modalType: 'character'
  },
  locations: {
    title: 'Локации',
    dataKey: 'locations',
    data: dataMap.locations,
    cardConfig: cardConfigs.location,
    filterConfig: {
      fields: ['type', 'rarity', 'danger'],
      labels: {
        type: 'Все типы',
        rarity: 'Любая редкость',
        danger: 'Любая опасность'
      },
      rows: [['type', 'rarity', 'danger']],
      sortOrders: {
        danger: { 'Низкая': 1, 'Средняя': 2, 'Высокая': 3 }
      }
    },
    modalType: 'location'
  },
  items: {
    title: 'Предметы',
    dataKey: 'items',
    data: dataMap.items,
    cardConfig: cardConfigs.item,
    filterConfig: {
      fields: ['type'],
      extraFields: ['relatedSociety'],
      labels: {
        type: 'Все типы',
        relatedSociety: 'Все общества'
      },
      rows: [['type', 'relatedSociety']]
    },
    modalType: 'item'
  },
  enemies: {
    title: 'Мобы',
    dataKey: 'enemies',
    data: dataMap.enemies,
    cardConfig: cardConfigs.enemy,
    filterConfig: {
      fields: ['type', 'species', 'location', 'status', 'behavior'],
      extraFields: ['intellect', 'society'],
      labels: {
        type: 'Все типы',
        species: 'Все виды',
        location: 'Все локации',
        status: 'Любой статус',
        behavior: 'Любое поведение',
        intellect: 'Любой интеллект',
        society: 'Любое общество'
      },
      rows: [['type', 'species', 'location', 'status'], ['behavior', 'intellect', 'society']]
    },
    modalType: 'enemy'
  },
  spells: {
    title: 'Магия',
    dataKey: 'spells',
    data: dataMap.spells,
    cardConfig: cardConfigs.spell,
    filterConfig: {
      fields: ['type', 'school', 'difficulty', 'applicationMethod'],
      labels: {
        type: 'Все типы',
        school: 'Все школы',
        difficulty: 'Любая сложность',
        applicationMethod: 'Все способы'
      },
      rows: [['type', 'school', 'difficulty', 'applicationMethod']]
    },
    modalType: 'spell'
  }
}