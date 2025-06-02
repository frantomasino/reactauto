// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM8QXWKP0OpuToEWE-ZHcC8bpRh9SgCmk",
  authDomain: "ecommerce-reactjs-350aa.firebaseapp.com",
  projectId: "ecommerce-reactjs-350aa",
  storageBucket: "ecommerce-reactjs-350aa.appspot.com",
  messagingSenderId: "904207875955",
  appId: "1:904207875955:web:8c4088dfadb0fb83910f06"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firebase Storage
export const storage = getStorage(app);
