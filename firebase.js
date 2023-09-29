import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCrsCZe_X7nS9JduURjATCrzGWvZmtUD4E',
  authDomain: 'codedrops-335d2.firebaseapp.com',
  projectId: 'codedrops-335d2',
  storageBucket: 'codedrops-335d2.appspot.com',
  messagingSenderId: '12480149097',
  appId: '1:12480149097:web:139f4af93edcd5e23cd4f8',
  measurementId: 'G-X587G0X2RC',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
