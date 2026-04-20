import { useModal } from '../context/ModalContext'
import CharacterModal from './CharacterModal'
import ItemModal from './ItemModal'
import { useEffect, useState } from 'react'
import charactersData from '../data/characters.json'
import itemsData from '../data/items.json'

const ModalRenderer = () => {
  const { modal, closeModal } = useModal()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!modal) {
      setData(null)
      return
    }
    const { type, id, data: providedData } = modal
    if (providedData) {
      setData(providedData)
      return
    }
    if (type === 'character') {
      setData(charactersData.find(c => c.id === id) || null)
    } else if (type === 'item') {
      setData(itemsData.find(i => i.id === id) || null)
    } else {
      setData(null)
    }
  }, [modal])

  if (!modal || !data) return null

  switch (modal.type) {
    case 'character':
      return <CharacterModal character={data} onClose={closeModal} />
    case 'item':
      return <ItemModal item={data} onClose={closeModal} />
    default:
      return null
  }
}

export default ModalRenderer