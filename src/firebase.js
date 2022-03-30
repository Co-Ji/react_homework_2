// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8Fg90qj9Fe1wLdc47JAKBpmuZNAqPlus",
    authDomain: "mywordlist-4c286.firebaseapp.com",
    projectId: "mywordlist-4c286",
    storageBucket: "mywordlist-4c286.appspot.com",
    messagingSenderId: "831971340343",
    appId: "1:831971340343:web:dd3cfdbbac9b0c9c794fb2",
    measurementId: "G-VZ2MNNZKDG",
};

initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore();
