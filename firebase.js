
import firebase from 'firebase/compat/app'
import { doc, addDoc, getDoc, setDoc, getDocs, getCount, getFirestore, collection } from 'firebase/firestore/lite'
import { getAuth, updatePassword, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, beforeAuthStateChanged, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZC1IV1nczXrnBZdO3dH6DInM4HOe-HoY",
  authDomain: "codecrush-7603d.firebaseapp.com",
  projectId: "codecrush-7603d",
  storageBucket: "codecrush-7603d.appspot.com",
  messagingSenderId: "387669466176",
  appId: "1:387669466176:web:855d5630b0a30ee46393a5",
  measurementId: "G-6V4968QHY6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage,
  getAuth,
	db,
  doc,
  getDoc,
	setDoc,
  addDoc,
	createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  updatePassword,
  confirmPasswordReset,
  getDocs, getCount, getFirestore, collection, beforeAuthStateChanged, analytics
};