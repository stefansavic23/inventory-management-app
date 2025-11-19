import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);