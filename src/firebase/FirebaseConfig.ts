import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADSClha0XPHut8fySmkEtr_YN2pqYKcVU",
  authDomain: "madlogicstudio-629a0.firebaseapp.com",
  projectId: "madlogicstudio-629a0",
  storageBucket: "madlogicstudio-629a0.firebasestorage.app",
  messagingSenderId: "214707084650",
  appId: "1:214707084650:web:b2717069854edb43fc9913"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);