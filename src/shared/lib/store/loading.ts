import { create } from 'zustand'

interface IDialogStore {
  open: boolean
  title: string
  description: string

  setLoader: (values: { title?: string, description?: string, open?: boolean }) => void

  toggleOpenLoader: () => void
  setOpenLoader: (value: boolean) => void

  openLoader: () => void
  closeLoader: () => void
}

export const useLoadingDialogStore = create<IDialogStore>(set => ({
  open: false,
  title: null,
  description: null,

  setLoader: (value) => set((prev) => ({
    ...prev,
    open: value?.open,
    title: value?.title || prev.title,
    description: value?.description || prev.description
  })),

  toggleOpenLoader: () => set(prevState => ({ ...prevState, open: !prevState })),
  setOpenLoader: (value) => set(prevState => ({ ...prevState, open: value })),

  openLoader: () => set(prevState => ({ ...prevState, open: true })),
  closeLoader: () => set(prevState => ({ ...prevState, open: false }))
}))
