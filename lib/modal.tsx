'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface ModalContextType {
  modalStack: string[]
  activeModal: string | null
  openModal: (id: string) => void
  pushModal: (id: string) => void
  closeModal: () => void
  popModal: () => void
}

const ModalContext = createContext<ModalContextType>({
  modalStack: [],
  activeModal: null,
  openModal: () => {},
  pushModal: () => {},
  closeModal: () => {},
  popModal: () => {},
})

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStack, setModalStack] = useState<string[]>([])

  const openModal = useCallback((id: string) => setModalStack([id]), [])
  const pushModal = useCallback((id: string) => setModalStack((s) => [...s, id]), [])
  const closeModal = useCallback(() => setModalStack([]), [])
  const popModal = useCallback(() => setModalStack((s) => s.slice(0, -1)), [])

  return (
    <ModalContext.Provider
      value={{
        modalStack,
        activeModal: modalStack[modalStack.length - 1] ?? null,
        openModal,
        pushModal,
        closeModal,
        popModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
