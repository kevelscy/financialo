import { collection, doc, getDoc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '../server'

import { DB_REFERENCES } from '../references'
import { defaultCategories } from '@/app/(transactions)/lib/data/init-categories'

type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
}

export const QueryUsers = {
  async createOrUpdateUser(user: User) {
    const userRef = doc(db, DB_REFERENCES.USERS, user.id)
    const userSnapshot = await getDoc(userRef)

    const userDoc = {
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      profileImage: user.imageUrl || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    if (!userSnapshot.exists()) {
      const batch = writeBatch(db)

      // Crear usuario principal
      batch.set(userRef, userDoc)

      // Crear subcolección de categorías
      const categoriesRef = collection(userRef, DB_REFERENCES.CATEGORIES)

      // Añadir categorías por defecto con IDs automáticos
      defaultCategories.forEach(category => {
        const categoryDocRef = doc(categoriesRef) // ID automático

        batch.set(categoryDocRef, {
          ...category,
          userId: user.id, // Añadir ID de usuario
          createdAt: new Date().toISOString(), // Usar timestamp del servidor
          updatedAt: new Date().toISOString()
        })
      })

      await batch.commit()
      return userRef.id
    }

    // Actualizar solo si el usuario ya existe
    await setDoc(userRef, userDoc, { merge: true })
    return userRef.id
  }
}