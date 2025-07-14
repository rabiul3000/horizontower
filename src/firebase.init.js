// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_CONFIG } from "./api/api";
import { getAuth } from "firebase/auth";

const firebaseConfig = FIREBASE_CONFIG;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export default auth;
