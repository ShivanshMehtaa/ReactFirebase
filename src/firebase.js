import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAqwQOdIcuvwkxMUG1J2HcIyiKmtnjrrXA",
  authDomain: "fir-course-cb6a3.firebaseapp.com",
  projectId: "fir-course-cb6a3",
  storageBucket: "fir-course-cb6a3.appspot.com",
  messagingSenderId: "438988269103",
  appId: "1:438988269103:web:165fb3fa2469160ba9c8da"
};

export const app = initializeApp(firebaseConfig);//writing export is optional for it
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)