// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import firestore from "firebase/compat/firestore";
import auth from "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD_qUIcI3OQrrY80bulyPv-qTc0rAfdj5I",
  authDomain: "gpt3-experiments-sparktime.firebaseapp.com",
  databaseURL: "https://gpt3-experiments-sparktime-default-rtdb.firebaseio.com",
  projectId: "gpt3-experiments-sparktime",
  storageBucket: "gpt3-experiments-sparktime.appspot.com",
  messagingSenderId: "1040196214089",
  appId: "1:1040196214089:web:88420ffeb0daa5482c8e98",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseAuth = firebase.auth();

if (window.location.hostname === "localhost") {
  console.log("Using emulator");
  db.useEmulator("localhost", 8080); // Adding http makes this break
  firebaseAuth.useEmulator("http://localhost", 9099);
}

export { db };
