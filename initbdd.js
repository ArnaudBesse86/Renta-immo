// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAvdnnSLFslpEGuMiNG_N0BePMNJ0lOqnQ",
    authDomain: "https://rentabilite-immo.firebaseapp.com",
    projectId: "rentabilite-immo",
    storageBucket: "gs://rentabilite-immo.appspot.com",
    //messagingSenderId: "79218113340",
   // appId: "1:79218113340:web:6b2c952af5c4c7add07c39",
    //measurementId: "G-VQCNFHWV5Q"
    // ... autres configurations
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportation des objets et fonctions nécessaires
export { app, auth, db, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, collection, getDocs, setDoc, doc, addDoc, getDoc, query, orderBy};