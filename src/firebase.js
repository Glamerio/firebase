import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAQj5fgoKuR-gTg8-zcvJAKSJGRetP7DLE",
    authDomain: "chat-project-aef18.firebaseapp.com",
    databaseURL: "https://chat-project-aef18-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-project-aef18",
    storageBucket: "chat-project-aef18.appspot.com",
    messagingSenderId: "792666235047",
    appId: "1:792666235047:web:b5d8741c7bf316ea9dfb82",
    measurementId: "G-FX5PTJYTSR"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { auth, database };