import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCQU9S0PDqmuJopRkW34HK96Z3-oxfJ7E0",
    appId: "1:385926902412:web:5a8fd4b51cfdb4f3e501a9",
    authDomain: "instacool-ce5aa.firebaseapp.com",
    databaseURL: "https://instacool-ce5aa.firebaseio.com",
    measurementId: "G-5SJQRCDCB4",
    messagingSenderId: "385926902412",
    projectId: "instacool-ce5aa",
    storageBucket: "instacool-ce5aa.appspot.com",
};

firebase.initializeApp(config);

const firestore = firebase.firestore()
// const settings = { timestampsInSnapshots: true }
const settings = {}

firestore.settings(settings)

export const auth = firebase.auth()
export const db = firestore
export const storage = firebase.storage()