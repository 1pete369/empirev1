// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmf-kGqm37DAAH5CJekngldJzHJoUBEqE",
  authDomain: "empirev1.firebaseapp.com",
  projectId: "empirev1",
  storageBucket: "empirev1.appspot.com",
  messagingSenderId: "641262245081",
  appId: "1:641262245081:web:e87cf148aaacc9a198dac8",
  measurementId: "G-HKQ1TMZLT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);