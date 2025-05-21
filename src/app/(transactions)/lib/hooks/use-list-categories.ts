
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'

import { QUERY_KEYS } from '@/shared/lib/consts/query-keys'
import { categoryServices } from '../services'

export const useListCategories = () => {
  const { user } = useUser()

  const { isLoading, error, data } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES.TABLE],
    queryFn: () => categoryServices.getAll(user.id),
  })

  return {
    data,
    error,
    loading: isLoading
  }
}
