import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB9VDZh5MyfQ5FuOJdiKz3GBl_zm5mEqo0",
    authDomain: "portfolio-cv-45ef6.firebaseapp.com",
    projectId: "portfolio-cv-45ef6",
    storageBucket: "portfolio-cv-45ef6.firebasestorage.app",
    messagingSenderId: "980896584557",
    appId: "1:980896584557:web:2612a9d6c7d47506c78064"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore()

export { projectFirestore }