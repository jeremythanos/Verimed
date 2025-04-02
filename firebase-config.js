// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvrS9Lb1JTp3LHvjJTHLlxYY6I0O9eSeI",
    authDomain: "verimed1db.firebaseapp.com",
    projectId: "verimed1db",
    storageBucket: "verimed1db.firebasestorage.app",
    messagingSenderId: "6350675416",
    appId: "1:6350675416:web:00fed9d5c95e411208e6ad",
    measurementId: "G-S5PK4QDEL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export app para poder usarlo en auth.js
export { app };
export const auth = getAuth(app);
export const db = getFirestore(app);