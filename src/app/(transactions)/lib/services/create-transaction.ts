import { QueryTransactions } from '@/shared/lib/services/firebase/queries/transactions'
import { Body } from '@/shared/lib/types/http'

import { CreateTransaction, Transaction } from '@/transactions/lib/schemas'

interface Props extends CreateTransaction { }

export const createTransaction = async (payload: Props): Promise<Body<Transaction>> => {
  try {
    const res = await QueryTransactions.create(payload)
    return { result: res }
  } catch (error) {
    console.error('createTransaction error', error)
    return null
  }
}