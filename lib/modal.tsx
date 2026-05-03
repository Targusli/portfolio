'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface ModalContextType {
  modalStack: string[]
  activeModal: string | null
  openModal: (id: string) => void
  pushModal: (id: string) => void
  replaceStack: (ids: string[]) => void
  closeModal: () => void
  popModal: () => void
}

const ModalContext = createContext<ModalContextType>({
  modalStack: [],
  activeModal: null,
  openModal: () => {},
  pushModal: () => {},
  replaceStack: () => {},
  closeModal: () => {},
  popModal: () => {},
})

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStack, setModalStack] = useState<string[]>([])

  const openModal = useCallback((id: string) => setModalStack([id]), [])
  const pushModal = useCallback((id: string) => setModalStack((s) => [...s, id]), [])
  const replaceStack = useCallback((ids: string[]) => setModalStack(ids), [])
  const closeModal = useCallback(() => setModalStack([]), [])
  const popModal = useCallback(() => setModalStack((s) => s.slice(0, -1)), [])

  return (
    <ModalContext.Provider
      value={{
        modalStack,
        activeModal: modalStack[modalStack.length - 1] ?? null,
        openModal,
        pushModal,
        replaceStack,
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
