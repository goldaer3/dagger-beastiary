import { createContext, useContext, useState, useCallback } from 'react'
import { dataRegistry, getDataById } from '../data/registry'
import { parseLink } from '../utils/linkUtils'

const ModalContext = createContext(null)

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)

  const openModal = useCallback((type, id, data = null) => {
    setModal({ type, id, data })
  }, [])

  const closeModal = useCallback(() => {
    setModal(null)
  }, [])

  const openFromLink = useCallback((link) => {
    const parsed = parseLink(link)
    if (!parsed) return
    const { type, id } = parsed
    const data = dataRegistry[type]?.findById(id)
    if (data) {
      openModal(type, id, data)
    }
  }, [openModal])

  return (
    <ModalContext.Provider value={{
      modal,
      openModal,
      closeModal,
      openFromLink
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

export { getDataById }