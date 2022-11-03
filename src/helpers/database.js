import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBLEnLUhXL19cuyHmYU5H2AGodGvMdjShI",
  authDomain: "login-app-30f63.firebaseapp.com",
  projectId: "login-app-30f63",
  storageBucket: "login-app-30f63.appspot.com",
  messagingSenderId: "580927271566",
  appId: "1:580927271566:web:ef9f4686c33383bbaacfdf"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;