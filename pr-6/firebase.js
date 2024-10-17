// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmtZ5YgaaPUyORtC6SqAPwmdVanK3Bihs",
  authDomain: "crud-59a94.firebaseapp.com",
  projectId: "crud-59a94",
  storageBucket: "crud-59a94.appspot.com",
  messagingSenderId: "775664482681",
  appId: "1:775664482681:web:d2700926fe1e06c9acd7a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


export {auth , db }
