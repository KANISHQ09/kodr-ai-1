// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyCR2WGgwkfgaVUMnGWoQQnbSS4vkaSaP7A",
  authDomain: "kodr-1e65c.firebaseapp.com",
  projectId: "kodr-1e65c",
  storageBucket: "kodr-1e65c.appspot.com",
  messagingSenderId: "764123046680",
  appId: "1:764123046680:web:647f88598d98fa758a746d",
  measurementId: "G-7J02XVLJZP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export { app, auth, db };
