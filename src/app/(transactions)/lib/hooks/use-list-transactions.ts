
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'

import { QUERY_KEYS } from '@/shared/lib/consts/query-keys'
import { transactionServices } from '../services'

export const useListTransactions = () => {
  const { user } = useUser()

  const { isLoading, error, data } = useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS.LIST],
    queryFn: () => transactionServices.getAll(user.id),
  })

  return {
    data,
    error,
    loading: isLoading
  }
}
