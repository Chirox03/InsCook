// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {  collection } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA94a6xXldSjJ45b5VDVo09kNmA1pLieAM",
    authDomain: "nt208-eb27f.firebaseapp.com",
    projectId: "nt208-eb27f",
    storageBucket: "nt208-eb27f.appspot.com",
    messagingSenderId: "160553520329",
    appId: "1:160553520329:web:ebe1ae2e039118e5529118",
    measurementId: "G-M7NJ29NZY4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default  db ;