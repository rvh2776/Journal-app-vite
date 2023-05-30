// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdLM_i1uLG2FCYb8OswwVpOb4GQCQbZ98",
  authDomain: "curso-react-18b38.firebaseapp.com",
  projectId: "curso-react-18b38",
  storageBucket: "curso-react-18b38.appspot.com",
  messagingSenderId: "762547829097",
  appId: "1:762547829097:web:41f8055ffbb1d2332ba5f8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );