import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import Firestore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Correct import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX--tvBoK-m05X_-0z348IwvRBDAXJqhE",
  authDomain: "trashtrack-67d11.firebaseapp.com",
  databaseURL: "https://trashtrack-67d11-default-rtdb.firebaseio.com",
  projectId: "trashtrack-67d11",
  storageBucket: "trashtrack-67d11.appspot.com",
  messagingSenderId: "891478706008",
  appId: "1:891478706008:web:070b435f9a86e284e3072d",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence to AsyncStorage
});

// Initialize Firestore
const database = getDatabase(app); // Firestore initialization

// Export auth and Firestore
export { auth, database };
export default app;
