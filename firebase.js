// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFMhSBfwoNrNVcv8iZa2O4LUKAJ1xufCM",
  authDomain: "table-check-8d0c6.firebaseapp.com",
  projectId: "table-check-8d0c6",
  storageBucket: "table-check-8d0c6.appspot.com",
  messagingSenderId: "327823437126",
  appId: "1:327823437126:web:5bc60c4a52a21623ea4947",
};

// Initialize Firebase
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
