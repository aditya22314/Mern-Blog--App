// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // for vite we import by using import.meta.env
  authDomain: "mern-blog-25c32.firebaseapp.com",
  projectId: "mern-blog-25c32",
  storageBucket: "mern-blog-25c32.appspot.com",
  messagingSenderId: "791040360449",
  appId: "1:791040360449:web:cbc4857279425a0dda0000",
  measurementId: "G-6PC7V94XP7",
}; 

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
