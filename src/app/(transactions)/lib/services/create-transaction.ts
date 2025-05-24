import { QueryTransactions } from '@/shared/lib/services/firebase/queries/transactions'
import { Body } from '@/shared/lib/types/http'

import { CreateTransaction, Transaction } from '@/app/(transactions)/lib/schemas/transaction.schema'

interface Props extends CreateTransaction { }

export const createTransaction = async (userId: string, payload: Props): Promise<Body<Transaction>> => {
  try {
    console.log('createTransaction', { userId, payload })

    const res = await QueryTransactions.create(userId, payload)
    return { result: res }
  } catch (error) {
    console.error('createTransaction error', error)
    return null
  }
}