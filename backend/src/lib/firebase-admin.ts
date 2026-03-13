import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

export let db: admin.firestore.Firestore;
export let auth: admin.auth.Auth;
export let storage: admin.storage.Storage;

if (!getApps().length) {
    try {
        let parsedPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
        if (parsedPrivateKey) {
            if (!parsedPrivateKey.startsWith('"')) {
                parsedPrivateKey = `"${parsedPrivateKey}"`;
            }
            parsedPrivateKey = JSON.parse(parsedPrivateKey);
        }

        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: parsedPrivateKey,
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });
        console.log('Firebase Admin Initialized successfully');
        db = admin.firestore();
        auth = admin.auth();
        storage = admin.storage();
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}
