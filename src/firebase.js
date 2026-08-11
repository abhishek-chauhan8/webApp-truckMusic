
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeWL1IYGbFTuqLjCHYUAuh41NiWaWO2b0",
  authDomain: "realtime-users-6edfb.firebaseapp.com",
  projectId: "realtime-users-6edfb",
  databaseURL: "https://realtime-users-6edfb-default-rtdb.firebaseio.com",
  storageBucket: "realtime-users-6edfb.firebasestorage.app",
  messagingSenderId: "898985775626",
  appId: "1:898985775626:web:8e0021ac516a98b9e685f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
