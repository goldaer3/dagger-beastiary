import { useModal } from '../context/ModalContext'
import CharacterModal from './CharacterModal'
import ItemModal from './ItemModal'
import EnemyModal from './EnemyModal'
import LocationModal from './LocationModal'
import SpellModal from './SpellModal'

const MODAL_COMPONENTS = {
  character: { component: CharacterModal, propName: 'character' },
  item: { component: ItemModal, propName: 'item' },
  enemy: { component: EnemyModal, propName: 'enemy' },
  location: { component: LocationModal, propName: 'location' },
  spell: { component: SpellModal, propName: 'spell' }
}

const ModalRenderer = () => {
  const { modal, closeModal } = useModal()

  if (!modal) return null

  const { type, data } = modal
  const modalInfo = MODAL_COMPONENTS[type]

  if (!modalInfo || !data) return null

  const { component: ModalComponent, propName } = modalInfo
  const props = { [propName]: data, onClose: closeModal }

  return <ModalComponent {...props} />
}

export default ModalRenderer