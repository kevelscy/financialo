
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'

import { QUERY_KEYS } from '@/shared/lib/consts/query-keys'
import { transactionServices } from '../services'
import { useMemo } from 'react'
import { TransactionType } from '../schemas/transaction.schema'

export const useListTransactionsGrouped = (filters?: any) => {
  const { user } = useUser()

  const { isLoading, error, data } = useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS.LIST],
    queryFn: () => transactionServices.getAllGrouped(user.id, filters),
  })

  return {
    data,
    error,
    loading: isLoading
  }
}
