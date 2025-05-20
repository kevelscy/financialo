import { doc, setDoc } from 'firebase/firestore'
import { db } from '../server'

import { DB_REFERENCES } from '../references'

type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
}

export const QueryUsers = {
  async createOrUpdateUser(userData: User) {
    const userRef = doc(db, DB_REFERENCES.USERS, userData.id)

    const userDoc = {
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      profileImage: userData.imageUrl || '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await setDoc(userRef, userDoc, { merge: true })

    return userRef.id
  }
}