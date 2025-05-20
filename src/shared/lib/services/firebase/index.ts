import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

import { firebaseConfig } from './config'

import { QueryUsers } from './queries/users'

let firebase: FirebaseApp
let db: Firestore

if (typeof window !== 'undefined' && !getApps().length) {
  firebase = initializeApp(firebaseConfig)
  db = getFirestore(firebase);
}

// export const analytics = getAnalytics(firebase)

export { firebase, db }
export { QueryUsers }
