import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
export {firebaseConfig};