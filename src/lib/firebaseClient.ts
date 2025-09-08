import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ================= Firebase Config ===================
const firebaseConfig = {
  apiKey: "AIzaSyDBATfJMekbt-KbjdlUaihnABhLNsjM72A",
  authDomain: "auth-testing-35e21.firebaseapp.com",
  projectId: "auth-testing-35e21",
  storageBucket: "auth-testing-35e21.firebasestorage.app",
  messagingSenderId: "865596863106",
  appId: "1:865596863106:web:fb76971bdf8cd3d714ba9b",
  measurementId: "G-RZTGMB02L",
};

// ================= Initialize Firebase ===================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
