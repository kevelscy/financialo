import { QueryTransactions } from '@/shared/lib/services/firebase/queries/transactions'
import { Body } from '@/shared/lib/types/http'

import { GroupedTransactions } from '../schemas/transaction.schema'

export const getAllTransactionsGrouped = async (userId: string, filters?: any): Promise<Body<GroupedTransactions[]>> => {
  try {
    const res = await QueryTransactions.getGroupedByCategory(userId, filters)
    return { result: res }
  } catch (error) {
    console.error('getAllTransactionsGrouped error', error)
    return null
  }
}