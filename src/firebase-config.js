// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from  "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD60Y_c3eXoeoKWp_7RCzYQz7DmuIR7LNo",
  authDomain: "chat-app2-65c8c.firebaseapp.com",
  projectId: "chat-app2-65c8c",
  storageBucket: "chat-app2-65c8c.appspot.com",
  messagingSenderId: "355651144988",
  appId: "1:355651144988:web:9be12759d8cc33d1ed3ed9",
  measurementId: "G-VRPRS4BDS5",
  databaseURL: "https://chat-app2-65c8c-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

export {auth};
export {database};
