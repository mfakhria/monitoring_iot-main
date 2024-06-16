
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBwmbCKEGu_rG_PCjbDhNW2IVlTbPrpPqM",
  authDomain: "esp8266-a085d.firebaseapp.com",
  databaseURL: "https://esp8266-a085d-default-rtdb.firebaseio.com",
  projectId: "esp8266-a085d",
  storageBucket: "esp8266-a085d.appspot.com",
  messagingSenderId: "430865351820",
  appId: "1:430865351820:web:92c990bff343b2fa79a7a9",
  measurementId: "G-5XVYM0B13H"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);

export { database, auth }