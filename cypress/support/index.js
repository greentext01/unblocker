// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCw71rUpw4z0ko1ca1Njtd4Ry9cK6RpVs4",
  authDomain: "games-list-0.firebaseapp.com",
  projectId: "games-list-0",
  storageBucket: "games-list-0.appspot.com",
  messagingSenderId: "265426983834",
  appId: "1:265426983834:web:8d4b4a90f0c1df71a07823",
  measurementId: "G-CTE9FYWJ7J"
};

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });

// Alternatively you can use CommonJS syntax:
// require('./commands')
