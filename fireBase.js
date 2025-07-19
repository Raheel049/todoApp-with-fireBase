// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvSSEilsQaCfjUTUxTywXXHj7KBHvSsBM",
  authDomain: "smit-batch14-f4b72.firebaseapp.com",
  projectId: "smit-batch14-f4b72",
  storageBucket: "smit-batch14-f4b72.firebasestorage.app",
  messagingSenderId: "327090670250",
  appId: "1:327090670250:web:d4bf68c1ddec982f83ded3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
};
