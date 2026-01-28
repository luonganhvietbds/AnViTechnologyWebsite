// Firebase Admin SDK for server-side operations
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let app: App;
let adminDb: Firestore;
let adminAuth: Auth;

// Initialize Firebase Admin (only on server side)
if (!getApps().length) {
    // In production, use service account from environment variable
    // For development, we'll use the default credentials
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        : undefined;

    app = initializeApp(
        serviceAccount
            ? {
                credential: cert(serviceAccount),
                projectId: 'anvitechnology-f3fb8',
            }
            : {
                projectId: 'anvitechnology-f3fb8',
            }
    );
} else {
    app = getApps()[0];
}

adminDb = getFirestore(app);
adminAuth = getAuth(app);

export { adminDb, adminAuth };
export default adminDb;
