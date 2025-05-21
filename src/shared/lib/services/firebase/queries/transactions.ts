import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { DB_REFERENCES } from '@/shared/lib/services/firebase/references'
import { formatAmount } from '@/shared/lib/utils/format-amount'
import { db } from '@/shared/lib/services/firebase/server'

import { CreateTransaction, GroupedTransactions, Transaction, TransactionType } from '@/transactions/lib/schemas/transaction.schema'
import { Category } from '@/transactions/lib/schemas/category.schema'

export const QueryTransactions = {
  create: async (userId: string, payload: CreateTransaction): Promise<Transaction> => {
    try {
      const transactionRef = collection(
        db,
        DB_REFERENCES.USERS,
        userId,
        DB_REFERENCES.TRANSACTIONS
      )

      const categoryRef = doc(
        db,
        DB_REFERENCES.USERS,
        userId,
        DB_REFERENCES.CATEGORIES,
        payload.categoryId
      )

      const categorySnap = await getDoc(categoryRef)

      if (!categorySnap.exists()) {
        throw new Error(`Category ${payload.categoryId} not found`)
      }

      const categoryData = {
        id: categorySnap.id,
        ...categorySnap.data()
      }

      delete payload.categoryId

      const docRef = await addDoc(transactionRef, {
        ...payload,
        category: categoryData || null,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      return { id: docRef.id, ...payload }
    } catch (error) {
      console.error("Error creating transaction:", error)
      throw new Error("Failed to create transaction")
    }
  },

  getAll: async (userId: string): Promise<Transaction[]> => {
    const userDocRef = doc(db, DB_REFERENCES.USERS, userId)
    const collectionRef = collection(userDocRef, DB_REFERENCES.TRANSACTIONS)

    const querySnapshot = await getDocs(collectionRef)
    const docs: Transaction[] = []

    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })

    return docs
  },

  getGroupedByCategory: async (userId: string, filters?: any): Promise<GroupedTransactions[]> => {
    try {
      // 1. Obtener todas las categorías del usuario
      const categoriesRef = collection(db, DB_REFERENCES.USERS, userId, DB_REFERENCES.CATEGORIES)
      const categoriesSnapshot = await getDocs(categoriesRef)
      const categories = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[]

      // 2. Obtener todas las transacciones del usuario
      const transactionsRef = collection(db, DB_REFERENCES.USERS, userId, DB_REFERENCES.TRANSACTIONS)
      const transactionsSnapshot = await getDocs(transactionsRef)

      const transactions = transactionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[]

      // 3. Crear mapa de categorías para acceso rápido
      const categoryMap = new Map<string, Category>(
        categories.map(cat => [cat.id, cat])
      )

      // 4. Agrupar transacciones y calcular totales
      const groupedMap = new Map<string, GroupedTransactions>()

      transactions.forEach(transaction => {
        const category = categoryMap.get(transaction.category.id) || {
          id: 'deleted-category',
          name: 'Categoría eliminada',
          emoji: '❓',
          userId: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const groupKey = category.id

        if (!groupedMap.has(groupKey)) {
          groupedMap.set(groupKey, {
            category: {
              id: category.id,
              name: category.name,
              emoji: category.emoji,
              createdAt: category.createdAt as string,
              updatedAt: category.updatedAt as string
            },
            incomeTransactions: [],
            expenseTransactions: [],
            totalExpenseAmount: 0,
            totalIncomeAmount: 0
          })
        }

        const group = groupedMap.get(groupKey)!

        if (transaction.type === TransactionType.INCOME) {
          group.incomeTransactions.push(transaction)
          group.totalIncomeAmount += formatAmount(transaction.amount)
        }

        if (transaction.type === TransactionType.EXPENSE) {
          group.expenseTransactions.push(transaction)
          group.totalIncomeAmount += formatAmount(transaction.amount)
        }
      })

      // 5. Ordenar resultados
      return Array.from(groupedMap.values()).sort((a, b) => {
        // Ordenar por nombre de categoría
        return a.category.name.localeCompare(b.category.name)
      })
    } catch (error) {
      console.error("Error grouping transactions:", error)
      throw new Error("Failed to group transactions by category")
    }
  }
}