
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDZC1IV1nczXrnBZdO3dH6DInM4HOe-HoY",
  authDomain: "codecrush-7603d.firebaseapp.com",
  projectId: "codecrush-7603d",
  storageBucket: "codecrush-7603d.appspot.com",
  messagingSenderId: "387669466176",
  appId: "1:387669466176:web:855d5630b0a30ee46393a5",
  measurementId: "G-6V4968QHY6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
let db = firebase.firestore()
let storage = firebase.storage()

export { auth, firebase, db, storage };
