import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtMpY1ZYtzYKMSQeODn6SQYEzluve9sVs",
  authDomain: "sny-osho.firebaseapp.com",
  projectId: "sny-osho",
  storageBucket: "sny-osho.firebasestorage.app",
  messagingSenderId: "972108152983",
  appId: "1:972108152983:web:2882ae1eabde2d9c63a9d2",
  measurementId: "pG-DGLBCYCDSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
