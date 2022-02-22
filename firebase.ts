// JavaScript
// src.firebase.js
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCw71rUpw4z0ko1ca1Njtd4Ry9cK6RpVs4",
  authDomain: "games-list-0.firebaseapp.com",
  projectId: "games-list-0",
  storageBucket: "games-list-0.appspot.com",
  messagingSenderId: "265426983834",
  appId: "1:265426983834:web:8d4b4a90f0c1df71a07823",
  measurementId: "G-CTE9FYWJ7J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

connectFirestoreEmulator(db, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099');