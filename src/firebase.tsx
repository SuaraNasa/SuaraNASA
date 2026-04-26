// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcF-xmOs0_SqYI6XJRsOz9zBdbm2vbuXE",
  authDomain: "suaranasa-97112.firebaseapp.com",
  projectId: "suaranasa-97112",
  storageBucket: "suaranasa-97112.firebasestorage.app",
  messagingSenderId: "369196703656",
  appId: "1:369196703656:web:860e634ae7b1ada84cc79d",
  measurementId: "G-DMZ89C1NYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);