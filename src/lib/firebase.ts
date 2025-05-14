
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: Replace these placeholder values with your actual Firebase project credentials.
const firebaseConfig = {
  apiKey: "AIzaSyC7Nfbq_1G0dMUGpPjyJRIvRUk9H90JpNU",
  authDomain: "vivek-and-meghna-ki-shaadi.firebaseapp.com",
  projectId: "vivek-and-meghna-ki-shaadi",
  storageBucket: "vivek-and-meghna-ki-shaadi.firebasestorage.app",
  messagingSenderId: "1081411719264",
  appId: "1:1081411719264:web:e814fbd70c8f740ded7305",
  measurementId: "G-L90V6J6HRD"
};

let app: FirebaseApp | undefined;
let dbInstance: Firestore | undefined;
let firebaseInitializationErrorObj: Error | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  if (app) {
    dbInstance = getFirestore(app);
  } else {
    // This case should ideally not be reached if getApps/getApp/initializeApp behave as expected
    throw new Error("Firebase app could not be initialized.");
  }

  if (!dbInstance) {
    throw new Error("Firestore could not be initialized with the Firebase app.");
  }

} catch (error) {
  console.error("CRITICAL: Failed to initialize Firebase. RSVP functionality will not work.", error);
  firebaseInitializationErrorObj = error instanceof Error ? error : new Error(String(error));
  // app and dbInstance will remain undefined or partially defined
}

/**
 * Gets the Firestore instance.
 * Throws an error if Firebase was not initialized correctly.
 * @returns Firestore instance
 */
export function getDbInstance(): Firestore {
  if (firebaseInitializationErrorObj) {
    throw new Error(`Firebase not initialized: ${firebaseInitializationErrorObj.message}`);
  }
  if (!dbInstance) {
    // This fallback should ideally not be hit if firebaseInitializationErrorObj is set correctly
    throw new Error("Firestore database is not available. Firebase initialization may have failed silently.");
  }
  return dbInstance;
}

// Exporting the raw app and db for potential other uses, but getDbInstance is preferred for actions.
export { app, dbInstance as db, firebaseInitializationErrorObj as firebaseInitializationError };
