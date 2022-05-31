// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
   apiKey: "AIzaSyAv61nUTbE8PVr9iEQKQDD1p-H4MZ7gWnU",
   authDomain: "ecommerce-final-exam-db06.firebaseapp.com",
   projectId: "ecommerce-final-exam-db06",
   storageBucket: "ecommerce-final-exam-db06.appspot.com",
   messagingSenderId: "229856709377",
   appId: "1:229856709377:web:3d7277dbcf9a64ddeb2900",
   measurementId: "G-C8BQ95Y6NM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storageFirebase = getStorage(app);

module.exports = storageFirebase;
