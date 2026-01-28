// Firebase Client SDK Configuration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDOyi1hl_XWACqdgLdMMiFWdPuEw5po5gA",
    authDomain: "anvitechnology-f3fb8.firebaseapp.com",
    databaseURL: "https://anvitechnology-f3fb8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "anvitechnology-f3fb8",
    storageBucket: "anvitechnology-f3fb8.firebasestorage.app",
    messagingSenderId: "1020523995934",
    appId: "1:1020523995934:web:783e7577bbedd5bfc65f0f",
    measurementId: "G-R754QJ7NWV"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics only on client side
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics };
export default app;
