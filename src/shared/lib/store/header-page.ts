import { create } from 'zustand'

interface HeaderPageAtom {
  header: {
    title?: string
    description?: string
  }
  goBack?: boolean
  setGoBack: (goBack: boolean) => void
  setHeader: ({ title, description }: { title?: string, description?: string }) => void
}

export const useHeaderPageStore = create<HeaderPageAtom>(set => ({
  header: null,
  goBack: false,

  setGoBack: (goBack) => set((prev) => ({
    ...prev,
    goBack
  })),

  setHeader: ({ title, description }) => set(prev => ({
    ...prev,
    header: {
      title: title || '',
      description: description || ''
    }
  })),
}))
