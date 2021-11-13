import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBesMnGNrT-xxD_Ir-l6a7BAe94_KBysXM",
    authDomain: "react-cooking-ninja.firebaseapp.com",
    projectId: "react-cooking-ninja",
    storageBucket: "react-cooking-ninja.appspot.com",
    messagingSenderId: "585563491777",
    appId: "1:585563491777:web:1c06665a5e7d55ab6cf340"
};

// initialize firebase to connect to backend
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();

// export to allow import into components
export { projectFirestore };