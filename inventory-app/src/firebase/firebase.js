// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA13t2XSv65jRbs_xcsetlC1ntNN2bn9zk",
    authDomain: "inventory-management-app-3dc56.firebaseapp.com",
    projectId: "inventory-management-app-3dc56",
    storageBucket: "inventory-management-app-3dc56.firebasestorage.app",
    messagingSenderId: "677682313888",
    appId: "1:677682313888:web:84c2af3b54d5f51f7fa7c5",
    measurementId: "G-L8F5WPS76W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }