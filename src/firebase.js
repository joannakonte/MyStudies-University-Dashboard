import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDDDbLw-skAj5rqrskbmHXvEM4mhb70pBs",
  authDomain: "mystudieseamproject.firebaseapp.com",
  projectId: "mystudieseamproject",
  storageBucket: "mystudieseamproject.appspot.com",
  messagingSenderId: "842517219149",
  appId: "1:842517219149:web:0d488b953b874db070d904"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);
const auth = null;

export { auth, db };
