import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'

import { DB_REFERENCES } from '@/shared/lib/services/firebase/references'
import { db } from '@/shared/lib/services/firebase'

import { CreateTransaction, Transaction } from '@/transactions/lib/schemas'

export const QueryTransactions = {
  create: async (payload: CreateTransaction): Promise<Transaction> => {
    const collectionRef = collection(db, DB_REFERENCES.TRANSACTIONS)

    const docRef = await addDoc(collectionRef, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    return { id: docRef.id, ...payload }
  },

  getAll: async (payload: CreateTransaction): Promise<Transaction[]> => {
    const collectionRef = collection(db, DB_REFERENCES.TRANSACTIONS)
    const querySnapshot = await getDocs(collectionRef)
    const docs: Transaction[] = []

    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })

    return docs
  },
}