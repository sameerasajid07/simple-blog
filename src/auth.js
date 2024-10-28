// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3AzTQXXqm3YpOdOYQnf0bQSJ01ovlCC0",
  authDomain: "simple-blog-f1b74.firebaseapp.com",
  projectId: "simple-blog-f1b74",
  storageBucket: "simple-blog-f1b74.appspot.com",
  messagingSenderId: "942194942249",
  appId: "1:942194942249:web:96094867af81901f83d738",
  measurementId: "G-JZEPPSCK12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Auth instance

// Define authentication functions
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
