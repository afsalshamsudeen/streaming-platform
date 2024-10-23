
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCkU43oiR3iCLR-lv6PYL3OMSKBNzDoqfM",
  authDomain: "snooplay-a5644.firebaseapp.com",
  projectId: "snooplay-a5644",
  storageBucket: "snooplay-a5644.appspot.com",
  messagingSenderId: "1033354459668",
  appId: "1:1033354459668:web:dad77143f3b1f6384d0501"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;