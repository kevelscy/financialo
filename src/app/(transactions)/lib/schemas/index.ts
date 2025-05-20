import { z } from 'zod'

export enum TransactionType {
  INCOME = 'INCOME', // ingresos
  EXPENSE = 'EXPENSE' // gastos
}

export enum Currency {
  USD = 'USD', // ingresos
  VED = 'VED' // gastos
}

const transactionTypeSchema = z.nativeEnum(TransactionType)
const currencySchema = z.nativeEnum(Currency)

export const transactionSchema = z.object({
  id: z.string(),
  type: transactionTypeSchema,
  amount: z.string(),
  description: z.string().min(3).max(100),
  category: z.string(),
  date: z.string(),
})

export const createTransactionSchema = transactionSchema.omit({ id: true })
export const editTransactionSchema = transactionSchema.omit({ id: true })

export type Transaction = z.infer<typeof transactionSchema>
export type EditTransaction = z.infer<typeof editTransactionSchema>
export type CreateTransaction = z.infer<typeof createTransactionSchema>
