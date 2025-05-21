import { addDoc, collection, doc, getDocs } from 'firebase/firestore'

import { DB_REFERENCES } from '@/shared/lib/services/firebase/references'
import { db } from '@/shared/lib/services/firebase/server'

import { Category, CreateCategory } from '@/app/(transactions)/lib/schemas/category.schema'

export const QueryCategories = {
  create: async (userId: string, payload: CreateCategory): Promise<Category> => {
    try {
      const collectionRef = collection(
        db,
        DB_REFERENCES.USERS,
        userId,
        DB_REFERENCES.CATEGORIES
      )

      const docRef = await addDoc(collectionRef, {
        ...payload,
        deletedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      return { id: docRef.id, ...payload }
    } catch (error) {
      console.error("Error creating category:", error)
      throw new Error("Failed to create category")
    }
  },

  getAll: async (userId: string): Promise<Category[]> => {
    const userDocRef = doc(db, DB_REFERENCES.USERS, userId)
    const collectionRef = collection(userDocRef, DB_REFERENCES.CATEGORIES)

    const querySnapshot = await getDocs(collectionRef)
    const docs: Category[] = []

    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })

    return docs
  },
}