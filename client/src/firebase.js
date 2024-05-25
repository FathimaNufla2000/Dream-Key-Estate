// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dream-key-estate.firebaseapp.com",
  projectId: "dream-key-estate",
  storageBucket: "dream-key-estate.appspot.com",
  messagingSenderId: "841442874667",
  appId: "1:841442874667:web:446da94298910b608c616e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);