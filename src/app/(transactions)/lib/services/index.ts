import { getAllTransactions } from './get-all-transactions'
import { createTransaction } from './create-transaction'
import { getAllCategories } from './get-all-categories'
import { createCategory } from './create-category'
import { getAllTransactionsGrouped } from './get-all-transactions-grouped'

export const transactionServices = {
  create: createTransaction,
  getAll: getAllTransactions,
  getAllGrouped: getAllTransactionsGrouped
}

export const categoryServices = {
  create: createCategory,
  getAll: getAllCategories
}