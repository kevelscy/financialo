import { z } from 'zod'
import { Category, categorySchema } from './category.schema'

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
  category: categorySchema,
  date: z.date(),
})

export const createTransactionSchema = transactionSchema.omit({ id: true, category: true }).extend({
  categoryId: z.string().optional(),
  date: z.date(),
})
export const editTransactionSchema = transactionSchema.omit({ id: true })

export type Transaction = z.infer<typeof transactionSchema>
export type EditTransaction = z.infer<typeof editTransactionSchema>
export type CreateTransaction = z.infer<typeof createTransactionSchema>

export interface GroupedTransactions {
  category: Omit<Category, 'userId'>
  incomeTransactions: Transaction[]
  expenseTransactions: Transaction[]
  totalIncomeAmount: number
  totalExpenseAmount: number
}
