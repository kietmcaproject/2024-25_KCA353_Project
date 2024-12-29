// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDukdthGMcThOJaohV0FgEIvTB8_oL-nx4",
  authDomain: "netflixgpt-d7d44.firebaseapp.com",
  projectId: "netflixgpt-d7d44",
  storageBucket: "netflixgpt-d7d44.appspot.com",
  messagingSenderId: "497166750882",
  appId: "1:497166750882:web:e95fdadad705f61be6b3fb",
  measurementId: "G-R0NC5C062F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
