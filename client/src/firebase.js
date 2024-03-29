// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-0LZG6mITVFF5NSUJhkSpzfv4frBnSgk",
  authDomain: "devtube-app-ffa12.firebaseapp.com",
  projectId: "devtube-app-ffa12",
  storageBucket: "devtube-app-ffa12.appspot.com",
  messagingSenderId: "362687542729",
  appId: "1:362687542729:web:3e9dd8c791eb5b793ca418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app