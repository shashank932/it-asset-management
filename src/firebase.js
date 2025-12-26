import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2PmcRKMvjd9dUPEiAHFp_eid57WMJ4Ho",
  authDomain: "it-asset-manager-8c547.firebaseapp.com",
  projectId: "it-asset-manager-8c547",
  storageBucket: "it-asset-manager-8c547.appspot.com",
  messagingSenderId: "1011650299642",
  appId: "1:1011650299642:web:XXXXXXXXXXXX"
};

// 🔥 FIRST initialize the app
const app = initializeApp(firebaseConfig);

// 🔥 THEN export services (correct order)
export const db = getFirestore(app);
export const auth = getAuth(app);
