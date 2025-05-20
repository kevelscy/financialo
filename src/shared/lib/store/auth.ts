import { create } from 'zustand'

interface IAuthAtom {
  auth: any | null
  loading: boolean

  setLoading: (value: boolean) => void
  removeAuth: () => void
  setAuth: (auth: any) => void
}

export const useAuthStore = create<IAuthAtom>(set => ({
  auth: null,
  loading: true,
  setLoading: (value) => set(prev => ({ ...prev, loading: value })),
  setAuth: (auth) => set(prev => ({ ...prev, auth })),
  removeAuth: () => set(prev => ({ ...prev, auth: null })),
}))
