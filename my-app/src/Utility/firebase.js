// Import firebase the correct way (v8 compat style)
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmLEK0ulPNkaS0exivjIqkJ10VZAF0wMc",
  authDomain: "clone-40318.firebaseapp.com",
  projectId: "clone-40318",
  storageBucket: "clone-40318.appspot.com", // ✅ corrected
  messagingSenderId: "126755251493",
  appId: "1:126755251493:web:904edb57ade71b041ce6cc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth and firestore
export const auth = firebase.auth();
export const db = firebase.firestore();
