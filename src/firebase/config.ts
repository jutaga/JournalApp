// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAL1Ku-bJn4yi0Mc25xYM4cHqZhH0SZ6A",
    authDomain: "react-faa2f.firebaseapp.com",
    projectId: "react-faa2f",
    storageBucket: "react-faa2f.appspot.com",
    messagingSenderId: "978939565162",
    appId: "1:978939565162:web:e13295b5e5a515711d6613"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);