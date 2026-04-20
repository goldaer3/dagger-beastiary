import { createContext, useContext, useState, useEffect } from 'react'

const ModalContext = createContext(null)

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)

  const openModal = (type, id, data = null) => setModal({ type, id, data })
  const closeModal = () => setModal(null)

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )


}


export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}