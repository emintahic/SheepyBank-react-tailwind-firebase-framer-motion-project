// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo2PJHVQAq1tb6LyhZagv5fb9TnbfaWpA",
  authDomain: "sheepybank.firebaseapp.com",
  projectId: "sheepybank",
  storageBucket: "sheepybank.appspot.com",
  messagingSenderId: "698741545287",
  appId: "1:698741545287:web:b9e7bdcd3362ee9d6a9462",
  measurementId: "G-9VJ4G6G6R7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);
