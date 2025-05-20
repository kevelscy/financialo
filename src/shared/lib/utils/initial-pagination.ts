import { FetchParams, Pagination } from '@/shared/lib/types/http'

export const initialPagination: Omit<Pagination, 'totalCount' | 'hasNextPage' | 'hasPrevPage'> = { limit: 20, page: 1 }