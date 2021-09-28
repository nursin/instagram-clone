import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAH2CCJshJvUiGpOsHJPDH-bUY8UdvWl_g",
    authDomain: "instagram-clone-6120f.firebaseapp.com",
    projectId: "instagram-clone-6120f",
    storageBucket: "instagram-clone-6120f.appspot.com",
    messagingSenderId: "209093790305",
    appId: "1:209093790305:web:28eab17c8e91cab7b7b820",
    measurementId: "G-PQN8X2TDF8"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

