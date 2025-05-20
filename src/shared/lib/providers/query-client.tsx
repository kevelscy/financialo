'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export const queryClient = new QueryClient()

export function QueryProvider({ children }) {
  const [queryClientState] = useState(queryClient)

  return <QueryClientProvider client={queryClientState}>{children}</QueryClientProvider>
}
