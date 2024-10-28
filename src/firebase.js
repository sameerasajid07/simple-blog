import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase auth

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

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

export { db, auth, analytics };


