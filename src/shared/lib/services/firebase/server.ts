import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'

import { firebaseConfig } from './config'

let appServer: FirebaseApp
let dbServer: Firestore

if (!getApps().length) {
  appServer = initializeApp(firebaseConfig)
  dbServer = getFirestore(appServer)
}

export { dbServer as db }