// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsFl5sEWAJL-q6p_zxg06gPVsc8VPhk2s",
  authDomain: "vaultchain26.firebaseapp.com",
  projectId: "vaultchain26",
  storageBucket: "vaultchain26.firebasestorage.app",
  messagingSenderId: "43063374984",
  appId: "1:43063374984:web:c929c71eb0a5799483db3d",
  measurementId: "G-QE4BRT4DB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };