
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6KK7FCrwqUcPphEjsgRWQCZr5qOc2pmc",
  authDomain: "vimek-8728d.firebaseapp.com",
  projectId: "vimek-8728d",
  storageBucket: "vimek-8728d.firebasestorage.app",
  messagingSenderId: "264585120007",
  appId: "1:264585120007:web:68f78cf3e4767e27995da2",
  measurementId: "G-RD772R7S40"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

export { app, db };
