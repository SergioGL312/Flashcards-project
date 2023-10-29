// Pedro Infante Account - login-firebase

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkeRTivWFHlgUebMRN-caPcFRF0W94JhE",
  authDomain: "login-firebase-40cb2.firebaseapp.com",
  projectId: "login-firebase-40cb2",
  storageBucket: "login-firebase-40cb2.appspot.com",
  messagingSenderId: "1074791126339",
  appId: "1:1074791126339:web:624f7704b5387cfdc14bf6"
};

// Initialize Firebase
export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);
export const FIREBASE_DB = firebase.firestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const FLASHCARDS = FIREBASE_DB.collection('flashcards');
export const CARDS = FIREBASE_DB.collection('cards');