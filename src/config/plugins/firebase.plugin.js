import { initializeApp } from 'firebase/app';
import { envs } from '../enviroments/enviroments.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: envs.FIREBASE_API_KEY,
  projectId: envs.FIREBASE_PROJECT_ID,
  storageBucket: envs.FIREBASE_STORAGE,
  appId: envs.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export const utilsFirebase = {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
};
