import admin from 'firebase-admin';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

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
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

let dbInstance: admin.firestore.Firestore | undefined;
let authInstance: admin.auth.Auth | undefined;
let storageInstance: admin.storage.Storage | undefined;

try {
    if (getApps().length > 0) {
        dbInstance = admin.firestore();
        authInstance = admin.auth();
        storageInstance = admin.storage();
    }
} catch (error) {
    console.error('Firebase Admin Service Instantiation Error:', error);
}

export const db = dbInstance as admin.firestore.Firestore;
export const auth = authInstance as admin.auth.Auth;
export const storage = storageInstance as admin.storage.Storage;
