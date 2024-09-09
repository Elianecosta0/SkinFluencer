import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZJ5M0RLTq6YJ9Pk5sPESZSzI_5JF5mpM",
  authDomain: "skinfluencer-b95e4.firebaseapp.com",
  projectId: "skinfluencer-b95e4",
  storageBucket: "skinfluencer-b95e4.appspot.com",
  messagingSenderId: "343960682832",
  appId: "1:343960682832:web:1e5ef57577e65943e92c55",
  measurementId: "G-M8LPZ2SFLQ"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

