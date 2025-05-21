import { QueryTransactions } from '@/shared/lib/services/firebase/queries/transactions'
import { Body } from '@/shared/lib/types/http'

import { Transaction } from '../schemas/transaction.schema'

export const getAllTransactions = async (userId: string): Promise<Body<Transaction[]>> => {
  try {
    const res = await QueryTransactions.getAll(userId)
    return { result: res }
  } catch (error) {
    console.error('getAllTansactions error', error)
    return null
  }
}