
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCYQWViDeT3IKN59MT_UBSM0bVGo_fATqo",
  authDomain: "hidroponik-67eef.firebaseapp.com",
  databaseURL: "https://hidroponik-67eef-default-rtdb.firebaseio.com",
  projectId: "hidroponik-67eef",
  storageBucket: "hidroponik-67eef.appspot.com",
  messagingSenderId: "263388235146",
  appId: "1:263388235146:web:f55fbe4a82f207abb97473",
  measurementId: "G-TRVE5Y74SQ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);

export { database, auth }